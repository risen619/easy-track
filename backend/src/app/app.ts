import "reflect-metadata";

import { Application } from "express";
import { createExpressServer, useContainer, Action } from 'routing-controllers';
import { Container } from 'typedi';

import { DB } from './db';

import { UserController, AuthController, WorkspaceController } from "src/controllers";
import { AuthMiddleware } from "src/middlewares/auth";
import { Authentication } from "src/services/AuthService";

useContainer(Container);

const app: Application = createExpressServer({
    cors: true,
    authorizationChecker: (action) =>
    {
        const auth = action.request.auth as Authentication;

        if(!auth) return false;

        return true;
    },
    currentUserChecker: async (action: Action) => await (action.request.auth as Authentication).user,
    routePrefix: '/api',
    controllers: [
        AuthController,
        UserController,
        WorkspaceController
    ],
    middlewares: [AuthMiddleware]
});

const db = new DB();

db.connect()
.then(c =>
{
    app.listen(3000, '0.0.0.0');
    console.log('MongoDB connected!',);
})
.catch(err => console.log('Error while connecting to MongoDB: ', err));
