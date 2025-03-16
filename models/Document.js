import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema); 