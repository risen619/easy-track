import * as mongoose from 'mongoose';

function connect()
{
    return new Promise((resolve, reject) =>
    {
        const env = process.env;

        return mongoose.connect(env.DB_URL,
        {
            useNewUrlParser: true,
            dbName: env.DB_NAME
        }, err => err && reject(err))
        .then(resolve);
    });
}

function migrate()
{
    try {
        mongoose.model('Permission');
    }
    catch(e)
    {
        const { Permission, PermissionModel } = require('../src/models/Permission');
    }
    const Permission = mongoose.model('Permission');
    Permission.insertMany([
        {
            slug: 'workspace.read.project',
            name: 'Browse related projects',
            description: 'Browse related projects'
        },
        {
            slug: 'workspace.read.projects',
            name: 'Browse all projects',
            description: 'Browse all projects'
        },
        {
            slug: 'workspace.read.info',
            name: 'Browse workspace information',
            description: 'Browse workspace information'
        },
        {
            slug: 'workspace.create.projects',
            name: 'Create projects',
            description: 'Create projects'
        },
        {
            slug: 'workspace.edit.projects',
            name: 'Edit all projects',
            description: 'Edit all projects'
        },
        {
            slug: 'workspace.edit.info',
            name: 'Edit workspace information',
            description: 'Edit workspace information'
        }
    ]).then(docs => console.log(!docs ? 'Documents insertion failed' : 'Documents inserted'), e => console.log(e));
}

connect();
migrate();