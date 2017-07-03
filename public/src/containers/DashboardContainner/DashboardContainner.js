import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import {Dashboard, Loading} from '../../components';

@withRouter
class DashboardContaoner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            name: null,
            workingTime : []
        };

    }

    componentWillReceiveProps(nextProps) {
        let userAccessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;

        if(!nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }

        this.checkLoginStatus(userAccessToken);
        this.setWorkTime(userAccessToken);
    }

    setWorkTime = ( userAccessToken ) => {
        let header = {
            headers: {
                'Access-Token': userAccessToken
            }
        };

        axios.get('/api/v1/myworktime', header)
            .then((response) => {
                const workTimes = response.data;
                let lateTimes= [];
                let now = new Date();
                now.setHours(10);
                now.setMinutes(0);
                now.setSeconds(0);

                while( lateTimes.length != 5) {
                    let continueWhile = false;

                    for( let i = 0; i < workTimes.length;  i++) {
                        let workTime = new Date((workTimes[i].startTime));
                        if(moment(new Date((workTime))).format('YYYY-MM-DD') === moment(now).format('YYYY-MM-DD')) {
                            workTimes.splice(i, 1);
                            continueWhile = true;
                            lateTimes.push(workTime);
                            break;
                        }
                    }

                    if (!continueWhile) {
                        if(now.getDay() !== 6 && now.getDay() !== 0) {
                            lateTimes.push(new Date(now));
                        }
                    }
                    now = new Date(now.setDate(now.getDate() + 1));
                }
                this.setState({
                    workingTime: lateTimes
                })
            })
    };

    checkLoginStatus = ( userAccessToken ) => {
        let header = {
            headers: {
                'Access-Token': userAccessToken
            }
        };
        axios.get('/api/v1/user', header)
            .then((response)=> {
                this.setState({
                    name: response.data.firstName,
                    isLoggedIn: true
                })
            })
            .catch((err) => {
                console.log(err, "error")
            });
    };

    onTimeChange = (e,time, index) => {
        let userAccessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        let workingTime = this.state.workingTime;
        workingTime[index] = time;

        this.setState({
            workingTime: workingTime
        });

        let params = {
            changedTime : time,
            userAccessToken: userAccessToken

        };

        axios.post('/api/v1/worktime', params)
            .then((response)=> {
            })
            .catch((error) =>{
                console.log(error)
            });
    };

    render() {
        return (
            <div>
                {this.state.isLoggedIn ? (
                    <Dashboard
                        name={this.state.name}
                        workingTime={this.state.workingTime}
                        onTimeChange={this.onTimeChange}/>
                ) :(<Loading />)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth : {
            isAuthenticated: state.users.isAuthenticated,
        }
    }
};

DashboardContaoner = connect(mapStateToProps, null)(DashboardContaoner);
export default withRouter(DashboardContaoner)
