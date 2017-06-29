import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetSigninStatusAction } from '../../actions';
import {Login, Loading} from '../../components';
import axios from 'axios';


class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            isLoggedIn: false
        };

    };

    componentWillReceiveProps(nextProps) {
        if(!this.props.auth.isAuthenticated && !nextProps.auth.isAuthenticated) {
            this.setState({
                isLoggedIn: true
            });
        }

        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    responseGoogle = (response) => {
        if(response.error) {
            this.setState({
                errorMessage: response.error
            });
        }

        let params = {
            accessToken: response.accessToken
        };

        axios.post('/api/v1/user', params)
            .then((response)=> {
                this.props.history.push('/dashboard');
            })
            .catch((error) =>{
                if (error.response) {
                    gapi.auth2.getAuthInstance().disconnect();
                    this.setState({
                        errorMessage: error.response.data.details
                    })
                }
            });

    };
    render() {
        return (
            <div>
                {this.state.isLoggedIn ?
                    (<Login onGoogleResponse={this.responseGoogle} errorMessage={this.state.errorMessage}/>)
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
        SetSigninStatusAction: bindActionCreators(SetSigninStatusAction, dispatch)
    }
};

LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);


export default withRouter(LoginContainer);
