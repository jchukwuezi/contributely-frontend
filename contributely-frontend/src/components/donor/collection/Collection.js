import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import DonorNavbar from "../../shared/navbar/DonorNavbar";

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

    const openInNewTab = (link) =>{
        const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
        if(newWindow) newWindow.opener = null;
    }


    const removeFromCollection = (id) =>{
        fetch(`http://localhost:4000/api/onlinecauses/collection/remove/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then(async (res)=> {
            if(!res.ok){
                alert(await res.text())
            }
            else{
                console.log(res)
                alert('Removed cause from collection')
                window.location.reload(false)
            }
        })
    }

    if(collectionData.length === 0){
        return(
        <div>
        <DonorNavbar />
        <Container>
            <Row className="mt-3">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <h1 className="mt-5 p-3 text-center">No Causes found in your collection</h1>
                    <p className="mt-2 p-3 text-center rounded">Please add some initiatives from the homepage.</p> 
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
                <h1 className="mt-5 p-3 text-center">Cause Collection</h1>
                {collectionData.map((collectionData, k) => (
                    <Row className="p-2 border rounded mt-2" key={k}>
                        <h1>{collectionData.title}</h1>
                        <p>URL: <a href={collectionData.url} target="_blank" rel="noreferrer noopener">{collectionData.url}</a></p>
                        {collectionData.categories ? 
                            <p>Categories: {collectionData.categories}</p>
                        : null}
                        {collectionData.goalAmount ? 
                            <h4>Goal Amount: €/£{collectionData.goalAmount}</h4>
                        : null}
                        <div className="d-grid gap-2">
                            <Button onClick={()=>{
                                openInNewTab(collectionData.url)
                            }}>View Online</Button>
                            <Button variant="danger" onClick={()=>{
                                removeFromCollection(collectionData._id)
                            }}>Delete Cause</Button>
                        </div>
                    </Row>
                    ))}
        
            </Col>
        </Container>
        </div>
    )

}

export default Collection;