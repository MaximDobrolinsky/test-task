import { Router } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { userService } from '../services/user.service';

import { LoginUserDto, CreateUserDto } from '../dtos/user';

import { IUser } from '../interfaces/user.interface';

import { NotNullValidator } from '../validators';

class LoginRouter {
  public router: Router = Router();

  constructor() {
    this.router.post('/register', async (req, res, next) => {
      try {
        const registerDto: CreateUserDto = {
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
        };
  
        NotNullValidator({
          email: registerDto.email,
          password: registerDto.password,
          name: registerDto.name,
        });
  
        const user: IUser = await userService.create(registerDto);
  
        res.send(user);
      } catch (err) {
        next(err);
      }
    });

    this.router.post('/login', async (req, res, next) => {
      const userLoginDto: LoginUserDto = {
        email: req.body.email,
        password: req.body.password,
      };

      NotNullValidator({
        email: userLoginDto.email,
        password: userLoginDto.password,
      });

      const user: IUser | null = await userService.getByEmail(userLoginDto.email);

      if (!user) {
        next(new Error('User not found.'));
        return;
      }

      if (!await bcrypt.compare(userLoginDto.password, user.password)) {
        next(new Error('Incorrect password.'));
        return;
      }

      const signature: string = process.env.JWT_SIGNATURE || '';

      const token = jwt.sign({
        _id: user._id
      }, signature);

      res.send({
        token,
      });
    });
  }
}

export default new LoginRouter().router;