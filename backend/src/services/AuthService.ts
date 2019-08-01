import { NextFunction, Response, Request } from "express";
import { Inject, Service } from "typedi";
import { Req, Res } from "routing-controllers";

import * as jwt from 'jsonwebtoken';

import { UserRepository } from "src/repositories";

import { User } from "src/models/User";

export class Authentication
{
    @Inject()
    private userRepository: UserRepository;
    private _user: User;

    constructor(private userId: string) { }

    get user()
    {
        if(this._user) return Promise.resolve(this._user);
        else return this.userRepository.getById(this.userId).then(u => {
            this._user = u;
            return u;
        });
    }
}

@Service()
export class AuthService
{
    authHandler(@Req() req: Request, @Res() res: Response, next: NextFunction)
    {
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
        {
            res.status(401).send({ error: 'No token provided' });
        }
        else
        {
            const token = req.headers.authorization.split('Bearer ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>
            {
                if(err) next(err);
                else if(decoded && decoded['userId'])
                {
                    req['auth'] = new Authentication(decoded['userId']);
                    next();
                }
                else res.status(400).send({ error: 'Invalid token provided' });
            });
        }
    }

}
