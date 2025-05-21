import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema({
  header: { type: String },
  points: [{ type: String }] // Ensuring points are an array of strings
});
const FunctionSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    detail: { type: String },
    category: { 
      type: String, 
      enum: ['PV Module', 'Battery', 'Energy Storage'],  
      required: true
    },
    features: { type: [FeatureSchema] },  
    function: { type: [FunctionSchema] },  
    image: { type: String } // Image path, nullable
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
