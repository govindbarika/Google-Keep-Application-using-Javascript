import {createStore} from 'redux';

import {keepApp} from './reducer'
var card = { tasks: [], cardTitle: "" };

export var store = createStore(keepApp, card);

 