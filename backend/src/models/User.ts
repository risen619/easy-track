import { Typegoose, prop, arrayProp, instanceMethod, InstanceType } from 'typegoose';

import { IName, IUser } from '@common/models/IUser';

const sensitiveFields = ['password', 'sessions', '__v'];

export class User extends Typegoose implements IUser
{
    _id: string;

    @prop({ unique: true }) email: string;
    @prop() name: IName;
    @prop() password: string;
    @arrayProp({ items: String }) sessions: string[];

    @instanceMethod
    strip(this: InstanceType<User>)
    {
        const object = this.toObject();
        sensitiveFields.forEach(f => delete object[f]);

        return object;
    }
}

export const UserModel = new User().getModelForClass(User);