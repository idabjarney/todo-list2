// Selectors
const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');
const filterOption = document.querySelector(".filterTodo");

// Event listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions

function addTodo(event){
    // Prevent form from submitting
    event.preventDefault()
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    //Add todo to local storage
    saveLocalTodos(todoInput.value);
    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completeButton");
    todoDiv.appendChild(completedButton);
    // Bin button
    const binButton = document.createElement('button');
    binButton.innerHTML = '<i class="fa fa-trash"></i>';
    binButton.classList.add("binButton");
    todoDiv.appendChild(binButton);
    // Append to list
    todoList.appendChild(todoDiv);
    // Clear input value
     todoInput.value = "";
}

function deleteCheck (event) {
    const item = event.target;
    // Delete todo
    if(item.classList[0] === 'binButton'){
        const todo = item.parentElement;
        //Delete animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // Check mark 
    if(item.classList[0] === "completeButton"){
        const todo = item.parentElement; 
        todo.classList.toggle("completed");
    }
}
 
function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "incompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }

        }
    });
}

function saveLocalTodos(todo){
    // Check if there's already something saved
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


