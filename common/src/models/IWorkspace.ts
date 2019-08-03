import { IUser } from "./IUser";

export interface IWorkspace
{
    admin: IUser;
    link: string;
    name: string;
}