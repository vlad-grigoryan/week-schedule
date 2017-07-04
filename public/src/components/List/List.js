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

    const getTimeForLate = (lateArray, index) => {
        let day = new Date();
        day = new Date(day.setDate(day.getDate() + index));
        while(day.getDay() == 0 || day.getDay() == 6) {
            day = new Date(day.setDate(day.getDate() + 1));
        }

        day.setHours(10);
        day.setMinutes(0);
        day.setSeconds(0);

        for (let i = 0 ; i < lateArray.length; i++) {
            if(moment(day).format('YYYY-MM-DD') === moment(lateArray[i].startTime).format('YYYY-MM-DD')) {
                return moment(lateArray[i].startTime).format('HH:mm')
            }
        }


        day = new Date(day.setDate(day.getDate() + 1));

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
                            <TableHeaderColumn className="table-row">Name</TableHeaderColumn>
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
                            props.weekSchedule.map(function (userSchedule, index) {
                                return (
                                    <TableRow key={index}>
                                        <TableRowColumn className="table-row">{userSchedule.firstName} {userSchedule.lastName}</TableRowColumn>
                                        {
                                            props.headerTime.map(function (date, index) {
                                                return (
                                                    <TableRowColumn className="table-row" key={index}>{getTimeForLate(userSchedule.workSchedule, index)}</TableRowColumn>
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
