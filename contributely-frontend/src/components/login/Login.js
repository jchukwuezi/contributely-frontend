import React, {useState} from 'react';
import axios from 'axios';
import {Col, Container, Row, Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    //login functionality

    /*
    const navigate = useNavigate();
    const [organisation, setOrg] = useState({
        email:"",
        password:""
    })

    const handleChange = e =>{
        const {name, value} = e.target
        setOrg({
            ...organisation,
            [name]:value
        })
    }
    */

    const [loginOrgEmail, setLoginOrgEmail] =  useState("")
    const [loginOrgPassword, setLoginOrgPassword] = useState("")

    const login = () =>{
        axios({
            method: "post",
            data: {
                username: loginOrgEmail,
                password: loginOrgPassword
            },
            withCredentials: true,
            url:"http://localhost:4000/api/organisations/login"
        }).then(res => {
            console.log('login response : ')
            console.log(res)
        }).catch(error => {
            console.log('login error: ')
            console.log(error)
        })
       //getUser();
    };

    //this function is to get authenticated user
    /*
    const getUser = () =>{
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/org"
        }).then((res) => console.log(res))
    }
    */

    return(
        <Container>
            <h1 className="text-success mt-5 p-3 text-center rounded">Organisation Login</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form>

                        <Form.Group className="mt-2">
                            <Form.Label>Email address </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={e => setLoginOrgEmail(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange={e => setLoginOrgPassword(e.target.value)}/>   
                        </Form.Group>
                        
                        <Button className="mt-5" variant="success btn-block" type="submit" onClick={login}>
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;

