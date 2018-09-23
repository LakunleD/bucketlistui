import React, {Component} from 'react';

import axios from 'axios';
import cookies from "react-cookies";
import values from "../values/values";
import {Link} from "react-router-dom";

export default class SideBar extends Component {

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
            <aside className="main-sidebar">

                <div className="sidebar" id="scrollspy">

                    <ul className="nav sidebar-menu">
                        <li className="header">TABLE OF CONTENTS</li>
                        <li><Link to='/addBucketList'>Add New BucketList</Link></li>
                        <li><Link to='/viewBucketList'>View All BucketList</Link></li>
                    </ul>
                </div>
            </aside>
        )
    }
}
