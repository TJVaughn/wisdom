import React, { Component } from 'react';
import Axios from 'axios';

class AddQuoteRouter extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            source: '',
            type: '',
            error: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    async submitQuote(){
        let res = await Axios({
            url: '/api/quote/add',
            method: 'post',
            responseType: 'json',
            data: {
                username: this.state.username,
                password: this.state.password,
                message: this.state.message,
                source: this.state.source,
                type: this.state.type
            }
        })
        console.log(res)
        if(res.data.error){
            return this.setState({error: "Nah"})
        }
        this.setState({message: "", source: "", type: "", error: "Success"})
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }
    handleSubmit(evt) {
        evt.preventDefault()
        this.submitQuote()
    }

    render(){
    	return(
    		<div>
                
    			<h1>Add a new Quote</h1>
                <h2>
                    {this.state.error}
                </h2>
                <form className="add-quote-form" onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <label>Message</label>
                    <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
                    <label>Source</label>
                    <select name="source" value={this.state.source} onChange={this.handleChange}>
                        <option>source</option>
                        <option>Marcus Aurelius</option>
                        <option>Lucius Annaeus Seneca</option>
                        <option>Epictetus</option>
                        <option></option>
                        <option>Seneca</option>
                        <option>Tuscarora</option>
                        <option>Arapaho</option>
                        <option>Duwamish</option>
                        <option>Apache</option>
                        <option>Hopi</option>
                        <option>Blackfoot</option>
                        <option>Assiniboine</option>
                        <option>Cherokee</option>
                        <option>Cheyenne</option>
                        <option>Sioux</option>
                        <option>Dakota</option>
                        <option>Navajo</option>
                        <option>Lakota</option>
                        <option>Maricopa</option>
                        <option>Comanche</option>
                        <option>Mohawk</option>
                        <option>Crow</option>
                        <option>Creole</option>
                        <option>Anishinabe</option>
                        <option>Kiowa</option>
                        <option>Lumbee</option>
                        <option>Minquass</option>
                        <option>Nez Perce</option>
                        <option>Oklahoma</option>
                        <option>Omaha</option>
                        <option>Paiute</option>
                        <option>Pima</option>
                        <option>Plains</option>
                        <option>Pueblo</option>
                        <option>Sauk</option>
                        <option>Shawnee</option>
                        <option>Shenandoah</option>
                        <option>Southwest</option>
                        <option>Umpqua</option>
                        <option>Ute</option>
                        <option>Winnebago</option>
                        <option>Zuni</option>
                        <option>Yurok</option>
                        <option>Tribe Unknown</option>
                    </select>
                    <label>Type</label>
                    <select name="type" value={this.state.type} onChange={this.handleChange}>
                        <option>type</option>
                        <option>African</option>
                        <option>Native American</option>
                        <option>Stoic</option>
                        <option>Tao</option>
                    </select>
                    <button>Add quote</button>
                </form>
    		</div>
    	);
    }
}
export default AddQuoteRouter ;