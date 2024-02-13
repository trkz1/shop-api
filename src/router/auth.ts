import express from 'express';

import { register, login } from '../controllers/auth';
import { body } from 'express-validator';

export default (router: express.Router) => {
    router.post('/auth/register',
        body('name').isLength({ min: 1 }).trim().escape(),
        body('email').isEmail()
            .withMessage("Invalid email address!")
            .bail()
            .normalizeEmail(),
        body('password')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
            .withMessage("Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "),
        register);

    router.post('/auth/login',
        body('email').isEmail()
            .withMessage("Invalid email address!")
            .bail()
            .normalizeEmail(),
        body('password').notEmpty().withMessage('The password field is required'),
        login)
};