//this component will show the initiatives of the groups that match the donor's interests
import {React, useState, useEffect} from "react"
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { useNavigate, useParams, useLocation} from "react-router-dom"


const GroupInitiatives = () => {
    const navigate = useNavigate()
    const {groupId} = useParams();
    const [groupData, setGroupData] = useState([])
    const [state, setState] = useState({})
    //getting the group id in the parameter to make the call to the api on server side
    //const {groupId} = useLocation()
    //const location = useLocation()
    //const id = location.state.id


    useEffect(()=>{
        groupDataAPI()
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

    return(
        <Container>
            <h2>Initiatives created by this Organisation</h2>
            <Row>
                {groupData.map((groupData, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{groupData.title}</Card.Title>
                            <Card.Text>{groupData.description}</Card.Text>
                            <Card.Text>€{groupData.goalAmount} </Card.Text>
                            <Card.Text>{groupData.creationDate} </Card.Text>
                            <Button variant="primary">View Initiative</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    )
}

export default GroupInitiatives;
