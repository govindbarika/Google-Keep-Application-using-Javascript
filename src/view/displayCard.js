import {store} from '../store'

//subscribe
store.subscribe(() => {
     displayCards(store.getState())
});

export function displayCards(cardsData) {
    if (cardsData == undefined ) {
        return;
    }
    var newcards = document.getElementById("newcards");
    newcards.style.display = "flex";
    newcards.style.flexWrap = "wrap";
    for (let i = 0; i < cardsData.length; i++) {
        const card = document.createElement("div");
        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        const h2 = document.createElement('h2');
        h2.textContent = "Task Card";
        cardHeader.style.background = "darkgray";
        cardHeader.appendChild(h2);
        card.appendChild(cardHeader);


        card.className = "card";

        //card.style.height = "fix";
        card.style.width = "20rem";
        card.style.margin = "10px";
        card.style.background = "lightgray";

        const h3 = document.createElement("h3");
        h3.textContent = cardsData[i].cardTitle;
        card.appendChild(h3);
        //read tasks
        const tasks = cardsData[i].tasks;
        const ul = document.createElement('ul');
        //ul.style.flexWrap="wrap";

        for (let j = 0; j < tasks.length; j++) {
            const li = document.createElement('li');
            const checkboxInput = document.createElement('input');
            const isChecked = tasks[j].checked ? true : "";

            checkboxInput.type = "checkbox";
            checkboxInput.className = "form-check-input checkBoxCls";
            checkboxInput.id = "inlineFormCheckMD" + (i + 1);
            if (isChecked) {
                checkboxInput.setAttribute('checked', isChecked);
            }

            const label = document.createElement('label');
            label.setAttribute("for", checkboxInput.id);
            label.innerText = tasks[j].task;
            li.appendChild(checkboxInput)
            li.appendChild(label)


            li.style.display = "block";
            li.style.margin = "20px";
            li.style.background = "white";
            li.className = "list-group-item";


            ul.appendChild(li);
        }
        ul.className = "sortable ";

        card.appendChild(ul);

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer text-muted';



        const button = document.createElement('button');
        var buttonId = (cardsData[i].id) == undefined? "": "arc_"+cardsData[i].id;
        button.className = "btn btn-danger btn-sm float-right archive" + " " + buttonId;
        button.appendChild(document.createTextNode('Archive'));
        card.appendChild(button);

        const span = document.createElement('span');
        span.className = "dateAndTime";
        span.id = "dateAndTime";
        span.textContent = document.createTextNode((new Date()).toLocaleString()).data;
        cardFooter.appendChild(span);

        card.appendChild(span);
        newcards.appendChild(card);
        getSorted(ul.className);


    }
return newcards;

}


function getSorted(className) {
    $("." + className).sortable();
    $("." + className).disableSelection();
}
