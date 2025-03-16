import mongoose, { Document as MongoDocument } from 'mongoose';

export interface IDocument extends MongoDocument {
  url: string;
  filename: string;
  fileSize: number;
  fileType: string;
  status: 'pending' | 'processed' | 'error';
  publicId: string;
  assignmentId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    index: true, // Add index for faster queries
  },
  filename: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'error'],
    default: 'pending',
    index: true, // Add index for status-based queries
  },
  publicId: {
    type: String, // Store Cloudinary public ID for easier management
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  }
}, {
  timestamps: true,
});

// Add compound index for common queries
DocumentSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema); 