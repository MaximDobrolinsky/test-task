import mongoose from 'mongoose';
import { config } from '../config';

class DB {
  constructor() {}

  public async init() {
    try {
      await mongoose.connect(config.db_url, { useNewUrlParser: true });

    } catch (err) {
      console.log(err);
    }
  }
}

export default DB;