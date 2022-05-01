import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import DonorNavbar from "../../shared/navbar/DonorNavbar"
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import formatDate from "../../../data/formatdate";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from "react-chartjs-2";
import generateRandomColor from "../../../data/generate-color";

const DonorDashboard = () =>{
    const [state, setState] = useState({})
    const [totalAmountDonated, setTotalAmountDonated] = useState("")
    const [noOfDonations, setNoOfDonations] = useState("")
    const [subscriptions, setSubscriptions] = useState([])
    const [subscriptionsNo, setSubscriptionsNo] = useState("")
    const [amountGifted, setAmountGifted] = useState("")
    const [contributions, setContributions] = useState([])
    const [categoryKeys, setCategoryKeys] = useState([])
    const [categoryValues, setCategoryValues] = useState([])
    const [subCatKeys, setSubCatKeys] = useState([])
    const [subCatValues, setSubCatValues] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        getTotalAmountDonated()
        getNoOfDonations()
        getSubscriptions()
        getSubscriptionsNo()
        getAmountGifted()
        getCategories()
        getSubCategories()
        getContributions()
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

    const getCategories = () =>{
        fetch("http://localhost:4000/api/donors/categories-donated", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setCategoryKeys(data.categoryKeys)
                setCategoryValues(data.categoryValues)
            }
            getData()
        })
    }

    const getAmountGifted = () =>{
        fetch("http://localhost:4000/api/donors/amount-gifted", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setAmountGifted(data.amount)
            }
            getData()
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
        },

        {
            dataField: "endDate",
            formatter: endDate => formatDate(endDate),
            text: "Date ended"
        }
    ]

    const transactionColumns = [
        {
            dataField: "amount",
            formatter: amount => formatAmount(amount),
            text: "Amount"
        },

        {
            dataField: "groupName",
            text: "Group Name"
        },

        {
            dataField: "date",
            formatter: startDate => formatDate(startDate),
            text: "Date"
        }
    ]
    
    const getContributions = () => {
        fetch("http://localhost:4000/api/donors/recent-transactions", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setContributions(data.transactions)
            }
            getData()
        })
    }

    const getSubCategories = () =>{
        fetch("http://localhost:4000/api/donors/subs-categories", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setSubCatKeys(data.categoryKeys)
                setSubCatValues(data.categoryValues)
            }
            getData()
        })
    }

    ChartJS.register(ArcElement, Tooltip, Legend)

    const chartData = {
        labels: categoryKeys,
        datasets: [
            {
                label: 'Categories',
                data: categoryValues,
                backgroundColor: generateRandomColor(categoryValues),
                borderWidth: 1
            }
        ]
    }

    const subData = {
        labels: subCatKeys,
        datasets: [
            {
                label: 'Categories',
                data: subCatValues,
                backgroundColor: generateRandomColor(subCatValues),
                borderWidth: 1
            }
        ]
    }

    return(
        <div>
        <DonorNavbar />
        <Container>
            <Row className="justify-content-center mt-3 g-2">
            <Card style={{width: '18rem'}} className="text-center mt-2 mb-3">
                <Card.Header>Total Amount Contributed</Card.Header>
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

            <Card style={{width: '18rem'}} className="text-center mt-2 mb-3">
                <Card.Header>Amount Gifted</Card.Header>
                <Card.Title>€{amountGifted}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Amount of contributions that you've made as a gift to someone else</Card.Subtitle>
            </Card>
            </Row>

            <Row className="justify-content-center mt-3">
            <h2 className="p-3 text-center">Recent Contributions</h2>
            <BootstrapTable
                keyField="amount"
                data={contributions}
                columns={transactionColumns}
                striped
                hover
                condensed
            />
            <Col sm={6}>
                <div className="d-grid mt-2">
                    <Button variant="primary btn-block" onClick={()=> navigate("")}> View Transactions</Button>
                </div>
            </Col>
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
            <Col sm={6}>
                <div className="d-grid mt-2">
                    <Button variant="primary btn-block" onClick={()=> navigate("/donor/subscriptions")}> View Subscriptions</Button>
                </div>
            </Col>
            </Row>

        
            <Row className="justify-content-center mt-5">
                <Col md="auto">
                    <h2 className="p-3 text-center">Contribution Categories</h2>
                    {categoryValues.length === 0 ? (
                        <div className="mb-4">
                            <h3 className="mt-5 p-3 text-center">No contributions made</h3>
                            <p className="mt-2 p-3 text-center rounded">Please make some contributions to the initatives by groups on contributely to view this data</p> 
                            <div className="d-grid">
                                <Button variant="primary btn-block" onClick={()=> navigate("/donor/homepage")}> Homepage</Button>
                            </div>
                        </div>
                    ):(
                        <div>
                            <p className="p-3 text-center">These are the categories that you have made contributions to</p>
                            <div style={{height:'500px',width:'500px'}}>
                                <Doughnut data={chartData}/>
                            </div>
                        </div>
                     )}
                </Col>

                <Col md="auto">
                    {subCatValues.length === 0 ? (
                        <div className="mb-4">
                            <h3 className="mt-5 p-3 text-center">No subscriptions set</h3>
                            <p className="mt-2 p-3 text-center rounded">Please make set up subscriptions with groups to view this data</p> 
                            <div className="d-grid">
                                <Button variant="primary btn-block" onClick={()=> navigate("/donor/homepage")}> Homepage</Button>
                            </div>
                        </div>
                    ):(
                        <div className="mt-2">
                            <h2 className="p-3 text-center">Subscription Categories</h2>
                            <p className="p-3 text-center">These are the categories of the groups that you've made contributions to</p>
                            <div className="justify-content-center" style={{height:'500px',width:'500px'}}>
                                <Doughnut data={subData}/>
                            </div>
                        </div>
                    )}
                </Col>

            </Row>

        </Container>

        </div>
    )

} 

export default DonorDashboard;