import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class AdminPanel extends React.Component {
    render() {
        return (
            <div>
                <Link to="/">Главная</Link>
                <Link to="/admin/wish/categories">Категории</Link>
                <Link to="/admin/wish/types">Желания</Link>
            </div>
        );
    }
}

export default AdminPanel;