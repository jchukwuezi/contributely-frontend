import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewAllInitiatives = () => {
    const [initiativeData, setInitiativeData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:4000/api/initiatives/get", {
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
                    setInitiativeData(data)
                }
                getData()
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(initiativeData.length === 0){
        return (
            <Container>
                <Row className="mt-2">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className="mt-5 p-3 text-center">No Initiatives found</h1>
                        <p className="mt-2 p-3 text-center rounded">Please add some interests so that you can start taking donations</p> 
                        <Button variant="success btn-block" onClick={()=> navigate()}> Add Interests</Button>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Container>
            <h1 className="mt-5 p-3 text-center">Initiatives created by this Organisation</h1>
            <Row>
             {initiativeData.map((initiativeData, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{initiativeData.title}</Card.Title>
                            <Card.Text>{initiativeData.description}</Card.Text>
                            <Card.Text>{initiativeData.status} </Card.Text>
                            <Button>View Initiative</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
    </Container>
    )


}

export default ViewAllInitiatives;