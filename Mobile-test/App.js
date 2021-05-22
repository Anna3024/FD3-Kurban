"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let companyName='Velcom';
let clientsArr=[ 
  {id:101, surname:"Иванов", name:"Иван", midName:"Иванович", balance:200}, 
  {id:105, surname:"Сидоров", name:"Сидор", midName:"Сидорович", balance:250}, 
  {id:110, surname:"Петров", name:"Петр", midName:"Петрович", balance:180},
  {id:120, surname:"Григорьев", name:"Григорий", midName:"Григорьевич", balance:-220},
];

ReactDOM.render(
  <MobileCompany 
    name={companyName}
    clients={clientsArr}
  />
  , document.getElementById('container') 
);

