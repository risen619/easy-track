import "reflect-metadata";

import { Application } from "express";
import { createExpressServer, useContainer, Action } from 'routing-controllers';
import { Container } from 'typedi';

import { DB } from './db';

import { ErrorMiddleware } from "src/middlewares/error";
import { UserController, AuthController } from "src/controllers";

useContainer(Container);

const app: Application = createExpressServer({
    currentUserChecker: (action: Action) => action.request.auth,
    routePrefix: '/api',
    controllers: [
        AuthController,
        UserController
    ]
});

const db = new DB();

db.connect()
.then(c =>
{
    app.listen(3000, '0.0.0.0');
    console.log('MongoDB connected!',);
})
.catch(err => console.log('Error while connecting to MongoDB: ', err));
