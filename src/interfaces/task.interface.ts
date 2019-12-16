import { Document } from 'mongoose';
import { ObjectID } from 'bson';

export interface ITask extends Document {
  _id: ObjectID;
  title: string;
  description: string;
  doneTime: Date;
  remindeTime: Date;
  isCompleted: boolean;
}
