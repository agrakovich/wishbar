import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as wishActions from '../../actions/wishActions';
import {Link} from 'react-router';
import '../wish.scss';

class WishCategoryPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.actions.getWishCategories();
    }

    removeCategory(event){
        this.props.actions.removeWishCategory(event.target.value, this.props.wishCategories);
    }

    render() {
        return (
            <div>
                <h2>Категории</h2>
                <Link to="/admin/panel">Админка</Link>
                <Link to="/admin/wish/categories/add">Добавить</Link>
                <table className="table">
                    <tbody>
                    {this.props.wishCategories.map((category, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td><button value={category._id} onClick={this.removeCategory.bind(this)}>Удалить</button></td>
                            </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return{
        wishCategories: state.wish.wishCategories
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(wishActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(WishCategoryPage);