import "reflect-metadata";

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { UserController } from "../controllers/UserContoller";

useContainer(Container);

const app = createExpressServer({
    routePrefix: '/api',
    controllers: [UserController]
});

app.listen(3000, '0.0.0.0');