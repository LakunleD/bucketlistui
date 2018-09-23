import React, {Component} from 'react';

import axios from 'axios';
import cookies from "react-cookies";
import values from "../values/values";

import SideBar from './SideBar';
import {Redirect} from "react-router-dom";

export default class AddBucketList extends Component {

    state = {
        name: '',
        redirect: false,
        btnText: "Create Bucketlist"
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
            name: this.state.name
        };

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.load(values.TOKEN_COOKIE_KEY)}`
        };

        axios.post(values.URL + '/api/v1/bucketlists', data, {headers})
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        redirect: true,
                        btnText: "Success!"
                    });

                }
            })
            .catch((error) => {
                this.setState({
                    redirect: false,
                    btnText: "Error!"
                });
            });

    };

    render() {
        return (
            <div className="hold-transition skin-blue sidebar-mini">
                <SideBar/>
                <div className="content-wrapper">
                    {
                        (this.state.redirect) ?
                            <Redirect to='/viewBucketList'/> :
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Bucketlist Name</label>

                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="name"
                                               name="name" onChange={this.handleInputChange}
                                               placeholder="First Name"/>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <button type="submit"
                                                    className="btn btn-primary btn-block btn-flat">{this.state.btnText}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                    }
                </div>
            </div>
        )
    }
}
