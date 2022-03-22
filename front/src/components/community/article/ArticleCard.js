import { Col, Row,Card,Button } from "react-bootstrap";
import Api from '../../../api'

function ArticleCard({removeArticle, article, setIsEditing, owner}){
    {/*상세내용*/}

    //isEditable은 작성자 = 로그인한 사용자일 때만 가능함
    const isEditable =  article.author === owner.name

    return(
        
        <Card.Text>
            {console.log(owner)}
            <Row className="align-items-center">
                <Col>
                    <span style={{fontWeight: 'bold', fontSize:'1.3rem'}}>{article.title}</span>
                    <br />
                    <span className="text-muted">{article.description}</span>
                    
                </Col>
                <Col xs={2}>
                    <span className="ms-2 text-muted">작성자: {article.author}</span>
                    <br />

                {isEditable && (
                    <>
                    <Button className= "me-2" onClick={() => setIsEditing(true)}>수정</Button>
                    <Button onClick={() => removeArticle()}>삭제</Button>
                    </>
                )}

                </Col>
            </Row>
        </Card.Text>
    )
}

export default ArticleCard
