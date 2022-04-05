import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import DonorNavbar from "../../shared/navbar/DonorNavbar"

const DonorDashboard = () =>{
    const [state, setState] = useState({})
    const [totalAmountDonated, setTotalAmountDonated] = useState("")
    const [noOfDonations, setNoOfDonations] = useState("")
    const [subscriptions, setSubscriptions] = useState([])
    const [contributions, setContributions] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        getTotalAmountDonated()
        getNoOfDonations()
        return () => {
            setState({})
        }
    }, [])


    const getTotalAmountDonated = () =>{
        fetch("http://localhost:4000/api/donors/amount-contributed", {
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
                    setTotalAmountDonated(data.amount)
                }
                getData()
            }
        })
    }

    const getNoOfDonations = () =>{
        fetch("http://localhost:4000/api/donors/no-of-contributions", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setNoOfDonations(data.count)
            }
            getData()
        })
    }

    const getSubscriptions = () =>{

    }

    const getContributions = () => {

    }

    const getCategories = () =>{

    }

    return(
        <div>
        <DonorNavbar />
        <Container>
            <Row className="justify-content-center mt-3 g-2">
            <Card style={{width: '18rem'}} className="text-center mt-2 mb-3">
                <Card.Header>Total Amount Donated</Card.Header>
                <Card.Title>€{totalAmountDonated}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Amount you've contributed to different initiatives on Contributely</Card.Subtitle>
            </Card>

            <Card style={{width: '18rem'}} className="text-center mt-2 mb-3">
                <Card.Header>Number of Donations</Card.Header>
                <Card.Title>{noOfDonations}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Number of contributions you've made on Contributely</Card.Subtitle>
            </Card>
            </Row>
        </Container>

        </div>
    )

} 

export default DonorDashboard;