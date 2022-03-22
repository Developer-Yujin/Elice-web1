import { useState, useEffect } from 'react'
import {Card, Row, Col} from 'react-bootstrap'
import Category from './Category'
import CategoryAddForm from './CategoryAddForm'
import * as Api from '../../../api'

import Style from '../../../App.module.css'

function Categories({isLogin, setIsArticleOpen, setCategories, categories, setSelectedCategory}){

    //원래는 이렇게 선언하는 것!
    //const [categories, setCategories] = useState([])

     // "category/list"로 GET 요청하고, response의 data로 categories를 세팅함.
    /*   useEffect(() => {
        Api.get("category/list").then((res) => setCategories(res.data));
    }, []); */

    const [isAdding, setIsAdding] = useState(false)

    return (
        <Card className="mt-4" style={{textAlign: 'center'}}>
            {console.log(categories)}
            <Card.Header className={Style.categoryHeader}>전체 게시판</Card.Header>
            {categories.map((category) => (
                <Category 
                    key={category.id}
                    category={category}
                    setIsArticleOpen={setIsArticleOpen}
                    setSelectedCategory={setSelectedCategory}
                    setCategories={setCategories}
                    categories={categories}
                />
            ))}

            {/*로그인됐을 때만 카테고리 추가 가능 */}
            {isLogin && (
                <Row className="mt-3 text-center mb-4">
                    <Col sm={{ span: 20 }}>

                        <button
                            onClick={() => setIsAdding(true)}
                            className={[Style.formAddButton, Style.communityAddButton].join(' ')}>
                        </button>
                        
                    </Col>
                </Row>
            )}

            {isAdding && (
                <CategoryAddForm 
                    setIsAdding={setIsAdding}
                    setCategories={setCategories}
                />
            )}
        </Card>
    )
}
export default Categories
