import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Comments from "../comment/Comments"

function ArticleDetail({setIsDetail, isLogin, category, owner, selectedArticle}){

    const navigate = useNavigate()
    return(
        <>
            <button onClick={() => {
                setIsDetail(false)
                navigate('/')
            }}>뒤로가기</button>
            
            <Comments 
                isLogin={isLogin}
                category={category}
                owner={owner}
                article={selectedArticle}/>
        </>
    )
}

export default ArticleDetail