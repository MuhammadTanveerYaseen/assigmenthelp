import mongoose, { Document } from 'mongoose';

export interface IAssignment extends Document {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  filePath: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
    default: 'assignment',
    enum: ['assignment', 'final-year', 'thesis', 'other'],
  },
  fileName: {
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
  filePath: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
    index: true,
  },
}, {
  timestamps: true,
});

// Add compound indexes for common queries
AssignmentSchema.index({ status: 1, createdAt: -1 });
AssignmentSchema.index({ email: 1, status: 1 });

export default mongoose.models.Assignment || mongoose.model<IAssignment>('Assignment', AssignmentSchema); 