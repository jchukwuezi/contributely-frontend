import React, {useState} from 'react';
import axios from 'axios';
import {Col, Container, Row, Form, Button} from 'react-bootstrap';

//register component and functionality
export const Register = () => {
    /*
    const[organisation, setOrg] = useState({
        name:"",
        email:"",
        password:""
    })
    */

    /*
    const handleChange = e => {
        const {name, value} = e.target 
        setOrg({
            //using spread operater to get values from user
            ...organisation,
            [name]: value
        })
    }
    */


    //storing user inputs in state
    const [registerOrgName, setRegisterOrgName] = useState("")
    const [registerOrgEmail, setRegisterOrgEmail] =  useState("")
    const [registerOrgPassword, setRegisterOrgPassword] = useState("")

    const register = () => {
        //running an axios instance
        axios({
            method: "post",
            data:{
                orgName: registerOrgName,
                orgEmail: registerOrgEmail,
                orgPassword: registerOrgPassword
            },
            withCredentials: true,
            url: "http://localhost:4000/register"
        }).then((res) => console.log(res));
    };

    return(
        <Container>
            <h1 className="text-success mt-5 p-3 text-center rounded">Organisation Register</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form>

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

                        <Button className="mt-5" variant="success btn-block" type="submit" onClick={register}>
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
