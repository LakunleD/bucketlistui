import React, {Component} from 'react';

import axios from 'axios';
import cookies from "react-cookies";
import values from "../values/values";
import SideBar from "./SideBar";
import {Redirect} from "react-router-dom";

export default class ViewBucketList extends Component {

    state = {
        bucketlists:[]
    };

    componentDidMount(){
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.load(values.TOKEN_COOKIE_KEY)}`
        };

        axios.get(values.URL + '/api/v1/bucketlists', {headers})
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        bucketlists: response.data
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    redirect: false,
                    btnText: "Error!"
                });
            });
    }

    render() {
        return (
            <div className="hold-transition skin-blue sidebar-mini">
                <SideBar/>
                <div className="content-wrapper">
                    <div className="row">
                        {
                            this.state.bucketlists.map((bucketlist) => (

                                <div>
                                    <h3>{bucketlist.name}</h3>
                                    <h3>{bucketlist.date_created}</h3>
                                    <h3>{bucketlist.date_modified}</h3>
                                    <h3>{bucketlist.created_by}</h3>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
