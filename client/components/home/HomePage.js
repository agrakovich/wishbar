import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class HomePage extends React.Component {
    render() {
            return (
                <div>
                    <div className="home-content">
                        Милые, прекрасные девушки команды PLEX! Сегодня мы приглашаем вас окунуться в атмосферу нашего заведения! Когда любовь и мастерство соединяются, рождается шедевр. И этот шедевр – кафe «Плексочка». Медленное обслуживание, грязные стаканы, скверная еда, грубый персонал, дорого – это все не про нас!
                        Пожалуйста, располагайтесь, знакомитесь с меню и делайте свой выбор. Наше меню — это ощущения, которые невозможно передать.
                        Высококвалифицированный персонал кафэ «Плексочка» исполнит ваш заказ в кратчайшие сроки! Добро пожаловать!
                        Так же советуем периодически к нам заглядывать - будут предложения часа
                    </div>
                    <div className="make-order"><Link className={"btn btn-primary"} to="/wish">Сделать заказ</Link></div>
                </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return { logged_in: state.auth.session };
}

export default connect(mapStateToProps, null)(HomePage);