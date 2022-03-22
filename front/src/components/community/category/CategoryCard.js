import {ListGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import Style from '../../../App.module.css'

function CategoryCard({setIsArticleOpen, setSelectedCategory, setIsEditing, category}){
    return (
        <ListGroup.Item className={Style.categoryItem} 
            value = {category}
            onDoubleClick={() => {
                setIsArticleOpen(true)
                setSelectedCategory(category)
            }}>
            {category}
            <FontAwesomeIcon onClick={() => setIsEditing(true)} className="ms-1" icon={faPencil} />
            
        </ListGroup.Item>
    )
}

export default CategoryCard