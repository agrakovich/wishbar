import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../actions/authActions';
import { Field, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className={"form-group"  + (touched && error ? " has-error" : "")}>
        <label className={"form-control-label"}>{label}</label>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type}/>
            {touched && error && <div>{error}</div>}
        </div>
    </div>
)



class AdminLogInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {credentials: {username: '', password: ''}}
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
        if(this.props.invalid){
            return;
        }
        event.preventDefault();
        this.props.actions.loginAdmin(this.state.credentials);
    }

    componentDidMount() {
        document.title = 'Админ заходи';
    }

    componentWillUnMount(){
        this.props.reset();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <ul>
                    {this.props.authErrors.map((err, index) => {
                        return (
                            <div key={index} className="alert alert-danger" role="alert">
                                {err.error}
                            </div>)
                    })}
                </ul>
                <form onSubmit={handleSubmit(this.onSave)}>
                    <Field
                        label="Ваше имя"
                        name="username"
                        type="text"
                        value={this.state.credentials.username}
                        component={renderField}
                        onChange={this.onChange} />

                    <Field
                        label="Пароль"
                        name="password"
                        type="password"
                        value={this.state.credentials.password}
                        component={renderField}
                        onChange={this.onChange} />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onSave}>Войти</button>
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

function mapStateToProps(state, ownProps) {
    return{
        authErrors: state.auth.authErrors
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'adminLoginForm',
    validate: values => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Имя обязательно.';
        }

        if (!values.password) {
            errors.password = 'Пароль обязателен.';
        }

        return errors;
    }
})(AdminLogInPage));