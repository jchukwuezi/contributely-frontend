import React, {useState, useEffect} from "react";
import { Button, Form, Modal} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CreateSubModal = (props) =>{
    const {show, onClose, nickname, priceId, productDesc} = props;

    const handleSubmit = () =>{

    }

    return(
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Sign Up to {nickname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{productDesc}</Modal.Body>
            <Form>
                <Form.Group className="mt-2">
                <Form.Label>Enter Card Details</Form.Label>
                <CardElement id="card-element" className="mt-3"/>
                </Form.Group>

                <div className="d-grid">
                    <Button className="mb-3 mt-5" type="submit">
                    Subscribe
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default CreateSubModal;