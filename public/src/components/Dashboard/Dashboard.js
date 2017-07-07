import React from 'react';
import './styles.scss';
import TimePicker from 'material-ui/TimePicker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router-dom';


const muiTheme = getMuiTheme({
    timePicker: {
        width: '2000px',
    },
});

const Dashboard = (props) => {
    console.log(props, "props")
    return (
        <div className="dashboard_container">
            <h1>Hi {props.name},</h1>
            <h3>click to time for change</h3>
            <div className="outer">
            {
                props.workingTime.map((time, id) => {
                    return(
                        <div key={id} className="time-container">
                            <div className="inner">
                                <div className="day-block">{time.getDate()} {getMonth(time.getMonth())}</div>
                                <TimePicker
                                    format="24hr"
                                    onChange={(event, time)=> props.onTimeChange(event, time, id)}
                                    value={time}
                                    hintText="Time to be completed by"
                                    minutesStep={5}
                                    className="time-block"
                                />
                            </div>
                        </div>
                    )
                })
            }
            </div>
            <Link to="/list">
                See All List
            </Link>
        </div>
    );
};

const getMonth = (monthDay) => {
    let month= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return month[monthDay];
};

export default Dashboard;
