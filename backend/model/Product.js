import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema({
  header: { type: String, required: true },
  points: [{ type: String, required: true }] // Ensuring points are an array of strings
});
const FunctionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    detail: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['PV Module', 'Battery', 'Energy Storage'],  
      required: true
    },
    features: { type: [FeatureSchema], required: true },  
    function: { type: [FunctionSchema], required: true },  
    image: { type: String } // Image path, nullable
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
