import * as mongoose from 'mongoose';
import validator from 'validator';

import { IUser } from '../../interfaces/user.interface';
 
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: [ validator.isEmail, 'Invalid email' ],
  },
  password: String,
  name: String,
});
 
const UserModel = mongoose.model<IUser>('User', UserSchema);
 
export { UserModel };