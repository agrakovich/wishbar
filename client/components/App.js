import React, {PropTypes} from 'react';
import Header from './common/Header';
import './app.scss'

class App extends React.Component {
    render() {
        return (
            <div className>
                <Header />
                <div className="main-content row">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;