import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export const SuccessOnBoard = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const {sessOrg} = fetch("http://localhost:4000/api/organisations/auth/org", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })

        if (!sessOrg){
            alert('Unauthorized, please log in to view this page')
            navigate("/org/login")
        }

        fetch("http://localhost:4000/api/organisations/activate-stripe", {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
    })

    return(
        <Container>
        <Row className="mt-2">
            <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                <h1 className="mt-5 p-3 text-center">Succesful Onboarding</h1>
                <p className="mt-2 p-3 text-center rounded">You have succesfully been onboarded as an organisation on contributely. Donors will now be able to find your causes and can donate to them. Log in to start creating initiatives.</p> 
                <Button onClick={()=> navigate("/org/login")}> Go to Hompage</Button>
            </Col>
        </Row>
        </Container>
    )
}

export default SuccessOnBoard; 