import { useEffect, useState } from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import Article from './Article'
import * as Api from "../../../api"
import ArticleAddForm from './ArticleAddForm'
import Style from '../../../App.module.css'

//props에 owner와 category를 가져옴
//owner에는 로그인한 사용자의 정보,
//category에는 현재 카테고리 정보
function Articles({isLogin}){

    
    const [isAdding, setIsAdding] = useState(false)  

    //dummy data로 UI 시연
    const [articles, setArticles] = useState([{
        title: '아근데 요즘 취업',
        description: '개힘듬'
    }])
    const owner = {
        id: 'c69beb5a-0ab1-4791-9eaf-1572d63650c3',
        name: '박정미',
        nickname: '쩡'
    }
    const category = {
        name: '취업추천 게시판'
    }

    useEffect(() => {
        //게시글 목록 불러오기
        //category.name
        //Api.get("category_id/article/list").then((res) => setArticles(res.data))
    })

    return(
        <Card className={'mt-3'}>
            <Card.Title>{category.name}</Card.Title>
            <Card.Body>
                {articles.map((article) => (
                    <Article
                        article={article}
                        key={article.id}
                        setArticles={setArticles}
                        
                        owner={owner}
                    />
                ))}

                {/*로그인했을 때만 글작성할 수 있음 */}
                {isLogin && (
                    <Row className="text-center">
                    <Col>
                        <button
                            onClick={() => setIsAdding(true)}
                            className={Style.formAddButton}>
                        </button>
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