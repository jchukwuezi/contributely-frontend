import React, {useState} from "react";
import {Container, Row, Col} from 'react-bootstrap'

export const SuccessOnBoard = () => {
    <Container>
    <Row className="mt-2">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
            <h1 className="mt-5 p-3 text-center">Succesful Onboarding</h1>
            <p className="mt-2 p-3 text-center rounded">You have succesfully been onboarded as an organisation on contributely. Donors will now be able to find your causes and can donate to them</p> 
        </Col>
    </Row>
    </Container>
}

export default SuccessOnBoard; 