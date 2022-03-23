import { useState } from "react"
import ArticleCard from "./ArticleCard"
import ArticleEditForm from "./ArticleEditForm"
import { Link } from 'react-router-dom'


function Article({category, article, dispatch, owner, isLogin, setIsDetail, setSelectedArticle}) {
    const [isEditing, setIsEditing] = useState(false)

        //async function removeArticle(){
    //    try{
    //      await Api.delete('category이름/article/article아이디')
    //    } catch(err) {
    //      console.log(err)
    //    }
    //}

    function removeArticle(){
        //setArticles(prev => prev.filter(v => v !== article))
        dispatch({
            type: 'DELETE',
            payload: article
        })
    }

    return (
        <>
            {isEditing ? (
                <ArticleEditForm 
                    dispatch={dispatch}
                    currentArticle={article}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <Link to = {`/${article.id}`}>
                    <ArticleCard
                        article={article}
                        setIsEditing={setIsEditing}
                        owner={owner}
                        removeArticle={removeArticle}
                        isLogin={isLogin}
                        setIsDetail={setIsDetail}
                        setSelectedArticle={setSelectedArticle}
                    />
                </Link>
            )}
        </>
    )
}
export default Article
