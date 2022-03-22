import { useState } from 'react'
import {ListGroup} from 'react-bootstrap'
import Style from '../../../App.module.css'
import * as Api from '../../../api'

function CategoryEditForm({categories,setCategories, setIsEditing, currentCategory}){
    const [name, setName] = useState(currentCategory)
    
    async function editCategory(){
        //await Api.put('category/카테고리 아이디?', {
        //    name
        //})

        setIsEditing(false)
        setCategories((prev) => prev.map(v => {
            if(v !== currentCategory) return [...v]
            else return name
        }) )
    }

    return (
        <ListGroup.Item className={Style.categoryItem}>
            <input type="text" value={name} placeholder={name} 
                onChange={(e) => setName(e.target.value)}/>
            <button onClick={() => editCategory()}>완료</button>            
        </ListGroup.Item>
    )
}
export default CategoryEditForm