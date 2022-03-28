import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import GoFundMeModal from "./modals/GoFundMeModal";
const GoFundMeCauses = () =>{
    const [gfData, setGfData] = useState([])
    const [amount, setAmount] = useState("")
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [categories, setCategories] = useState("")

    const navigate = useNavigate()
    //state and functions to manage the state of the modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    useEffect(()=>{
        fetch("http://localhost:4000/api/gofundme/get", {
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
                    setGfData(data.slice(0,3))
                }
                getData()
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (gfData.length === 0){
        return(
            <Container>
                <Row className="mt-2">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className="mt-5 p-3 text-center">No Causes found that matched your interests</h1>
                        <p className="mt-2 p-3 text-center rounded">To find some suggested causes, please add some interests</p> 
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
            <h2 className="mt-5 p-3 text-center">GoFundMe Causes Based on your Interests</h2>
            <Row className="justify-content-center">
            {gfData.map((gfData, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card>
                        <Card.Img src={gfData.image}  />
                        <Card.Body>
                            <Card.Title>{gfData.title}</Card.Title>
                            <Card.Text>{gfData.description}</Card.Text>
                            <Card.Text>Goal Amount: {gfData.goalAmount}</Card.Text>
                            <div className="d-grid gap-2">
                                <Button onClick={()=>{
                                    setAmount(gfData.goalAmount)
                                    setUrl(gfData.url)
                                    setTitle(gfData.title)
                                    setCategories(gfData.categories)
                                    handleShow()
                                }}>View</Button>
                                <Button>Add to Collection</Button>
                            </div>
                            <Card.Footer>
                                <small className="text-muted">Date Created: {gfData.dateCreated}</small>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
            <GoFundMeModal show={show} onClose={handleClose} goalAmount={amount} url={url} title={title} categories={categories}/>
        </Container>
    )
}

export default GoFundMeCauses;