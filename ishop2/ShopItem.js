let ShopItem = React.createClass({

    displayName: 'ShopItem',

    propTypes: {
        code: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        cbSelected: React.PropTypes.func.isRequired,
        selectedItem: React.PropTypes.string,
        cbDelete: React.PropTypes.func.isRequired,
    },

    itemClicked: function(event) {
        if (event.target.tagName!="INPUT") {
            this.props.cbSelected(this.props.code);
        }
    },

    itemDeleted: function(event) {
        this.props.cbDelete(this.props.code, this.props.name);
    },

    render: function() {
        return React.DOM.tr ({className: (this.props.code==this.props.selectedItem)?'active':null , onClick: this.itemClicked}, 
            React.DOM.td(null, this.props.name),
            React.DOM.td(null, this.props.price),
            React.DOM.td(null, this.props.image),
            React.DOM.td(null, this.props.count),
            React.DOM.td(null, React.DOM.input({type: 'button', value: 'Delete', onClick: this.itemDeleted})))
    }
})