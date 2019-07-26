import { JsonController, Get, Req, Res } from 'routing-controllers';
import { Response } from 'express';

import { UserRepository } from '../repositories';

@JsonController()
export class UserController
{
    constructor(private userRepository: UserRepository) { }

    @Get('/users')
    index(@Res() res: Response)
    {
        return res.send(this.userRepository.getAll());
    }

    @Get('/users/create')
    create(@Res() res: Response)
    {
        
    }
}