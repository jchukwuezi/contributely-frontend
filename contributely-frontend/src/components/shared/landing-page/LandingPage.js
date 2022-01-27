import React from "react";
import {Col, Container, Row, Button, Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
const registerPathOrg = "/register";
const registerPathDonor = "/donor/register"
const loginPathOrg = "/login"
const loginPathDonor = "/donor/login"

//first page that user sees when they log in
const LandingPage = () =>{

    const navigate = useNavigate();
    //handler for the different routes
    const toOrgRegister = () => {navigate(registerPathOrg)}
    const toOrgLogin = () => {navigate(loginPathOrg)}
    const toDonorRegister = () => {navigate(registerPathDonor)}
    const toDonorLogin = () => {navigate(loginPathDonor)}

    return(
        <Container>
        <h1 className="mt-5 p-3 text-center rounded">Welcome to Contributely</h1>
        <p className="mt-2 p-3 text-center rounded">Building and growing communities through personal donations</p> 
        <Row className="mt-5">
            <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                <Card style={{border : 'none'}}>
                    <Card.Body className="text-center">
                        <Card.Title> I am an organisation </Card.Title>
                        <Card.Text>I want to send/collect money from members of my organisation for various initiatives</Card.Text>
                    </Card.Body>
                    <Button variant="success btn-block" onClick={toOrgRegister}> Register</Button>
                    <Button className="mt-3" variant="outline-success" onClick={toOrgLogin}> Login</Button>
                </Card>
            </Col>

            <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                <Card style={{border : 'none'}}>
                    <Card.Body>
                        <Card.Title className="text-center"> I am a donor </Card.Title>
                        <Card.Text>I want to find/donate to my favourite causes around the web.</Card.Text>
                    </Card.Body>
                    <Button variant="primary" onClick={toDonorRegister}>Register</Button>
                    <Button className="mt-3"  variant="outline-primary" onClick={toDonorLogin}>Login</Button>
                </Card>
            </Col>
        </Row>
    </Container>
    );
}

export default LandingPage;