import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    reference: {type: String, required: true},
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    products: {type: Array,required: true}
},
{timestamps: true}
)

export const OrderModel = mongoose.model('Order',OrderSchema);

export const getOrderById = (id: string ) => OrderModel.findById({_id: id});
export const getAllOrders = OrderModel.find({});
export const createOrder = (values: Record<string, any>) => new OrderModel(values).save().then((order) => order.toObject())

