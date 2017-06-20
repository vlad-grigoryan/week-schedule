import React from 'react';
import { Component } from 'react';
import './styles.scss';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="dashboard_container">
                <h1>Welcome to your Dashboard</h1>
            </div>
        );
    }
}