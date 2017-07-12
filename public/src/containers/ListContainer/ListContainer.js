import React from 'react';
import { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {List, Loading} from '../../components';
import {fetchUsers} from "../../reducers/users";
import {fetchAuth} from "../../reducers/auth";
import {setDateTime} from "../../reducers/list";
import {authSelector, userSelector, listSelector} from "../../selectors";


class ListContainer extends Component {
    constructor(props) {
        super(props);
    };

    componentWillReceiveProps(nextProps) {

    };

    componentWillMount() {
        this.props.fetchAuth();
        this.props.fetchUsers();
        this.props.setDateTime();
    }


    render() {
        const { isLoaded, isStarted, isAuthenticated, allUsers, headerDateTimes} = this.props;
        return (
            <div>
                {
                    isStarted
                        ? (<Loading />)
                        : (isLoaded
                        ? (!isAuthenticated
                            ? (<Redirect to="/" />)
                            : ( allUsers && headerDateTimes &&
                                <List
                                    userData={allUsers.data}
                                    headerTime={headerDateTimes}
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
        ...listSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchAuth,
    fetchUsers,
    setDateTime
}, dispatch);

ListContainer = connect(mapStateToProps, mapDispatchToProps)(ListContainer);


export default withRouter(ListContainer);
