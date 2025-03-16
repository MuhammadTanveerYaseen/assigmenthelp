import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Assignment from '@/models/Assignment';
import Document from '@/models/Document';
import cloudinary from '@/lib/cloudinary';
import { rateLimit } from '@/lib/rateLimit';
import { validateEmail, validatePhone } from '@/lib/validation';
import { Readable } from 'stream';

// Rate limit configuration: 10 requests per 5 minutes
const uploadRateLimit = rateLimit({
  maxRequests: 10,
  windowMs: 5 * 60 * 1000,
});

// Define allowed file types and their MIME types
const ALLOWED_FILE_TYPES: Record<string, readonly string[]> = {
  'application/pdf': ['pdf'],
  'application/msword': ['doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  'text/plain': ['txt']
} as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Validate file type and extension
function isValidFile(file: File): boolean {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const allowedExtensions = ALLOWED_FILE_TYPES[file.type];
  return allowedExtensions?.includes(extension) ?? false;
}

// Upload file to Cloudinary with retry logic
async function uploadToCloudinary(file: Buffer, retries = 3): Promise<{ secure_url: string; public_id: string }> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'assignments',
            timeout: 60000, // 60 second timeout
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (!result) {
              reject(new Error('No result from Cloudinary'));
            } else {
              resolve(result as { secure_url: string; public_id: string });
            }
          }
        );

        const bufferStream = Readable.from(file);
        bufferStream.pipe(uploadStream);
      });
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
    }
  }
  throw new Error('Failed to upload file after multiple attempts');
}

// Validate request headers
function validateHeaders(request: NextRequest): boolean {
  const contentType = request.headers.get('content-type');
  return contentType?.includes('multipart/form-data') ?? false;
}

export async function POST(request: NextRequest) {
  try {
    // Validate request headers
    if (!validateHeaders(request)) {
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'Invalid content type. Please use multipart/form-data.' 
        }),
        { 
          status: 415,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Apply rate limiting
    const rateLimitResult = await uploadRateLimit(request);
    if (rateLimitResult) return rateLimitResult;

    // Connect to MongoDB first to ensure database is available
    try {
      await dbConnect();
    } catch (error) {
      console.error('Database connection error:', error);
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'Database connection failed. Please try again later.' 
        }),
        { 
          status: 503,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const projectType = formData.get('projectType') as string;

    // Validate required fields
    const missingFields = [];
    if (!file) missingFields.push('file');
    if (!name?.trim()) missingFields.push('name');
    if (!email?.trim()) missingFields.push('email');
    if (!phone?.trim()) missingFields.push('phone');

    if (missingFields.length > 0) {
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'Missing required fields',
          details: `Missing fields: ${missingFields.join(', ')}`
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Validate field formats
    if (!validateEmail(email.trim())) {
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'Invalid email format' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    if (!validatePhone(phone.trim())) {
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'Invalid phone number format' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    if (name.trim().length < 2) {
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'Name must be at least 2 characters long' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Validate file type
    if (!isValidFile(file)) {
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'Invalid file type',
          details: `Please upload a file in one of these formats: ${Object.keys(ALLOWED_FILE_TYPES).map(type => type.split('/')[1]).join(', ')}`,
          receivedType: file.type
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'File too large',
          details: `Maximum file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
          receivedSize: file.size
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Convert file to buffer and upload to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    let cloudinaryResult;
    try {
      cloudinaryResult = await uploadToCloudinary(buffer);
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'File upload failed',
          details: error instanceof Error ? error.message : 'Failed to upload file to cloud storage'
        }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Create assignment and document records in a transaction
    const mongooseInstance = await dbConnect();
    const session = await mongooseInstance.startSession();
    session.startTransaction();

    try {
      const assignment = await Assignment.create([{
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        projectType: projectType?.trim() || 'assignment',
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        filePath: cloudinaryResult.secure_url,
        status: 'pending'
      }], { session });

      const document = await Document.create([{
        url: cloudinaryResult.secure_url,
        filename: file.name,
        fileSize: file.size,
        fileType: file.type,
        publicId: cloudinaryResult.public_id,
        assignmentId: assignment[0]._id,
        status: 'pending'
      }], { session });

      await session.commitTransaction();

      return new NextResponse(
        JSON.stringify({
          success: true,
          data: {
            assignment: {
              id: assignment[0]._id,
              name: assignment[0].name,
              email: assignment[0].email,
              status: assignment[0].status
            },
            document: {
              id: document[0]._id,
              url: document[0].url,
              filename: document[0].filename
            }
          }
        }),
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

    } catch (error) {
      await session.abortTransaction();
      console.error('Database transaction error:', error);
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          error: 'Failed to save assignment',
          details: error instanceof Error ? error.message : 'Database error occurred'
        }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error('Server error:', error);
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        error: 'Server error',
        details: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
} 