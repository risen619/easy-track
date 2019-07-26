export interface IName
{
    first: string;
    last: string;
}

export interface IUser
{
    _id: string;
    email: string;
    name: IName;
}