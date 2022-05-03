import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar, Stack} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import formatDate from "../../../data/formatdate";
import OrgNavbar from "../../shared/navbar/OrgNavbar";

const Contributions = () =>{
    const [consData, setConsData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        consAPI()
        return () => {
            setState({})
        }
    }, [])

    const consAPI = () =>{
        fetch("http://localhost:4000/api/organisations/recent-contributions", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/donor/homepage")
            }

            else{
                console.log(res)
                const getData = async() =>{
                    const data = await res.json()
                    setConsData(data.contributions)
                }
                getData()
            }
        })
    }

    const consColumns = [
        {
            dataField: "title",
            text: "Initiative Title"
        },

        {
            dataField: "history.amount",
            formatter: amount => formatAmount(amount),
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

    const formatAmount = (amount) =>{
        return '€' + amount;
    }

    if(consData.length === 0){
        return(
            <div>
            <OrgNavbar />
                <Container>
                    <Row className="mt-2">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <h1 className="mt-5 p-3 text-center">No Contributions found</h1>
                            <div className="d-grid">
                                <Button variant="success btn-block" onClick={()=> navigate("/org/homepage")}> Go To Homepage</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }  

    return(
        <div>
        <OrgNavbar />
        <Container>
            <Row className="justify-content-center mt-3">
            <h2 className="p-3 text-center">Recent Contributions made to this group</h2>
            <BootstrapTable
                keyField="_id"
                data={consData}
                columns={consColumns}
                striped
                hover
            />
            </Row>
        </Container>
        </div>
    )

}


export default Contributions;