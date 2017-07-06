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
    const getTimeForLate = (lateArray, index, day) => {

        for (let i = 0 ; i < lateArray.length; i++) {
            if(moment(day).format('YYYY-MM-DD') === moment(lateArray[i].startTime).format('YYYY-MM-DD')) {
                return moment(lateArray[i].startTime).format('HH:mm')
            }
        }

        return '-'
    };


    return (
        <div className="list-container">
            <h1>Late for work</h1>
                <Table className="table-container">
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn className="first-column text-center">Name</TableHeaderColumn>
                            {
                                props.headerTime.map(function (date, index) {
                                    return (
                                        <TableHeaderColumn className="table-row" key={index}>{moment(date).format('DD MMM')}</TableHeaderColumn>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}>
                        {
                            props.userData.map(function (userSchedule, index) {
                                return (
                                    <TableRow key={index}>
                                        <TableRowColumn className="first-column text-left">
                                            <img src={userSchedule.picture} className="profile-picture"/>
                                            <span className="user-name">{userSchedule.firstName} {userSchedule.lastName}</span>
                                            </TableRowColumn>
                                        {
                                            props.headerTime.map(function (date, index) {
                                                return (
                                                    <TableRowColumn className="table-row pts" key={index}>{getTimeForLate(userSchedule.workSchedule, index, date)}</TableRowColumn>
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
