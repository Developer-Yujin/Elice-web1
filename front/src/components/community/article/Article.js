import { useState } from "react"
import ArticleCard from "./ArticleCard"
import ArticleEditForm from "./ArticleEditForm"

function Article({article, setArticles, owner}) {
    const [isEditing, setIsEditing] = useState(false)

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
                />
            )}
        </>
    )
}
export default Article