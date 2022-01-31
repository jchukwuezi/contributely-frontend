import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
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
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //function to render card 
    //writing it like this to render it easeier
    /*
    if (causeData.length === 0){
        return (
            <Container>
                <Row>
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className="mt-5 p-3 text-center">No Causes found</h1>
                        <p className="mt-2 p-3 text-center rounded">To find some suggested causes, please add some interests</p> 
                        <Button variant="primary btn-block"> Add Interests</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
    */

    return(
        <Container>
            <h1 className="mt-5 p-3 text-center">Causes Based on your Interests</h1>
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