import { useEffect, useState } from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import Article from './Article'
// import * as Api from "../../../api"
import ArticleAddForm from './ArticleAddForm'

function Articles({isLogin, owner, isEditable, category_name}){

    const [articles, setArticles] = useState([])
    const [isAdding, setIsAdding] = useState(false)  

    useEffect(() => {
        //게시글 목록 불러오기
        //Api.get("articlelist").then((res) => setArticles(res.data))
    })

    return(
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                {articles.map((article) => (
                    <Article
                        article={article}
                        key={article.id}
                        setArticles={setArticles}
                        isEditable={isEditable}
                        owner={owner}
                    />
                )).filter(category_name === {category_name})}
                {/* filter함수로 category_name이 일치하는 글 목록들만 띄워주기*/}

                {/*로그인했을 때만 글작성할 수 있음 */}
                {isLogin && (
                    <Row className="text-center">
                    <Col>
                        <Button onClick={() => setIsAdding(true)}>+</Button>
                    </Col>
                    </Row> 
                )}
                {isAdding && (
                    <ArticleAddForm 
                        owner={owner}
                        setIsAdding={setIsAdding}
                        setArticles={setArticles}
                    />
                )}
            </Card.Body>
        </Card>
    )
}
export default Articles