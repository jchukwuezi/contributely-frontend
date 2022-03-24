import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button, Modal, Badge, Stack} from "react-bootstrap";

const GoFundMeModal = (props) =>{
   const {show, onClose, goalAmount, url, title, categories} = props;
    return(
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Goal Amount: {goalAmount}
                <Stack className="mt-2" direction="horizontal" gap="2">
                    <Badge>{categories}</Badge>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Open on the Web</Button>
                <Button variant="primary">Add To Collection</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GoFundMeModal;