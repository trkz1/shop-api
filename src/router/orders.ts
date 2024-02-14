import express from 'express';
import { body, param } from 'express-validator';
import { isAuthenticated } from '../middlewares/index';
import { create, getUserOrders } from '../controllers/order';

export default (router: express.Router) => {
    router.get('/orders/',isAuthenticated,getUserOrders)
    router.post('/orders/',isAuthenticated,
    body('products').notEmpty().isArray({min: 1}),
    body("products.*").isMongoId(),
    create)
};