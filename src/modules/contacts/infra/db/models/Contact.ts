import mongoose from 'mongoose';

import { IUser } from '../../../../users/infra/db/models/User';

export interface IContact {
  _id: mongoose.ObjectId;
  user: IUser;
  name: string;
  email: string;
  phone: string;
  type: string;
  date: Date;
}

const ContactSchema = new mongoose.Schema<IContact>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: 'personal',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Contact = mongoose.model('contact', ContactSchema);
