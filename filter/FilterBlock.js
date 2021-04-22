let FilterBlock = React.createClass({

    displayName: "FilterBlock",

    propTypes: {
        words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    },

    getInitialState: function() {
        return {
            checkboxState: false,
            inputText: "",
            wordsArr: this.props.words.slice(),
        }
    },

    changeCheckboxState: function(event) {
        this.setState({checkboxState: event.target.checked});
        this.filterWordArr(this.state.inputText, !this.state.checkboxState);
    },

    changeInputText: function(event) {
        this.setState({inputText: event.target.value});
        this.filterWordArr(event.target.value, this.state.checkboxState);
    },

    resetFilter: function(event) {
        this.setState({
            checkboxState: false, 
            inputText: "",
            wordsArr: this.props.words.slice(),
        })
    },

    filterWordArr: function(text, state) {

        let resultArr = (text!="")?this.props.words.slice().filter((v)=>v.indexOf(text)!=-1):this.props.words.slice();

        this.setState({wordsArr: state?resultArr.sort():resultArr});
    },

    render: function() {

        return React.DOM.div({className:'filterBlock'}, 
            React.DOM.input({type: 'checkbox', name: 'alphabetOrder', onClick: this.changeCheckboxState, checked: this.state.checkboxState}),
            React.DOM.input({type: 'text', name: 'filterText', onChange:this.changeInputText,  value:this.state.inputText}),
            React.DOM.input({type: 'button', value: 'сброс', onClick: this.resetFilter}),
            React.DOM.ul(null, this.state.wordsArr.map((v,i) => React.DOM.li(null, v)))
        )
    }
})