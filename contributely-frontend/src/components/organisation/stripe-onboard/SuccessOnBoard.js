import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export const SuccessOnBoard = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        fetch("http://localhost:4000/api/organisations/auth/org", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/org/login")
            }
            else{
                console.log(res)
                const getData = async() => {
                    const data = await res.json()
                    console.log(data)
                }
                getData()
                activateStripe()
            }
        })

    })

    const activateStripe = () =>{
        fetch("http://localhost:4000/api/organisations/activate-stripe", {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
    }

    return(
        <Container>
        <Row className="mt-2">
            <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                <h1 className="mt-5 p-3 text-center">Succesful Onboarding</h1>
                <p className="mt-2 p-3 text-center rounded">You have succesfully been onboarded as an organisation on contributely. Donors will now be able to find your causes and can donate to them. Go to the homepage to start creating initives.</p> 
                <div className="d-grid">
                    <Button variant="success" onClick={()=> navigate("/org/homepage")}> Homepage </Button>
                </div>
            </Col>
        </Row>
        </Container>
    )
}

export default SuccessOnBoard; 