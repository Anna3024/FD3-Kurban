import {EventEmitter} from 'events';

let mobileEvents=new EventEmitter(); 
// в потоке mobileEvents будут все события, связанные с мобильной компанией
// событие "EAnswerClicked" - кликнут вариант ответа, его сэмиттирует VotesAnswer и примет VotesBlock
// событие "EFreeAnswerTextChanged" - изменён текст свободного ответа, его сэмиттирует VotesAnswer и примет VotesBlock
// лучше работать не с текстовыми литералами, а объявить переменные с соответствующими значениями

export {mobileEvents};
