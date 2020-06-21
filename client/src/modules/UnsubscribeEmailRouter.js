import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function UnsubscribeEmailRouter(props){
    const [message, setMessage] = useState('Unsubscribing...')
    
    useEffect(() => {
        const unsubscribeFunction = async () => {
            let res = await Axios({
                method: 'GET',
                responseType: 'json',
                url: `/api/email/unsubscribe-email${props.location.search}`
            })
            console.log(res)
            setMessage(res.data.success)
        }
       unsubscribeFunction() 
    }, [props])
    return (
        <div>
            <h1>Unsubscribe</h1>
            {message}
        </div>
    )
}