"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Heroes = require("../assets/data.json");
class HeroRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAll(req, res, next) {
        res.send(Heroes);
    }
    init() {
        this.router.get('/', this.getAll);
    }
}
exports.HeroRouter = HeroRouter;
const heroRoutes = new HeroRouter();
heroRoutes.init();
exports.default = heroRoutes.router;
