import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export const DonorHomepage = () => {
    const navigate = useNavigate()
    //getting user's name
    const [username, setUsername] = useState("");

    //sending get request to api to get current user stored in the sessions name
    useEffect(() => {
        fetch("http://localhost:4000/api/donors/auth/donor", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/donor/login")
            }
            else{
                console.log(res)
                const getName = async() => {
                    const data = await res.json()
                    setUsername(data.name)
                }
                getName()
            }
        })
    })

    return(
        <Container>
        <h1 className="text-primary mt-5 p-3 text-center rounded">Hello {username} Welcome to the Contributely app </h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                
                </Col>
            </Row>
        </Container>
    )



}


export default DonorHomepage;