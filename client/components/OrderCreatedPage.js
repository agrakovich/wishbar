import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class OrderCreatedPage extends React.Component {
    render() {
        return (
            <div>
                <div className="home-content">
                    Спасибо! Ваш заказ формлен, и в ближайшее время будет выполнен
                </div>
                <div className="make-order"><Link className={"btn btn-primary"} to="/">На главную</Link></div>
            </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return { logged_in: state.auth.session };
}

export default connect(mapStateToProps, null)(OrderCreatedPage);