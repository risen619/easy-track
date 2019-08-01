import { JsonController, Get, Req, Res, UseBefore, BodyParam, Param } from 'routing-controllers';
import { Response } from 'express';

import { UserRepository } from 'src/repositories';
import { AuthMiddleware } from 'src/middlewares/auth';

@UseBefore(AuthMiddleware)
@JsonController()
export class UserController
{
    constructor(private userRepository: UserRepository) { }

    @Get('/users')
    index(@Res() res: Response)
    {
        return this.userRepository.getAll()
        .then(users =>
        {
            if(!users || !users.length)
            {
                return res.status(404).send({ error: 'No users found' });
            }
            else 
            {
                users = users.map(u => u.strip());
                return res.status(200).send(users);
            }
        }, e => res.status(500).send(e));
    }

    @Get('/user/:id')
    get(@Res() res: Response, @Param('id') id: string)
    {
        return this.userRepository.getById(id)
        .then(user =>
        {
            if(!user)   
                return res.status(404).send({ error: 'User with such id is not registered' });
            else return res.status(200).send(user.strip());
        }, e => res.status(500).send(e));
    }
}