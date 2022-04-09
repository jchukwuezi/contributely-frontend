import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import DonorNavbar from "../../shared/navbar/DonorNavbar"
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import formatDate from "../../../data/formatdate";


const DonorDashboard = () =>{
    const [state, setState] = useState({})
    const [totalAmountDonated, setTotalAmountDonated] = useState("")
    const [noOfDonations, setNoOfDonations] = useState("")
    const [subscriptions, setSubscriptions] = useState([])
    const [subscriptionsNo, setSubscriptionsNo] = useState("")
    const [contributions, setContributions] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        getTotalAmountDonated()
        getNoOfDonations()
        getSubscriptions()
        getSubscriptionsNo()
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
        fetch("http://localhost:4000/api/subscriptions/donor/all", {
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
                    setSubscriptions(data.subs)
                }
                getData()
            }
        })
    }

    const getSubscriptionsNo = () =>{
        fetch("http://localhost:4000/api/subscriptions/donor/all", {
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
                    setSubscriptionsNo(data.count)
                }
                getData()
            }
        })
    }

    const formatAmount = (amount) =>{
        return '€' + amount;
    }

    const formatInterval = (interval) =>{
        return `${interval}ly`
    }

    
    const columns = [
        {
            dataField: "_id",
            text: "Subscription ID"
        },
        

        {
            dataField: "amount",
            formatter: amount => formatAmount(amount),
            text: "Subscription Amount"
        },

        {
            dataField: "interval",
            formatter: interval => formatInterval(interval),
            text: "Subscription Interval"
        },

        {
            dataField: "startDate",
            formatter: startDate => formatDate(startDate),
            text: "Date created"
        }
    ]
    

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

            <Card style={{width: '18rem'}} className="text-center mt-2 mb-3">
                <Card.Header>Number of Subscriptions</Card.Header>
                <Card.Title>{subscriptionsNo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Number of subscriptions you have</Card.Subtitle>
            </Card>
            </Row>

            <Row className="justify-content-center mt-3">
            <h2 className="p-3 text-center">Subscriptions</h2>
            <BootstrapTable
                keyField="_id"
                data={subscriptions}
                columns={columns}
                striped
                hover
                condensed
            />
            </Row>

        </Container>

        </div>
    )

} 

export default DonorDashboard;