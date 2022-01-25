import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DonorNavbar from "../../shared/navbar/DonorNavbar";

export const DonorHomepage = () => {
    const navigate = useNavigate()
    //getting user's name
    const [username, setUsername] = useState("");

    //sending get request to api to get current user stored in the sessions name
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

    return(
        <DonorNavbar />
    )



}


export default DonorHomepage;