import express from 'express';
import { body, param, query } from 'express-validator';
import { create, destroy, getAll, getAvailable, getById, update } from '../controllers/products';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/products/',query('page').isInt({min:1}),getAll)
    router.get('/products/available',getAvailable)
    router.get('/products/:id',param('id').isMongoId(),getById)
    router.post('/products/',isAuthenticated,
        body('name').notEmpty().trim().escape(),
        body('description').notEmpty().trim().escape(),
        body('price').notEmpty().isFloat({min: 0}).withMessage('price value must equals or greater than 0'),
        body('stock').notEmpty().isInt({min: 0}).withMessage('stock value must be an integer equals or greater than 0')
            ,create)
    router.put('/products/:id',isAuthenticated,
        body('name').notEmpty().trim().escape(),
        body('description').notEmpty().trim().escape(),
        body('price').notEmpty().isFloat({min: 0}).withMessage('price value must equals or greater than 0'),
        body('stock').notEmpty().isInt({min: 0}).withMessage('stock value must be an integer equals or greater than 0')
            ,update)
    router.delete('/products/:id',isAuthenticated,destroy)
};
