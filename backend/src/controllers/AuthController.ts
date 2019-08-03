import { JsonController, Post, Body, Res, BodyParam, OnUndefined } from "routing-controllers";
import { Response } from "express";
import { Inject } from "typedi";

import { ISignUp } from '@common/models/ISignUp'
import { ISignIn } from '@common/models/ISignIn'

import { AuthRepository } from "src/repositories";

@JsonController()
export class AuthController
{
    @Inject() private authRepository: AuthRepository;

    @OnUndefined(204)
    @Post('/sign-up')
    signUp(
        @Body({ required: true, validate: true }) body: ISignUp,
        @Res() res: Response
    )
    {
        this.authRepository.register(body)
        .then(user =>
        {
            if(user)
                res.status(200);
        }, ({ code, ...e }) => res.status(code || 500).send(e));
    }

    @Post('/sign-in')
    signIn(@Body() body: ISignIn, @Res() res: Response)
    {
        return this.authRepository.login(body)
        .then(({ user, token }) =>
        {
            res.setHeader('Authorization', `Bearer ${token}`);
            return res.status(200).send(user);
        }, ({ code, ...e }) => res.status(code || 500).send(e));
    }

}