import jwt from 'jsonwebtoken';
import express from 'express';

const config = process.env;

export const isAuthenticated = async (req: express.Request , res: express.Response, next: express.NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({message: "A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
  } catch (err) {
    return res.status(401).send({message: "Invalid Token"});
  }
  return next();
};