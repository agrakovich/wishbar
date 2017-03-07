import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as wishActions from '../../actions/wishActions';
import {Link} from 'react-router';
import '../wish.scss';

class WishTypesPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.actions.getWishTypes();
    }

    removeType(event){
        this.props.actions.removeWishType(event.target.value, this.props.wishTypes);
    }

    render() {
        return (
            <div>
                <h2>Желания</h2>
                <Link to="/admin/wish/types/add">Добавить</Link>
                <Link to="/admin/panel">Админка</Link>
                <table className="table">
                    <tbody>
                    {this.props.wishTypes.map((type, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{type.name}</td>
                                <td>{type.description}</td>
                                <td>{type.category ? type.category.name : ''}</td>
                                <td><button value={type._id} onClick={this.removeType.bind(this)}>Удалить</button></td>
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
        wishTypes: state.wish.wishTypes
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(wishActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(WishTypesPage);