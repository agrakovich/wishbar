import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LogInPage from './components/LogInPage';
import WishOrder from './components/WishOrderPage';
import auth from './services/authService';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/wish" component={WishOrder} onEnter={requireAuth}/>
    </Route>
);

function requireAuth(nextState, replace) {
    if (!auth.isLoggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}