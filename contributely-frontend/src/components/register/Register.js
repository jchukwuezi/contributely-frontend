import React, {useState} from 'react';
import axios from 'axios';
import {Col, Container, Row, Form, Button} from 'react-bootstrap';

//register component and functionality
export const Register = () => {
    const[user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = e => {
        const {name, value} = e.target 
        setUser({
            //using spread operater to get values from user
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const{name, email, password} = user;
        if (name && email && password){
            axios.post("http://localhost:6969/Register", user)
            .then(res=>console.log(res))
        }
        else{
            alert("invalid input")
        }
    };

    return(
        <>
            <Container>
                <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Organisation Register</h1>
                <Row>
                    <Col lg={5} md={6} sm={12}>
                        <Form>
                        
                            <Form.Group>
                                <Form.Label>Name </Form.Label>
                                <Form.Control type="text" placeholder="Enter organisation name"/>   
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email address </Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>   
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label> Password </Form.Label>
                                <Form.Control type="password" placeholder="Enter password"/>   
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Re-enter Password </Form.Label>
                                <Form.Control type="password" placeholder="Enter password"/>   
                            </Form.Group>

                            <Button variant="success btn-block" type="submit">
                                Submit
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    );
}
