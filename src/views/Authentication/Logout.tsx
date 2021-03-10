import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

const Logout = () => {
    const history = useHistory()

    useEffect(() => {
        localStorage.setItem("loginStatus","false")
        localStorage.setItem("accessToken","")
        localStorage.setItem("serviceID","")
        history.replace("/login")
    }, [])
    return (
        <div>
            Logging Out...
            
        </div>
    )
}

export default Logout
