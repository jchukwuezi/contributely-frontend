import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import GlobalGivingInterestModal from "./modals/GlobalGivingInterestModal";

const CausesByInterest = () => {
    const [causeData, setCauseData] = useState([])
    const [country, setCountry] = useState("")
    const [title, setTitle] = useState("")
    const [mission, setMission] = useState("")
    const [themes, setThemes] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    useEffect(() => {
        fetch("http://localhost:4000/api/donors/get-causes/interest", {
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
                    setCauseData(data.slice(0,3))
                }
                getData()
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addToCollection = (title, url, mission, themes) =>{
        fetch("",{
            credentials: 'include',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: title,
                url: url,
                mission: mission,
                themes: themes
            }),
        })
    }

    if (causeData.length === 0){
        return (
            <Container>
                <Row className="mt-2">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className="mt-5 p-3 text-center">No Causes found</h1>
                        <p className="mt-2 p-3 text-center rounded">To find some suggested causes, please add some interests</p> 
                        <div className="d-grid">
                            <Button variant="primary btn-block" onClick={()=> navigate("/donor/account")}> Add Interests</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
    
    return(
        <Container>
            <h2 className="mt-5 p-3 text-center">Global Giving Based on your Interests</h2>
            <Row className="justify-content-center">
            {causeData.map((causeData, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Img src={causeData.image}  />
                        <Card.Body>
                            <Card.Title>{causeData.title}</Card.Title>
                            <Card.Text>{causeData.summary}</Card.Text>
                            <div className="d-grid gap-2">
                                <Button onClick={()=>{
                                    setMission(causeData.mission)
                                    setTitle(causeData.title)
                                    setCountry(causeData.country)
                                    setUrl(causeData.url)
                                    setThemes(causeData.themes.toString())
                                    handleShow()
                                }}>View</Button>
                                <Button>Add to Collection</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
            <GlobalGivingInterestModal show={show} onClose={handleClose} mission={mission} title={title} country={country} themes={themes} url={url}/>
        </Container>
    )
}

export default CausesByInterest;