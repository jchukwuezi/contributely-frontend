import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button, CardDeck} from "react-bootstrap";
import OrgNavbar from "../../shared/navbar/OrgNavbar";

const OrgDashboard = () =>{
    const [state, setState] = useState({})
    const [balance, setBalance] = useState("")
    const [pending, setPending] = useState("")
    const [totalContributions, setTotalContributions] = useState("")
    const [totalInitiativeNo, setTotalInitiativeNo] = useState("")
    const [initiativeData, setInitiativeData] = useState([])
    const [subscriberList, setSubscriberList] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getBalance()
        getTotalContributions()
        getTotalInitiativeNo()
        getPending()
        return () => {
            setState({})
        }
    }, [])

    const getBalance = () =>{
        fetch("http://localhost:4000/api/organisations/available-balance", {
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
                    setBalance(data.trueBalance)
                }
                getData()
            }
        })
    }

    const getPending = () =>{
        fetch("http://localhost:4000/api/organisations/pending-balance", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setPending(data.pendingBalance)
            }
            getData()
        })
    }

    const getTotalContributions = () =>{
        fetch("http://localhost:4000/api/organisations/contribution-total", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setTotalContributions(data.amount)
            }
            getData()
        })
    }
    

    const getTotalInitiativeNo = () =>{
        fetch("http://localhost:4000/api/organisations/initiative-count", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setTotalInitiativeNo(data.count)
            }
            getData()
        })
    }

    const getInitiativeData = () =>{

    }

    const getSubscriberList = () =>{

    }

    const getCategories = () =>{

    }



    return(
        <div>
            <OrgNavbar />
            <Container>
                <Row className="justify-content-center mt-3 g-2">
                    <Card style={{width: '18rem'}} className="text-center mt-2 mb-3">
                        <Card.Header>Available Balance</Card.Header>
                        <Card.Title>€{balance}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Funds that can be paid out into your bank account</Card.Subtitle>
                    </Card>

                    <Card style={{width: '18rem'}} className="text-center mt-2 mb-3">
                        <Card.Header>Pending Balance</Card.Header>
                        <Card.Title>€{pending}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Funds that are not yet available to pay out into your bank account</Card.Subtitle>
                    </Card>
                </Row>

                <Row className="justify-content-center mt-2 g-2">
                    <Card style={{width: '18rem'}} className="text-center mt-2 mb-3">
                        <Card.Header>Total Volume</Card.Header>
                        <Card.Title>€{totalContributions}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Total amount contributed to your organisation's initiatives</Card.Subtitle>
                    </Card>

                    <Card style={{width: '18rem'}} className="text-center mt-2 mb-3">
                        <Card.Header>Number of Initiatives</Card.Header>
                        <Card.Title>{totalInitiativeNo}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Total number of initiatives created </Card.Subtitle>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}

export default OrgDashboard;