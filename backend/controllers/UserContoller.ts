import { JsonController, Get, Req, Res } from 'routing-controllers';
import { Request, Response } from 'express';

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
}