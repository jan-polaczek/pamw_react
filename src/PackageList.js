import React from 'react';
import {withRouter} from 'react-router';
import {packageService} from "./utils/services";
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core'
import Package from './Package';

class PackageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packages: []
        };
    }

    componentDidMount() {
        packageService.getPackages()
            .then(packages => {
                this.setState({packages});
            })
    }

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Skrytka</TableCell>
                        <TableCell>Odbiorca</TableCell>
                        <TableCell>Rozmiar</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Zmień status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.packages.map((package_data) => {
                        return (
                            <Package key={package_data.id} data={package_data} />
                        )
                    })}
                </TableBody>
            </Table>
        )
    }
}

export default withRouter(PackageList);
