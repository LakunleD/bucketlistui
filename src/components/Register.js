import React, {Component} from 'react';

import axios from 'axios';
import values from '../values/values.json';
import {Redirect} from 'react-router-dom';

export default class Register extends Component {

    state = {
        username: "",
        password: "",
        btnLoading: false,
        added: false,
        btnText: "Register"
    };


    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            btnLoading: true
        });

        let data = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post(values.URL + '/api/v1/users/register', data)
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    alert(response.data.message);
                    this.setState({
                        btnLoading: false,
                        btnText: "User Added!",
                        added: true
                    });
                }
                else {
                    this.setState({
                        btnLoading: false,
                        btnText: "Error!"
                    });

                    setTimeout(() => {
                        this.setState({
                            btnLoading: false,
                            btnText: "Register"
                        })
                    }, 2000)
                }
            })
            .catch((error) => {
                this.setState({
                    btnLoading: false,
                    btnText: "Error!"
                });

                setTimeout(() => {
                    this.setState({
                        btnLoading: false,
                        btnText: "Register"
                    })
                }, 2000)
            });

    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = (target.type === "checkbox") ? target.checked.toString() : target.value;
        const inputName = target.name;

        this.setState({
            [inputName]: value
        })
    };

    render() {
        return (
            <div>
                {
                    this.state.added ? <Redirect to='/login'/> :
                        <div className="content-wrapper">
                            <section className="content-header">

                                <div className="box box-info">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Admit Details</h3>
                                    </div>
                                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                        <div className="box-body">
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Username</label>

                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="username"
                                                           name="username"
                                                           onChange={this.handleInputChange} placeholder="Username"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Password</label>

                                                <div className="col-sm-10">
                                                    <input type="password" className="form-control" id="password"
                                                           name="password" onChange={this.handleInputChange}
                                                           placeholder="Password"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-footer">

                                            <button type="submit"
                                                    className="btn btn-info pull-right">{this.state.btnText}</button>
                                        </div>

                                    </form>
                                </div>
                            </section>
                        </div>
                }
            </div>

        )
    }
}
