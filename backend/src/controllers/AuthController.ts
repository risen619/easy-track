import { JsonController, Post, Body, Res } from "routing-controllers";
import { Response } from "express";
import { Inject } from "typedi";

import { ISignUp } from '@common/models/ISignUp'
import { ISignIn } from '@common/models/ISignIn'

import { UserRepository } from "src/repositories";

@JsonController()
export class AuthController
{
    @Inject()
    private userRepository: UserRepository;

    @Post('/sign-up')
    signUp(@Body() body: ISignUp, @Res() res: Response)
    {
        return this.userRepository.register(body)
        .then(user => res.status(200).send(user), e => res.status(500).send(e));
    }

    @Post('/sign-in')
    signIn(@Body() body: ISignIn, @Res() res: Response)
    {
        return this.userRepository.login(body)
        .then(({ user, token }) =>
        {
            res.setHeader('Authorization', `Bearer ${token}`);
            res.status(200).send(user);
        }, e => res.status(404).send(e));
    }

}