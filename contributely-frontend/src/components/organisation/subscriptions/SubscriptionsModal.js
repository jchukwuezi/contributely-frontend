import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar, Modal} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";


const SubscriptionsModal = (props) =>{
    const {show, onClose, nickname, interval, unitAmount, productId, productDesc} = props

    return(
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{nickname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{interval}ly</Modal.Body>
            <Modal.Body>{productDesc}</Modal.Body>
        </Modal>
    )
}

export default SubscriptionsModal;