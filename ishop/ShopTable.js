let ShopTable = React.createClass({

    displayName: "ShopTable",

    getDefaultProps: function() {
        return {
            shopName: "ishop",
        }
    },

    render: function() {

        let tableHeader = ["Name", "Price", "URL", "Quantity"];

        let catalogCodeTable = this.props.catalog.map((v)=>{
            return React.DOM.tr (null, 
                React.DOM.td(null, v.name),
                React.DOM.td(null, v.price),
                React.DOM.td(null, v.image),
                React.DOM.td(null, v.count))     
        });
        
        return React.DOM.div( null, 
            React.DOM.h1( {className:'shopName'}, this.props.shopName), 
            React.DOM.table( {className:'shopTable'}, 
                React.DOM.thead(null, React.DOM.tr(null, tableHeader.map((v)=> React.DOM.th(null, v)))), 
                React.DOM.tbody(null, catalogCodeTable))
        );
    }
});
