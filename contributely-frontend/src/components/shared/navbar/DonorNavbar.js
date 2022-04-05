import {React, useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import { Nav, Navbar, Container} from "react-bootstrap";

const DonorNavbar = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    useEffect(() => {
        fetch("http://localhost:4000/api/donors/auth/donor", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/donor/login")
            }
            else{
                console.log(res)
                const getName = async() => {
                    const data = await res.json()
                    setUsername(data.name)
                }
                getName()
            }
        })
    })

    const logout = () => {
        fetch("http://localhost:4000/api/donors/logout", {
            credentials: 'include',
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                console.log("Error with logging out")
            }
            else{
                navigate("/")
            }
        })
    }
    return(
        <Navbar variant="dark" bg="primary">
            <Container>
                <Navbar.Brand> Contributely for Donors </Navbar.Brand>
                <Navbar.Toggle />
                <Nav>
                    <Nav.Link onClick={()=>navigate("/donor/homepage")}>Home</Nav.Link>
                    {/*}
                    <Nav.Link>Groups</Nav.Link>
                    */}
                    <Nav.Link onClick={()=> navigate("/donor/account")}>Account</Nav.Link>
                    <Nav.Link onClick={()=> navigate("")}>My Collection</Nav.Link>
                    <Nav.Link onClick={()=> navigate("/donor/dashboard")}>Dashboard</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as <a href="#login"> {username} </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default DonorNavbar;