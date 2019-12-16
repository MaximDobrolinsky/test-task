import { Router } from 'express';

import { NotNullValidator } from '../validators';

import { auth } from '../moddlewares/auth.middleware';

import { taskService } from '../services/task.service';

import { ITask } from '../interfaces/task.interface';
import { CreateTaskDto } from '../dtos/task';

class TaskRouter {
  public router: Router = Router();

  constructor() {
    this.router.get('/', auth, async (req, res, next) => {
      const tasks: ITask[] = await taskService.getAll();
      res.send(tasks);
    });

    this.router.get('/:id', auth, async (req, res, next) => {
      try {
        const id = req.params.id;
  
        NotNullValidator({ id });
  
        const task: ITask | null = await taskService.getById(id);
  
        res.send(task);
      } catch (err) {
        next(err);
      }
    });

    this.router.post('/', auth, async (req, res, next) => {
      try {
        const createTaskDto: CreateTaskDto = {
          title: req.body.title,
          description: req.body.description,
          doneTime: req.body.doneTime,
          remindeTime: req.body.remindeTime,
          isCompleted: req.body.isCompleted,
        };
  
        NotNullValidator({
          title: createTaskDto.title,
          description: createTaskDto.description,
          doneTime: createTaskDto.doneTime,
          remindeTime: createTaskDto.remindeTime,
          isCompleted: createTaskDto.isCompleted.toString(),
        });
  
        const task: ITask = await taskService.create(createTaskDto);
  
        res.send(task);
      } catch (err) {
        next(err);
      }
    });

    this.router.put('/:id', auth, async (req, res, next) => {
      try {
        const id = req.params.id;
  
        const updateTaskDto: CreateTaskDto = {
          title: req.body.title,
          description: req.body.description,
          doneTime: req.body.doneTime,
          remindeTime: req.body.remindeTime,
          isCompleted: req.body.isCompleted,
        };
  
        NotNullValidator({ id });
  
        const task: ITask | null = await taskService.update(id, updateTaskDto);
  
        res.send(task);
      } catch (err) {
        next(err);
      }
    });

    this.router.delete('/:id', auth, async (req, res, next) => {
      try {
        const id = req.params.id;
  
        NotNullValidator({ id });
  
        const isDeleted = await taskService.delete(id);
  
        res.send(isDeleted);
      } catch (err) {
        next(err);
      }
    });
    
  }
}

export default new TaskRouter().router;