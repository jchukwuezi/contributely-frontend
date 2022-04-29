import {React, useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const NotifiedBy = () =>{
    const [notifiedBy, setNotifiedBy] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:4000/api/donors/notifiedBy", {
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
                    setNotifiedBy(data.groupsNotifiedBy)
                }
                getData()
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const leaveNotificationList = (id) =>{
        fetch(`http://localhost:4000/api/groups/notify-list/leave/${id}`, {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then(async res => {
            if(!res.ok){
                alert(await res.text())
            }
            else{
                alert('Left Group notification List successfully')
                window.location.reload(false)
            }
        })
    }

    if (notifiedBy.length === 0){
        return(
            <Container>
                <Row className="mt-2">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className="mt-5 p-3 text-center">You aren't being notified by an organisations on Contributely</h1>
                        <p className="mt-2 p-3 text-center rounded">To recieve emailed updates about organisations' initiatives, join the notification list of an organisation.</p> 
                    </Col>
                </Row>
            </Container>
        )
    }

    return(
        <Container>
        <h2 className="mt-5 p-3 text-center">Groups that you are you are notified by</h2>
        <Row className="justify-content-center">
        {notifiedBy.map((notifiedBy, k) => (
            <Col key={k} xs={12} md={4} lg={3}>
                <Card>
                    <Card.Body>
                        <Card.Title>{notifiedBy.name}</Card.Title>
                        <Card.Text>{notifiedBy.description}</Card.Text>
                        <Link to={`/donor/${notifiedBy._id}/initiatives`}>
                            <div className="d-grid">
                                <Button>View Initiatives</Button>
                            </div>
                        </Link>
                        <div className="d-grid mt-2">
                            <Button onClick={()=>{
                                leaveNotificationList(notifiedBy._id)
                            }} variant="danger">Leave Notification List</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
        </Row>
        </Container>
    )


}

export default NotifiedBy