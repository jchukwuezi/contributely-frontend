import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button, CardDeck} from "react-bootstrap";
import OrgNavbar from "../../shared/navbar/OrgNavbar";
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import formatDate from "../../../data/formatdate";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Pie} from 'react-chartjs-2'
import {getRandomColorPie} from '../../../data/generate-color'



const OrgDashboard = () =>{
    const [state, setState] = useState({})
    const [balance, setBalance] = useState("")
    const [pending, setPending] = useState("")
    const [totalContributions, setTotalContributions] = useState("")
    const [totalInitiativeNo, setTotalInitiativeNo] = useState("")
    const [subCatKeys, setSubCatKeys] = useState([])
    const [subCatValues, setSubCatValues] = useState([])
    const [subscriberList, setSubscriberList] = useState([])
    const [recentCons, setRecentCons] = useState([])
    const [notifyList, setNotifyList] = useState([])
    const [initiativeCatKeys, setInitiativeCatKeys] = useState([])
    const [initiativeCatValues, setInitiativeCatValues] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getBalance()
        getTotalContributions()
        getTotalInitiativeNo()
        getPending()
        getRecentCons()
        getSubscriberList()
        getNotifyList()
        getInitiativeCategories()
        getSubsCats()
        return () => {
            setState({})
        }
    }, [])

    const formatAmount = (amount) =>{
        return '€' + amount;
    }

    const formatInterval = (interval) =>{
        return `${interval}ly`
    }

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

    const getRecentCons = () =>{
        fetch("http://localhost:4000/api/organisations/recent-contributions", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setRecentCons(data.contributions?.slice(0,3))
            }
            getData()
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

    const getNotifyList = () =>{
        fetch("http://localhost:4000/api/organisations/notification-list", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setNotifyList(data.notificationList)
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
        fetch("http://localhost:4000/api/subscriptions/org/all", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setSubscriberList(data.subs)
            }
            getData()
        })
    }

    const getInitiativeCategories = () =>{
        fetch("http://localhost:4000/api/organisations/initiative-categories", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            const getData = async() =>{
                const data = await res.json()
                setInitiativeCatKeys(data.categoryKeys)
                setInitiativeCatValues(data.categoryValues)
            }
            getData()
        })
    }

    const getSubsCats = () =>{
        fetch("http://localhost:4000/api/organisations/initiative-categories", {
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

    const columns = [        
        {
            dataField: "donor.name",
            text: "Contributor"
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

    const notifyListColumns = [
        {
            dataField: "name",
            text: "Name"
        },
        
        {
            dataField: "email",
            text: "Email"
        },
    ]

    const consColumns = [
        {
            dataField: "title",
            text: "Title"
        },

        {
            dataField: "history.amount",
            text: "Amount"
        },

        {
            dataField: "history.name",
            text: "Name"
        },
        
        {
            dataField: "history.date",
            formatter: date => formatDate(date),
            text: "Date created"
        }
    ]

 
    ChartJS.register(ArcElement, Tooltip, Legend)

    
    const initiativeCatData = {
        labels: initiativeCatKeys,
        datasets: [
            {
                label: 'Categories',
                data: initiativeCatValues,
                backgroundColor: getRandomColorPie(initiativeCatValues),
                borderWidth: 1
            }
        ]
    }

    const subCatData = {
        labels: subCatKeys,
        datasets: [
            {
                label: 'Categories',
                data: subCatValues,
                backgroundColor: getRandomColorPie(initiativeCatValues),
                borderWidth: 1
            }
        ]
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

                <Row className="justify-content-center mt-3">
                <h2 className="p-3 text-center">Recent Contributions</h2>
                <BootstrapTable
                    keyField="_id"
                    data={recentCons}
                    columns={consColumns}
                    striped
                    hover
                />
                    <Col sm={6}>
                        <div className="d-grid mt-2">
                            <Button variant="success btn-block" onClick={()=> navigate("/org/contributions")}> View More</Button>
                        </div>
                    </Col>
                </Row>


                <Row className="justify-content-center mt-3">
                <h2 className="p-3 text-center">Periodic Contributors</h2>
                <p className="p-3 text-center">Below are contributors that have set up a regular contribution to your organisation</p>
                <BootstrapTable
                    keyField="_id"
                    data={subscriberList}
                    columns={columns}
                    striped
                    hover
                />
                    <Col sm={6}>
                        <div className="d-grid mt-2">
                            <Button variant="success btn-block" onClick={()=> navigate("/org/subs")}> View More</Button>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-3">
                <h2 className="p-3 text-center">Notification List</h2>
                <p className="p-3 text-center">Below are donor's that are signed up to your organisation's notification list</p>
                <BootstrapTable
                    keyField="email"
                    data={notifyList}
                    columns={notifyListColumns}
                    striped
                    hover
                />
                </Row>


                <Row className="justify-content-center mt-3">
                <Col md="auto"> 
                {initiativeCatValues.length === 0 ? (
                    <div className="mb-4">
                        <h3 className="mt-5 p-3 text-center">No initiatives created by this Organisation to see this data</h3>
                    </div>
                ):(
                    <div className="mt-2">
                        <h2 className="p-3 text-center">Categories of the Initiatives You have created</h2>
                        <div style={{height:'500px',width:'500px'}}>
                            <Pie data={initiativeCatData} />
                        </div>
                    </div>
                )}
                </Col>

                <Col md="auto">
                {subCatValues.length === 0 ? (
                    <div>
                        <h3 className="mt-5 p-3 text-center">No subscriptions set up with this Organisation yet.</h3>
                    </div>
                ) : (    
                    <div>
                        <h2 className="p-3 text-center">Interests of your Subscribers</h2>
                        <p className="p-3 text-center">These are the interests of the periodic contributors of your group.</p>
                        <div style={{height:'500px',width:'500px'}}>
                            <Pie data={subCatData} />
                        </div>
                    </div>
                )}    
                </Col>

                </Row>
            </Container>
        </div>
    )
}

export default OrgDashboard;