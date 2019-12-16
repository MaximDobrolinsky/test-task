import * as mongoose from 'mongoose';
import { ITask } from '../../interfaces/task.interface';
 
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  doneTime: Date,
  remindeTime: Date,
  isCompleted: Boolean,
});
 
const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
 
export { TaskModel };