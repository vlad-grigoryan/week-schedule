import  React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {Loading} from '../../components';

function MainWrapper (props) {
    if (props.appReady) {
        return (
            <div>
                {props.children}
            </div>
        )
    }
    return (
        <Loading />
    )
}

const mapStateToProps = (state) => {
    return {
        appReady: state.appReady,
    }
};
MainWrapper = withRouter(MainWrapper);
MainWrapper = connect(mapStateToProps, null)(MainWrapper);


export default MainWrapper;