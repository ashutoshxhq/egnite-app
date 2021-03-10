import axios from 'axios'
import React, { useEffect } from 'react'

const DiscoverService = () => {
    useEffect(() => {
        axios.get("http://localhost:8000/health",{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}})
        .then(response =>{
            console.log(response)
        })
        .catch(err =>{
            console.log(err)
        })
    },[])
    return (
        <div>
            Discovering...
        </div>
    )
}

export default DiscoverService
