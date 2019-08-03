import { Typegoose, prop } from 'typegoose';

import { IPermission } from '@common/models/IPermission';

export class Permission extends Typegoose implements IPermission
{
    _id: string;

    @prop({ required: true, unique: true, validate: /^(\w+|\*)\.(\w+|\*)\.(\w+|\*)$/i }) slug: string;

    @prop({ required: true }) name: string;
    @prop({ required: true }) description: string;
    
}

export const PermissionModel = new Permission().getModelForClass(Permission);