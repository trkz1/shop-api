import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, default: 0},
    stock: {type: Number, required: true, default: 0}
},
{timestamps: true}
)

export const ProductModel = mongoose.model('Product',ProductSchema);

export const getProdcutById = (id: string ) => ProductModel.findById({_id: id});
export const getAllProducts = ProductModel.find();
export const getAvailableProducts = ProductModel.where('stock').gt(0).exec();
export const createProduct = (values: Record<string, any>) => new ProductModel(values).save().then((product) => product.toObject())
export const updateProduct = (id: string,values: Record<string, any>) => ProductModel.findOneAndUpdate({_id:id}, values,{new: true})
export const deleteProduct = (id: string) => ProductModel.findOneAndDelete({_id:id})
export const reduceStock = (id: string) => ProductModel.updateMany({_id: id},{$inc: {stock: -1}})

