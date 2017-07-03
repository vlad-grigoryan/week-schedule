import  React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import {SetSigninStatusAction} from '../../actions';

import config from '../../../../config/authConfig';

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);

        }
        getAuthStatus = (isAuth) => {
          return   {
              auth : {
                  isAuthenticated: isAuth,
              }
          }
        };

        loadGoogleApi = () => {
            const script = document.createElement("script");
            script.src = "https://apis.google.com/js/api.js";

            script.onload = () => {

                    gapi.load('auth2', () => {
                        return  gapi.auth2.init({
                            client_id: config.gapiClientId,
                            scope: 'profile'
                        }).then((GoogleAuth)=>{
                            let userAccessToken = GoogleAuth.currentUser.get().getAuthResponse().access_token;

                            if(userAccessToken) {
                                let params = {
                                    token: userAccessToken
                                };
                                axios.post('/api/v1/isAuth', params)
                                    .then((response)=> {
                                        this.props.SetSigninStatusAction(response.data.isAuthenticated);
                                    })
                            } else {
                                this.props.SetSigninStatusAction(false);
                            }

                        })

                });


            };
            document.body.appendChild(script);

        };

        componentDidMount() {
            this.loadGoogleApi();
        }

        render() {
            return(
                <div>
                    <Component {...this.props}/>
                </div>
            )

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


    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}




