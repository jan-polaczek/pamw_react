import React from 'react';
import {withRouter} from 'react-router';

class Alert extends React.Component {
    render() {
        return (
            <div className='alert'>{this.props.message}</div>
        )
    }
}

export default withRouter(Alert);
