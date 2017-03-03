import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Бар желаний бла бла бла</h1>
                <Link to="login">Хочу попробовать</Link>
            </div>
        );
    }
}

export default HomePage;