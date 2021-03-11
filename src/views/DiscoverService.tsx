import axios from 'axios'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

const DiscoverService = () => {
    const history = useHistory()
    useEffect(() => {
        axios.get("http://localhost:3210/ping")
            .then(response => {
                console.log(response)
                axios.get("http://localhost:3210/services")
                    .then(res => {
                        if (res.data.services.length === 0) {
                            history.replace("/create-service")
                        } else {
                            console.log(res.data.services[0].name)
                            localStorage.setItem("serviceID", res.data.services[0].ID)
                            history.replace("/schemas")
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [history])
    return (
        <div>
            Discovering...
        </div>
    )
}

export default DiscoverService
