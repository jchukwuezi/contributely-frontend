//this component will show the groups that match the donor's interests
import {React, useState, useEffect} from "react"
import { Container, Row, Col, Button, Card  } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"

const Groups = () => {
    const [groups, setGroups] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        groupAPI()
        return ()=>{
            setState({})
        }
    }, [])

    const groupAPI = () =>{
        fetch("http://localhost:4000/api/groups/groups", {
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
                    setGroups(data)
                }
                getData()
            }
        })
    }

    const handleGroupClick = (groupId) => {
        navigate({
            pathname: `/donor/:${groupId}/initiatives`,
            state:{
                groupId
            }
        })
    }

    if (groups.length === 0){
        return(
            <Container>
                <Row className="mt-2">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className="mt-5 p-3 text-center">No Organisations found</h1>
                        <p className="mt-2 p-3 text-center rounded">There are no organisations currently on Contributely that match your interests, to start your own register as an organisation today</p> 
                        <Button variant="success btn-block" onClick={()=> navigate("/donor/account")}> Add more interests</Button>
                        <Button variant="success btn-block" onClick={()=> navigate("/donor/homepage")}> Return to Homepage</Button>
                    </Col>
                </Row>
            </Container>
        )
    }

    return(
        <Container>
            <h2>Organisations on Contributely that match your interests</h2>
            <Row>
                {groups.map((groups, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{groups.name}</Card.Title>
                            <Card.Text>{groups.description}</Card.Text>
                            <Link to={`/donor/${groups._id}/initiatives`}>
                                <Button variant="primary">View Group</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
              ))}
            </Row>
        </Container>
    )
    
}

export default Groups
