import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as wishActions from '../../actions/wishActions';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className={"form-group"  + (touched && error ? " has-error" : "")}>
        <label className={"form-control-label"}>{label}</label>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type}/>
            {touched && error && <div>{error}</div>}
        </div>
    </div>
)



class AddWishCategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {category: {name: '', place: ''}}
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const field = event.target.name;
        const category = this.state.category;
        category[field] = event.target.value;
        return this.setState({category: category});
    }

    onSave(event) {
        if(this.props.invalid){
            return;
        }
        event.preventDefault();
        this.props.actions.addWishCategory(this.state.category);
    }

    componentWillUnMount(){
        this.props.reset();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <h2>Добавить категорию</h2>
                <Link to="/admin/panel">Админка</Link>
                <Link to="/admin/wish/categories">Назад</Link>
                <form onSubmit={handleSubmit(this.onSave)}>
                    <Field
                        label="Название категории"
                        name="name"
                        type="text"
                        value={this.state.category.name}
                        component={renderField}
                        onChange={this.onChange} />

                    <Field
                        label="Описание"
                        name="description"
                        type="text"
                        value={this.state.category.description}
                        component={renderField}
                        onChange={this.onChange} />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onSave}>Добавить</button>
                    {" "}
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(wishActions, dispatch)
    };
}
export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'addWishCategoryForm',
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Название обязательно.';
        }

        if (!values.description) {
            errors.description = 'Описание обязательно.';
        }

        return errors;
    }
})(AddWishCategoryPage));