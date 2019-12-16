import { Document } from 'mongoose';
import { ObjectID } from 'bson';

export interface IUser extends Document {
  _id: ObjectID;
  email: string;
  password: string;
  name: string;
}
