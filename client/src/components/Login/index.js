import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./style.css";

class Login extends Component {
    //sets the states for the email and passwod and users
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            redirectTo: null,
            users: [],
            loggedIn: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    // handles the any changes that occur to either of the input fields and updates their states accordingly
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //this handles the signup function to post a new set of credentials to the mongodb
    handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmit");
        axios({
            method: 'post',
            url: '/login',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(function (response) {
            console.log("it worked!");
            console.log(response.data.email);
        }, (error) => {
            console.log(error);
        });
    }

render() {
    if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
        return (
            <div>
                <div>
                    <form className="login-form col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                            <label className="col-form-label-lg" for="email-input">Email address</label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                id="email-input"
                                name="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter Email..."
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label-lg" for="password-input">Password</label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                id="password-input"
                                name="password"
                                placeholder="Enter Password..."
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <button type="submit" id="signup" className="btn btn-primary btn-lg mr-2" onClick={this.handleSubmit}>Signup</button>
                        <button type="submit" id="login" className="btn btn-primary btn-lg ml-2" >Login</button>
                    </form>
                </div>
            </div>
        );
    }
}
}

export default Login;