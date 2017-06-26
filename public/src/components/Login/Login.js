import React from 'react';
import { Component } from 'react';
import GoogleLogin from 'react-google-login';
import {ErrorDisplay} from '../ErrorDisplay';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActionCreator } from '../../actions';


import './styles.scss';

let auth2 = null;
class Login extends Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            errorMessage: "",
        };

    };
    componentWillMount() {
        console.log(this.props, "properties")
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.auth.isAuthenticated, "Test")
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }




    responseGoogle = (response) => {


        let auth2 = gapi.auth2.getAuthInstance();


        if(response.error) {
            this.setState({
                errorMessage: response.error
            });
        } else if(!response.profileObj.email.endsWith('simplytechnologies.net')){
            auth2.disconnect().then(()=> {
                this.setState({
                    errorMessage: 'should_simply_email'
                });
            })

        } else {
            this.props.history.push('/dashboard')
        }
    };

    render() {
        return (
            <div className="top-container">
                <h1>Welcome to the login page</h1>
                <h4>Please press the button and sign-in with gmail account</h4>
                <h5 className="warning-message">The mail should be registered as <span className="importantColor">simpletechnologies.net</span></h5>

                <GoogleLogin
                    clientId="735955037545-r8ujuf1njsm3sv02t371npmmj6ieelaa.apps.googleusercontent.com"
                    buttonText="Sign In with Gmail"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    isSignedIn={false}
                />
                <ErrorDisplay errorMessage={this.state.errorMessage}/>
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

Login = connect(mapStateToProps, null)(Login);


export default withRouter(Login);