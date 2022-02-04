import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, InputGroup, FormControl, Row, Button, Col} from "react-bootstrap";
import OrgNavbar from "../../shared/navbar/OrgNavbar";

const AddInitiative = () => {
    
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [goalAmount, setGoalAmount] = useState("")
    const [tags, setTags] = useState([])

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch("http://localhost:4000/api/initiatives/add", {
            credentials: 'include',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: title,
                description: description,
                goalAmount: goalAmount,
                tags: [tags]
            })
        })
        .then(async (res) => {
            if(!res.ok){
                alert(await res.text())
            }

            else{
                alert('New Initiative successfully created')
                navigate("/org/homepage")
            }
        })
    }


    return (
        <div>
            <OrgNavbar />
            <h3 className="text-success mt-5 p-3 text-center rounded">Create Initiative</h3>
            <Container>
                <Row className="mt-5">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-2">
                            <Form.Label>Title </Form.Label>
                            <Form.Control type="text" placeholder="Title of the Initiative" name="name" onChange={e => setTitle(e.target.value)}/>   
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={e => setDescription(e.target.value)}/>
                        </Form.Group>
                    
                        <InputGroup className="mb-3">
                            <InputGroup.Text>€</InputGroup.Text>
                            <FormControl aria-label="Amount (to the nearest euro)" onChange={e => setGoalAmount(e.target.value)}/>
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>

                        <InputGroup>
                        <FormControl
                            placeholder="Enter tags that describe this initiative."
                            onChange= {e => setTags(e.target.value)}
                        />
                        </InputGroup>

                        <Button className="mt-5" variant="success btn-block" type="submit">
                            Add Initiative
                        </Button>

                    </Form>
                </Col>
                </Row>
            </Container>
        </div>
    )
}



export default AddInitiative;