let $todoInput; //miejsce, gdzie użytkownik wpisuje treść
let $alertInfo; //info o konieczności dodania treści zadania
let $addBtn; // przycisk dodający nowe elementy do listy zadań
let $ulList; //lista zadań
let $newTask; //nowo dodany li, czyli nowe zadanie
let $allTasks; //lista wszystkich dodanych li
let $idNumber = 0; //ID dodawane do każdego zadania
let $popup; //popup
let $popupInfo; //informacja w popup, gdy nie dodano tekstu
let $editedToDo; //edycja w ToDo
let $popupInput; //tekst wpisywany w popup (input)
let $addPupupBtn; //przycisk "zatwierdź"popup
let $closeToDoBtn; // przycisk do zamykania popup

const main = () => {
    prepareDOMElements ();
    prepareDOMEvents ();
}

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todo-input');
    $alertInfo = document.querySelector('.alert-info');
    $addBtn = document.querySelector('.add-btn');
    $ulList = document.querySelector('.todo-list ul');
    $allTasks = document.getElementsByTagName('li');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popup-info');
    $popupInput = document.querySelector('.popup-input');
    $addPupupBtn = document.querySelector('.accept');
    $closeToDoBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    $addBtn.addEventListener ('click', addNewTask);
    $todoInput.addEventListener ('keyup', enterCheck);
    $ulList.addEventListener ('click',checkClick);
    $addPupupBtn.addEventListener ('click',changeToDo);
    $closeToDoBtn.addEventListener ('click',closePopup);
}

const addNewTask = () => {
    if ($todoInput.value !== ''){
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute ('id', `todo- ${$idNumber}`);
        $ulList.appendChild ($newTask);

        $alertInfo.innerText = '';
        $todoInput.value = '';
        createToolsArea ();

    }else {
        $alertInfo.innerText = "Wpisz treść zadania!";
    }
}

const enterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
}

const createToolsArea = () => {

    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML ='<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML ='EDIT';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML ='<i class="fas fa-times"></i>';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
}

const checkClick = e =>{
    if (e.target.classList.value !== ''){
    if (e.target.closest('button').classList.contains('complete')) {

        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');

    } else if (e.target.closest('button').classList.contains('edit')){
        editTask(e);
    } else if (e.target.closest('button').classList.contains('delete')){
        deleteTask (e);
    }
}
}

    const deleteTask = e => {
        const deleteToDo = e.target.closest('li');
        deleteToDo.remove();

        if ($allTasks.length === 0) {
            $alertInfo.innerText = 'Brak zadań na liście.';
        }
    }

    const editTask = e => {
        const editToDo = e.target.closest('li').id;
        $editedToDo = document.getElementById(editToDo);
        $popupInput.value = $editedToDo.firstChild.textContent;

        $popup.style.display ='flex';
    }

    const changeToDo = () => {
        if ($popupInput.value !== '') {
            $editedToDo.firstChild.textContent= $popupInput.value;
            $popup.style.display ='none';
            $popupInfo.innerText = '';
        }else {
            $popupInfo.innerText = 'Musisz podać treść zadania.';
        }
    }

    const closePopup = () => {
        $popup.style.display ='none';
        $popupInfo.innerText = '';
    }

document.addEventListener ('DOMContentLoaded',main);