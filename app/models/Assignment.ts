import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Assignment document
export interface IAssignment extends Document {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  filePath: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const AssignmentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    projectType: {
      type: String,
      enum: ['assignment', 'final-year', 'thesis', 'other'],
      default: 'assignment',
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
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
let Assignment: Model<IAssignment>;

// Check if the model already exists to prevent overwriting
if (mongoose.models && mongoose.models.Assignment) {
  Assignment = mongoose.models.Assignment as Model<IAssignment>;
} else {
  Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
}

export default Assignment; 