import { Service } from "typedi";

import { UserModel, User } from "./../models/User";

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

    async updateById(id: string, body: User)
    {
        let user = await this.getById(id);

        if(!user)
            return Promise.reject({ code: 404, error: 'User with such ID is not registered' });
        else
        {
            for(let k in body)
                user[k] = body[k];
                
            return await user.save();
        }
    }

}