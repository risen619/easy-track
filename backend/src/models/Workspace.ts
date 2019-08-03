import { Typegoose, prop, post } from "typegoose";

import { IWorkspace } from '@common/models/IWorkspace';
import { IUser } from '@common/models/IUser';

// @post<Workspace>("find", models =>
// {
//     models = models.map(m =>
//     {
//         m.populate()
//         return m;
//     });
// })
export class Workspace extends Typegoose implements IWorkspace
{
    @prop({ ref: { name: 'User' }, required: true }) admin: IUser;
    @prop({ required: true, unique: true, validate: /^[\w_-]+$/, minlength: 6, maxlength: 32, lowercase: true, trim: true }) link: string;
    @prop({ required: true, minlength: 6, maxlength: 64, trim: true }) name: string;
}



export const WorkspaceModel = new Workspace().getModelForClass(Workspace);