import * as mongoose from 'mongoose';

import { IEnv } from '../config/IEnv';

export class DB
{
    connect() : Promise<typeof mongoose>
    {
        return new Promise((resolve, reject) =>
        {
            const env = process.env as any as IEnv;
    
            return mongoose.connect(env.DB_URL,
            {
                useNewUrlParser: true,
                dbName: env.DB_NAME
            }, err => err && reject(err))
            .then(resolve);
        });
    }
}