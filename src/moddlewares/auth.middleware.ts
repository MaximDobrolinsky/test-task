import express from 'express';
import * as jwt from 'jsonwebtoken';

import { userService } from '../services/user.service';

const auth = async(req: any, res: express.Response, next: express.NextFunction) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      next(new Error('Invalid token'));
    }

    token = token.replace('Bearer ', '');
  
    const signature: string = process.env.JWT_SIGNATURE || '';
    const data: any = jwt.verify(token, signature);

      const user = await userService.getById(data._id);


      if (!user) {
          next(new Error('User not found'));
      }

      req.user = user;
      next()
  } catch (error) {
      res
        .status(401)
        .send({
          error: 'No access',
        });
  }
}

export {
  auth,
};