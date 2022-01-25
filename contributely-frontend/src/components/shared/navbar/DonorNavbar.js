import React from "react";
import { Nav, Navbar, Container} from "react-bootstrap";

const DonorNavbar = () => {
    return(
        <Navbar variant="primary" bg="dark">
            <Container>
                <Navbar.Brand> Contributely for Donors </Navbar.Brand>
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
    );
}

export default DonorNavbar;