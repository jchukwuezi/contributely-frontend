//this component will show the a specific initiative in a group
import {React, useEffect, useState} from "react"
import { Container, Row, Col, Button} from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import MakeDonation from "../MakeDonation"
import MakeDonationNoAuth from "./MakeDonationNoAuth"
import formatDate from "../../../../../data/formatdate";

const GroupCodeInitiativeDetail = () =>{
    const {groupCode, initiativeId} = useParams();
    const [state, setState] = useState("")
    const [initiativeDetail, setInitiativeDetail] = useState("")
    useEffect(()=>{
        initiativeAPI()
        return () => {
            setState("")
        }
    }, [])
    
    const initiativeAPI = () =>{
        fetch(`http://localhost:4000/api/groups/${groupCode}/initiatives/${initiativeId}-na`, {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Error fetching initaitive details')
            }
            else{
                console.log(res)
                const getData = async() =>{
                    const data = await res.json()
                    setInitiativeDetail(data)
                }
                getData()
            }
        })
    }

    return(
        <Container>
        <Row className="mt-2">
            <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg justify-content-center">
                <h1 className="mt-5 p-3 text-center">{initiativeDetail.title}</h1>
                <p className="mt-2 p-3 text-center rounded">{initiativeDetail.description}</p> 
                <p>Date Created: {formatDate(initiativeDetail.creationDate)}</p>
                <MakeDonationNoAuth groupCode={groupCode} initiativeId={initiativeId}/>
            </Col>
        </Row>
        </Container>
    )
}

export default GroupCodeInitiativeDetail;