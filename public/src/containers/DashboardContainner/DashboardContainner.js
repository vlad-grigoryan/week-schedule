import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {Dashboard, Loading} from '../../components';

@withRouter
class DashboardContaoner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoggedIn: true
        });

        if(!nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn ? (<Dashboard />) :(<Loading />)}
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
