import React from 'react';

function withRainbowFrame(colors) {
    return function(Component) {
        return props => {
            let code = <Component {...props}/>
            colors.forEach((v)=> {
                code = <div style = {{border: `10px solid ${v}`, padding: '5px'}}>{code}</div>
            });
            return code
        };
    };
}

export { withRainbowFrame };