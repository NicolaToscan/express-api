import { Router, Request, Response, NextFunction } from 'express';
import * as MySql from 'mysql';
import { json } from 'body-parser';
import { Person } from '../DTO/person';

var connection = MySql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11232667',
    password: 'A2Cb5gSpPx',
    database: 'sql11232667'
})

export class PeopleRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();

        connection.connect(function (err) {
            if (err) throw err
            console.log('You are now connected...')
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
    public getAll(req: Request, res: Response, next: NextFunction) {

        connection.query('SELECT * FROM persone', (err, rows, fields) => {
            console.log('The solution is: ', err)
            console.log('The solution is: ', rows)
            res.json(rows);
        });

    }

    //GET by Id
    public getById(req: Request, res: Response, next: NextFunction) {

        let id = parseInt(req.params.id);
        connection.query('SELECT * FROM persone WHERE id=' + id, (err, rows, fields) => {
            console.log('The solution is: ', err)
            console.log('The solution is: ', rows)
            res.send(rows);
        });

    }

    //POST
    public update(req: Request, res: Response, next: NextFunction) {

        console.log(req.body);
        let p: Person = new Person(req.body.Id, req.body.Nome, req.body.Cognome);
        let q: string = "UPDATE persone SET Nome='" + p.Nome + "', Cognome='" + p.Cognome + "' WHERE Id=" + p.Id;
        console.log('Query: ', q)
        connection.query(q, (err, rows, fields) => {
            console.log('Error: ', err)
            console.log('Result: ', rows)
            res.json({result: "OK"});
        });
    }

    //POST
    public add(req: Request, res: Response, next: NextFunction) {

        console.log(req.body);
        let p: Person = new Person(0, req.body.Nome, req.body.Cognome);
        let q: string = "INSERT INTO persone (Nome, Cognome) VALUES ('" + p.Nome + "', '" + p.Cognome + "')";
        console.log('Query: ', q)
        connection.query(q, (err, rows, fields) => {
            console.log('Error: ', err)
            console.log('Result: ', rows)
            res.json({result: "OK"});
        });
    }

    //DELETE
    public delete(req: Request, res: Response, next: NextFunction) {

        let id = parseInt(req.params.id);
        let q: string = "DELETE FROM persone WHERE Id=" + id;
        console.log('Query: ', q)
        connection.query(q, (err, rows, fields) => {
            console.log('Error: ', err)
            console.log('Result: ', rows)
            res.json({result: "OK"});
        });
    }


}

const heroRoutes = new PeopleRouter();
heroRoutes.init();

export default heroRoutes.router;