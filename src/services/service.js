
function getSorted(className) {
    $("." + className).sortable();
    $("." + className).disableSelection();
}
//save modal data on body

export function saveModalData(event) {
    const cardTitleValue = document.getElementById('cardTitle').value;
    const taskList = document.querySelectorAll('#formGroupExampleInput');

    const newcards = document.getElementById("newcards");
    newcards.style.display = "flex";

    const card = document.createElement("div");
    const cardHeader = document.createElement("div");

    cardHeader.className = "card-header";
    const h2 = document.createElement('h2');
    h2.textContent = "Task Card";
    cardHeader.style.background = "darkgray";
    cardHeader.appendChild(h2);
    card.appendChild(cardHeader);


    // card.style.display="flex";        
    card.className = "card";
    // card.style.height = "fix";
    card.style.width = "20rem";
    card.style.margin = "10px";
    card.style.background = "lightgray";

    const h3 = document.createElement("h3");
    h3.textContent = cardTitleValue;
    card.appendChild(h3);

    const ul = document.createElement('ul');

    //get checkbox values
    const checkboxValues = document.querySelectorAll('#inlineFormCheckMD');

    const tasks = new Array();

    for (let i = 0; i < taskList.length; i++) {
        const value = taskList[i].value;
        var checked = "";

        const li = document.createElement('li');
        const checkboxInput = document.createElement('input');
        const isChecked = checkboxValues[i].checked;

        checkboxInput.type = "checkbox";
        checkboxInput.className = "form-check-input checkBoxCls";
        checkboxInput.id = "inlineFormCheckMD" + (i + 1);
        if (isChecked) {
            checkboxInput.setAttribute('checked', isChecked);
            checked = isChecked;
        }

        const label = document.createElement('label');
        label.setAttribute("for", checkboxInput.id);
        label.innerText = value;

        li.appendChild(checkboxInput)
        li.appendChild(label)

        // li.textContent=value;
        li.style.display = "block";
        li.style.margin = "20px";
        li.style.background = "white";
        li.className = " list-group-item";

        tasks.push({ "checked": checked, "task": value });

        ul.appendChild(li);


    }

    ul.className = "sortable ";
    card.appendChild(ul);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer text-muted';


    const button = document.createElement('button');
    button.className = "btn btn-danger btn-sm float-right archive";
    button.appendChild(document.createTextNode('Archive'));
    card.appendChild(button);

    const span = document.createElement('span');
    span.className = "dateAndTime";
    span.id = "dateAndTime";
    span.textContent = document.createTextNode((new Date()).toLocaleString()).data;
    cardFooter.appendChild(span);

    card.appendChild(cardFooter);

    newcards.appendChild(card);
    getSorted(ul.className);

    const cardData = {
        "cardTitle": cardTitleValue,
        "tasks": tasks
    }

    //storing into json-server using ajax call
    console.log(newcards);
    const cardJsonString = JSON.stringify(cardData);

    const settings = {
        async: true,
        crossDomain: true,
        url: "http://localhost:3000/cards/",
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        // "processData": false,
        data: cardJsonString
    }
    console.log(settings)

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    console.log(1);

    return newcards;
}

