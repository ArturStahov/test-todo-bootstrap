import 'normalize.css';
import './scss/main.scss';

// import localStorageService from './services/localstorage-service.js';

import httpService from './services/api/todos-http.js';

import { initModal, editTodo } from './components/modal.js';
import { renderCardsList } from './components/list-cards.js';

let todos = []

const refs = {
    list: null,
}

refs.list = document.querySelector('[data-cards="list"]');

// function restoreSaveData() {
//     const data = localStorageService.load();
//     if (data) {
//         todos = [...data];
//         renderCardsList(todos);
//         initActions();
//     }
// }

// restoreSaveData();

async function loadList() {
    try {
        const data = await httpService.getTodoList();
        console.log(data, 'DATA');
        if (data.length) {
            todos = [...data];
            renderCardsList(todos);
            initActions();
        }
    } catch (error) {
        console.log('>>>>>>ERR', error.message)
    }
}

loadList();

const modalConfig = {
    selectorBtn: '[data-button="add"]',
    selectorModal: "[data-modal-create='create']",
    fields: [
        {
            label: 'input you image',
            type: 'text',
            code: 'image',
        },
        {
            label: 'input you title',
            type: 'text',
            code: 'title',
        },
        {
            label: 'input you description',
            type: 'text-area',
            code: 'description',
        },
    ],
    action(payload) {
        const idx = todos.findIndex(item => item.id === payload.id); // -1 
        if (idx === -1) {
            todos = [payload, ...todos];
        } else {
            todos.splice(idx, 1, payload);
        }
        renderCardsList(todos);
        initActions();
        // localStorageService.save(todos);
    },
}

function initActions() {
    if (refs.list) {
        addEvents('[data-todo="btn-delete"]', handlerDeleteButton);
        addEvents('[data-todo="btn-edit"]', handlerEditButton);
    }
}

function addEvents(selector, handler) {
    const todoBtnActions = refs.list.querySelectorAll(selector);
    todoBtnActions.forEach(btn => {
        btn.addEventListener('click', (e) => {
            handler(e);
        })
    })
}

function handlerEditButton(e) {
    const { todoId } = e.target.dataset;
    const editItem = todos.find(todo => todo.id === todoId);
    editTodo(editItem);
}

function handlerDeleteButton(e) {
    const { dataset } = e.target;
    todos = todos.filter(todo => todo.id !== dataset.todoId);
    renderCardsList(todos);
    initActions();
    // localStorageService.save(todos);
}

initModal(modalConfig);