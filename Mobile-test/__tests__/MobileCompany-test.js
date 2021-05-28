"use strict";

import React from 'react';
import renderer from 'react-test-renderer';


import clientsArr from '../clientsArr.json';
import MobileCompany from '../components/MobileCompany';

test('работа MobileCompany', ()=>{

    // создаём тестовую версию компонента
    const component = renderer.create(
        <MobileCompany name='Velcom' clients={clientsArr}/>
    );

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const btnShowAll = component.root.find( el => el.props.value=="Все");
    btnShowAll.props.onClick();
    // получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const btnShowActive = component.root.find( el => el.props.value=="Активные");
    btnShowActive.props.onClick();
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const btnShowBlock = component.root.find( el => el.props.value=="Заблокированные");
    btnShowBlock.props.onClick();
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const btnAdd = component.root.find( el => el.props.value=="Добавить клиента");
    btnAdd.props.onClick();
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    btnAdd.props.onClick();
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
        
})