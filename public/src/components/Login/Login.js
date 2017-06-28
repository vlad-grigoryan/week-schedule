import React from 'react';
import GoogleLogin from 'react-google-login';
import {ErrorDisplay} from '../ErrorDisplay';
import config from '../../../../config/authConfig';
import './styles.scss';


const Login = (props) => {
    console.log(props, "props")
    return (
        <div className="top-container">
            <h1>Welcome to the login page</h1>
            <h4>Please press the button and sign-in with gmail account</h4>
            <h5 className="warning-message">The mail should be registered as <span className="importantColor">simpletechnologies.net</span></h5>

            <GoogleLogin
                clientId={config.gapiClientId}
                buttonText="Sign In with Gmail"
                onSuccess={props.onGoogleResponse}
                onFailure={props.onGoogleResponse}
                isSignedIn={false}
            />
            <ErrorDisplay errorMessage={props.errorMessage}/>
        </div>
    );
};

export default Login;
