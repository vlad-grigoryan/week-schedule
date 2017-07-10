import React from 'react';
import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SetSigninStatusAction} from '../../actions';
import {Login, Loading} from '../../components';
import axios from 'axios';
import {fetchAuth} from "../../reducers/users";


class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            isLoggedIn: false
        };

    };

    componentWillReceiveProps(nextProps) {
        if (!this.props.auth.isAuthenticated && !nextProps.auth.isAuthenticated) {
            this.setState({
                isLoggedIn: true
            });
        }

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentDidMount() {
        this.props.fetchAuth();
    }

    responseGoogle = (response) => {
        if (response.error) {
            this.setState({
                errorMessage: response.error
            });
        }

        let params = {
            accessToken: response.accessToken
        };

        axios.post('/api/v1/user', params)
            .then((response) => {
                this.props.history.push('/dashboard');
            })
            .catch((error) => {
                if (error.response) {
                    gapi.auth2.getAuthInstance().disconnect();
                    this.setState({
                        errorMessage: error.response.data.details
                    })
                }
            });

    };

    render() {
        const {appReady, isAuthenticated} = this.props;

        return (
            <div>
                {appReady ?
                    (<Login onGoogleResponse={this.responseGoogle} errorMessage={this.state.errorMessage}/>)
                    : (<Loading />)}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // appReady: state.appReady,
        isAuthenticated: state.isAuthenticated
    }
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchAuth,
}, dispatch);

LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);


export default withRouter(LoginContainer);
