export function addTask(event){
    event.preventDefault(); 
    console.log(1);
    const cardForm = document.getElementById('cardForm');

    const items = document.getElementById('items');

    const li = document.createElement('li');
    li.className="list-group-item";

    const inputDiv = document.createElement('input');
    inputDiv.className = "form-check-input";
    inputDiv.id = "inlineFormCheckMD";
    inputDiv.setAttribute('type', 'checkbox');

    const inputDiv1 = document.createElement('input');
    inputDiv1.className="form-control";      
    inputDiv1.id = "formGroupExampleInput";
    inputDiv1.placeholder="task";

    const button = document.createElement('button');
    button.className="btn btn-danger btn-sm float-right delete";
    button.appendChild(document.createTextNode('X'));
    li.appendChild(inputDiv);
    li.appendChild(inputDiv1);
    li.appendChild(button);
    li.focus();
    items.appendChild(li);

  
    
    cardForm.appendChild(items);
    return cardForm;
  }
