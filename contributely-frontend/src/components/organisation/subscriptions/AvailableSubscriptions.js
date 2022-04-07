import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import SubscriptionsModal from "./SubscriptionsModal";

const AvailableSubscriptions = () =>{
    const [state, setState] = useState({})
    const [subsData, setSubsData] = useState([])
    const [nickname, setNickname] = useState("")
    const [interval, setInterval] = useState("")
    const [unitAmount, setUnitAmount] = useState("")
    const [productId, setProductId] = useState("")
    const [productDesc, setProductDesc] = useState("")
    const navigate = useNavigate()


    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

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

    const productDescAPI = (id) =>{
        fetch(`http://localhost:4000/api/subscriptions/org/desc/${id}`, {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            console.log(res)
            const getData = async() => {
                const data = await res.json()
                setProductDesc(data.desc)
            }
            getData()
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
            <h2 className="mt-3 p-3 text-center">Subscription plans available to contributors of this Organisation</h2>
            <Row className="justify-content-center g-3">
            {subsData.map((subsData, k)=> (
                <Col key={k} sm={4}>
                    <Card className="text-center mt-2 mb-3">
                        <Card.Body> 
                            <Card.Title>{subsData.nickname}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Recurring: {subsData.recurring.interval}ly</Card.Subtitle>
                            <Card.Title>€{subsData.unit_amount/100}</Card.Title>
                            <div className="d-grid gap-2">
                                <Button variant="success" onClick={()=>{
                                    setNickname(subsData.nickname)
                                    setInterval(subsData.recurring.interval)
                                    setUnitAmount(subsData.unit_amount/100)
                                    setProductId(subsData.product)
                                    productDescAPI(subsData.product)
                                    handleShow()
                                }}>View</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
            <SubscriptionsModal show={show} onClose={handleClose} nickname={nickname} interval={interval} unitAmount={unitAmount} productId={productId} productDesc={productDesc} />
        </Container>
    )
}

export default AvailableSubscriptions;