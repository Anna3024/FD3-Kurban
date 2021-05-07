import React from 'react';
import PropTypes from 'prop-types';

import './BR2JSX.css';

class BR2JSX extends React.Component {

    static PropTypes = {
        text: PropTypes.string.isRequired
    }

    render () {

        let regExp = /<br ?\/?>/;
        let arr = this.props.text.split(regExp);
        let resultArr=[];
        
        for (let i=0; i<arr.length; i++) {
            resultArr.push(arr[i]);
            resultArr.push(<br key={i}/>);
        }
        resultArr.pop();
        
        return (
            <div className="br2jsx">
                {resultArr}
            </div>
        )
    }
}

export default BR2JSX;