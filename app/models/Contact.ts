import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Contact document
export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  message?: string;
  projectType?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const ContactSchema: Schema = new Schema(
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
    message: {
      type: String,
      trim: true,
    },
    projectType: {
      type: String,
      enum: ['assignment', 'final-year', 'thesis', 'other', ''],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
let Contact: Model<IContact>;

// Check if the model already exists to prevent overwriting
if (mongoose.models && mongoose.models.Contact) {
  Contact = mongoose.models.Contact as Model<IContact>;
} else {
  Contact = mongoose.model<IContact>('Contact', ContactSchema);
}

export default Contact; 