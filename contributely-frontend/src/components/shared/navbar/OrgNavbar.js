import React, {useEffect, useState}from "react";
import { Nav, Navbar, Container, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrgNavbar = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    useEffect(() => {
        fetch("http://localhost:4000/api/organisations/auth/org", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/org/login")
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logout = () => {
        fetch("http://localhost:4000/api/organisations/logout", {
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


    return (
        <Navbar variant="dark" bg="success">
            <Container>
                <Navbar.Brand> Contributely for Organisations </Navbar.Brand>
                <Navbar.Toggle />
                <Nav>
                    <Nav.Link onClick={()=> navigate("/org/homepage")}>Home</Nav.Link>
                    {/*}
                    <Nav.Link>Groups</Nav.Link>
                    <Nav.Link>Account</Nav.Link>
                    */}
                    <Nav.Link onClick={()=>navigate("/org/details")}>Details</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/org/initiative/add")}>Add</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/org/dashboard")}>Dashboard</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as <a href="#login"> {username} </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}



export default OrgNavbar