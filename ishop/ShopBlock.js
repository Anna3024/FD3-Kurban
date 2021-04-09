let ShopBlock = React.createClass({

    displayName: "ShopBlock",

    getDefaultProps: function() {
        return {
            shopName: "ishop",
        }
    },

    render: function() {

        let catalogCode = this.props.catalog.map((v)=>{
            return React.DOM.div({key: v.code, className: 'card'},
            React.DOM.img({src:v.image}),
            React.DOM.h2(null, v.name),
            React.DOM.h3(null, `Цена: ${v.price} BYN/100гр`),
            React.DOM.p(null, `Остаток на складе: ${v.count} шт/100гр` ),
            );
        });
        
        return React.DOM.div( {className:'shopBlock'}, 
            React.DOM.h1( null, this.props.shopName), 
            React.DOM.div({ className:"catalog"}, catalogCode),
        );
    }
});