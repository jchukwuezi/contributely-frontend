import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const JustGivingCharities = () =>{
    const[charityUrl, setCharityUrl] = useState("")
    const [charityData, setCharityData] = useState([])
    const [charityId, setCharityId] = useState("")
    //const navigate = useNavigate()

    useEffect(() => {
        fetch("https://api.justgiving.com/9333ee4c/v1/charity/search", {
            credentials: 'omit',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('API call to just giving is not working')
            }
            else{
                console.log(res)
                const getData = async() => {
                    const data = await res.json()
                    setCharityData(data.charitySearchResults.slice(0,3))
                }
                getData()
            }
        })
    }, [])

 

    const findCharityUrl = async (id) =>{
        fetch(`https://api.justgiving.com/9333ee4c/v1/charity/${charityId}`, {
            credentials: 'omit',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('API call to just giving is not working')
            }
            else{
                console.log(res)
                const getData = async() => {
                    const data = await res.json()
                    setCharityUrl(data.profilePageUrl)
                }
                getData()
            }
        })
    }

    
    const openInNewTab = (link) =>{
        const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
        if(newWindow) newWindow.opener = null;
    }

    const findCharityUrlRedirect = (id) =>{
        console.log("id passed in " + id)
        setCharityId(id)
        fetch(`https://api.justgiving.com/9333ee4c/v1/charity/${id}`, {
            credentials: 'omit',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('API call to just giving is not working')
            }
            else{
                console.log(res)
                const getData = async() => {
                    const data = await res.json()
                    console.log("url for this cause" + data.profilePageUrl)
                    openInNewTab(data.profilePageUrl)
                }
                getData()
            }
        })
    }

    return(
        <Container>
        <h2 className="mt-5 p-3 text-center">Charities that you may be interested in</h2>
            <Row className="justify-content-center">
                {charityData.map((charityData, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card>
                            <Card.Img src={charityData.logoUrl}  />
                            <Card.Body>
                                <Card.Title>{charityData.charityDisplayName}</Card.Title>
                                <Card.Text>{charityData.description}</Card.Text>
                                <Card.Text>{charityData.registrationNumber}</Card.Text>
                                <div className="d-grid">
                                    <Button onClick={()=>{
                                        console.log("this is the id of this charity :" + charityData.charityId)
                                        findCharityUrlRedirect(charityData.charityId)
                                    }}>View Charity</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default JustGivingCharities;