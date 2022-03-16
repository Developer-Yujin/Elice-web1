const Project = require('../db/models/Project')
const { v4:uuidv4 } = require('uuid')

// ProjectService
class ProjectService{
    // POST
    async addProject({ user_id, title, description }){
        const id = uuidv4()
        const newProject = { id, user_id, title, description }
        const createNewProject = await Project.create({ newProject })
        return createNewProject
    }

    // GET
    async getProject({ projectId }){
        const project = await Project.findById({ projectId })

        if(!project){
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }
        return project
    }

    async getProjectList({ user_id }){
        const projects = await Project.findByUserId({ user_id })
        return projects
    }

    // PUT
    async setProject({ projectId, toUpdate }){
        let project = await Project.findById({ projectId })

        if(!project){
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        if(toUpdate.title){
            const fieldToUpdate = "title"
            const newValue = toUpdate.title
            project = await Project.update({ projectId, fieldToUpdate, newValue })
        }

        if(toUpdate.description){
            const fieldToUpdate = "description"
            const newValue = toUpdate.description
            project = await Project.update({ projectId, fieldToUpdate, newValue })
        }

        return project
    }
    // DELETE
    async deleteProject({ projectId }){
        const isDataDeleted = await Project.deleteById({ projectId })

        if(!isDataDeleted){
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        return { status : "ok" }
    }
}

// singleton
const projectService = new ProjectService()

module.exports = projectService