import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser, setBasic }) {
    const { name, email } = user

    const [nickname, setNickname] = useState(user.nickname)
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState(user.description);

    const [imageInfo, setImageInfo] = useState()
    const [isNone, setIsNone] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // "users/유저id" 엔드포인트로 PUT 요청함.
        try {
            const res = await Api.put(`user/${user.id}`, {
                nickname,
                description
            });

            // 유저 정보는 response의 data임.
            const updatedUser = res.data;
            // 해당 유저 정보로 user을 세팅함.
            setUser(updatedUser)

            //* 이미지 put 요청하기
            if (isNone) {
                Api.post(`user/${user.id}/img/delete`).then((res) => {
                    console.log("none 설정한 유저정보 : ", res.data.updatedUser)
                    setUser(res.data.updatedUser)
                })
            } else {
                let formData = new FormData()
                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                    }
                }
                formData.set("file", imageInfo)

                axios.post(
                    `http://localhost:5001/user/${user.id}/img`,
                    formData,
                    config
                ).then((res) => {
                    console.log("이미지 업로드한 유저정보 : ", res.data.updatedUser)
                    setUser(res.data.updatedUser)
                })







            }
            // isEditing을 false로 세팅함.
            setIsEditing(false)
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <Card className="mb-2" style={{ backgroundColor: '#FCFAFA' }}>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="userEditName">
                        <Form.Control
                            disabled
                            type="text"
                            placeholder="이름"
                            value={name}
                            style={{ border: 'solid 2px #e5d6ff' }}
                        />
                    </Form.Group>

                    <Form.Group controlId="userEditEmail">
                        <Form.Control
                            disabled
                            type="email"
                            placeholder="이메일"
                            value={email}
                            style={{ border: 'solid 2px #e5d6ff' }}
                        />
                    </Form.Group>

                    <Form.Group controlId="userEditNickname">
                        <Form.Control
                            type="text"
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            style={{ border: 'solid 2px #e5d6ff' }}
                        />
                    </Form.Group>

                    <Form.Group controlId="userEditDescription">
                        <Form.Control
                            type="text"
                            placeholder="설명"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ border: 'solid 2px #e5d6ff' }}
                        />
                    </Form.Group>

                    <Row>
                        <Col>
                            <input
                                style={{ marginTop: 5 }}
                                type="file"
                                name="attachment"
                                accept='image/*'

                                onChange={(e) => {
                                    setImageInfo(e.target.files[0])
                                }}></input>
                        </Col>
                        <Col>
                            <Button
                                className="mt-2"
                                style={{ backgroundColor: "#e5d6ff", border: "solid 2px" }}
                                onClick={() => setIsNone(true)}
                            >기본이미지</Button>
                        </Col>
                    </Row>

                    <Form.Group as={Row} className="mt-3 text-center">
                        <Col sm={{ span: 20 }}>
                            <Button variant="primary" type="submit" className="me-3" style={{ backgroundColor: "#e5d6ff", border: "solid 2px" }}>
                                확인
                            </Button>
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                취소
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default UserEditForm;
