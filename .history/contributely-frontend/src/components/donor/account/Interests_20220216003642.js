import React, {useCallback, useEffect, useState} from "react";
import { InputGroup, FormControl, Button, Badge, Container, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input"
import "@pathofdev/react-tag-input/build/index.css"


const Interests = () => {
    
    const [tags, setTags] = useState([])
    const [addedTags, setTagsToAdd] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://localhost:4000/api/donors/get-interests", {
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
                const getData = async() => {
                    const data = await res.json()
                    setTags(data)
                }
                getData()
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //function to add interests to the users list of interests
    const updateTags = (e) =>{
        e.preventDefault()
        console.log([addedTags])
        fetch("http://localhost:4000/api/donors/add-interests", {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                tags: [addedTags]
            }),
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('Error with adding tags')
            }
            else{
                console.log(res)
                /*
                const getData = async() => {
                    const data = await res.json()
                    setTags(data)
                }
                getData()
                */
            }
        })
    }


    
    return(
        <Container>
        <h4 className="mt-4">View your interests</h4>
        <Row className="mb-4">
            {tags.map((tag, k) => (
                <Button className="mb-3" key={k} xs={12} md={4} lg={3} size="sm">
                    {tag}
                </Button>
            ))}
        </Row>
        
        <h4>Add more</h4>
        <p>Add interests in the form below, seperating them with commas</p>
        <Row>
            <InputGroup>
                <FormControl
                    placeholder="Entering tags, seperating with comments"
                    aria-describedby="basic-addon2"
                    onChange= {e => setTagsToAdd(e.target.value)}
                />

                <Button variant="primary" id="button-addon2" onClick={updateTags}>Add Interests</Button>
            </InputGroup>
        </Row>
        </Container>
    )
    
}

export default Interests;