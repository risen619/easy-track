import { Typegoose, prop, instanceMethod, InstanceType } from 'typegoose';

import { IUser } from '@common/models/IUser';

const sensitiveFields = ['password', '__v'];

class Name extends Typegoose
{
    @prop({ required: true }) first: string;
    @prop({ required: true }) last: string;
    @prop({ required: true, unique: true }) display: string;
}

export class User extends Typegoose implements IUser
{
    _id: string;

    @prop({
        required: true, unique: true,
        validate: { message: 'Provided email is invalid', validator: v => /^[\w\.\+_]+@\w+\.\w{2,}$/.test(v) }
    }) email: string;
    @prop({ required: true, _id: false }) name: Name;
    @prop({ required: true }) password: string;

    @instanceMethod
    strip(this: InstanceType<User>)
    {
        const object = this.toObject();
        sensitiveFields.forEach(f => delete object[f]);

        return object;
    }
}

export const UserModel = new User().getModelForClass(User);