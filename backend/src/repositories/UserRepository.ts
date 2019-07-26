import { Service } from "typedi";

import { UserModel } from "./../models/User";

@Service()
export class UserRepository
{
    async getAll()
    {
        return await UserModel.find();
    }
}