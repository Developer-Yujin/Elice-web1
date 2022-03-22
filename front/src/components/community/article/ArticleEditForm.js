import { useState } from "react"
import {Form, Row, Col, Button} from 'react-bootstrap'
import * as Api from '../../../api'


function ArticleEditForm({ setArticles, currentArticle, setIsEditing}){
    const author = currentArticle.author
    const [title, setTitle] = useState(currentArticle.title)
    const [description, setDescription] = useState(currentArticle.description)

    async function submitHandler(e){
        e.preventDefault()

        // 게시글의 작성자
        //const author = currentArticle.author

        //await Api.put(`articles/${currentArticle.id}`, {
        //    author,
        //    title,
        //    description
        //})

        //게시글 수정 후에 다시 게시글리스트 get 요청함
        //const res = await Api.get("articlelist")
        //setArticles(res.data)

        setArticles((prev) => prev.map((v) => {
            if(v !== currentArticle) return {...v}
            else return {author, title, description }
        }))
        setIsEditing(false)
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicTitle">
                
                <Form.Control 
                    type="text"
                    placeholder="제목" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                
                <Form.Control 
                    type="text" 
                    placeholder="본문"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            
            <Form.Group as={Row} className="text-center mt-3">
                <Col sm={{ span: 20 }}>
                    <Button className="me-3" variant="primary" type="submit">
                        확인
                    </Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}> 
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )

}
export default ArticleEditForm
