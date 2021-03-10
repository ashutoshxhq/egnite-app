import axios from 'axios'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

const DiscoverService = () => {
    const history = useHistory()
    useEffect(() => {
        axios.get("http://localhost:3210/ping")
            .then(response => {
                console.log(response)
                history.replace("/schemas")
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
