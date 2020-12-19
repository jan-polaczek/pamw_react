import './App.css';
import LoginPage from "./LoginPage";
import React from 'react';
import { createBrowserHistory } from 'history';
import {Route, Router} from "react-router-dom";
import {PrivateRoute} from './PrivateRoute';
import Navbar from "./Navbar";
import {authenticationService} from "./utils/services";
import Home from "./Home";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory();
        this.state = {
            userData: authenticationService.currentUser
        }
    }

    handleLogin = (userData) => {
        this.setState({userData: userData});
    }

    render()
    {
        return (
            <Router history={this.history}>
                <Navbar>
                    <PrivateRoute exact path="/" currentUser={this.state.userData} render={() => <Home currentUser={this.state.userData}/>}/>
                    <Route path="/login" render={() => <LoginPage handleLogin={this.handleLogin} currentUser={this.state.userData}/>}/>
                </Navbar>
            </Router>
        )
    }
}

export default App;
