import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import './header.scss'


class Header extends React.Component {
    constructor(props) {
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(event) {
        event.preventDefault();
        this.props.actions.logOutUser();
    }

    render() {
        if (this.props.logged_in) {
            return (
                <header>
                    <h1>Бар желаний</h1>
                    <a className="btn btn-default pull-right logout" href="/logout" onClick={this.logOut}>Выйти</a>
                </header>
            );
        } else {
            return (
                <header>
                    <h1>Бар желаний</h1>
                </header>
            );
        }
    }
}

Header.propTypes = {
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return { logged_in: state.auth.session };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);