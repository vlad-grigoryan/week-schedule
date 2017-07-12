import React from 'react';
import { Component } from 'react';
import './styles.scss';

//TODO: Finish this component
export default class ErrorDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: null
        }
    }
    componentWillReceiveProps(nextProps) {
         switch (nextProps.errorMessage)  {
             case 'idpiframe_initialization_failed	':
                 this.setState({
                     errorMessage : "nitialization of the Google Auth API failed (this will occur if a client doesn't have third party cookies enabled)"
                 });
                 break;
             case 'popup_closed_by_user':
                 this.setState({
                     errorMessage : "Closed the popup before finishing the sign in flow."
                 });
                 break;
             case 'access_denied':
                 this.setState({
                     errorMessage : "Denied the permission to the scopes required."
                 });
                 break;
             case 'immediate_failed':
                 this.setState({
                     errorMessage : "No user could be automatically selected without prompting the consent flow."
                 });
                 break;
             case 'should_simply_email':
                 this.setState({
                     errorMessage : "You can login only with simpletechnologies.net email"
                 });
                 break;
             default:
                 this.setState({
                     errorMessage : "There is some error please contact with us."
                 });
         }

    }

    render() {
        return (
            <div className="error_container">
                <span>{this.state.errorMessage}</span>
            </div>
        );
    }
}