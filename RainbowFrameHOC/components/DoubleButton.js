import React from 'react';
import PropTypes from 'prop-types';

import './DoubleButton.css';

class DoubleButton extends React.Component {

    static PropTypes = {
        caption1: PropTypes.string.isRequired,
        caption2: PropTypes.string.isRequired,
        cbPressed: PropTypes.func.isRequired,
    }

    btnClicked (num) {
        this.props.cbPressed(num)
    }

    render () {
        
        return (
            <div className='doubleButton'>
                <input type="button" value={this.props.caption1} onClick={this.btnClicked.bind(this,1)}/>
                {this.props.children}
                <input type="button" value={this.props.caption2} onClick={this.btnClicked.bind(this,2)}/>
            </div>
        )
    }
}

export default DoubleButton;