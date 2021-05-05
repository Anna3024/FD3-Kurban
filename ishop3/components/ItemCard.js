import React from 'react';
import PropTypes from 'prop-types';

import './ItemCard.css';

class ItemCard extends React.Component {

    static propTypes = {
        item: PropTypes.shape({
            code: PropTypes.string,
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            count: PropTypes.number,
        }),
        mode: PropTypes.number.isRequired,
        cbCanSave: PropTypes.func.isRequired,
        cbSave: PropTypes.func.isRequired,
        cbCancel: PropTypes.func.isRequired,
        cbSaveAddedItem: PropTypes.func.isRequired,
    };

    state = {
        itemName:  this.props.mode==2?"":this.props.item.name,
        itemPrice: this.props.mode==2?"":this.props.item.price,
        itemCount: this.props.mode==2?"":this.props.item.count ,
        itemImg: this.props.mode==2?"":this.props.item.image,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.mode!=2 && this.props.item.code != prevProps.item.code) {
            this.setState({
                itemName:  this.props.item.name,
                itemPrice: this.props.item.price,
                itemCount: this.props.item.count,
                itemImg: this.props.item.image,
            })
        }
    }

    validItemName = (EO) => {
        this.setState({itemName: EO.target.value.trim()});
        this.changeInputValue(false);
    }

    validItemPrice = (EO) => {
        this.setState({itemPrice: (EO.target.value>0 && EO.target.value)})
        this.changeInputValue(false);
    }

    validItemCount = (EO) => {
        this.setState({itemCount: (+EO.target.value>=0 && Number.isInteger(+EO.target.value) && EO.target.value)})
        this.changeInputValue(false);
    }

    validItemImg = (EO) => {
        let regExp = /([\/\w\.-]*)*\.([a-z\.]{3,4})/;
        this.setState({itemImg: (regExp.test(EO.target.value) && EO.target.value)});
        this.changeInputValue(false);
    }

    changeInputValue = (changeValue) => { //есть ли несохранённые изменения
        this.props.cbCanSave(changeValue)
    }

    saveChanges = (EO) => {
        if (this.props.mode==2) {
            this.props.cbSaveAddedItem({
                code: ("tea" + (+this.props.lastCode+1)),
                image: this.state.itemImg,
                name: this.state.itemName,
                price: +this.state.itemPrice,
                count: +this.state.itemCount
            }, (+this.props.lastCode+1))
        }
        else {
            this.props.cbSave({
                code: this.props.item.code,
                image: this.state.itemImg,
                name: this.state.itemName,
                price: +this.state.itemPrice,
                count: +this.state.itemCount,
            })
        }
        this.cancelChanges()
    }

    cancelChanges = (EO) => {
        this.changeInputValue(true);
        this.props.cbCancel(0)
    }

    render() {
        switch (this.props.mode) {
            case 0:
                return (
                    <div className="card">
                        <h2>{"Название: "+this.props.item.name}</h2>
                        <h3>{"Цена: "+this.props.item.price+" BYN/100гр"}</h3>
                        <p>{"Остаток на складе: "+this.props.item.count+" шт/100гр"}</p>
                        <p>{"URL: "+this.props.item.image}</p>
                    </div>
                )
            case 1:
            case 2:
                return (
                    <div className="card" >
                        <h2>{this.props.mode==1?"Edit existing Product":"Add new product"}</h2>

                        <h3>{"Код товара: " + (this.props.mode==1?this.props.item.code:("tea" + (+this.props.lastCode+1)))}</h3>
                        
                        <label>Название: 
                            <input type='text' name='itemName' value={this.state.itemName} onChange={this.validItemName}/>
                        </label>
                        {
                        (!this.state.itemName)&&<span>Please, fill the field. Value mast be a string</span>
                        }
                        <br/>

                        <label>Цена (BYN/100гр): 
                            <input type='number' name='itemPrice' value={+this.state.itemPrice} onChange={this.validItemPrice}/>
                        </label>
                        {
                        (!this.state.itemPrice)&&<span>Please, fill the field. Value mast be a rational number greater than 0</span>
                        }
                        <br/>

                        <label>Остаток (шт/100гр): 
                            <input type='number' name='itemCount' value={+this.state.itemCount} onChange={this.validItemCount} />
                        </label>
                        {
                        (!this.state.itemCount )&&<span>Please, fill the field. Value mast be a positive integer</span>
                        }
                        <br/>

                        <label>URL: 
                            <input type='text' name='itemImg' value={this.state.itemImg} onChange={this.validItemImg}/>
                        </label>
                        {
                        (!this.state.itemImg)&&<span>Please, fill the field. Value mast be a valid URL</span>
                        }
                        <br/>

                        <input type="button" value={this.props.mode==1?"Save":"Add"} 
                            onClick={this.saveChanges}
                            disabled={!(this.state.itemCount && this.state.itemName && this.state.itemPrice && this.state.itemImg)}/>
                        <input type="button" value="Cancel" onClick={this.cancelChanges}/>
                    </div>
                )
        }
    }
}
export default ItemCard;