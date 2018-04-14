"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const HeroRouter_1 = require("./routes/HeroRouter");
const PeopleRouter_1 = require("./routes/PeopleRouter");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
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
        this.express.use('/api/heroes', HeroRouter_1.default);
        this.express.use('/api/people', PeopleRouter_1.default);
    }
}
exports.default = new App().express;
