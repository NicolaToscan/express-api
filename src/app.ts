import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import HeroRouter from './routes/HeroRouter';
import PeopleRouter from './routes/PeopleRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {

    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    router.post('/', (req, res, next) => {
      console.log(req.body);
      res.json({
        message: 'Hello Post World!'
      });
    });

    this.express.use('/', router);
    this.express.use('/api/heroes', HeroRouter);
    this.express.use('/api/people', PeopleRouter);
  }

}

export default new App().express;