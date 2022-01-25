import React, {useState} from 'react';
import {Col, Container, Row, Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
//register component and functionality
export const OrgRegister = () => {
    const navigate = useNavigate()

    //storing user inputs in state
    const [registerOrgName, setRegisterOrgName] = useState("")
    const [registerOrgEmail, setRegisterOrgEmail] =  useState("")
    const [registerOrgPassword, setRegisterOrgPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/api/organisations/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: registerOrgName,
                email: registerOrgEmail,
                password: registerOrgPassword
            })
        })
        .then(async res => {
            if(!res.ok){
                alert(await res.text())
            }
            else{
                alert('Registration successful')
                console.log(`New user ${registerOrgName} added`)
                navigate("/org/login")
            }
        })
    }


    return(
        <Container>
            <h1 className="text-success mt-5 p-3 text-center rounded">Organisation Register</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mt-2">
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" placeholder="Enter organisation name" name="name" onChange={e => setRegisterOrgName(e.target.value)}/>   
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Email address </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange= {e => setRegisterOrgEmail(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange = {e => setRegisterOrgPassword(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label>Re-enter Password </Form.Label>
                            <Form.Control type="password" placeholder="Re-enter password"/>   
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

export default OrgRegister;
