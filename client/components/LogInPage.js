import React, {PropTypes} from 'react';
import TextInput from './common/TextInput';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../actions/authActions';

class LogInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {credentials: {name: '', place: ''}}
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        return this.setState({credentials: credentials});
    }

    onSave(event) {
        event.preventDefault();
        this.props.actions.loginUser(this.state.credentials);
    }

    render() {
        return (
            <div>
                <form>
                    <TextInput
                        name="name"
                        label="name"
                        value={this.state.credentials.name}
                        onChange={this.onChange}/>

                    <TextInput
                        name="place"
                        label="place"
                        type="place"
                        value={this.state.credentials.place}
                        onChange={this.onChange}/>

                    <input
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onSave}/>
                    {" "}
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}
export default connect(null, mapDispatchToProps)(LogInPage);