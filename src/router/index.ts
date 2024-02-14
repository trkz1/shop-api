import express from 'express';
import auth from './auth';
import products from './products';
import orders from './orders';

const router = express.Router();

export default (): express.Router => {
    auth(router);
    products(router);
    orders(router);
        
    return router
}