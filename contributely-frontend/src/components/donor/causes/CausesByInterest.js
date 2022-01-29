import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
const CausesByInterest = () => {
    const [causeData, setCauseData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:4000/api/donors/get-causes", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/donor/login")
            }
            else{
                console.log(res)
                const getData = async() => {
                    const data = await res.json()
                    setCauseData(data.slice(0,3))
                }
                getData()
            }
        }, [])
    })

    //function to render card 
    //writing it like this to render it easeier
    return(
        <Container>
            <Row>
            {causeData.map((causeData, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Img src={causeData.image}  />
                        <Card.Body>
                            <Card.Title>{causeData.title}</Card.Title>
                            <Card.Text>{causeData.summary}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    )

}

export default CausesByInterest;