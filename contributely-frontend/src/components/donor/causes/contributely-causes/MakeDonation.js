import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {Document, Page} from '@react-pdf/renderer'
import { useNavigate } from "react-router-dom";
import {Button, Form} from "react-bootstrap";

//destructuring props from parent component
export const MakeDonation = (props) =>{
    //groupId will be used to find the stripe account number of the group to fill in the on_behalf_of field
    const groupId = props.groupId;
    const initiativeId = props.initiativeId;
    const navigate = useNavigate()
    const elements = useElements();
    const stripe = useStripe();
    const [onBehalfOf, setOnBehalfOf] = useState("")
    const [donorEmail, setDonorEmail] = useState("")
    const [amount, setAmount] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(amount, donorEmail, onBehalfOf)
        if(!stripe || !elements){
            return
        }
        try{
            const {clientSecret, paymentInfo} = await fetch(`http://localhost:4000/api/groups/${groupId}/${initiativeId}/donate`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    paymentMethodType: 'card',
                    currency: 'eur',
                    amount: amount,
                    email: donorEmail,
                    onBehalfOf: onBehalfOf
                })
            })
            .then(r => r.json())
            console.log(clientSecret)
           // console.log(paymentInfo)
            //confirming payment on client side
            const {paymentIntent} = await stripe.confirmCardPayment(
                clientSecret, {
                    payment_method:{
                        card: elements.getElement(CardElement)
                    }
                }
            )
            alert("Donation successful")               
            console.log("Payment intent details")
            console.log(paymentIntent)
            navigate('/donation-pdf', {state: paymentInfo})
            //await createPdf(paymentInfo)
        }
        catch(err){
            console.log(err)
        }
    }

    const createPdf = (paymentInfo) =>{
        console.log(paymentInfo)
        const {initiativeName, groupName, inTheNameOf, amount, email} = paymentInfo
        
        
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-2">
                <Form.Label>Amount</Form.Label>
                <Form.Control  type="number" placeholder="€" onChange={e => setAmount(e.target.value)}/> 
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Who is this contribution on behalf of?</Form.Label>
                <Form.Control placeholder="Enter their full name" onChange={e => setOnBehalfOf(e.target.value)}/> 
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Enter an email to receive a pdf of this donation</Form.Label>
                <Form.Control placeholder="@example.com" onChange={e => setDonorEmail(e.target.value)}/> 
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Enter Card Details</Form.Label>
                <CardElement id="card-element" className="mt-3"/>
            </Form.Group>

            <div className="d-grid">
                <Button className="mb-3 mt-5" type="submit">
                Contribute
                </Button>
            </div>
      </Form>
    )
}

export default MakeDonation;