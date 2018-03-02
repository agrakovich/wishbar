import React, {PropTypes} from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './common/Header';
import './app.scss'

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className>
                    <Header />
                    <div className="main-content row">
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;