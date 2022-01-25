import React, {useState} from 'react';
import axios from 'axios';
import {Col, Container, Row, Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const OrgLogin = () => {
    
    const navigate = useNavigate()
    const [loginOrgEmail, setLoginOrgEmail] =  useState("")
    const [loginOrgPassword, setLoginOrgPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:4000/api/organisations/login", {
            credentials: 'include',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: loginOrgEmail,
                password: loginOrgPassword
            })
        })
        .then((res) => {
            if(!res.ok){
                const errorCheck = async() => {
                    alert(await res.text())
                }
                errorCheck();
            }
            else{
                const successCheck = async() => {
                    alert(await res.text())
                }
                successCheck();
                navigate("/org/homepage")
            }
        })
    }

    return(
        <Container>
            <h1 className="text-success mt-5 p-3 text-center rounded">Organisation Login</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mt-2">
                            <Form.Label>Email address </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={e => setLoginOrgEmail(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange={e => setLoginOrgPassword(e.target.value)}/>   
                        </Form.Group>
                        
                        <Button className="mt-5" variant="success btn-block" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default OrgLogin;

