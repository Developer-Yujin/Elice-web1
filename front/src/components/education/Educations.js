import { Card, Row, Col, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import * as Api from '../../api'
import Education from './Education'
import EducationAddForm from './EducationAddForm'
import '../../App.css'


function Educations({ portfolioOwnerId, isEditable }) {
    const [educations, setEducations] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        Api.get("educationlist", portfolioOwnerId).then((res) => setEducations(res.data))
    }, [portfolioOwnerId])

    return (
        <Card
            style={{backgroundColor: '#FFF5F5'}}>
            <Card.Body>
                <Card.Title class="mvpType">학력</Card.Title>

                {educations && educations.map((education) => (
                    <Education
                        key={education.id}
                        education={education}
                        isEditable={isEditable}
                        setEducations={setEducations}
                    />
                ))}
                {isEditable && (
                    <Row className="text-center mt-3 mb-4">
                        <Col sm={{ span: 20 }}>

                        <button
                            onClick={() => setIsAdding(true)}
                            className="formAddButton">
                        </button>
                        
                        </Col>
                    </Row>
                )}
                {isAdding && (
                    <EducationAddForm
                        setIsAdding={setIsAdding}
                        portfolioOwnerId={portfolioOwnerId}
                        setEducations={setEducations} />
                )}

            </Card.Body>
        </Card>
    )
}

export default Educations