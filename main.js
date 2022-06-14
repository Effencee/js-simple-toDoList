const array = [];
const btn = document.querySelector('.btn');
const liElements = document.getElementsByClassName('task');
const inputAdd = document.querySelector('.addLi');
const inputNumberAdd = document.querySelector('.numberAdded');
const ul = document.querySelector('ul');
const search = document.querySelector('.search');
const tasks = [];

class ShowAllTasks {
    constructor() {

    }

    showAllLiElem() {
        tasks.forEach((item, key) => {
            item.dataset.key = key;
            ul.appendChild(item);
        })
    }
}

class List {
    constructor() {
        this.result = document.querySelector('.result');
    }

    update() {
        this.result.textContent = `You have ${liElements.length} task/tasks`;
    }
}

class AddingElement {
    constructor() {
        this.ul = document.querySelector('ul');
    }

    append() {
        let li = document.createElement('li');
        if (!array.includes(inputAdd.value) && inputAdd.value != '' && inputNumberAdd.value != '') {
            array.push(inputAdd.value);
            li.classList.add('task');
            li.innerHTML = inputAdd.value + ` x${inputNumberAdd.value} <button>X</button>`;
            tasks.push(li);
            inputAdd.value = '';
            inputNumberAdd.value = '';
        } else if (inputAdd.value === '' && (!array.includes(inputAdd.value) || array.includes(inputAdd.value)) && (inputNumberAdd.value != '' || inputNumberAdd.value == '')) return alert('submit the task');

        else if ((!array.includes(inputAdd.value) || array.includes(inputAdd.value)) && (inputAdd.value != '' || inputAdd.value === '') && inputNumberAdd.value == '')
            return alert('enter how many times');

        else return alert('you already have this task');
        li.querySelector('button').classList.add('buttonColor');
        li.querySelector('button').addEventListener('click', remove);
    }
}

const add = new AddingElement();
const resultUpdate = new List();
const showTasks = new ShowAllTasks();

const remove = (e) => {
    e.target.parentNode.remove();
    const index = e.target.parentNode.dataset.key;
    tasks.splice(index, 1);
    array.splice(index, 1);
    if (liElements.length == 0) {
        tasks.splice(0, tasks.length);
        array.splice(0, array.length);
    }
    resultUpdate.update();
}

btn.addEventListener('click', () => {
    add.append();
    showTasks.showAllLiElem();
    resultUpdate.update();
})

const searchTask = (e) => {
    const searchText = e.target.value.toLowerCase();
    let newTasks = tasks;
    newTasks = newTasks.filter(task => task.textContent.toLowerCase().includes(searchText));
    ul.textContent = '';
    newTasks.forEach(task => ul.appendChild(task));
}

search.addEventListener('input', searchTask);