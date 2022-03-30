import {React, useState, useEffect} from "react"
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { useNavigate, useParams, Link} from "react-router-dom"
import formatDate from "../../../../../data/formatdate";

const GroupCodeInitiatives = () =>{
    const navigate = useNavigate()
    const {groupCode} = useParams();
    const [groupData, setGroupData] = useState([])
    const [state, setState] = useState({})

    useEffect(()=>{
        groupDataAPI()
        return ()=>{
            setState({})
        }
    }, [])

    const groupDataAPI = () =>{
        fetch(`http://localhost:4000/api/groups/${groupCode}/initiatives-na`, {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Error with finding initiatives for this group')
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
                        <p className="mt-2 p-3 text-center rounded">This organisation has not yet set up any initiatives, join Contributely today to find similar causes to donate to.</p> 
                        <Button variant="success btn-block" onClick={()=> navigate("/donor/register")}> Donor Register</Button>
                    </Col>
                </Row>
            </Container>
        )
    }

    console.log("initative Data")
    console.log(groupData)

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
                            <Card.Text>{formatDate(groupData.creationDate)} </Card.Text>
                            <Link to={`/contributely/${groupCode}/initiatives/${groupData._id}`}>
                                <Button variant="primary">View Initiative</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    )
}

export default GroupCodeInitiatives;