import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'dotenv/config';

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Express + TypeScript Server');
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
