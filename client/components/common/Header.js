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
        return (
            <header>
                <div className="row header">
                    <div className="col-xs-12 col-sm-6 col-md-8">
                        <img src="http://image.prntscr.com/image/7cd28215a7f7487cbec0e313187da028.png" style="max-height: 150px;" />
                        <h1>Кафе желаний "Плексочка"</h1>
                    </div>
                    <div className="col-xs-6 col-md-4">
                        {this.props.logged_in &&
                        <a className="btn btn-primary pull-right logout" href="/logout" onClick={this.logOut}>Выйти</a> }
                    </div>
                </div>
            </header>
        );
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
