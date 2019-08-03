import { JsonController, Get, Req, Res, Param, Authorized, Put, Body, CurrentUser } from 'routing-controllers';
import { Response } from 'express';

import { UserRepository } from 'src/repositories';
import { User } from 'src/models/User';

@Authorized()
@JsonController('/users')
export class UserController
{
    constructor(private userRepository: UserRepository) { }

    @Get('/')
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

    @Get('/:id')
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
    
    @Put('/:id')
    put(@CurrentUser() currentUser: User, @Res() res: Response, @Param('id') id: string, @Body() user: User)
    {
        if(currentUser._id.toString() !== id)
            return res.status(403).send({ error: 'You do not have permission to edit users' });
        else return this.userRepository.updateById(id, user)
        .then(user =>
        {
            console.log(user);
            if(!user)
                return res.status(500).send({ error: 'Something went wrong' });
            else return res.status(200).send(user.strip());
        }, ({ code, ...e }) => res.status(code || 500).send(e));
    }
}