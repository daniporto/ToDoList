const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();
      
    console.log(inputIsValid);

    if(!inputIsValid) {
        return inputElement.classList.add("error");
    }
    
// to create the div
const taskItemContainer = document.createElement("div");
// that is the class created
taskItemContainer.classList.add("task-item");

// create the paragraph
const taskContent = document.createElement("p");
taskContent.innerText = inputElement.value;

//when clicked will appear risked  
taskContent.addEventListener("click", () => handleClick(taskContent));

// create icone
const deleteItem = document.createElement("i");
//create class for this icone in 2 parts(because is 2 casses oly can be create separated)
deleteItem.classList.add("fa-solid");
deleteItem.classList.add("fa-trash");

//make when you click in delete, will delete
deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

taskItemContainer.appendChild(taskContent);
taskItemContainer.appendChild(deleteItem);

tasksContainer.appendChild(taskItemContainer);

inputElement.value = "";

updateLocalStorage();

};

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild === (taskContent);

        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle("completed");
        }
    }
    updateLocalStorage();
};
const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks =  tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild === (taskContent);

        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }
    updateLocalStorage();
};

 

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid){
        return inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;


    if (tasks && tasks.length > 0) {
        const localStorageTasks = [...tasks].filter((task) => task.nodeName === 'DIV').map((task) => {
          const content = task.firstChild;
          if (content && content.nodeType === 1) {
            const isCompleted = content.classList.contains("completed");
            return { description: content.innerText, isCompleted: isCompleted };
          }
          return null; // Ignore non-element nodes
        }).filter(Boolean); // Remove null entries
    
        localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
      }

};
const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];


    for (const task of tasksFromLocalStorage) {

        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");


        const taskContent = document.createElement("p");
        taskContent.innerText = task.description;


        if (task.isCompleted){

            taskContent.classList.add("completed");
 };

        taskContent.addEventListener("click", () => handleClick(taskContent));


        const deleteItem = document.createElement("i");
        deleteItem.classList.add("fa-solid");
        deleteItem.classList.add("fa-trash");


        deleteItem.addEventListener("click", () => 
            handleDeleteClick(taskItemContainer, taskContent)
 );

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);

        tasksContainer.appendChild(taskItemContainer);

}

};


    refreshTasksUsingLocalStorage();

    addTaskButton.addEventListener("click", () => handleAddTask());

    inputElement.addEventListener("change", () => handleInputChange());


