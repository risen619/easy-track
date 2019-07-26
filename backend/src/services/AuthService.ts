import { NextFunction } from "express";
import { Inject, Service } from "typedi";

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
    authHandler(req: Request, res: Response, next: NextFunction)
    {
        if(!req.headers['Authorization'] || !(<string>req.headers['Authorization']).startsWith('Bearer ')) next('No token provided');
        else
        {
            const token = (<string>req.headers['Authorization']).split('Bearer ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>
            {
                if(err) next(err);
                else if(decoded && decoded['userId'])
                {
                    req['auth'] = new Authentication(decoded['userId']);
                }
                else next('Invalid token provided');
            });
        }
    }

}
