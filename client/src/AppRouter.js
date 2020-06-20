import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Quote from './Quote';
import Signup from './Signup';
import Axios from 'axios';


function IndexRouter(props){
    return (
        <div>
            <h1>AncientWisdom.io</h1>
            <h3>Your Daily Dose Of Ancient Wisdom</h3>
            <h5>Today's Quote: </h5>
            <Quote />
            <p>
                <a href="https://paypal.me/VaughnWebdevelopment?locale.x=en_US">Buy me a coffee</a>
            </p>
            <h2>Quote's in your inbox</h2>
            <p>
                Get the quote of the day automatically in your inbox every day!
            </p>
            <Signup />
        </div>
    )
}
class VerifyEmailRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
            isVerified: false
        }
    }
    async verifyEmailFunction () {
        let res = await Axios({
            url: `/api/email/verify-email${this.props.location.search}`,
            method: 'GET',
            responseType: 'json'
        })
        // console.log(res)
        if(res.data.success){
            return this.setState({isVerified: true})
        }
        return this.setState({isVerified: false})
    }
    async componentDidMount() {
        await this.verifyEmailFunction()
    }
    render() {
        return (
            <div>
                <div>
            <h1>Verify your email</h1>
            {this.state.isVerified ? <div>
                <p>
                    Success! <Link to="/">Return to home</Link>
                </p>
            </div> : 'Error'}
            {/* {console.log(verifyEmailFunction())} */}
            {/* {console.log(this.props.location.search)} */}
        </div>
            </div>
        )
    }
}
// function VerifyEmailRouter(props){
//     const [ isVerified, setIsVerified ] = useState(false)

//     const verifyEmailFunction = async () => {
//         let res = await Axios({
//             url: `/api/email/verify-email/${props.location.search}`,
//             method: 'GET',
//             responseType: 'json'
//         })
//         console.log(res)
//         if(res.data.success){
//             return setIsVerified(true)
//         }
//         return setIsVerified(false)
//     }
//     useEffect(async () => {
//         await verifyEmailFunction()
//     }, [ setIsVerified ])
//     return (
//         <div>
//             <h1>Verify your email</h1>
//             {isVerified ? <div>
//                 <p>
//                     Success! <Link to="/">Return to home</Link>
//                 </p>
//             </div> : 'Error'}
//             {/* {console.log(verifyEmailFunction())} */}
//             {console.log(props.location.search)}
//         </div>
//     )
// }

function UnsubscribeEmailRouter(props){
    return (
        <div>
            {console.log(props)}
        </div>
    )
}

class AppRouter extends Component {
    render(){
    	return(
    		<div>
    			<Router>
                    <Switch>
                        <Route exact path={'/'} component={IndexRouter} />
                        <Route path={`/email/verify`} component={VerifyEmailRouter} />
                        <Route exact path={`/email/unsubscribe`} component={UnsubscribeEmailRouter} />
                    </Switch>
                </Router>
    		</div>
    	);
    }
}
export default AppRouter ;