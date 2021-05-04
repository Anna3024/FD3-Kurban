"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ShopTable from './components/ShopTable';

let shopNameText = "TeaShop";

import teaCatalog from './teaCatalog.json'

ReactDOM.render(
    <ShopTable
        shopName={shopNameText} 
        catalog={teaCatalog}
    />
    ,document.getElementById('containerTable')
)
