import { useContext, useState } from 'react'
import {ListGroup} from 'react-bootstrap'
import Style from '../../../App.module.css'
import CategoryCard from './CategoryCard';
import CategoryEditForm from './CategoryEditForm';

function Category({categories, category, setIsArticleOpen, setSelectedCategory, setCategories}){

    const [isEditing, setIsEditing] = useState(false)

    return (
    <>
        <ListGroup variant="flush">
            {isEditing ? (
                <CategoryEditForm 
                    setCategories={setCategories}
                    setIsEditing={setIsEditing}
                    currentCategory={category}
                    categories={categories}/>
            ) : (
                <CategoryCard 
                    setIsArticleOpen={setIsArticleOpen}
                    setSelectedCategory={setSelectedCategory}
                    setIsEditing={setIsEditing}
                    category={category}
                    />
            )}

        </ListGroup>
        
    </>
    )
} 
export default Category
