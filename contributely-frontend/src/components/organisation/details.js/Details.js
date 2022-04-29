import {React, useEffect, useState} from "react"
import { Container, Row, Col, Button, Card, Badge, Stack, Form} from "react-bootstrap"
import { useNavigate} from "react-router-dom"
import OrgNavbar from "../../shared/navbar/OrgNavbar"
import formatDate from "../../../data/formatdate"
import ReactTagInput from "@pathofdev/react-tag-input"
import "@pathofdev/react-tag-input/build/index.css"

const Details = () =>{
    const [detail, setDetail] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`http://localhost:4000/api/organisations/details`, {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/org/login")
            }
            else{
                console.log(res)
                const getData = async() =>{
                    const data = await res.json()
                    setDetail(data.org)
                }
                getData()
            }
        })
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch("http://localhost:4000/api/organisations/update", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                description: description,
                tags: tags
            })
        })
        .catch((err) => {
            console.error(err)
        })
        .then(async res => {
            if(!res.ok){
                alert(await res.text())
            }
            else{
                alert('Successfully updated Organisation')
            }
        })
    }

    return(
        <div>
        <OrgNavbar />
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg={7}  className="p-5 m-auto shadow-sm rounded-lg">
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>Account Details</Card.Title>
                            <Card.Text>Organisation: {detail.name}</Card.Text>
                            <Card.Text>Description :{detail.description}</Card.Text>
                            <Card.Text>Date Joined: {formatDate(detail.createdAt)}</Card.Text>                
                            <Stack direction="horizontal" gap={2} className="justify-content-center">
                                {detail.tags && detail.tags.map((tag, k) => (
                                    <Badge bg="success">{tag}</Badge>
                                ))}
                            </Stack>
                        </Card.Body>
                    </Card>
                    <h2 className="mt-3">Update details</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-2">
                            <Form.Label>Organisation description </Form.Label>
                            <Form.Control type="text" placeholder={detail.description} onChange = {e => setDescription(e.target.value)}/>   
                        </Form.Group>         
                        
                        <Form.Group className="mt-2">
                            <Form.Label>Tags </Form.Label>
                            <ReactTagInput 
                            tags={tags}
                            onChange={(newTags) => setTags(newTags)}
                            removeOnBackspace={true}
                            placeholder="Update tags by removing or adding new ones"
                            />
                        </Form.Group>  

                        <div className="d-grid">
                        <Button variant="success" className="mb-3 mt-5" type="submit">
                            Update details
                        </Button>
                    </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default Details;