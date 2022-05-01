import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar, Stack} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import formatDate from "../../../data/formatdate";
import DonorNavbar from "../../shared/navbar/DonorNavbar";

const Subscriptions = () =>{
    const [subsData, setSubsData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        subsAPI()
        return () => {
            setState({})
        }
    }, [])

    const subsAPI = () =>{
        fetch("http://localhost:4000/api/subscriptions/donor/all", {
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
                    setSubsData(data.subs)
                }
                getData()
            }
        })
    }

    const endSubscription = (id) =>{
        fetch(`http://localhost:4000/api/subscriptions/donor/end/${id}`, {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then(async (res)=> {
            if(!res.ok){
                alert(await res.text())
            }
            else{
                alert("Ended subscription")
            }
        })
    }

    if(subsData.length === 0){
        return(
            <div>
            <DonorNavbar />
                <Container>
                    <Row className="mt-2">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <h1 className="mt-5 p-3 text-center">No Subscriptions found</h1>
                            <p className="mt-2 p-3 text-center rounded">You can find the groups on contributely on your homepage to start making donations to your favourite causes</p> 
                            <div className="d-grid">
                                <Button variant="primary btn-block" onClick={()=> navigate("/donor/homepage")}> Go To Homepage</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }  

    return(
        <div>
        <DonorNavbar />
        <Container>
            <Col md="auto">
            <h1 className="mt-5 p-3 text-center">Subscriptions</h1>
                {subsData.map((subsData, k) => (
                <Row className="p-2 border rounded mt-2" key={k}>
                    <h1>{subsData.organisation.name}</h1>
                    <p>Description: {subsData.organisation.description}</p>
                    <Stack direction="horizontal" gap={2} className="justify-content-center">
                    {subsData.organisation.tags && subsData.organisation.tags.map((tag, k) => (
                        <Badge>{tag}</Badge>
                    ))}
                     </Stack>
                    <h4>Amount: €{subsData.amount}</h4>
                    <p>Interval: {subsData.interval}ly</p>
                    {subsData.endDate ? 
                        <p>Date Ended: {formatDate(subsData.endDate)}</p>
                    : null}
                    {subsData.active === false ? (
                        <Badge bg="danger" className="mb-3">Cancelled</Badge>
                    ):(
                        <Badge bg="success" className="mb-3">Active</Badge>
                     )}

                     {subsData.active === true ? (
                        <Button onClick={()=>{
                            endSubscription(subsData.stripeSubscriptionId)
                        }}>End Subscription</Button>
                        ) : (
                            <Button disabled>End Subscription</Button>
                        )}
                </Row>
                ))}
            </Col>
        </Container>
        </div>
    )

}


export default Subscriptions;