import React from 'react';
import {withRouter} from 'react-router';
import {TableRow, TableCell} from '@material-ui/core'
import {Button} from "@material-ui/core";
import {packageService} from "./utils/services";

class Package extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: props.data.status,
            nextStatus: this.getNextStatus(props.data.status)
        }
    }
    getNextStatus(currentStatus) {
        const statuses = ['Utworzona etykieta', 'Nadana', 'W drodze', 'Dostarczona', 'Odebrana']
        const currentStatusIndex = statuses.indexOf(currentStatus);
        return currentStatusIndex + 1 >= statuses.length ? false : statuses[currentStatusIndex + 1];
    }

    handleStatusClick = () => {
        packageService.incrementPackageStatus(this.props.data)
            .then((result) => this.setState({status: result.status, nextStatus: this.getNextStatus(result.status)}));
    }

    render() {
        const data = this.props.data;
        const nextStatus = this.state.nextStatus;
        return (
            <TableRow>
                <TableCell>{data.cell}</TableCell>
                <TableCell>{data.receiver}</TableCell>
                <TableCell>{data.size}</TableCell>
                <TableCell>{this.state.status}</TableCell>
                <TableCell>
                    {nextStatus ? (
                        <Button onClick={this.handleStatusClick} color="primary">{this.state.nextStatus}</Button>
                    ) : (
                        <Button disabled color="secondary">Paczka odebrana</Button>
                    )}
                </TableCell>
            </TableRow>
        )
    }
}

export default withRouter(Package);
