"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import DoubleButton from './components/DoubleButton';
import {withRainbowFrame} from './components/withRainbowFrame';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

let FramedDoubleButton=withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
    <div>
        <DoubleButton caption1="Однажды" caption2="пору" cbPressed={ num => alert(num) }> в студёную зимнюю пору </DoubleButton>
        <FramedDoubleButton caption1="Я из лесу" caption2="мороз" cbPressed={ num => alert(num) }> вышел, был сильный </FramedDoubleButton>
    </div>
    ,document.getElementById('container')
)
