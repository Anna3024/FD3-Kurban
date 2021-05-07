import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

let n=0;

class RainbowFrame extends React.Component {

    static PropTypes = {
        colors: PropTypes.arrayOf(PropTypes.string.isRequired),
        children: PropTypes.string
    }

    render () {
        
        if (n<this.props.colors.length) {
            return <RainbowFrame colors={this.props.colors}>
                <div style = {{borderColor : this.props.colors[n++]}}>{this.props.children}</div>
            </RainbowFrame>
        }
        else {
            return this.props.children
        }
    }
}

export default RainbowFrame;