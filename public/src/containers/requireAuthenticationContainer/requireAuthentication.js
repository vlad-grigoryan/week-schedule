import  React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {SetSigninStatusAction} from '../../actions';


export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isAuthenticated: false
            }

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
                            client_id: '735955037545-r8ujuf1njsm3sv02t371npmmj6ieelaa.apps.googleusercontent.com',
                            scope: 'profile'
                        }).then((GoogleAuth)=>{
                            this.props.SetSigninStatusAction(GoogleAuth.isSignedIn.get());
                            console.log(this.props.auth, "propsssss")
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




