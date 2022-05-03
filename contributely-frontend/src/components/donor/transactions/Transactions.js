import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar, Stack} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import formatDate from "../../../data/formatdate";
import DonorNavbar from "../../shared/navbar/DonorNavbar";

const Transactions = () =>{
    const [transData, setTransData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        transAPI()
        return () => {
            setState({})
        }
    }, [])

    const transAPI = () =>{
        fetch("http://localhost:4000/api/donors/recent-transactions", {
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
                    setTransData(data.transactions)
                }
                getData()
            }
        })
    }

    if(transData.length === 0){
        return(
            <div>
            <DonorNavbar />
                <Container>
                    <Row className="mt-2">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <h1 className="mt-5 p-3 text-center">No Transactions found</h1>
                            <p className="mt-2 p-3 text-center rounded">You can start donating to your favourite groups on Contributely today</p> 
                            <div className="d-grid">
                                <Button variant="primary btn-block" onClick={()=> navigate("/donor/homepage")}> Go To Homepage</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }  

    return(
        <div>
        <DonorNavbar />
        <Container>
            <Col md="auto">
            <h1 className="mt-5 p-3 text-center">Transactions</h1>
                {transData.map((transData, k) => (
                <Row className="p-2 border rounded mt-2" key={k}>
                    <h3>{transData.initiativeName}</h3>
                    <p>Description: {transData.groupName}</p>
                    <Stack direction="horizontal" gap={2} className="justify-content-center">
                    {transData.initiativeTags && transData.initiativeTags.map((tag, k) => (
                        <Badge>{tag}</Badge>
                    ))}
                     </Stack>
                    <h4>Amount: €{transData.amount}</h4>
                </Row>
                ))}
            </Col>
        </Container>
        </div>
    )

}


export default Transactions;