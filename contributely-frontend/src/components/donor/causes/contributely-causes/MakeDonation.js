import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {Document, Page} from '@react-pdf/renderer'
import { useNavigate } from "react-router-dom";

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
        <form id="payment-form" onSubmit={handleSubmit}>
            <label>Amount you to donate</label>
            <input type="number" placeholder="€" onChange={e => setAmount(e.target.value)}/>
            
            <label>Enter card details</label>
            <CardElement id="card-element" className="mt-3"/>

            <label>Who is this donation on behalf of?</label>
            <input onChange={e => setOnBehalfOf(e.target.value)} placeholder="Enter their name"/>

            <label>Please enter your email to get a pdf of this donation</label>
            <input onChange={e => setDonorEmail(e.target.value)}/>

            <button className="mt-4"> Pay </button>
        </form>
    )
}

export default MakeDonation;