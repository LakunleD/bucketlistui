import React, {Component} from 'react';

import axios from 'axios';

import {Link} from 'react-router-dom';

import values from '../values/values.json';

export default class Login extends Component {

    state = {
        username: "",
        password: "",
        btnText: "Sign In"
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = (target.type === "checkbox") ? target.checked.toString() : target.value;
        const inputName = target.name;

        this.setState({
            [inputName]: value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post(values.URL + '/api/v1/auth/login', data)

            .then((response) => {
                if (response.status === 200) {
                    alert('Login successful');
                    this.setState({
                        btnText: "Success!"
                    });
                    this.props.onLoginSuccess(response.data);
                }
            })
            .catch((error) => {
                this.setState({
                    btnText: "Error!"
                });

                setTimeout(() => {
                    this.setState({
                        btnText: "Sign In"
                    })
                }, 2000)
            });

    };

    render() {
        return (
            <div>
                <div className="login-box">
                    <div className="login-box-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group has-feedback">
                                <input type="text" className="form-control" name="username" placeholder="Username"
                                       onChange={this.handleInputChange}/>
                                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" className="form-control" name="password" placeholder="Password"
                                       onChange={this.handleInputChange}/>
                                <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                            </div>
                            <div className="row">
                                <div className="col-xs-4">
                                    <button type="submit"
                                            className="btn btn-primary btn-block btn-flat">{this.state.btnText}</button>
                                </div>
                            </div>
                        </form>

                        <Link to='/register'>Register</Link>

                    </div>
                </div>
            </div>
        )
    }
}
