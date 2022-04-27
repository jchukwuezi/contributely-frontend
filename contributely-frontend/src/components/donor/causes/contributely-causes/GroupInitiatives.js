//this component will show the initiatives of the groups that match the donor's interests
import {React, useState, useEffect} from "react"
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { useNavigate, useParams, Link, useLocation} from "react-router-dom"
import formatDate from "../../../../data/formatdate"
import DonorNavbar from "../../../shared/navbar/DonorNavbar"
import {Elements} from '@stripe/react-stripe-js'
import CreateSubModal from "./CreateSubModal"
import stripePromise from "../../../../data/stripe"


const GroupInitiatives = () => {
    const navigate = useNavigate()
    const {groupId} = useParams();
    const [groupData, setGroupData] = useState([])
    const [subsData, setSubsData] = useState([])
    const [priceId, setPriceId] = useState("")
    const [nickname, setNickname] = useState("")
    const [productDesc, setProductDesc] = useState("")
    const [unitAmount, setUnitAmount] = useState("")
    const [interval, setInterval] = useState("")
    const [status, setStatus] = useState("")
    const [state, setState] = useState({})
    //getting the group id in the parameter to make the call to the api on server side
    //const {groupId} = useLocation()
    //const location = useLocation()
    //const id = location.state.id

    //handling the state of the modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    //handling the join mailing list button click


    useEffect(()=>{
        groupDataAPI()
        subscriptionAPI()
        getStatus(groupId)
        return ()=>{
            setState({})
        }
    }, [])

    const groupDataAPI = () =>{
        fetch(`http://localhost:4000/api/groups/${groupId}/initiatives`, {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
            }

            else{
                console.log(res)
                const getData = async() =>{
                    const data = await res.json()
                    setGroupData(data)
                }
                getData()
            }
        })
    }

    const subscriptionAPI = () =>{
        fetch("http://localhost:4000/api/subscriptions/donor/get", {
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

    const getStatus = (id) =>{
        fetch(`http://localhost:4000/api/groups/list-status/${id}`, {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            console.log(res)
            const getData = async() => {
                const data = await res.json()
                setStatus(data.memberStatus)
            }
            getData()
        })
    }

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
            }
        })
    }

    const joinNotificationList = (id) =>{
        fetch(`http://localhost:4000/api/groups/notify-list/join/${id}`,{
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
                alert('Joined Group notification List successfully')
            }
        })
    }

    if (groupData.length === 0){
        return(
            <Container>
                <Row className="mt-2">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className="mt-5 p-3 text-center">No Initiatives found for this organisation</h1>
                        <p className="mt-2 p-3 text-center rounded">This organisation has not yet set up any initiatives, come back another time to check if they have</p> 
                        <Button variant="success btn-block" onClick={()=> navigate("/donor/homepage")}> Return to Homepage</Button>
                    </Col>
                </Row>
            </Container>
        )
    }

    console.log("initative Data")
    console.log(groupData)

    return(
        <div>
        <DonorNavbar />
        <Container>
            <h2 className="mt-3 p-3 text-center">Initiatives created by this Organisation</h2>
            {status === false ? (
                <Button variant="success" className="mb-3" onClick={()=>{
                    joinNotificationList(groupId)
                    window.location.reload(false)
                }}>Join Notification List</Button>
            ):(
                <Button variant="danger" className="mb-3" onClick={()=>{
                    leaveNotificationList(groupId)
                    window.location.reload(false)
                }}>Leave Notification List</Button>
             )}
            <Row className="mt-2 justify-content-center">
                {groupData.map((groupData, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{groupData.title}</Card.Title>
                            <Card.Text>{groupData.description}</Card.Text>
                            <Card.Text>€{groupData.goalAmount} </Card.Text>
                            <Card.Text>{formatDate(groupData.creationDate)} </Card.Text>
                            <Link to={`/donor/${groupId}/initiatives/${groupData._id}`}>
                                <div className="d-grid">
                                    <Button variant="primary">View Initiative</Button>
                                </div>
                            </Link>
                            <Link to={`${groupData._id}/gift`}>
                                <div className="d-grid mt-2">
                                    <Button> Gift a Contribution for this Initiative</Button>
                                </div>    
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
            
            <h2 className="mt-3 p-3 text-center">Subscribe To a Plan to contribute to this organisation</h2>
            <Row className="mt-2 justify-content-center">
            {subsData.map((subsData, k)=> (
                <Col key={k} sm={4}>
                    <Card className="text-center mt-2 mb-3">
                        <Card.Body> 
                            <Card.Title>{subsData.nickname}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Recurring: {subsData.recurring.interval}ly</Card.Subtitle>
                            <Card.Title>€{subsData.unit_amount/100}</Card.Title>
                            <div className="d-grid gap-2">
                                <Button variant="primary" onClick={()=>{
                                    handleShow()
                                    setPriceId(subsData.id)
                                    setNickname(subsData.nickname)
                                    setUnitAmount(subsData.unit_amount)
                                    setInterval(subsData.recurring.interval)
                                    productDescAPI(subsData.product)
                                }}>Select</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
            <Elements stripe={stripePromise}>
                <CreateSubModal show={show} onClose={handleClose} priceId={priceId} nickname={nickname} productDesc={productDesc} groupId={groupId} unitAmount={unitAmount} interval={interval}/>
             </Elements>                   
        </Container>
        </div>
    )
}

export default GroupInitiatives;
