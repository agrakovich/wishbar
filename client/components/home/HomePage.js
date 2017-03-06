import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class HomePage extends React.Component {
    render() {
        if (this.props.logged_in) {
            return (
                <div>
                    Рады видеть, Вас, в нашем баре желаний. хотите оформить заказ?
                        <Link to="/wish">Да!!!!</Link>
                </div>
            );
        } else {
            return (
                <div>
                    Добро пожаловать в наш бар желанй, для оформления заказов необходимо зарегистрироваться.
                    <Link to="/login" activeClassName="active">Хочу зарегистрироваться!</Link>
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return { logged_in: state.auth.session };
}

export default connect(mapStateToProps, null)(HomePage);