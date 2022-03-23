import { useEffect, useReducer, useState } from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import Article from './Article'
import * as Api from "../../../api"
import ArticleAddForm from './ArticleAddForm'
import Style from '../../../App.module.css'
import ArticleDetail from './ArticleDetail'
import {articleReducer} from '../../../reducer'
import { useParams } from 'react-router'

//props에 owner와 category를 가져옴
//owner(객체)에는 로그인한 사용자의 정보,
//category(객체)에는 현재 카테고리 정보
function Articles({isLogin, category, owner}){

    //CRUD할 게시글 상태값
    const [articles, articleDispatch] = useReducer(articleReducer, [{
        id: 1,
        author: '쩡미',
        title: '요즘취업',
        description: '개힘듬'
    }])

    useEffect(() => {
        articleDispatch({
            type: 'SET',
            payload: articles
        })
    }, [articles])

    const articleId = useParams()
    console.log('params?', articleId)

    const [selectedArticle, setSelectedArticle] = useState(null)

    //useEffect(() => {
    //    setSelectedArticle(
    //        articles.find((article) => article.id == articleId)
    //    )
    //}, [articleId, articles])

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
                <ArticleDetail 
                    category={category}
                    setIsDetail={setIsDetail}
                    selectedArticle={selectedArticle}
                    isLogin={isLogin}
                    owner={owner}
                />
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
                            dispatch={articleDispatch}
                            articles={articles}
                            category={category}
                        />
                    )}

                    {articles.map((article) => (
                        <Article
                            article={article}
                            key={article.id}
                            dispatch={articleDispatch}
                            owner={owner}
                            category = {category}
                            isLogin={isLogin}
                            setIsDetail={setIsDetail}
                            setSelectedArticle={setSelectedArticle}
                        />
                    ))}
                </Card.Body>

            )}
        </Card>
    )
}
export default Articles
