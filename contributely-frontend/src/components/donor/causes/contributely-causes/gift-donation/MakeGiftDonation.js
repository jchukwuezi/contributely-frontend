import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import {Button, Form} from "react-bootstrap";

const MakeGiftDonation = (props) =>{
        //groupId will be used to find the stripe account number of the group to fill in the on_behalf_of field
        const groupId = props.groupId;
        const initiativeId = props.initiativeId;
        const navigate = useNavigate()
        const elements = useElements();
        const stripe = useStripe();
        const [amount, setAmount] = useState("")
        const [name, setName] = useState("")
        const [email, setEmail] = useState("")
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(amount)
            if(!stripe || !elements){
                return
            }
            try{
                const {clientSecret, paymentInfo} = await fetch(`http://localhost:4000/api/groups/${groupId}/${initiativeId}/gift-donate`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        paymentMethodType: 'card',
                        currency: 'eur',
                        amount: amount,
                        name: name,
                        email: email
                    })
                })
                .then(r => r.json())
                console.log(clientSecret)
                //confirming payment on client side
                const {paymentIntent} = await stripe.confirmCardPayment(
                    clientSecret, {
                        payment_method:{
                            card: elements.getElement(CardElement)
                        }
                    }
                )
                alert("Gift donation successful")               
                console.log("Payment intent details")
                console.log(paymentIntent)
            }
            catch(err){
                console.log(err)
            }
        }
    
        return(
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-2">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control  type="number" placeholder="€" onChange={e => setAmount(e.target.value)}/> 
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Name of the person you want to gift this donation to.</Form.Label>
                    <Form.Control  type="text" placeholder="Name" onChange={e => setName(e.target.value)}/> 
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Email of the person you want to gift this donation to.</Form.Label>
                    <Form.Control  type="email" placeholder="example@example.com" onChange={e => setEmail(e.target.value)}/> 
                </Form.Group>
    
                <Form.Group className="mt-2">
                    <Form.Label>Enter Card Details</Form.Label>
                    <CardElement id="card-element" className="mt-3"/>
                </Form.Group>
    
                <div className="d-grid">
                    <Button className="mb-3 mt-5" type="submit">
                    Gift a Contribution
                    </Button>
                </div>
          </Form>
        )
}

export default MakeGiftDonation;