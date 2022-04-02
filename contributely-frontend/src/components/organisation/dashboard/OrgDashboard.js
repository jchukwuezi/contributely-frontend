import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const OrgDashboard = () =>{
    const [balance, setBalance] = useState("")
    const [pending, setPending] = useState("")
    const [totalContributions, setTotalContributions] = useState("")
    const [totalInitiativeNo, setTotalInitiativeNo] = useState("")
    const [initiativeData, setInitiativeData] = useState([])
    const [subscriberList, setSubscriberList] = useState([])
    const [categories, setCategories] = useState([])
}

export default OrgDashboard;