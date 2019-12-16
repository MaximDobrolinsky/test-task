import express from 'express';
import * as bodyParser from 'body-parser';

import DB from './db';

import AppRouter from './routes'

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.express.use(bodyParser.json());
    this.initRoutes();
    this.initDB();
    this.express.use(this.errorHandler);
  }

  private initRoutes() {
    this.express.use(AppRouter);
  }

  private async initDB() {
    await new DB().init();
  }

  private errorHandler(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err) {
      const error = err.toString();

      res.status(400);
      res.send({
        error,
      });
    }

    next();
  }
}

export default new App().express;