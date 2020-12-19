import React from 'react';
import {TextField, FormControl, Button} from "@material-ui/core";
import Alert from './Alert'
import {authenticationService} from "./utils/services";
import {withRouter} from 'react-router';
import {Redirect} from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        authenticationService.login(this.state.username, this.state.password)
            .then(
                user => {
                    this.props.handleLogin(user);
                })
            .catch(e => this.setState({error: e}));
    }

    render() {
        if (this.props.currentUser) {
            return <Redirect to='/' from='/login' />;
        } else {
            return (
                <div id="login-container">
                    <form id="login-form" onSubmit={this.handleSubmit}>
                        <FormControl>
                            <TextField onChange={e => this.setState(() => ({username: e.target.value}))} name="username"
                                       autoComplete="username"
                                       label="Nazwa użytkownika"/>
                            <TextField onChange={e => this.setState(() => ({password: e.target.value}))} name="password"
                                       autoComplete="current-password" label="Hasło" type="password"/>
                            <Button type="submit">Zaloguj</Button>
                        </FormControl>
                    </form>
                    {this.state.error ? (
                        <Alert message={this.state.error} />
                    ) : ''}
                </div>
            );
        }
    }
}

export default withRouter(LoginPage);
