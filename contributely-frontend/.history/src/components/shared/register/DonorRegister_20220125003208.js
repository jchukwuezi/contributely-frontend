import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Col, Container, Row, Form, Button} from 'react-bootstrap';
export const DonorRegister = () =>{
    const navigate = useNavigate()

    //storing user inputs in state
    const [registerDonorName, setDonorName] = useState("")
    const [registerDonorEmail, setDonorEmail] =  useState("")
    const [registerDonorPassword, setDonorPassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch("http://localhost:4000/api/donors/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: registerDonorName,
                email: registerDonorEmail,
                password: registerDonorPassword
            })
        })
        .then(async res => {
            if(!res.ok){
                alert(await res.text())
            }
            else{
                alert('Registration successful')
                console.log(`New user ${registerDonorName} added`)
                navigate("/donor-login")
            }
        })
    }
      
        
    return(
        <Container>
            <h1 className="text-primary mt-5 p-3 text-center rounded">Donor Register</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mt-2">
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" placeholder="Enter donor name" name="name" onChange={e => setDonorName(e.target.value)}/>   
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Email address </Form.Label>
                            <Form.Control type="email" placeholder="Enter donor email" name="email" onChange= {e => setDonorEmail(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange = {e => setDonorPassword(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label>Re-enter Password </Form.Label>
                            <Form.Control type="password" placeholder="Re-enter password"/>   
                        </Form.Group>

                        <Button className="mt-5" variant="primary btn-block" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    ); 


}

export default DonorRegister;