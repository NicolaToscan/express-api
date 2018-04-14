"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MySql = require("mysql");
const person_1 = require("../DTO/person");
var connection = MySql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11232667',
    password: 'A2Cb5gSpPx',
    database: 'sql11232667'
});
class PeopleRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
        connection.connect(function (err) {
            if (err)
                throw err;
            console.log('You are now connected...');
        });
    }
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);
        this.router.post('/', this.update);
        this.router.put('/', this.add);
        this.router.delete('/:id', this.delete);
    }
    //GET All
    getAll(req, res, next) {
        connection.query('SELECT * FROM persone', (err, rows, fields) => {
            console.log('The solution is: ', err);
            console.log('The solution is: ', rows);
            res.json(rows);
        });
    }
    //GET by Id
    getById(req, res, next) {
        let id = parseInt(req.params.id);
        connection.query('SELECT * FROM persone WHERE id=' + id, (err, rows, fields) => {
            console.log('The solution is: ', err);
            console.log('The solution is: ', rows);
            res.send(rows);
        });
    }
    //POST
    update(req, res, next) {
        console.log(req.body);
        let p = new person_1.Person(req.body.Id, req.body.Nome, req.body.Cognome);
        let q = "UPDATE persone SET Nome='" + p.Nome + "', Cognome='" + p.Cognome + "' WHERE Id=" + p.Id;
        console.log('Query: ', q);
        connection.query(q, (err, rows, fields) => {
            console.log('Error: ', err);
            console.log('Result: ', rows);
            res.json({ result: "OK" });
        });
    }
    //POST
    add(req, res, next) {
        console.log(req.body);
        let p = new person_1.Person(0, req.body.Nome, req.body.Cognome);
        let q = "INSERT INTO persone (Nome, Cognome) VALUES ('" + p.Nome + "', '" + p.Cognome + "')";
        console.log('Query: ', q);
        connection.query(q, (err, rows, fields) => {
            console.log('Error: ', err);
            console.log('Result: ', rows);
            res.json({ result: "OK" });
        });
    }
    //DELETE
    delete(req, res, next) {
        let id = parseInt(req.params.id);
        let q = "DELETE FROM persone WHERE Id=" + id;
        console.log('Query: ', q);
        connection.query(q, (err, rows, fields) => {
            console.log('Error: ', err);
            console.log('Result: ', rows);
            res.json({ result: "OK" });
        });
    }
}
exports.PeopleRouter = PeopleRouter;
const heroRoutes = new PeopleRouter();
heroRoutes.init();
exports.default = heroRoutes.router;
