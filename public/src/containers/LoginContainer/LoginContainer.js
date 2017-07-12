import React, {Component} from "react";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Loading, Login} from "../../components";
import {fetchAuth, googleResponse} from "../../reducers/auth";
import {authSelector} from "../../selectors";


class LoginContainer extends Component {
    constructor(props) {
        super(props);

    };

    componentWillMount() {
        this.props.fetchAuth();
    }

    responseGoogle = (response) => {
        this.props.googleResponse(response, this.props.history)
    };

    render() {
        const {isLoaded, isStarted, isAuthenticated} = this.props;

        return (
            <div>
                {
                    isStarted
                        ? (<Loading />)
                        : (isLoaded
                        ? (!isAuthenticated
                            ? (<Login onGoogleResponse={this.responseGoogle} errorMessage={this.props.error}/>)
                            : <Redirect to="/dashboard"/>)
                        : (<div/>))
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ...authSelector(state)
    }
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchAuth,
    googleResponse
}, dispatch);

LoginContainer = withRouter(LoginContainer);
LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);


export default LoginContainer;
