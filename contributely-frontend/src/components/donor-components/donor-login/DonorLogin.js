import React, {useState} from 'react';
import axios from 'axios';
import {Col, Container, Row, Form, Button} from 'react-bootstrap';

export const DonorLogin = () => {


    const [loginDonorEmail, setLoginDonorEmail] =  useState("")
    const [loginDonorPassword, setLoginDonorPassword] = useState("")

    const donorLogin = () =>{
        //creating axios instance
        axios({
            method: "post",
            data: {
                email: loginDonorEmail,
                password: loginDonorPassword
            },
            withCredentials: true,
            url:"http://localhost:4000/api/donors/login"
        }).then((res) => console.log(res))
        .catch(error => {
            console.log(error.response.request._response);
        });
    }

    return(
        <Container>
            <h1 className="text-primary mt-5 p-3 text-center rounded">Donor Login</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form>

                        <Form.Group className="mt-2">
                            <Form.Label>Email address </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={e => setLoginDonorEmail(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange={e => setLoginDonorPassword(e.target.value)}/>   
                        </Form.Group>
                        
                        <Button className="mt-5" variant="primary btn-block" type="submit" onClick={donorLogin}>
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default DonorLogin;