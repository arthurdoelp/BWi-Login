import React, { Component } from "react";
import axios from "axios";
import "./style.css";

class Accounts extends Component {
    state = {
        users: []
    };

    //when the component has loaded it will run a get request to the db to get all of the records in the database
    componentDidMount() {
        axios.get("/all")
            .then(res => {
                console.log(res.data);
                this.setState({ users: res.data });
            }, (error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="users-list col-sm-12 col-md-12 col-lg-12">
                <h2>Accounts</h2>
                <small>Reload to see newly added accounts</small>
                <ul>
                    {this.state.users.map(user =>
                        <p key={user._id}>
                            email: {user.email} <br></br>
                            password: {user.password}
                        </p>
                    )}
                </ul>
            </div>
        );
    }
}
export default Accounts;