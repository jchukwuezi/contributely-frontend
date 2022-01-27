//will check if user is authenticated (in session)
import { useNavigate } from "react-router-dom"
export const loggedInDonor ={}
var loggedInOrg = {}

const navigate = useNavigate
const checkAuthOrg = () => {
    fetch("http://localhost:4000/api/donors/auth/org", {
        credentials: 'include',
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        mode: 'cors'
    })
    .then((res) => {
        if(!res.ok){
            alert('Unauthorized, please log in to view this page')
            navigate("/org/login")
        }
        else{
            console.log("Logged in user : " + res)
            const getSessionData  = async() => {
                loggedInOrg = await res.json()
            }
            getSessionData()
        }
    })
}

export const checkAuthDonor = () => {
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
            console.log("Logged in user : " + res)
            const getSessionData  = async() => {
                loggedInDonor = await res.json()
            }
            getSessionData()
        }
    })
}


