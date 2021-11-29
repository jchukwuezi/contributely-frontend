import React, {useState} from 'react';
import {InputTags} from 'react-bootstrap-tagsinput'
import {Container, Col, Row, Button} from 'react-bootstrap'
import 'react-bootstrap-tagsinput/dist/index.css'

export const InputInterest = () =>{
    //setting the state of the component 
    //initializing it to an empty list
    const [state, setState] = useState([])

    //making a get request to get the name of the current user in the database
    
    return(
       <Container>
       <h1 className="mt-5 p-3 text-center rounded">What categories of initiatives are you interested in?</h1>
                <div className='input-group'>
                    <InputTags values={state} onTags={(value) => setState(value.values)} />
                    <button
                        className='btn btn-primary'
                        type='button'
                        data-testid='button-clearAll'
                        onClick={() => {
                        setState([])
                        }}
                    >
                        Delete All
                    </button>
                </div>
                <hr />
                <ol>
                    {state.map((item, index) => (
                        <li key={item + index}>{item}</li>
                    ))}
                </ol>
       </Container>
    );

}

export default InputInterest;