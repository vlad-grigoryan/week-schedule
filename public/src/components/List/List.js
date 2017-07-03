import React from 'react';
import moment from 'moment';
import './styles.scss';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';




const List = (props) => {

    const getTimeForLate = (day, latArray) => {

        return moment(day).format('HH:mm')
    };


    return (
        <div className="list-container">
            <h1>List of late time</h1>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            {
                                props.headerTime.map(function (date, index) {
                                    return (
                                        <TableHeaderColumn key={index}>{moment(date).format('DD MMM')}</TableHeaderColumn>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}>
                        {
                            props.weekSchedule.map(function (userSchedule, index) {
                                console.log(userSchedule, "userSchedule")
                                return (
                                    <TableRow key={index}>
                                        <TableRowColumn>{userSchedule.firstName} {userSchedule.lastName}</TableRowColumn>
                                        {
                                            props.headerTime.map(function (date, index) {
                                                return (
                                                    <TableRowColumn key={index}>{getTimeForLate(date.startTime, userSchedule.workSchedule)}</TableRowColumn>
                                                )
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
        </div>
    );
};




export default List;
