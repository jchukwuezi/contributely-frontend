import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const CausesByCountry = () =>{
    const [causeData, setCauseData] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:4000/api/donors/get-causes/country", {
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


    return(
        <Container>
            <h2 className="mt-5 p-3 text-center">Global Giving Causes in Your Country</h2>
            <Row className="justify-content-center">
            {causeData.map((causeData, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Img src={causeData.image}  />
                        <Card.Body>
                            <Card.Title>{causeData.title}</Card.Title>
                            <Card.Text>{causeData.summary}</Card.Text>
                            <div className="d-grid gap-2">
                                <Button>View</Button>
                                <Button>Add to Collection</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    )

}

export default CausesByCountry;