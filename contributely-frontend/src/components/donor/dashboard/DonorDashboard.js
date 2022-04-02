import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const DonorDashboard = () =>{
    const [totalAmountDonated, setTotalAmountDonated] = useState("")
    const [noOfDonations, setNoOfDonations] = useState("")
    const [subscriptions, setSubscriptions] = useState([])
    const [contributions, setContributions] = useState([])
    const [categories, setCategories] = useState([])
} 

export default DonorDashboard;