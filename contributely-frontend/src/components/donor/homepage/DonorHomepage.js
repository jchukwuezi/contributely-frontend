import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DonorNavbar from "../../shared/navbar/DonorNavbar";
import CausesByInterest from "../causes/CausesByInterest";
import {loggedInDonor, checkAuthDonor} from "../../../auth/auth"
import JustGivingCharities from "../charities/JustGivingCharities";
import CausesByCountry from "../causes/CausesByCountry";
import GoFundMeCauses from "../causes/GoFundMeCauses";
import { Row } from "react-bootstrap";


export const DonorHomepage = () => {
    //const navigate = useNavigate()
    //getting user's name
    //const [username, setUsername] = useState("");

    //sending get request to api to get current user stored in the sessions name
    /*
    useEffect(() => {
        fetch("http://localhost:4000/api/donors/auth/donor", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/donor/login")
            }
            else{
                console.log(res)
                const getName = async() => {
                    const data = await res.json()
                    setUsername(data.name)
                }
                getName()
            }
        })
    })
    */

    return(
        <div>
            <DonorNavbar />
            <Row className="mt-5">
                <CausesByInterest />
                <CausesByCountry />
                <GoFundMeCauses />
                <JustGivingCharities />
            </Row>
        </div>
    )



}


export default DonorHomepage;