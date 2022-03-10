import React, {useState} from "react";
import {Container, Row, Col} from 'react-bootstrap'

export const StripeRedirect = () => {
    <Container>
    <Row className="mt-2">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
            <h1 className="mt-5 p-3 text-center">Succesful Sign Up</h1>
            <p className="mt-2 p-3 text-center rounded">You will now be redirected to Stripe to complete your onboarding </p> 
        </Col>
    </Row>
    </Container>
}


export default StripeRedirect;