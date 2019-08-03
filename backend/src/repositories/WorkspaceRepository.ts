import { Service } from "typedi";

import { Workspace, WorkspaceModel } from "src/models/Workspace";

@Service()
export class WorkspaceRepository
{
    async create(workspace: Workspace)
    {
        return await new WorkspaceModel(workspace).save()
        .then(w =>
        {
            return WorkspaceModel.findById(w.id).populate('admin');
        })
        .catch(e => Promise.reject({ code: 500, e }));

    }

    async getById(id: string)
    {
        return await WorkspaceModel.findById(id).populate('admin');
    }

}