import 'normalize.css';
import './scss/main.scss';

// import localStorageService from './services/localstorage-service.js';

import httpService from './services/api/todos-http.js';

import { initModal, editTodo } from './components/modal.js';
import { renderCardsList } from './components/list-cards.js';

let todos = [];

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
    async action(payload) {

        if (payload.id) {
            await editTodoAction(payload);

        } else {
            await createTodoAction(payload);
        }

        renderCardsList(todos);
        initActions();
        // localStorageService.save(todos);
    },
}

async function createTodoAction(payload) {
    try {
        const data = await httpService.createTodo(payload);
        todos = [data, ...todos];
    } catch (error) {
        console.log('>>>>>>ERR_Create', error.message)
    }
}

async function editTodoAction(payload) {

    try {
        const editTodoID = payload.id;
        const exclude = ['id'];
        const editData = excludeParams(payload, exclude);

        await httpService.updateTodo(editData, editTodoID);

        const idx = todos.findIndex(item => item.id === payload.id); // -1 
        if (idx !== -1) {
            todos.splice(idx, 1, payload);
        }
    } catch (error) {
        console.log('>>>>>>ERR_Create', error.message)
    }
}

async function deleteTodoActions(deleteTodoId) {
    try {
        await httpService.deleteTodo(deleteTodoId);
        todos = todos.filter(todo => todo.id !== deleteTodoId);
    } catch (error) {
        console.log('error', error.message);
    }
}

function excludeParams(payload, excludeParams) {
    const exclude = new Set(excludeParams)
    return Object.fromEntries(Object.entries(payload).filter(e => !exclude.has(e[0])));
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

async function handlerDeleteButton(e) {
    const { dataset } = e.target;
    const deleteTodoID = dataset.todoId
    await deleteTodoActions(deleteTodoID)
    renderCardsList(todos);
    initActions();
    // localStorageService.save(todos);
}

initModal(modalConfig);