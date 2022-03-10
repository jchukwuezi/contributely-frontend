import React, {useState} from "react";
import {Container, Row, Col} from 'react-bootstrap'

export const FailureOnboard = () => {
    <Container>
    <Row className="mt-2">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
            <h1 className="mt-5 p-3 text-center">Failed Onboard</h1>
            <p className="mt-2 p-3 text-center rounded">Unfortunately, you have been not been successfully authenticated. It is probabably because your redirect link has expired.</p> 
        </Col>
    </Row>
    </Container>
}

export default FailureOnboard;