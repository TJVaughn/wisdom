import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Quote from './modules/Quote';
import Signup from './modules/Signup';
import VerifyEmailRouter from './modules/VerifyEmailRouter';
import UnsubscribeEmailRouter from './modules/UnsubscribeEmailRouter';
import Charities from './modules/Charities';
import AddQuoteRouter from './modules/AddQuoteRouter';


function IndexRouter(props){
    return (
        <div>
            
            <h5>Today's Quote: </h5>
            <Quote />
            <Signup />
            <Charities />
        </div>
    )
}




class AppRouter extends Component {
    render(){
        const menu = <div>
            <Link to={'/'} ><h1>AncientWisdom.io</h1></Link>
            <h3>Your Daily Dose Of Ancient Wisdom</h3>
        </div>
    	return(
    		<div>
    			<Router>
                    {menu}
                    <Switch>
                        <Route exact path={'/'} component={IndexRouter} />
                        <Route path={`/email/verify`} component={VerifyEmailRouter} />
                        <Route path={`/email/unsubscribe`} component={UnsubscribeEmailRouter} />
                        <Route path={'/quote/add'} component={AddQuoteRouter} />
                    </Switch>
                </Router>
    		</div>
    	);
    }
}
export default AppRouter ;