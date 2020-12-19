import React from 'react';
import {withRouter} from 'react-router';
import PackageList from './PackageList';

class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                <PackageList />
            </div>
        )
    }
}

export default withRouter(Home);
