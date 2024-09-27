import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, require:true},
    description: {type: String, require:true},
    price: {type:String , require:true},
    category: {type:String , require:true},
    imageUrl: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);