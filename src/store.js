import {createStore} from 'redux';

import {keepApp} from './reducer'
var cards = [];

export var store = createStore(keepApp, cards);

 