let ShopTable = React.createClass({

    displayName: "ShopTable",

    getDefaultProps: function() {
        return {
            shopName: "ishop2",
        }
    },

    propTypes: {
        catalog: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                code: React.PropTypes.string.isRequired,
                image: React.PropTypes.string.isRequired,
                name: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                count: React.PropTypes.number.isRequired,
            })
        )
    },

    getInitialState: function() {
        return {
            selectedItem: null,
            catalogList: this.props.catalog,
        }
    },

    itemSelected: function(code) {
        this.setState({selectedItem: code});
    },

    itemDelete: function(code, name) {
        if (confirm(`Удалить товар "${name}" (код товара "${code}")?`)){
            this.setState({catalogList: this.state.catalogList.filter((v)=>v.code!=code)})
        };
    },

    render: function() {
        let tableHeader = ["Name", "Price", "URL", "Quantity", "Control"];

        let catalogCodeTable = this.state.catalogList.map((v)=>
            React.createElement (ShopItem, {
                name: v.name, price: v.price, image: v.image,
                count: v.count, code: v.code, key: v.code, cbSelected: this.itemSelected, selectedItem: this.state.selectedItem, cbDelete: this.itemDelete
            })     
        );
        
        return React.DOM.div( null, 
            React.DOM.h1( {className:'shopName'}, this.props.shopName), 
            React.DOM.table( {className:'shopTable'}, 
                React.DOM.thead(null, React.DOM.tr(null, tableHeader.map((v,i)=> React.DOM.th({key: i}, v)))), 
                React.DOM.tbody(null, catalogCodeTable))
        );
    }
});
