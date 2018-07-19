import { generate } from 'rxjs/internal/observable/generate';

var controllers = require('./controllers')
// var bootstrap = require('bootstrap')
require ('./css/styles.css') 

//require ('../node_modules/bootstrap/dist/css/bootstrap.css')
require ('../node_modules/jquery/dist/jquery.js');
window.onload = function(){


  function getSorted(id){    
    $( "#"+id ).sortable();
    $( "#"+id ).disableSelection();
  }


  getCards().then(function (cardsData) {
    displayCards(cardsData)
  
  }).catch(function(err) {
    console.log(err)
  });
  
  function getCards() {
    return new Promise (function(resolve, reject) {
  
        var settings = {
          "async": false,
          "crossDomain": true,
          "url": "http://localhost:3000/cards",
          "method": "GET",
          "headers": {
            "Cache-Control": "no-cache"
          }
       }
      $.ajax(settings).done(function (response) {
         resolve(response);
      });
  
    })
  }

  // var cardsData = 
  // [{"id":1,"cardName":"cardA", "tasks":[{"task":"taskA",   "isChecked":"false"}, 
  //                                       {"task":"taskAA",  "isChecked":"false"}, 
  //                                       {"task":"taskAAA",  "isChecked":"false"}]}, 
  // {"id":2,"cardName":"cardB", "tasks":[{"task":"taskB",    "isChecked":"false"}, 
  //                                       {"task":"taskBB",  "isChecked":"false"}, 
  //                                       {"task":"taskBBB",  "isChecked":"false"}]}, 
  // {"id":3,"cardName":"cardC", "tasks":[{"task":"taskC",  "isChecked":"false"}, 
  //                                       {"task":"taskCC",  "isChecked":"false"}, 
  //                                       {"task":"taskCCC",  "isChecked":"false"}]}] ;
                                      

  function displayCards(cardsData) { 
    if(cardsData == undefined){
      return;
    }
        var newcards = document.getElementById("newcards");
        newcards.style.display="flex";
        newcards.style.flexWrap="wrap";
        for (var i=0; i< cardsData.length; i++){
          var card = document.createElement("div");  
          //card.style.display="flex";
         
          card.className="card";
         
          card.style.height = "fix";
          card.style.width = "20%";
          card.style.margin= "10px";
          card.style.background="lightgray";

          var h2 = document.createElement("h2");
          h2.textContent = cardsData[i].cardTitle;
          card.appendChild(h2);
          //read tasks
          var tasks = cardsData[i].tasks; 
          var ul = document.createElement('ul');
           //get checkbox values
          //var checkboxValues = document.querySelectorAll('#inlineFormCheckMD');
          //ul.id="taskList"+i;
          for(var j=0;j<tasks.length;j++){          
            ul.id="taskList"+j;            
            
            var li = document.createElement('li');
            var checkboxInput=document.createElement('input');
            var isChecked=tasks[j].checked?true:"";
          
            checkboxInput.type = "checkbox";
            checkboxInput.className="form-check-input checkBoxCls";
            checkboxInput.id="inlineFormCheckMD"+(i+1);
            if(isChecked){
              checkboxInput.setAttribute('checked', isChecked);             
            }
  
  
            var label = document.createElement('label');
            label.setAttribute("for",checkboxInput.id);
            label.innerText=tasks[j].task;
            li.appendChild(checkboxInput)
            li.appendChild(label)
  
            
            // li.textContent=value;
            li.style.display="block";
            li.style.margin="20px";
            li.style.background="white";
            li.className="ui-state-default";
             
            ul.appendChild(li);          
          }      
          getSorted(ul.id);
         
          card.appendChild(ul);        
          
          var button = document.createElement('button');
          button.className="btn btn-danger btn-sm float-right archive";
          button.appendChild(document.createTextNode('Archive'));
          card.appendChild(button);
        
          var span = document.createElement('span');
          span.className="dateAndTime";
          span.id="dateAndTime";
          span.textContent=document.createTextNode((new Date()).toLocaleString()).data;
        
          card.appendChild(span);
          newcards.appendChild(card);
      }

    
    }
  

    //add tasks in modal

    function addTask(event){
      event.preventDefault(); 
      console.log(1);
      var cardForm = document.getElementById('cardForm');

      var items = document.getElementById('items');

      var li = document.createElement('li');
      li.className="list-group-item";

      var inputDiv = document.createElement('input');
      inputDiv.className = "form-check-input";
      inputDiv.id = "inlineFormCheckMD";
      inputDiv.setAttribute('type', 'checkbox');

      var inputDiv1 = document.createElement('input');
      inputDiv1.className="form-control";      
      inputDiv1.id = "formGroupExampleInput";
      inputDiv1.placeholder="task";

      var button = document.createElement('button');
      button.className="btn btn-danger btn-sm float-right delete";
      button.appendChild(document.createTextNode('X'));
      li.appendChild(inputDiv);
      li.appendChild(inputDiv1);
      li.appendChild(button);
      items.appendChild(li);

    
      
      cardForm.appendChild(items);
    }

    var addNewTask = document.getElementById('addNewTask');
    addNewTask.onclick = addTask;

    // Remove item
    var itemList = document.getElementById('items');
    itemList.addEventListener('click', removeItem);
      
      function removeItem(e){
        if(e.target.classList.contains('delete')){
          if(confirm('Are You Sure?')){
            var li = e.target.parentElement;
            itemList.removeChild(li);
          }
        }
      }

      //save modal data on body

      function saveModalData(event){
        var cardTitleValue = document.getElementById('cardTitle').value;
        var taskList = document.querySelectorAll('#formGroupExampleInput');

        var newcards = document.getElementById("newcards");
        newcards.style.display="flex";

        var card = document.createElement("div");  
        card.style.display="flex";        
        card.className="card";
        card.style.height = "fix";
        card.style.width = "20%";
        card.style.margin= "10px";
        card.style.background="lightgray";

        var h2 = document.createElement("h2");
        h2.textContent = cardTitleValue;
        card.appendChild(h2);

        var ul = document.createElement('ul');

        //get checkbox values
        var checkboxValues = document.querySelectorAll('#inlineFormCheckMD');
       
        var tasks=new Array();
        
        for(var i=0;i<taskList.length;i++){
          var value = taskList[i].value;
          var checked="";
          
          var li = document.createElement('li');
          var checkboxInput=document.createElement('input');
          var isChecked=checkboxValues[i].checked;
        
          checkboxInput.type = "checkbox";
          checkboxInput.className="form-check-input checkBoxCls";
          checkboxInput.id="inlineFormCheckMD"+(i+1);
          if(isChecked){
            checkboxInput.setAttribute('checked', isChecked);
            checked = isChecked;
          }


          var label = document.createElement('label');
          label.setAttribute("for",checkboxInput.id);
          label.innerText=value;
          li.appendChild(checkboxInput)
          li.appendChild(label)

          
          // li.textContent=value;
          li.style.display="block";
          li.style.margin="20px";
          li.style.background="white";
          li.className="ui-state-default";

          tasks.push( {"checked":checked, "task":value});
          
          ul.appendChild(li);
          
          
        }
        var count = 1;
        ul.id="googleCards";
        getSorted(ul.id);
        card.appendChild(ul);        

        var button = document.createElement('button');
        button.className="btn btn-danger btn-sm float-right archive";
        button.appendChild(document.createTextNode('Archive'));
        card.appendChild(button);
      
        var span = document.createElement('span');
        span.className="dateAndTime";
        span.id="dateAndTime";
        span.textContent=document.createTextNode((new Date()).toLocaleString()).data;
       
        card.appendChild(span);
       
        newcards.appendChild(card);

        var cardData = {
            "cardTitle": cardTitleValue,
            "tasks": tasks
        }
        
        //storing into json-server using ajax call
        console.log(newcards);
         var cardJsonString = JSON.stringify(cardData); // giving json in string format
        
        var settings = {
          async: true,
          crossDomain: true,
          url: "http://localhost:3000/cards/",
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          // "processData": false,
          data : cardJsonString
        }
        console.log(settings)
        
        $.ajax(settings).done(function (response) {
          console.log(response);
        });
        
        console.log(1);
      }
 
      
      save.onclick = saveModalData;
    

    // Remove card
    var newcards = document.getElementById('newcards');
    newcards.addEventListener('click', removeCard);
      
      function removeCard(e){
        if(e.target.classList.contains('archive')){
          if(confirm('Are You Sure?')){
            var card = e.target.parentElement;
            newcards.removeChild(card);
          }
        }
      }

      //on change of checkbox, update the data and time of that perticular card
      var newcards = document.getElementById('newcards');
     
      newcards.addEventListener('click', updateDateAndTime);
        
        function updateDateAndTime(e){
          console.log(e)
          if(e.target.classList.contains('checkBoxCls')){            
            var li = e.target.parentElement;
            var ul = li.parentElement;            
            ul.parentElement.lastElementChild.textContent = document.createTextNode((new Date()).toLocaleString()).data;            
          }
        }

      //on click of Archive button remove that record from json-server
      var newcards = document.getElementById('newcards');
      
       newcards.addEventListener('click', deleteRecordFromJsonServer);
         
         function deleteRecordFromJsonServer(e){
           console.log(e)
           if(e.target.classList.contains('archive')){            
             var card = e.target.parentElement;
             var cardTitle = card.firstChild.textContent;
             //var ul = li.parentElement;            
             //ul.parentElement.lastElementChild.textContent = document.createTextNode((new Date()).toLocaleString()).data;            
           }
         }

         var mainFooter = document.getElementById('mainFooter');
         mainFooter.style.background = "cadetblue";

         var headertag = document.getElementById('headertag');
         headertag.style.height = "80px";

         body.style.color="khaki";
}

 

 
  

 

 