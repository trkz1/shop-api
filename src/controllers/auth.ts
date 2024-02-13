import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { createUser, getUserByEmail } from '../db/users';


export const register = async (req: express.Request, res: express.Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
      
        const {name, email, password} = req.body;
        const userExists = await getUserByEmail(email);
        if(userExists) {
            return res.status(400).send({message: 'Email already exists'})
        }
        const user = await createUser({
            name,
            email,
            password: await bcrypt.hash(password,16)
        })

        // Create token
    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "6h",
        }
      );
      // save user token
      user.token = token;
      res.status(201).json(user);
    } catch (error) {
        return res.status(500).send('Somewthing went wrong')
    }
}

export const login = async (req: express.Request, res: express.Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        // Get user input
        const { email, password } = req.body;
        // Validate if user exist in our database
        const user = await getUserByEmail(email).select("+password");
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "6h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          return res.status(200).json({
            id: user._id,
            name: user.name, 
            email: user.email,
            token: user.token
          });
        }
        else {
          return res.status(401).send({message: "Invalid Credentials"});
        }
      } catch (err) {
        console.log(err);
      }
}