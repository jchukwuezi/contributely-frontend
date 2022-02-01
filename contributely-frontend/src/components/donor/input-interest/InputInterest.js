import React, {useState,useEffect} from 'react';
import {Container, Col, Row, Button, InputGroup, FormControl} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const InputInterest = (props) =>{
    const [tags, setTags] = useState(props.tags)

    //removing tags
    const removeTags = indexToRemove => {
        //setting the value of the tags
        setTags([...tags.filter((_, index) => index !== indexToRemove)])
    }

    const addTags = e =>{
        if(e.target.value !== ""){
            setTags([...tags, e.target.value])
            props.selectedTags([...tags, e.target.value])
            e.target.value = "";
        }
    }
    
    /*
    const TagInput = props => {
        const [tags, setTags] = useState(props.tags)

        //removing tags
        const removeTags = indexToRemove => {
            //setting the value of the tags
            setTags([...tags.filter((_, index) => index !== indexToRemove)])
        }

        const addTags = e =>{
            if(e.target.value !== ""){
                setTags([...tags, e.target.value])
                props.selectedTags([...tags, e.target.value])
                e.target.value = "";
            }
        }
    }
    */

    return(
        <Container>
            <div className="tags-input">
                <h1>Enter your interests</h1>
                <ul id='tags'>
                    {tags.map((tag, index) => (
                        <li key={index} className='tag'>
                            <span className='tag-title'>{tag}</span>
                            <span className='tag-close-icon'
                                onClick={()=>removeTags(index)}
                            >x</span>
                        </li>
                    ))}
                </ul>
                
                <InputGroup className='w-50' >
                        <FormControl
                            onKeyUp={e => e.key === "Enter" ? addTags(e) : null} 
                            placeholder='Press enter to add interests'
                        />
                        <Button variant="outline-primary">Add Interests</Button>
                </InputGroup>
            </div>
        </Container>
    );
}

//parent component of the tag creation component
const InterestInput = () =>{
    const navigate = useNavigate()
    const [tagData, setTagData] = useState([])

    const selectedTags = tags => {
        console.log(tags)
    }

    //calling UseEffect here to pass in the details of the tags already existing from a user
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
                    setTagData(data)
                    console.log(tagData)
                }
                getData()
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='InterestInput'>
            <InputInterest selectedTags={selectedTags}
            tags={tagData} />
        </div>
    )
}

export default InterestInput;