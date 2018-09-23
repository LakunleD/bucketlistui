import React, {Component} from 'react';
import cookies from "react-cookies";
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddBucketList from './components/AddBucketList';
import ViewBucketList from './components/ViewBucketList';


import values from './values/values.json';

const checkAuth = {
    authenticate(){
        let token = cookies.load(values.TOKEN_COOKIE_KEY);

        if (token === undefined || token === null)
            token = null;
        return token;
    }
};

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render = {(props) => (
        checkAuth.authenticate !== null ? <Component {...props}/>
            : <Redirect to='/login'/>
    )}/>
);


class App extends Component {

    constructor(props) {
        super(props);

        let token = cookies.load(values.TOKEN_COOKIE_KEY);

        if (token === undefined || token === null)
            token = null;

        this.state = {
            token: token,
            user: ""
        }
    }

    onLoginSuccess= (userDetails) =>  {
        let token = userDetails.token;
        let user = userDetails.user;
        // Set cookies
        cookies.save(values.TOKEN_COOKIE_KEY, token, {
            path: '/',
            secure: values.VALUE_COOKIE_HTTPS_ONLY
        });

        setTimeout(() => {
            this.setState({
                token,
                user
            });
        }, 2000)
    };

    render() {
        return (
            <Router>
                <div>
                    {
                        (this.state.token !== null) ?
                            <Redirect to='/'/>:null
                    }

                    <Route path='/login' render={()=>{
                        return <Login onLoginSuccess={this.onLoginSuccess}/>
                    }} />
                    <Route path='/register' component={Register}/>
                    <Route path='/addBucketList' component={AddBucketList}/>
                    <Route path='/viewBucketList' component={ViewBucketList}/>
                    <PrivateRoute exact path="/" component={Dashboard}/>


                </div>
            </Router>
        );
    }
}

export default App;
