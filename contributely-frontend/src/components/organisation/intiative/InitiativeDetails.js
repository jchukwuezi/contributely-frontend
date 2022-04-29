import {React, useEffect, useState} from "react"
import { Container, Row, Col, Button, Card, Badge, Stack} from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import formatDate from "../../../data/formatdate"
import OrgNavbar from '../../shared/navbar/OrgNavbar'

const InitiativeDetails = () =>{
    const {initiativeId} = useParams();
    const [initativeDetail, setInitiativeDetail] = useState("");
    const [donatedSoFar, setDonatedSoFar] = useState("");
    const [state, setState] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        initiativeDetailAPI()
        return()=>{
            setState("")
        }
    }, [])

    const initiativeDetailAPI = () =>{
        fetch(`http://localhost:4000/api/initiatives/get/${initiativeId}`, {
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
                    setInitiativeDetail(data.initiativeData)
                    setDonatedSoFar(data.donatedSoFar)
                }
                getData()
            }
        })
    }

    //function to update and find current balance
    const endInitiative = () =>{
        fetch(`http://localhost:4000/api/initiatives/close/${initiativeId}`, {
            credentials: 'include',
            method: 'POST',
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
                    //const data = await res.json()
                    alert(await res.text())
                }
                getData()
            }
        })
    }

    return(
        <div>
        <OrgNavbar />
        <Container>
            <Row className="justify-content-center mt-5">
                <Col>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{initativeDetail.title}</Card.Title>
                            <Card.Text>{initativeDetail.description}</Card.Text>
                            <Card.Text>Goal Amount € {initativeDetail.goalAmount}</Card.Text>
                            <Card.Text>Date Created: {formatDate(initativeDetail.creationDate)}</Card.Text>
                            {initativeDetail.closingDate ? 
                                <Card.Text>Closing Date: {formatDate(initativeDetail.closingDate)}</Card.Text>
                            : null}
                            {initativeDetail.closingBalance ?  (
                                <Card.Text>Closing Balance: €{initativeDetail.closingBalance}</Card.Text>
                            ):( 
                                <Card.Text>Amount Donated so far €{donatedSoFar}</Card.Text>
                            )}
                            <Stack direction="horizontal" gap={2} className="justify-content-center">
                                {initativeDetail.tags && initativeDetail.tags.map((tag, k) => (
                                    <Badge bg="success">{tag}</Badge>
                                ))}
                            </Stack>
                            <div className="d-grid mt-4">
                            {initativeDetail.active === true ? (
                                <Button variant="danger" onClick={()=>{
                                    endInitiative()
                                    window.location.reload(false)
                                }}>End Initiative</Button>
                                ) : (
                                    <Button variant="danger" disabled>End Initiative</Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )

}



export default InitiativeDetails;