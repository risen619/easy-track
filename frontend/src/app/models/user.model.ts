import { IUser, IName } from "../../../../common/src/models/IUser";

export class User implements IUser {
    _id: string;
    email: string;
    name: IName;
    password: string;
}