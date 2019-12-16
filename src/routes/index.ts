import { Router } from 'express';

import LoginRouter from './login.routes';
import UserRouter from './user.routes';
import TaskRouter from './task.routes';

class AppRouter {
  public router: Router = Router();

  constructor() {
    this.router.use('/auth', LoginRouter)
    this.router.use('/user', UserRouter);
    this.router.use('/task', TaskRouter);
  }
}

export default new AppRouter().router;