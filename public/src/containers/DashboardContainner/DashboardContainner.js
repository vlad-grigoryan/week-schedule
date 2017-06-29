import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
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
    componentWillMount() {
        let workingTime= [];
        let now = new Date();
        now.setHours(10);
        now.setMinutes(0);
        now.setSeconds(0);


        while( workingTime.length != 7) {
            if(now.getDay() !== 6 && now.getDay() !== 0) {
                workingTime.push(new Date(now));
            }
            now = new Date(now.setDate(now.getDate() + 1));
        }

        this.setState({
            workingTime: workingTime
        })
    }

    componentWillReceiveProps(nextProps) {

        if(!nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }

        let userAccessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
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
    }

    onTimeChange = (e,time, index) => {
        let workingTime = this.state.workingTime;
        workingTime[index] = time;

        this.setState({
            workingTime: workingTime
        });
    }

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
