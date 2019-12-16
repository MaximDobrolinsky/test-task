import { TaskModel } from '../db/schemas';

import { ITask } from '../interfaces/task.interface';

import { CreateTaskDto, UpdateTaskDto } from '../dtos/task';

class TaskService {

  public async getAll(): Promise<ITask[]> {
    return await TaskModel.find({}).exec();
  }

  public async getById(id: string): Promise<ITask | null> {
    return await TaskModel.findById(id).exec();
  }

  public async create(taskDto: CreateTaskDto): Promise<ITask> {
    return await TaskModel.create(taskDto);
  }

  public async update(id: string, updateDto: UpdateTaskDto): Promise<ITask | null> {
    return await TaskModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  public async delete(id: string): Promise<boolean> {
    await TaskModel.remove({ _id: id }).exec();
    return true;
  }
}

const taskService = new TaskService();

export {
  taskService,
  TaskService,
};