import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import image from '../../../crowd2-20170310123710879.jpg' 

const CrowdfunderCauses = () =>{
    const [cfData, setCfData] = useState([])
    const [target, setTarget] = useState("")
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [interest, setInterest] = useState("")

    const navigate = useNavigate()

    //controlling the modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    useEffect(()=>{
        fetch("http://localhost:4000/api/crowdfunder/get", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=>{
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/donor/login")
            }
            else{
                console.log(res)
                const getData = async() => {
                    const data = await res.json()
                    setCfData(data.causeInfo.slice(0,3))
                    setInterest(data.category)
                }
                getData()
            }
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addToCollection = (title, url, interest, goal) =>{
        fetch("http://localhost:4000/api/onlinecauses/collection/add/cf",{
            credentials: 'include',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: title,
                url: url,
                category: interest,
                target: goal
            }),
        })
        .then((res)=> {
            if(!res.ok){
                alert(res.text())
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

    if (cfData.length === 0){
        return(
            <Container>
                <Row className="mt-2">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className="mt-5 p-3 text-center">No Crowdfunder Causes found that matched your interests</h1>
                        <p className="mt-2 p-3 text-center rounded">To find some suggested causes, add interests such as:
                        Sports, Education, Environment, Health & Medical, Community, Music, Film and Theatre, Animal, Creative & Arts, Technology, Politics.
                        </p> 
                        <div className="d-grid">
                            <Button variant="primary btn-block" onClick={()=> navigate("")}> Add Interests</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    return(
        <Container>
            <h2 className="mt-5 p-3 text-center">Crowdfunder Causes Based on your Interest: {interest}</h2>
            <Row className="justify-content-center">
            {cfData.map((cfData, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Img src={image}  />
                        <Card.Body>
                            <Card.Title>{cfData.title}</Card.Title>
                            <Card.Text>{cfData.description}<a href={cfData.url} target="_blank" rel="noreferrer noopener">....Read More</a></Card.Text>
                            <Card.Text>Goal Amount: {cfData.goalTarget}</Card.Text>
                            <div className="d-grid gap-2">
                                <Button onClick={()=>{
                                    setTarget(cfData.goalTarget)
                                    setUrl(cfData.url)
                                    setTitle(cfData.title)
                                    setDescription(cfData.description)
                                    setCategory(interest)
                                    handleShow()
                                }}>View</Button>
                                <Button onClick={()=>{
                                    addToCollection(cfData.title, cfData.url, interest, cfData.goalTarget)
                                }}>Add to Collection</Button>
                            </div>
                            <Card.Footer>
                                <small className="text-muted">Days Left: {cfData.daysLeft}</small>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    )




    
}

export default CrowdfunderCauses;