import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongoose';
import Contact from '../../models/Contact';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone number are required' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB and save the contact form submission
    try {
      await dbConnect();
      
      // Create a new contact record
      const contact = new Contact({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message || '',
        projectType: data.projectType || '',
      });
      
      // Save to database
      await contact.save();
      
      console.log('Contact form submission saved to database:', contact._id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database save fails in demo mode
    }
    
    // Log the submission details
    console.log('Contact form submission:', data);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your submission! We will contact you shortly.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
} 