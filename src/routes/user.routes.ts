import { Router } from 'express';

import { userService } from '../services/user.service';

import { IUser } from '../interfaces/user.interface';

import { CreateUserDto } from '../dtos/user';

import { NotNullValidator } from '../validators';

import { auth } from '../moddlewares/auth.middleware';

class UserRouter {
  public router: Router = Router();

  constructor() {
    this.router.get('/', auth, async (req, res, next) => {
      const users: IUser[] = await userService.getAll();

      res.send(users);
    });

    this.router.get('/:id', auth, async (req, res, next) => {
      try {
        const id = req.params.id;
        NotNullValidator({ id });
  
        const user: IUser | null = await userService.getById(id);
  
        res.send(user);
      } catch (err) {
        next(err);
      }
    });

    this.router.post('/', auth, async (req, res, next) => {
      try {
        const userDto: CreateUserDto = {
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
        };
  
        NotNullValidator({
          email: userDto.email,
          password: userDto.password,
          name: userDto.name,
        });
  
        const user: IUser = await userService.create(userDto);
  
        res.send(user);
      } catch (err) {
        next(err);
      }
    });
  }
}

export default new UserRouter().router;