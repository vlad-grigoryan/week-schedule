import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {List, Loading} from '../../components';


class ListContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            userData : null,
            dataTime: null
        }
    };

    componentWillReceiveProps(nextProps) {
        let userAccessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;

        if(!nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }
        this.getWeekSchedule(userAccessToken);
        this.setDateTime();
    };

    setDateTime = () => {

        let lateTimes= [];
        let now = new Date();
        now.setHours(10);
        now.setMinutes(0);
        now.setSeconds(0);

        while( lateTimes.length != 5) {
            if(now.getDay() !== 6 && now.getDay() !== 0) {
                lateTimes.push(new Date(now));
            }
            now = new Date(now.setDate(now.getDate() + 1));
        }

        this.setState({
            dataTime: lateTimes
        })
    };

    getWeekSchedule = (userAccessToken) => {
        let header = {
            headers: {
                'Access-Token': userAccessToken
            }
        };

        axios.get('/api/v1/worktime', header)
            .then((response) => {
                this.setState({
                    userData: response.data
                })
            })
    }

    render() {
        return (
            <div>
                {this.props.auth.isAuthenticated && this.state.userData ?
                    (<List userData={this.state.userData} headerTime={this.state.dataTime} />)
                    :(<Loading />)}
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

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

ListContainer = connect(mapStateToProps, null)(ListContainer);


export default withRouter(ListContainer);
