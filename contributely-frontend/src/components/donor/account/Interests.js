import React, {useEffect, useState, useRef} from "react";
import {Button, Container, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input"
import "@pathofdev/react-tag-input/build/index.css"
import interests from "../../../data/interests";
import 'react-bootstrap-typeahead/css/Typeahead.css'
import {Typeahead} from 'react-bootstrap-typeahead'


const Interests = () => {
    const ref = useRef();
    const [tags, setTags] = useState([])
    const [addedTags, setAddedTags] = useState([])
    const [localTags, setLocalTags] = useState([])
    const [selected, setSelected] = useState([])
    
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


    const updateTags = (e) => {
        fetch("http://localhost:4000/api/donors/add-interests", {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                //tags: localTags
                tags: selected
            }),
            mode: 'cors'
        })
    }

    return(
        <Container>
        <h4 className="mt-4">Your Interests</h4>
        <Row className="mb-4">
            <ReactTagInput 
                tags={tags}
                onChange={(newTags) => setTags(newTags)}
                removeOnBackspace={false}
                readOnly={true}
                placeholder=""
            />
        </Row>
        
        <h4>Add Interests</h4>
        <p>Add interests in the form below, seperating them with commas</p>
        <Row>
            <Typeahead
                id="interests"
                multiple
                options={interests}
                placeholder="Add interests..."
                ref={ref}
                selected={selected}
                onChange={setSelected} 
            />
            <Button className="mt-2"
                onClick={()=>{
                    console.log(selected)
                    updateTags(selected)
                    window.location.reload(false)
                }}
            >
            Add Interests</Button>
        </Row>
        </Container>
    )
    
}

export default Interests;