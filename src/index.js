import { generate } from 'rxjs/internal/observable/generate';

const controllers = require('./controllers')
import './css/styles.css';
require('../node_modules/jquery/dist/jquery.js');

import { addTask } from './controllers/cards'

import { saveModalData } from './services/service'

import { deleteRecordFromJsonServer } from './services/deleteCardService'

import { displayCards } from './view/displayCard'

import { getCards } from './services/getCardsService'
import { store } from './store'


if (window.performance) {
  console.log("window.performance works fine on this browser");
}

if (performance.navigation.type == 1) {
  console.info("This page is reloaded");

  getCards().then(function (cardsData) {
    console.log("display call from index.js");
    store.dispatch({ type: 'GET_CARDS', cardsData });

    //displayCards(cardsData)

  }).catch(function (err) {
    console.log(err)
  });
}

window.onload = function () {
  const getSorted = (className) => {
    $("." + className).sortable();
    $("." + className).disableSelection();
  }


  const addNewTask = document.getElementById('addNewTask');
  addNewTask.onclick = addTask;

  // Remove item
  const itemList = document.getElementById('items');
  itemList.addEventListener('click', removeItem);

  function removeItem(e) {
    if (e.target.classList.contains('delete')) {
      if (confirm('Are You Sure?')) {
        let li = e.target.parentElement;
        itemList.removeChild(li);
      }
    }
  }

  //save modal data on body



  save.onclick = saveModalData;

  //code to add a new list item if we press Enter key
  $('#cardForm').keypress(function (event) {
    const keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      addTask(event);
    }
  });

  // Remove card
  var newcards = document.getElementById('newcards');
  newcards.addEventListener('click', removeCard);

  function removeCard(e) {
    if (e.target.classList.contains('archive')) {
      if (confirm('Are You Sure?')) {
        let card = e.target.parentElement;
        newcards.removeChild(card);
      }
    }
  }

  //on change of checkbox, update the data and time of that perticular card
  var newcards = document.getElementById('newcards');

  newcards.addEventListener('click', updateDateAndTime);

  function updateDateAndTime(e) {
    console.log(e)
    if (e.target.classList.contains('checkBoxCls')) {
      const li = e.target.parentElement;
      const ul = li.parentElement;
      ul.parentElement.lastElementChild.textContent = document.createTextNode((new Date()).toLocaleString()).data;
    }
  }

  //on click of Archive button remove that record from json-server
  var newcards = document.getElementById('newcards');

  newcards.addEventListener('click', deleteRecordFromJsonServer);




}








