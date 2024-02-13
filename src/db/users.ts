import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true,  lowercase: true, trim: true, required: true},
    password: {type: String, required: true, select: false},
    token: {type: String}
})

export const UserModel = mongoose.model('User',UserSchema);

export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserById = (id: string ) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())