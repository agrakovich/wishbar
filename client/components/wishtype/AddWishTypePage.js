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



class AddWishTypePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {wishType: {name: '', place: '', category: ''}}
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const field = event.target.name;
        const wishType = this.state.wishType;
        wishType[field] = event.target.value;
        return this.setState({wishType: wishType});
    }

    onSave(event) {
        if(this.props.invalid){
            return;
        }
        event.preventDefault();
        this.props.actions.addWishType(this.state.wishType);
    }

    componentWillMount(){
        this.props.actions.getWishCategories();
    }

    componentWillUnMount(){
        this.props.reset();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <h2>Добавить желание</h2>
                <Link to="/admin/panel">Админка</Link>
                <Link to="/admin/wish/categories">Назад</Link>
                <form onSubmit={handleSubmit(this.onSave)}>

                    <div className="form-group">
                        <label className={"form-control-label"}>Категория</label>
                            <div>
                                <Field name="category" className="form-control"  component="select" onChange={this.onChange}>
                                    <option></option>
                                    {this.props.wishCategories.map((category, index) => {
                                        return (<option key={index} value={category._id}>{category.name}</option>)
                                    })}
                                </Field>
                            </div>
                    </div>
                    <Field
                        label="Название"
                        name="name"
                        type="text"
                        value={this.state.wishType.name}
                        component={renderField}
                        onChange={this.onChange} />

                    <Field
                        label="Описание"
                        name="description"
                        type="text"
                        value={this.state.wishType.description}
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

function mapStateToProps(state, ownProps) {
    return {
        wishCategories: state.wish.wishCategories
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'addWishCategoryForm',
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Название обязательно.';
        }

        if (!values.description) {
            errors.description = 'Описание обязательна.';
        }

        if (!values.category) {
            errors.category = 'Категория обязательно.';
        }

        return errors;
    }
})(AddWishTypePage));