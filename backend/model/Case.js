import mongoose from 'mongoose';

const CaseSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    companyName: { type: String, required: true },
    installedCapacity: { type: String, required: true }, // e.g., "500 kW"
    investmentAmount: { type: String, required: true },  // e.g., "$300,000"
    annualGeneration: { type: String, required: true },  // e.g., "800,000 kWh"
    saveStandardCoal: { type: String, required: true },  // e.g., "250 tons"
    reductionOfEmission: { type: String, required: true }, // e.g., "600 tons CO₂"
    image: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model('Case', CaseSchema);