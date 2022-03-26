import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from '../../api'

function Project({ project, setProjects, isEditable }) {

    const [isEditing, setIsEditing] = useState(false);

    const removeProject = async () => {
        try {
            await Api.delete(`project/${project.id}`)
            setProjects(prev => prev.filter(item => item.id !== project.id))
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <>
            {isEditing ? (
                <ProjectEditForm
                    currentProject={project}
                    setProjects={setProjects}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <ProjectCard
                    project={project}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                    removeProject={removeProject}
                />
            )}
        </>
    );
}

export default Project;
