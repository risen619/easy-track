export interface IName
{
    first: string;
    last: string;
    display: string;
}

export interface IUser
{
    _id: string;
    email: string;
    name: IName;
    password: string;
}