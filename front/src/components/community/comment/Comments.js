import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../../api";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faThumbsUp } from "@fortawesome/free-solid-svg-icons"

function Comments({ isLogin, owner, category, article}) {
    //useState로 comments 상태를 생성함.
    const [comments, setComments] = useState([]);
    //useState로 isAdding 상태를 생성함.
    const [isAdding, setIsAdding] = useState(false);

    const [isFine, setIsFine] = useState(false)

    useEffect(() => {
        //Api.get("comment/list", owner.id).then((res) => setComments(res.data));
    }, [owner]);

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '30px'}}>
                <span style={{fontSize: '2.5rem', fontWeight: 'bolder'}}>{article.title}</span>
                <span style={{color: '#AD9191'}}>작성자: {article.author}</span>
            </div>

            <div style={{padding: '30px'}}>
                <div style={{fontSize: '1.4rem', marginBottom: '1rem'}}>{article.description}</div>
                <button onClick={() => setIsFine((prev) => !prev)}
                        style={{
                            color: isFine ? '#989CFD' : 'white',
                            borderRadius: '10px',
                            border: 'none',
                            fontSize: '1.2rem'
                        }}><FontAwesomeIcon icon={faThumbsUp} /></button>
            </div>
            <Card>
                <Card.Body>
                <Card.Title className="mb-3">댓글</Card.Title>
                <FontAwesomeIcon icon={faCommentDots} />

                {comments.map((comment) => (
                    <Comment
                        //key={comment.id}
                        commnet={comment}
                        setComments={setComments}
                        //setIsEditable={setIsEditable}
                        //ownerId={ownerId}
                    />
                ))}

                {/* 로그인했을 때 댓글 추가/수정을 할 수 있음 */}
{/* 
                {isLogin && (
                    <Row className="text-center">
                    <Col>
                        <Button onClick={() => setIsAdding(true)}>추가</Button>
                    </Col>
                    </Row> 
                )}

                {isLogin && (
                    <Row className="text-center">
                    <Col>
                        <Button>수정</Button>
                    </Col>
                    </Row> 
                )}



                
                {(//isEditable && 
                    <Row className="mt-3 text-center mb-4">
                    <Col sm={{ span: 20 }}>
                        <Button onClick={() => setIsAdding(true)}>+</Button>
                    </Col>
                    </Row>
                )}
                {isAdding && (
                    <CommentAddForm 
                        //portfolioOwnerId={ownerId}
                        setIsAdding={setIsAdding}
                        setComments={setComments}/>
                )} */}

                </Card.Body>
            </Card>
        </>
    )
}

export default Comments
