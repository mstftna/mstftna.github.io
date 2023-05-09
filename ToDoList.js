const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todo-search")

let todos = [];
runEvents();

function runEvents(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", showTodosFromStorage);
    secondCardBody.addEventListener("click", removeTodo);
    clearButton.addEventListener("click", removeAllTodos);
    filterInput.addEventListener("keyup", filterTodos)
}

function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("danger", "Please don't leave it blank")
    }
    else{
        //adding todo to ui
        addTodoToUI(inputText);
        //adding todo to local storage
        addTodoToStorage(inputText);
        //showing alert
        showAlert("success", "Your ToDo has been succesfuly added!");
    }

    
    console.log("submitted")
    e.preventDefault();
}

function showTodosFromStorage(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        console.log(todo);
        addTodoToUI(todo);
    });
}

function addTodoToUI(todo){
    //creating the element with this template below

    // <li class="list-group-item d-flex justify-content-between">Todo 1
    //     <a href="#" class="delete-item">
    //         <i class="fa fa-remove"></i>
    //     </a>
    // </li>

    const li = document.createElement("li");
    li.textContent = todo;
    li.className = "list-group-item d-flex justify-content-between";

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoToStorage(todo){
    checkTodosFromStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message){
    //creating the element with this template below

    // <div class="alert alert-type" role="alert">
    //     message
    // </div>
    
    const div = document.createElement("div");
    const hr = document.createElement("hr");
    div.className = "alert alert-" + type;
    div.textContent = message; 
    firstCardBody.appendChild(hr);
    firstCardBody.appendChild(div);


    setTimeout(function(){
        div.remove();
        hr.remove();
    }, 2500)
}

function removeTodo(e){
    const clickedItem = e.target;
    if (clickedItem.className === "fa fa-remove"){
        //removing from screen
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        showAlert("success", "ToDo removed succesfuly!")

        //removing from storage
        removeTodoFromStorage(todo.textContent);
    }
}

function removeTodoFromStorage(removeThisTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo, index){
        if (removeThisTodo === todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeAllTodos(){
    const removingTodos = document.querySelectorAll(".list-group-item");
    if (removingTodos.length > 0){
        //removing from screen
        removingTodos.forEach(function(todo){
            todo.remove();
        });

        //removing from storage
        todos=[]
        localStorage.setItem("todos", JSON.stringify(todos));
    }else{
        showAlert("warning", "You need to have at least one To Do to delete it all!")
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const filteringTodos = document.querySelectorAll(".list-group-item");

    if (filteringTodos.length > 0){
        filteringTodos.forEach(function(todo){
            if (todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style", "display : block");
            }
            else{
                todo.setAttribute("style", "display : none !important");
            }
        });
    }
    else{
        showAlert("warning", "You need to have at least one To Do to filter to do's!");
        e.target.value = "";
    }
}
