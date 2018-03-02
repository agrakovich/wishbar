import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as wishActions from '../../actions/wishActions';
import { Link } from 'react-router';
import { IconButton, Dialog } from 'material-ui';
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
        const { wishTypes } = this.props;
        return (
            <div>
                <h2>Желания</h2>
                <Link to="/admin/wish/types/add">Добавить</Link>
                <Link to="/admin/panel">Админка</Link>
                <table className="table">
                    <tbody>
                    { wishTypes.map((type, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{type.name}</td>
                            <td>{type.description}</td>
                            <td>{type.category ? type.category.name : ''}</td>
                            <td>
                                <IconButton 
                                    iconClassName='material-icons md-24' 
                                    touch 
                                    value={type._id}
                                    tooltip='Редактировать'
                                >
                                    mode_edit
                                </IconButton>
                            </td>
                            <td>
                                <IconButton 
                                    iconClassName='material-icons md-24' 
                                    touch
                                    value={type._id}
                                    tooltip='Удалить' 
                                    onClick={ this.removeType.bind(this) }
                                >
                                    delete_forever
                                </IconButton>
                            </td>
                        </tr>))
                    }
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