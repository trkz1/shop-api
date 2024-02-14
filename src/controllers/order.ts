import express from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { getUserByEmail } from '../db/users';
import { ProductModel, getProdcutById, reduceStock } from '../db/products';
import { createOrder } from '../db/orders';

interface JwtPayload {
    email: string
  }
  
export const getUserOrders = async (req: express.Request, res: express.Response) => {

    try {
       const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.TOKEN_KEY) as JwtPayload
        const user = await getUserByEmail(decoded.email.toString())
        return res.status(200).send(user.populate('orders','-user'))
    } catch (error) {
        return res.status(500).send('Somewthing went wrong')
    }
}

export const create = async (req: express.Request, res: express.Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const products: string [] = req.body.products
        const selectedProducts = await ProductModel.find({_id: {$in: products}})
        if(checkStockQuantity(selectedProducts,products)) {
            return res.status(400).send({message: "you have exceeded the max stock for the selected products"})        
        }
        const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.TOKEN_KEY) as JwtPayload
        const user = await getUserByEmail(decoded.email.toString())
        const order = await createOrder({reference: (Math.random()*1e32).toString(36),user,products})
        products.forEach(async item => {
            await reduceStock(item)
        });
        return res.status(201).send(order)
    } catch (error) {
        return res.status(500).send('Somewthing went wrong')
    }
}

function checkStockQuantity(selectedProducts: any, products: Array<string>) {
    for(var item of selectedProducts){
   if(item.stock < (products.filter((i: string) => i == item._id)).length) 
    return true
}
return false
}