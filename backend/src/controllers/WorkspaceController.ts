import { JsonController, Get, Res, Param, Post, Body, Put, Authorized } from "routing-controllers";
import { Response } from "express";
import { Inject } from "typedi";

import { WorkspaceRepository } from "src/repositories";

import { Workspace } from "src/models/Workspace";

@Authorized()
@JsonController('/workspaces')
export class WorkspaceController
{
    @Inject() private workspaceRepository: WorkspaceRepository;

    @Get()
    index(@Res() res: Response)
    {

    }

    @Get('/:id')
    get(@Res() res: Response, @Param('id') id: string)
    {
        return this.workspaceRepository.getById(id)
        .then(workspace =>
        {
            if(!workspace)
                return res.status(404).send({ error: 'Workspace with such ID is not registered' });
            else return res.status(200).send(workspace);
        }, ({ code, ...e }) => res.status(code || 500).send(e));
    }

    @Post()
    create(@Res() res: Response, @Body() body: Workspace)
    {
        return this.workspaceRepository.create(body)
        .then(workspace =>
        {
            if(!workspace)
                return res.status(400).send({ error: 'Something went wrong' });
            else return res.status(200).send(workspace);
        }, ({ code, ...e }) => res.status(code || 500).send(e));
    }

    @Put('/:id')
    update(@Res() res: Response, @Param('id') id: string, @Body() body: any)
    {

    }
}