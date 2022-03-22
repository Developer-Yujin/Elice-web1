import React, {useState, useEffect} from 'react'
import EducationCard from './EducationCard'
import EducationEditForm from './EducationEditForm'
import * as Api from '../../api'


function Education({education, isEditable, setEducations}){
    const [isEditing, setIsEditing] = useState(false)

    const removeEducation = async () => {
        try{
            await Api.delete(`educations/${education.id}`)
            setEducations(prev => prev.filter(v => v.id !== education.id))
        } catch (err){
            console.log(err)
        }
    }
    
    return (
        <>
            {isEditing ? (
                <EducationEditForm 
                    setEducations = {setEducations}
                    currentEducation = {education}
                    setIsEditing={setIsEditing}
                    />
            ) : (
                <EducationCard 
                    setIsEditing={setIsEditing}
                    education={education}
                    isEditable={isEditable}
                    removeEducation={removeEducation}
                />
            )}
        </>
    )
}

export default Education