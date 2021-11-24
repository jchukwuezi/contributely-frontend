import React, {useState} from 'react';
import axios from 'axios';
import {Col, Container, Row, Form, Button} from 'react-bootstrap';

export const DonorRegister = () =>{


    //storing user inputs in state
    const [registerDonorName, setDonorOrgName] = useState("")
    const [registerDonorEmail, setDonorOrgEmail] =  useState("")
    const [registerDonorPassword, setDonorOrgPassword] = useState("")

    const donorRegister = () => {
        //ceating axios instance
        axios({

        }).then();
    }


    return(
        <Container>
            <h1 className="text-primary mt-5 p-3 text-center rounded">Donor Register</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form>

                        <Form.Group className="mt-2">
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" placeholder="Enter donor name" name="name" onChange={e => setDonorOrgName(e.target.value)}/>   
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Email address </Form.Label>
                            <Form.Control type="email" placeholder="Enter donor email" name="email" onChange= {e => setDonorOrgEmail(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange = {e => setDonorOrgPassword(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label>Re-enter Password </Form.Label>
                            <Form.Control type="password" placeholder="Re-enter password"/>   
                        </Form.Group>

                        <Button className="mt-5" variant="primary btn-block" type="submit" onClick={donorRegister}>
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    ); 


}


export default DonorRegister;