"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileClient from '../components/MobileClient';

test('работа MobileClient', ()=>{

    // создаём тестовую версию компонента
    const component = renderer.create(
    <MobileClient />
    );

    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const buttonElemEdit = component.root.find( el => el.value=='Редактировать'); 
    // и "нажмём" на неё
    buttonElemEdit.props.onClick();

    // получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    // "нажмём" кнопку ещё раз
    buttonElemEdit.props.onClick();

    // и получаем окончательный снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
})