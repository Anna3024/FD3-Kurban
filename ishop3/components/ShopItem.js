import React from 'react';
import PropTypes from 'prop-types';

import './ShopItem.css';

class ShopItem extends React.Component {

    static PropTypes = {
        code: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        cbSelected: PropTypes.func.isRequired,
        selectedItem: PropTypes.string,
        cbDelete: PropTypes.func.isRequired,
        cbEdit: PropTypes.func.isRequired,
        canSelectItem: PropTypes.bool.isRequired,
        infoMode: PropTypes.number.isRequired
    }

    itemClicked = (EO) => {
        if (EO.target.tagName!="INPUT") {
            this.props.cbSelected(this.props.code);
        }
    }

    itemDeleted = (EO) => {
        this.props.cbDelete(this.props.code, this.props.name);
    }

    itemEdited = (EO) => {
        this.props.cbEdit(this.props.code);
    }

    render() {
        return (
            <tr className={(this.props.code==this.props.selectedItem && this.props.infoMode==0)?"active":null} onClick={(this.props.canSelectItem)?this.itemClicked:null}>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
                <td>{this.props.image}</td>
                <td>{this.props.count}</td>
                <td>
                    <input type="button" value="Edit" onClick={this.itemEdited} disabled={this.props.infoMode==2 || !this.props.canSelectItem}/>
                    <input type="button" value="Delete" onClick={this.itemDeleted} disabled={this.props.infoMode!=0}/>
                </td>
            </tr>
        )
    }
}

export default ShopItem;