import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

    static PropTypes = {
        colors: PropTypes.arrayOf(PropTypes.string.isRequired),
        children: PropTypes.string
    }

    render () {
        if (this.props.colors.length>0) {
            return (
                <div style = {{borderColor: this.props.colors[0]}}>
                    <RainbowFrame colors={this.props.colors.slice(1)}>
                        {this.props.children}
                    </RainbowFrame>
                </div>
            )
        }
        else {
            return this.props.children
        }
    }

    // render () {

    //     let code = this.props.children;

    //     this.props.colors.forEach((v) => {
    //         code = <div style = {{borderColor: v}}>{code}</div>
    //     });

    //     return code
    // }
}

export default RainbowFrame;