import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Collection = () =>{
    const [collectionData, setCollectionData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        collectionAPI()
        return () => {
            setState({})
        }
    }, [])


    const collectionAPI = () => {
        fetch("http://localhost:4000/api/onlinecauses/collection", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/org/login")
            }

            else{
                console.log(res)
                const getData = async() =>{
                    const data = await res.json()
                    setCollectionData(data)
                }
                getData()
            }
        })
    }

    const removeFromCollection = (id) =>{
        
    }

    if(collectionData.length === 0){
        <Container>
            <Row className="mt-2">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <h1 className="mt-5 p-3 text-center">No Causes found in your collection</h1>
                    <p className="mt-2 p-3 text-center rounded">Please add some initiatives from the homepage.</p> 
                    <div className="d-grid">
                        <Button variant="primary btn-block" onClick={()=> navigate("/donor/homepage")}> Go To Homepage</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    }    

}

export default Collection;