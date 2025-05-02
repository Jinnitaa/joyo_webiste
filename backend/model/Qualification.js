import mongoose from 'mongoose';

const QualificationSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Qualification', QualificationSchema);