import { Typegoose, prop } from 'typegoose';

import { IName, IUser } from '@common/models/IUser';

export class User extends Typegoose implements IUser
{
    _id: string;

    @prop({ unique: true }) email: string;
    @prop() name: IName;
}

export const UserModel = new User().getModelForClass(User);