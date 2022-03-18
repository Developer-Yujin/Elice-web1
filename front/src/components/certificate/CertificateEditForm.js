import { useState } from "react"
import {Form,Col,Button,Row} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import * as Api from '../../api'

function CertificateEditForm({setCertificates, currentCertificate,setIsEditing}){
    const [title, setTitle] = useState(currentCertificate.title)
    const [description, setDescription] = useState(currentCertificate.description)
    const [date, setDate] = useState(currentCertificate.date)

    async function submitHandler(e){
        e.preventDefault()
        e.stopPropagation()

        const user_id = currentCertificate.user_id

        await Api.put(`certificates/${currentCertificate.id}`,{
            user_id,
            title,
            description,
            date
        })

        const res = await Api.get("certificatelist", user_id)
        setCertificates(res.data)
        setIsEditing(false)
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicTitle" className="mt-3">
                
                <Form.Control 
                    type="text"
                    placeholder="자격증제목" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                
                <Form.Control 
                    type="text" 
                    placeholder="상세내역"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />

            </Form.Group>
            
            <Form.Group as={Col} xs="auto" xxl={3} controlId="formBasicDate" className="mt-3">
                <DatePicker 
                    selected={date}
                    placeholderText="취득날짜"
                    dateFormat = "yyyy.MM.dd(eee)"
                    onChange={(date) => setDate(date)}/> 
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
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
export default CertificateEditForm