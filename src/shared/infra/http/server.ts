import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'dotenv/config';

import { connectDB } from '../../../config/db';

import cors from 'cors';

import routes from './routes';
import AppError from '../../errors/AppError';

const app = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response.status(500).json({ status: 'error', message: 'Internal Server Error !' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
