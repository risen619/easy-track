import { Service, Inject } from "typedi";

import * as jwt from 'jsonwebtoken';

import { ISignUp } from "@common/models/ISignUp";
import { ISignIn } from "@common/models/ISignIn";

import { UserModel } from "src/models/User";

import { UserRepository } from "./UserRepository";

@Service()
export class AuthRepository
{
    @Inject() userRepository: UserRepository;

    async register(user: ISignUp)
    {
        if(await this.userRepository.getByEmail(user.email))
            return Promise.reject({ code: 400, error: 'User with such email already exists' });
        else
        {
            return UserModel.create(user);
        }
    }

    async login(data: ISignIn)
    {
        const user = await this.userRepository.getByEmail(data.email);

        if(!user) return Promise.reject({ code: 404, error: 'User with such email is not registered' });
        else
        {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            return user.save().then(user => ({ user: user, token }));
        }
    }
}