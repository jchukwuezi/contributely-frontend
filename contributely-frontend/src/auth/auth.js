/*
const {sessDonor} = fetch("http://localhost:4000/api/donors/auth/donor", {
    credentials: 'include',
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    mode: 'cors'
})
.then(async(res) => {
    const data = await res.json()
    return data.sessDonor;
})
.catch((err)=> {
    console.log(err)
})


const{sessOrg} = fetch("http://localhost:4000/api/organisations/auth/org", {
    credentials: 'include',
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    mode: 'cors'
})
.then(async(res) => {
    const data = await res.json()
    return data.sessOrg;
})
.catch((err)=> {
    console.log(err)
})


export {
    sessOrg,
    sessDonor
}

*/