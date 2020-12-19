import React from 'react';
import {withRouter} from 'react-router';
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {authenticationService} from "./utils/services";

class Navbar extends React.Component {
    render() {
        return (
            <div className='navbar-wrapper'>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant="h6" className='navbar-title'>Paczkomaty++</Typography>
                        {authenticationService.currentUser ? (
                            <Button onClick={authenticationService.logout} color='inherit'>Wyloguj</Button>
                        ) : ''}
                    </Toolbar>
                </AppBar>
                <div className='main'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withRouter(Navbar);
