import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import {bindActionCreators} from 'redux';
import {Dashboard, Loading} from '../../components';
import {fetchAuth} from "../../reducers/auth";
import {fetchUser} from "../../reducers/users";
import {fetchDashboard, changeLateTime} from "../../reducers/dashboard";
import {authSelector, userSelector, dashboardSelector} from "../../selectors";

@withRouter
class DashboardContaoner extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAuth();
        this.props.fetchUser();
        this.props.fetchDashboard();
    }

    onTimeChange = (e, time, index) => {
        this.props.changeLateTime(index, time);
    };

    render() {
        const { isLoaded, isStarted, isAuthenticated, userData, lateForWork} = this.props;


        return (
            <div>
                {
                    isStarted
                        ? (<Loading />)
                        : (isLoaded
                            ? (!isAuthenticated
                                ? (<Redirect to="/" />)
                                : ( userData && lateForWork && <Dashboard
                                    name={userData.firstName}
                                    workingTime={lateForWork}
                                    onTimeChange={this.onTimeChange}
                                />))
                            : (<div/>))
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...authSelector(state),
        ...userSelector(state),
        ...dashboardSelector(state)
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchAuth,
    fetchUser,
    fetchDashboard,
    changeLateTime
}, dispatch);

DashboardContaoner = connect(mapStateToProps, mapDispatchToProps)(DashboardContaoner);
export default withRouter(DashboardContaoner)
