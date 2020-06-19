import React, { Component } from 'react';
import Axios from 'axios';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }
    async handleSubmit(evt) {
        evt.preventDefault()
        let res = await Axios({
            url: '/api/signup',
            method: 'POST',
            data: {
                email: this.state.email
            },
            responseType: 'json'
        })
        console.log(res)
        if(res.data.error){
            return this.setState({message: "Email already signed up"})
        }
        this.setState({email: '', message: "Success! Check your email for verification."})
        return
    }
    render(){
    	return(
    		<div>
                <strong>
                    {this.state.message}
                </strong>
    			<form onSubmit={this.handleSubmit}>
                    <label>email</label><br />
                    <input name="email" type="email" value={this.state.email} onChange={this.handleChange} /><br />
                    We will never spam you or anything weird, just quotes!<br />
                    <button>submit</button>
                </form>
    		</div>
    	);
    }
}
export default Signup ;