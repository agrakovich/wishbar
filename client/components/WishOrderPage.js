import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as wishActions from '../actions/wishActions';
import './wishOrder.scss'

class WishOrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);

    }

    componentWillMount(){
        this.props.actions.getWishTypes();
    }

    componentWillUnMount(){
        this.props.reset();
    }

    onSave(event) {
        if(this.props.invalid){
            return;
        }
        event.preventDefault();
        this.props.actions.createOrder({ note: this.props.note, choice: this.props.checkedWishes });
    }

    onChange(event) {
        this.props.actions.wishOrderFieldChanged(event.target.name, event.target.value);
    }
    onCheckBoxChange(event) {
        this.props.actions.wishChecked(event.target.checked, event.target.value, this.props.checkedWishes);
    }

    onSave(event) {
        event.preventDefault();
        if(this.props.note == '' && this.props.checkedWishes == ''){
            this.props.actions.wishOrderValidationFailed([{error: 'Необходимо хоть что-то заказать'}]);
            return;
        }
        this.props.actions.makeOrder({ checkedWishes: this.props.checkedWishes, note: this.props.note });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.wishOrderErrors.map((err, index) => {
                        return (
                            <div key={index} className="alert alert-danger" role="alert">
                                {err.error}
                            </div>)
                    })}
                </ul>
                <form className="orderWishForm wishtypes-list">
                    <div className="form-group row">
                        {this.props.wishTypes.map((wishType, index) => {
                            return (
                                <div className="form-check" key={wishType._id}>
                                    <label title={wishType.description} className="form-check-label">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={wishType._id}
                                            onChange={this.onCheckBoxChange} />
                                        {wishType.name}
                                    </label>
                                </div>

                        )})}
                    </div>
                    <div className="form-group row">
                        <textarea placeholder="Примечание" name="note" onChange={this.onChange}>
                        </textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onSave}>Оформить заказ</button>
                    {" "}
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return{
        wishTypes: state.wish.wishTypes,
        checkedWishes: state.wish.checkedWishes,
        wishOrderErrors: state.wish.wishOrderErrors,
        note: state.wish.note ? state.wish.note : ''
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(wishActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(WishOrderPage);