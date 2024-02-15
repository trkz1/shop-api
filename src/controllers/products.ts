import { ProductModel, createProduct, deleteProduct, getAllProducts, getAvailableProducts, getProdcutById, updateProduct } from '../db/products';
import express from 'express';
import { validationResult } from 'express-validator';


export const getAll = async (req: express.Request, res: express.Response) => {

    const { page =  1, limit = 10 } = req.query;

    let pageNumber = page as number < 1  ? 1 : page

    try {
      const products = await getAllProducts.clone()
      .limit(limit as number * 1).skip((pageNumber as number - 1) * (limit as number))
      .exec();
      const count = await ProductModel.countDocuments()
      return res.status(200).send({products: products,
        totalPages: Math.ceil(count / (limit as number)),
        currentPage: pageNumber})
    } catch (error) {
        return res.status(500).send({message: 'Somewthing went wrong'})
    }
}

export const getAvailable = async (req: express.Request, res: express.Response) => {

    const { page =  1, limit = 10 } = req.query;

    let pageNumber = page as number < 1  ? 1 : page

    try {
      const products = await getAvailableProducts
      .clone()
      .limit(limit as number * 1)
      .skip((pageNumber as number - 1) * (limit as number))
      .exec();
      const count = await ProductModel.countDocuments()
      return res.status(200).send({
        products: products,
        totalPages: Math.ceil(count / (limit as number)),
        currentPage: pageNumber
    })
    } catch (error) {
        return res.status(500).send({message: 'Somewthing went wrong'})
    }
}

export const getById = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
      const product = await getProdcutById(req.params.id)
      if(!product) {
        return res.status(404).send({message: "Not Found"})
    }
      return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({message: 'Somewthing went wrong'})
    }
}

export const create = async (req: express.Request, res: express.Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const {name, description, price, stock} = req.body
        const newProdcut = await createProduct({name, description, price, stock})
      return res.status(201).send({message: "Product Created Successfully",product: newProdcut})
    } catch (error) {
        return res.status(500).send({message: 'Somewthing went wrong'})
    }
}

export const update = async (req: express.Request, res: express.Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const product = await getProdcutById(req.params.id)
        if(!product) {
            return res.status(404).send({message: "Not Found"})
        }
        const {name, description, price, stock} = req.body
        const updatedProduct = await updateProduct(product.id,{name, description, price, stock})
      return res.status(200).send({message: "Product Updated Successfully",product: updatedProduct})
    } catch (error) {
        return res.status(500).send({message: 'Somewthing went wrong'})
    }
}

export const destroy = async (req: express.Request, res: express.Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const product = await getProdcutById(req.params.id)
        if(!product) {
            return res.status(404).send({message: "Not Found"})
        }
         await deleteProduct(product.id)
      return res.status(200).send({message: "Product Deleted Successfully"})
    } catch (error) {
        return res.status(500).send({message: 'Somewthing went wrong'})
    }
}