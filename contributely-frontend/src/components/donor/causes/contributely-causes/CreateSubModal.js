import React, {useState, useEffect} from "react";
import { Button, Form, Modal, Row, Col} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CreateSubModal = (props) =>{
    const {show, onClose, nickname, priceId, productDesc, groupId, unitAmount, interval} = props;
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!stripe || !elements){
            return
        }
        try{

            //capturing subscription from card element
            const result =  await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })

            /*
            const {client_secret, subStatus} = await fetch(`http://localhost:4000/api/subscriptions/donor/subscribe/${groupId}`,{
                credentials: 'include',
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    priceId: priceId,
                    payment_method: result.paymentMethod.id,
                    unit_amount: unitAmount,
                    nickname: nickname,
                    interval: interval
                })
            })

            if (subStatus === 'requires_action'){
                await stripe.confirmCardPayment(client_secret)
                .catch((err)=>{
                    alert('There was an error with card payment')
                    console.log(err)
                })
            }
            alert('Subscription set up successfully')
            */

            fetch(`http://localhost:4000/api/subscriptions/donor/subscribe/${groupId}`, {
                credentials: 'include',
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    priceId: priceId,
                    payment_method: result.paymentMethod.id,
                    unit_amount: unitAmount,
                    nickname: nickname,
                    interval: interval
                })
            })
            .then((res)=>{
                if(res.status === 409){
                    alert(`You already have a ${nickname} subscription of set up with this organisation, click subscriptions in the navigation bar to see this information`)
                }
                else{
                    const confirmPayment = (async ()=>{
                        if (res.subStatus === 'requires_action'){
                            await stripe.confirmCardPayment(res.client_secret)
                            .catch((err)=>{
                                alert('There was an error with card payment')
                                console.log(err)
                            })
                        }
                        alert('Subscription set up successfully')
                    })

                    confirmPayment()
                }
            })
            .catch((err)=>{
                alert(err)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Sign Up to {nickname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{productDesc}</Modal.Body>
            <Row>
                <Col className="p-5 m-auto shadow-sm rounded-lg">
                <Form onSubmit={handleSubmit}>
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
                </Col>
            </Row>
        </Modal>
    )
}

export default CreateSubModal;