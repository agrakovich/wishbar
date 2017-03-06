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
        if(this.props.invalid){
            return;
        }
        event.preventDefault();
        this.props.actions.loginUser(this.state.credentials);
    }

    componentWillUnMount(){
        this.props.reset();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSave)}>
                    <Field
                        label="Ваше имя"
                        name="name"
                        type="text"
                        value={this.state.credentials.name}
                        component={renderField}
                        onChange={this.onChange} />

                    <Field
                        label="Место"
                        name="place"
                        type="text"
                        value={this.state.credentials.place}
                        component={renderField}
                        onChange={this.onChange} />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onSave}>Отправить</button>
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
export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'loginForm',
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Имя обязательно.';
        }

        if (!values.place) {
            errors.place = 'Мы должны знать, куда доставить заказ.';
        }

        return errors;
    }
})(LogInPage));