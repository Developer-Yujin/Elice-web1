import { useState } from "react"
import ArticleCard from "./ArticleCard"
import ArticleEditForm from "./ArticleEditForm"

function Article({category, article, setArticles, owner, isLogin, setIsDetail}) {
    const [isEditing, setIsEditing] = useState(false)

        //async function removeArticle(){
    //    try{
    //      await Api.delete('category이름/article/article아이디')
    //    } catch(err) {
    //      console.log(err)
    //    }
    //}

    function removeArticle(){
        setArticles(prev => prev.filter(v => v !== article))
    }

    return (
        <>
            {isEditing ? (
                <ArticleEditForm 
                    setArticles={setArticles}
                    currentArticle={article}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <ArticleCard
                    article={article}
                    setIsEditing={setIsEditing}
                    owner={owner}
                    removeArticle={removeArticle}
                    isLogin={isLogin}
                    setIsDetail={setIsDetail}
                    
                />
            )}
        </>
    )
}
export default Article
