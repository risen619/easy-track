import "reflect-metadata";

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { DB } from './db';

import { UserController } from "../controllers/UserContoller";

useContainer(Container);

const app = createExpressServer({
    routePrefix: '/api',
    controllers: [UserController],
});

const db = new DB();

db.connect()
.then(c =>
{
    app.listen(3000, '0.0.0.0');
    console.log('MongoDB connected!',);
})
.catch(err => console.log('Error while connecting to MongoDB: ', err));
