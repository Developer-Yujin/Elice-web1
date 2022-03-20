const { Project } = require('../db')
const { v4: uuidv4 } = require('uuid')


// ProjectService
const ProjectService = {
    // POST
    addProject : async ({ user_id, title, description, from_date, to_date, created_at, updated_at }) => {
        const id = uuidv4()

        const newProject = { id, user_id, title, description, from_date, to_date, created_at, updated_at }
        const createNewProject = await Project.create({ newProject })
        return createNewProject
    },

    // GET
    getProject : async ({ projectId }) => {
        const project = await Project.findById({ projectId })

        if(!project){
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }
        return project
    },

    getProjectList : async ({ user_id }) => {
        const projects = await Project.findByUserId({ user_id })
        return projects
    },

    // PUT
    setProject : async ({ projectId, toUpdate }) => {
        let project = await Project.findById({ projectId })

        if(!project){
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        const fieldToUpdate = Object.keys(toUpdate)
        const newValue = Object.values(toUpdate)
        
        project = await Project.update({ projectId, fieldToUpdate, newValue })

        return project
    },
    // DELETE
    deleteProject : async ({ projectId }) => {
        const isDataDeleted = await Project.deleteById({ projectId })

        if(!isDataDeleted){
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        return { status : "ok" }
    }
}

// singleton
module.exports = { ProjectService }