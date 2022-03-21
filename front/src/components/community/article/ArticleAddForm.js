import { useState } from "react"
import {Form,Col,Button,Row} from 'react-bootstrap'
import * as Api from '../../../api'
import Style from '../../../App.module.css'

function ArticleAddForm({owner, setIsAdding, setArticles, articles}){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    async function handleSubmit(e){
        e.preventDefault()

        //'/:category명/article/create'로 post 요청해서 게시글 등록하기
        //await Api.post("article/create", {
              //로그인한 사용자(owner)의 이름을 author로 설정
        //    author: owner.name,
        //    title,
        //    description
        //})

        //'/:category명/articlelist'로 get 요청해서 등록된 게시글도 불러오기
        //const res = await Api.get("articlelist")
        //setArticles(res.data)
        setArticles([{
            title, description, author: owner.name
        }, ...articles])
        console.log(articles)

        setIsAdding(false)
    }

    return (
        <Form onSubmit={handleSubmit}>
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

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <button
                        type="submit"
                        className={[Style.confirmButton, Style.communityAddButton].join(' ')}>
                        확인
                    </button>

                    <button
                        onClick={() => setIsAdding(false)}
                        className={Style.cancelButton}>
                        취소
                    </button>
                </Col>
            </Form.Group>
    </Form>
    )
}
export default ArticleAddForm