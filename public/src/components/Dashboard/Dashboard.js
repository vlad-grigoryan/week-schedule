import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { withRouter } from 'react-router';

@withRouter
class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "nextProps")
        console.log(this.props, "props")
        if(!nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }


    render() {
        return (
            <div className="dashboard_container">
                <h1>Welcome to your Dashboard</h1>
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



Dashboard = connect(mapStateToProps, null)(Dashboard);
export default withRouter(Dashboard)
