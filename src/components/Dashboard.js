import React, {Component} from 'react';

import axios from 'axios';
import cookies from "react-cookies";
import values from "../values/values";
import {Link} from "react-router-dom";
import SideBar from './SideBar';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
            user: ""
        }
    }
    componentDidMount(){
        let token = cookies.load(values.TOKEN_COOKIE_KEY);
        this.setState({
            token
        });
        console.log(token)
    }

    onLogOutClicked = () => {
        this.setState({
            token: null
        });
        cookies.remove(values.TOKEN_COOKIE_KEY);
    };


    render() {
        return (
            <div className="hold-transition skin-blue sidebar-mini">

                <SideBar/>

                <div className="content-wrapper">
                    Select an Item
                </div>



            </div>
        )
    }
}
