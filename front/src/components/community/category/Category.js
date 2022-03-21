import { useContext, useState } from 'react'
import {ListGroup} from 'react-bootstrap'
import { CategoryContext } from '../../../App'
import Style from '../../../App.module.css'

function Category({currentCategory, setIsArticleOpen}){

    const {categoryState, categoryDispatch} = useContext(CategoryContext)

    function editCategory(){

    }
    
    return (
    <>
        <ListGroup variant="flush">
            <ListGroup.Item className={Style.categoryItem} 
                value = {currentCategory}
                onClick={() => {
                    setIsArticleOpen(true)
                    alert("카테고리를 클릭하면 해당 카테고리에 들어있는 article들을 보여줘야 함.")

                    categoryDispatch({
                        type: "SET_CATEGORY",
                        payload: currentCategory
                    })
                    {/*클릭된 category정보 하나가 categoryState로 저장될까요..? */}
                    console.log('categoryState? ',categoryState)
                }}>
                {currentCategory}
                <button onClick = {() => editCategory()}>수정</button>
            </ListGroup.Item>
            
        </ListGroup>
        
    </>
    )
} 
export default Category