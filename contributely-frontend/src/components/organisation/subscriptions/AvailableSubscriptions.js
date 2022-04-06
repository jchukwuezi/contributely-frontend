import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const AvailableSubscriptions = () =>{
    const [state, setState] = useState({})
    const [subsData, setSubsData] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        subscriptionAPI()
        return () => {
            setState({})
        }
    }, [])

    const subscriptionAPI = () =>{
        fetch("http://localhost:4000/api/subscriptions/org/get", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Error returning subscriptions')
            }

            else{
                console.log(res)
                const getData = async() =>{
                    const data = await res.json()
                    setSubsData(data)
                }
                getData()
            }
        })
    }


    if(subsData.length === 0){
        return(
        <Container>
            <Row className="mt-2">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <h1 className="mt-5 p-3 text-center">No Subscription Plans have been found</h1>
                    <p className="mt-2 p-3 text-center rounded">Come back at another time to see if some plans have been added by Contributely</p> 
                </Col>
            </Row>
        </Container>
        )
    }

    return(
        <Container>
            <Row className="justify-content-center">
            <h2 className="mt-3 p-3 text-center">Subscription plans available to contributors of this Organisation</h2>
            {subsData.map((subsData, k)=> (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Body> 
                            <Card.Title>{subsData.nickname}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Recurring: {subsData.recurring.interval}ly</Card.Subtitle>
                            <Card.Text>€{subsData.unit_amount/100}</Card.Text>
                            <div className="d-grid gap-2">
                                <Button variant="outline-success">View</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    )
}

export default AvailableSubscriptions;