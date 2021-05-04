import React from 'react';
import PropTypes from 'prop-types';

import './ShopTable.css';

import ShopItem from './ShopItem';
import ItemCard from './ItemCard';

class ShopTable extends React.Component {

    static propTypes = {
        catalog: PropTypes.arrayOf(
            PropTypes.shape({
                code: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                count: PropTypes.number.isRequired,
            })
        )
    };

    state = {
        selectedItem: null,
        infoMode: 0, //0 - элемент для редактирования не выбран, 1 - редактировать, 2 - новый
        catalogList: this.props.catalog, 
        changesSaved: true, //сохранены ли изменения после редактирования инпутов
        lastCode: this.props.catalog[this.props.catalog.length-1].code.slice(3), //последний код товара
    }

    itemSelected = (codeItem) => {
        this.setState({selectedItem: codeItem, infoMode: 0});
    }

    itemDelete = (codeItem, nameItem) => {
        if (confirm(`Удалить товар "${nameItem}" (код товара "${codeItem}")?`)){
            this.setState({catalogList: this.state.catalogList.filter((v)=>v.code!=codeItem)})
        };
    }

    itemEdit = (codeItem) => { //редактировать элемент
        this.setState({selectedItem: codeItem, infoMode: 1})
    }

    itemChanges = (savedItem) => { //проверить сохранены ли изменения или добавление 
        this.setState({changesSaved: savedItem})
    }

    itemSaveChanges = (changeItemObj) => { //сохранить изменения после редактирования
        this.setState({catalogList: this.state.catalogList.map((v)=>v.code==changeItemObj.code?changeItemObj:v)})
    }

    itemCancel = (mode) => { //кнопка отмены
        this.setState({infoMode: mode, selectedItem: null})
    }

    addItem = (EO) => { //добавить новый элемент
        this.setState({infoMode: 2});
        this.itemChanges(false);//клики по строкам товаров не должны ничего делать
    }

    saveAddedItem = (addedItemObj, code) => {//сохранить добавленный элемент
        this.state.catalogList.push(addedItemObj);
        this.setState({lastCode: code})
    }

    render() {

        let tableHeader = ["Name", "Price", "URL", "Quantity", "Control"];

        let catalogCodeTable = this.state.catalogList.map((v)=>
            <ShopItem name={v.name} price={v.price} image={v.image} count={v.count} code={v.code} key={v.code} 
            cbSelected={this.itemSelected} selectedItem={this.state.selectedItem} cbDelete={this.itemDelete} cbEdit={this.itemEdit} canSelectItem={this.state.changesSaved} infoMode={this.state.infoMode} 
            />    
        );

        return (
            <div>
                <h1 className="shopName">{this.props.shopName}</h1>
                <table className="shopTable">
                    <thead>
                        <tr>{tableHeader.map((v,i)=> 
                            <th key={i}>{v}</th>)}
                        </tr>
                    </thead>
                    <tbody>{catalogCodeTable}</tbody>
                </table>
                <input type="button" value="New product" onClick={this.addItem} disabled={this.state.infoMode!=0}/>
                {
                    (this.state.selectedItem || this.state.infoMode==2)&&
                    <ItemCard item={this.state.catalogList.filter((v)=>v.code==this.state.selectedItem)[0]} mode={this.state.infoMode} lastCode={this.state.lastCode}
                    cbCanSave={this.itemChanges} cbSave={this.itemSaveChanges} cbCancel={this.itemCancel} cbSaveAddedItem={this.saveAddedItem}/>
                }
            </div>
        )
    }
}

export default ShopTable;