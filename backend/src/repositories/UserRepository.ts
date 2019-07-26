import { Service } from "typedi";

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

}