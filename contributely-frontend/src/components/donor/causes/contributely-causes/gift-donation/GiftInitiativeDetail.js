//this component will show the a specific initiative in a group
import {React, useEffect, useState} from "react"
import { Container, Row, Col, Button} from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import MakeGiftDonation from "./MakeGiftDonation"
import DonorNavbar from "../../../../shared/navbar/DonorNavbar"

const GiftInitiativeDetail = () =>{
    const {groupId, initiativeId} = useParams();
    const [state, setState] = useState("")
    const [initiativeDetail, setInitiativeDetail] = useState("")
    useEffect(()=>{
        initiativeAPI()
        return () => {
            setState("")
        }
    }, [])
    
    const initiativeAPI = () =>{
        fetch(`http://localhost:4000/api/groups/${groupId}/initiatives/${initiativeId}`, {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
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

    const dateFormatter = (date) =>{
        const dt = new Date(date)
        return dt.toLocaleDateString(
            'en-gb',
            {
                year: 'numeric',
                month: 'long',
                day:'numeric'
            }
        )
    }

    return(
        <div>
        <DonorNavbar />
        <Container>
            <Row className="mt-2">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <h1 className="mt-5 p-3 text-center">{initiativeDetail.title}</h1>
                    <p className="mt-2 p-3 text-center rounded">{initiativeDetail.description}</p> 
                    <p>Date Created: {dateFormatter(initiativeDetail.creationDate)}</p>
                    <MakeGiftDonation groupId={groupId} initiativeId={initiativeId}/>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default GiftInitiativeDetail;