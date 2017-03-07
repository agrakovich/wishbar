import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LogInPage from './components/LogInPage';
import AdminLogInPage from './components/AdminLogInPage';
import AdminPanel from './components/AdminPanel';
import WishCategoriesPage from './components/wishcategory/WishCategoriesPage';
import AddWishCategoryPage from './components/wishcategory/AddWishCategoryPage';
import WishTypesPage from './components/wishtype/WishTypesPage';
import AddWishTypePage from './components/wishtype/AddWishTypePage';
import WishOrder from './components/WishOrderPage';
import OrderCreatedPage from './components/OrderCreatedPage';
import auth from './services/authService';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/admin" component={AdminLogInPage} />
        <Route path="/ordercreated" component={OrderCreatedPage} />
        <Route path="/wish" component={WishOrder} onEnter={requireAuth}/>
        <Route path="/admin/panel" component={AdminPanel} onEnter={requireAdminAuth}/>
        <Route path="/admin/wish/categories" component={WishCategoriesPage} onEnter={requireAdminAuth}/>
        <Route path="/admin/wish/categories/add" component={AddWishCategoryPage} onEnter={requireAdminAuth}/>
        <Route path="/admin/wish/types" component={WishTypesPage} onEnter={requireAdminAuth}/>
        <Route path="/admin/wish/types/add" component={AddWishTypePage} onEnter={requireAdminAuth}/>
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

function requireAdminAuth(nextState, replace) {
    if (!auth.isLoggedIn() || !auth.isAdmin()) {
        replace({
            pathname: '/admin',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}