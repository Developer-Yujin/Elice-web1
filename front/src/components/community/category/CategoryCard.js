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
                alert("카테고리를 클릭하면 해당 카테고리에 들어있는 article들을 보여줘야 함.")
                setSelectedCategory(category)
            }}>
            {category}
            <FontAwesomeIcon onClick={() => setIsEditing(true)} className="ms-1" icon={faPencil} />
            
        </ListGroup.Item>
    )
}

export default CategoryCard