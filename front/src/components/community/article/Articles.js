import { useEffect, useState } from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import Article from './Article'
import * as Api from "../../../api"
import ArticleAddForm from './ArticleAddForm'
import Style from '../../../App.module.css'
import ArticleDetail from './ArticleDetail'

//props에 owner와 category를 가져옴
//owner(객체)에는 로그인한 사용자의 정보,
//category(객체)에는 현재 카테고리 정보
function Articles({isLogin, category, owner, articles, setArticles}){

    const [isAdding, setIsAdding] = useState(false)  

    //게시글 상세 페이지로 이동하는 상태값, true: 상세페이지, false: 게시글 목록
    const [isDetail, setIsDetail] = useState(false)
    
    useEffect(() => {
        console.log("currentCategory", category)
        //게시글 목록 불러오기
        //category.name
        //Api.get("category_name/article/list").then((res) => setArticles(res.data))
    })

    return(
        <Card className={'mt-3'}>
            <div style={{backgroundColor: '#D9DDFF', padding: '15px', textAlign: 'center'}}>
                <Card.Title style={{fontWeight: 'bolder'}}>{category}</Card.Title>
            </div>

            {isDetail ? (
                <ArticleDetail />
            ) : (
                <Card.Body>
                    {/*로그인했을 때만 글작성할 수 있음 */}
                    {isLogin && (
                        <Row className="text-center">
                        <Col>
                            <button
                                onClick={() => setIsAdding(true)}
                                className={[Style.formAddButton, Style.communityAddButton].join(' ')}>
                            </button>
                        </Col>
                        </Row> 
                    )}

                    {isAdding && (
                        <ArticleAddForm 
                            owner={owner}
                            setIsAdding={setIsAdding}
                            setArticles={setArticles}
                            articles={articles}
                            category={category}
                        />
                    )}

                    {articles.map((article) => (
                        <Article
                            article={article}
                            key={article.id}
                            setArticles={setArticles}
                            owner={owner}
                            category = {category}
                            isLogin={isLogin}
                            setIsDetail={setIsDetail}
                            
                        />
                    ))}
                </Card.Body>
            )}
            

        </Card>
    )
}
export default Articles
