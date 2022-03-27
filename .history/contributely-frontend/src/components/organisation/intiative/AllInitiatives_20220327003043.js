import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const AllInitiatives = () => {
    const [intiativeData, setInitiativeData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    const formatDate = (date) =>{
        const dt = new Date(date)
        return dt.toLocaleDateString(
            'en-gb',
            {
                year: 'numeric',
                month: 'long',
                day:'numeric'
            }
        )
    }

    useEffect(()=>{
        APICallForInitiatives()
        return () => {
            setState({})
        }
    }, [])

    const APICallForInitiatives = () => {
        fetch("http://localhost:4000/api/initiatives/get", {
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
                    setInitiativeData(data)
                }
                getData()
            }
        })
    }

    if(intiativeData.length === 0){
        return(
        <Container>
            <Row className="mt-2">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <h1 className="mt-5 p-3 text-center">No Initiatives found</h1>
                    <p className="mt-2 p-3 text-center rounded">Please add some initiatives so that you can start taking donations</p> 
                    <div className="d-grid">
                        <Button variant="success btn-block" onClick={()=> navigate("/org/initiative/add")}> Add Initiatives</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }

    return(
        <Container>
        <h2 className="mt-3 p-3 text-center">Initiatives created by this Organisation</h2>
        <Row className="justify-content-center">
            {intiativeData.map((initiativeData, k) => (
            <Col key={k} xs={12} md={4} lg={3}>
                <Card>
                    <Card.Body>
                        <Card.Title>{initiativeData.title}</Card.Title>
                        <Card.Text>{initiativeData.description}</Card.Text>
                        {initiativeData.active === false ? (
                            <Badge bg="danger" className="mb-3">Status: Closed</Badge>
                        ):(
                            <Badge bg="success" className="mb-3">Status: Active</Badge>
                         )}
                         <Card.Text>Progress</Card.Text>
                        <ProgressBar animated now={initiativeData.amountToDateDonated/initiativeData.goalAmount*100} className="mb-3" variant="success"/>
                        <Link to={`/org/initiatives/${initiativeData._id}`}>
                            <Button variant="success">View Initiative</Button>
                        </Link>
                    </Card.Body>
                    <Card.Footer>Creation Date: {formatDate(initiativeData.creationDate)}</Card.Footer>
                </Card>
            </Col>
        ))}
       </Row>
    </Container>
    )

}

export default AllInitiatives;