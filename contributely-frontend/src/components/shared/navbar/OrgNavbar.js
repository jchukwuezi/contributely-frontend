import React from "react";
import { Nav, Navbar, Container} from "react-bootstrap";

const OrgNavbar = () => {
    return (
        <Navbar variant="success" bg="dark">
            <Container>
                <Navbar.Brand> Contributely for Organisations </Navbar.Brand>
                <Navbar.Toggle />
                <Nav>
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Groups</Nav.Link>
                    <Nav.Link>Account</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify content-end">
                    <Navbar.Text>
                        Signed in as <a href="#login"> Username </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}



export default OrgNavbar