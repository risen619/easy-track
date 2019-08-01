import { Service } from "typedi";

import * as jwt from 'jsonwebtoken';

import { ISignUp } from "@common/models/ISignUp";
import { ISignIn } from "@common/models/ISignIn";

import { UserModel } from "./../models/User";

@Service()
export class UserRepository
{
    async getAll()
    {
        return await UserModel.find();
    }

    async getById(id: string)
    {
        return await UserModel.findById(id);
    }

    async getByEmail(email: string)
    {
        return await UserModel.findOne({ email });
    }

    async register(user: ISignUp)
    {
        if(await this.getByEmail(user.email))
            return Promise.reject('User with such email already exists');
        else
        {
            return UserModel.create(user);
        }
    }

    async login(data: ISignIn)
    {
        const user = await this.getByEmail(data.email);

        if(!user) return Promise.reject('User with such email is not registered');
        else
        {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            user.sessions.push(token);
            return user.save().then(user => ({ user: user, token }));
        }
    }

}