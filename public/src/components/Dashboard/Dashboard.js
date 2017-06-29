import React from 'react';
import './styles.scss';
import Moment from 'moment';
import TimePicker from 'material-ui/TimePicker';

const Dashboard = (props) => {
    return (
        <div className="dashboard_container">
            <h1>Hi {props.name},</h1>
            <h2>Welcome to your Dashboard</h2>
            <div className="outer">
            {
                props.workingTime.map((time, id) => {
                    console.log(Moment(time).format("hh:mm:ss"), "!!")
                    return(
                        <div key={id} className="time-container">
                            <div className="inner">
                                <div className="day-block">{time.getDate()} {getMonth(time.getMonth())}</div>
                                <TimePicker
                                    format="24hr"
                                    onChange={(event, time)=> props.onTimeChange(event, time, id)}
                                    value={time}
                                    hintText="Time to be completed by"
                                    className="time-block"/>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    );
};

const getMonth = (monthDay) => {
    let month= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return month[monthDay];
};

export default Dashboard;
