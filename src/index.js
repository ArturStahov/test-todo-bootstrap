import 'normalize.css';
import './scss/main.scss';

import httpService from './services/api/todos-http-axios.js';
import { initModal, editTodo } from './components/modal.js';
import { renderCardsList } from './components/list-cards.js';
import { excludeParams } from './utils/utils.js';
import { notification } from './utils/notificator.js';
import { initShopModal, renderShopContent } from './components/modal-shop.js'

let todos = [];

let shop = [];

const refs = {
    list: null,
}

refs.list = document.querySelector('[data-cards="list"]');

async function loadList() {
    try {
        const data = await httpService.getTodoList();
        if (data.length) {
            todos = [...data];
            renderProcess()
        }
    } catch (error) {
        notification(error.message, 'error');
    }
}

loadList();

const modalConfig = {
    selectorBtn: '[data-button="add"]',
    selectorModal: "[data-modal-create='create']",
    fields: getFields(),
    async action(payload) {
        if (payload.id) {
            await editTodoAction(payload);
        } else {
            await createTodoAction(payload);
        }
        renderProcess()
    },
}

function getFields() {
    return [
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
    ];
}

function renderProcess() {
    const todoArray = todos;
    renderCardsList(todoArray);
    initActions();
}

async function createTodoAction(payload) {
    try {
        const data = await httpService.createTodo(payload);
        todos = [data, ...todos];
        notification('Todo was created!', 'success');
    } catch (error) {
        notification(error.message, 'error');
    }
}

async function editTodoAction(payload) {
    try {
        const editTodoID = payload.id;
        const exclude = ['id'];
        const editData = excludeParams(payload, exclude);
        await httpService.updateTodo(editData, editTodoID);
        const idx = todos.findIndex(item => item.id === payload.id);
        if (idx !== -1) {
            todos.splice(idx, 1, payload);
        }
        notification('Todo was edited!', 'success');
    } catch (error) {
        notification(error.message, 'error');
    }
}

async function deleteTodoActions(deleteTodoId) {
    try {
        await httpService.deleteTodo(deleteTodoId);
        todos = todos.filter(todo => {
            return todo.id !== Number(deleteTodoId)
        });
        notification('Todo was deleted!', 'success');
    } catch (error) {
        notification(error.message, 'error');
    }
}

function initActions() {
    if (refs.list) {
        addEvents('[data-todo="btn-delete"]', handlerDeleteButton);
        addEvents('[data-todo="btn-edit"]', handlerEditButton);
        addEvents('[data-todo="btn-bay"]', handlerBayButton);
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

function handlerBayButton(e) {
    console.log('bay')
    const { todoId } = e.target.dataset;
    const todoItem = todos.find(item => item.id === Number(todoId));

    const shopItem = {
        ...todoItem,
        counterBay: 1
    }

    const idx = shop.findIndex(item => item.id === Number(todoId));
    if (todoItem && idx === -1) {
        shop = [...shop, shopItem];
    } else {
        shopItem.counterBay += 1;
        shop.splice(idx, 1, shopItem);
    }

    renderShopContent(shop);
}

function handlerEditButton(e) {
    const { todoId } = e.target.dataset;
    const editItem = todos.find(todo => todo.id === Number(todoId));
    editTodo(editItem);
}

async function handlerDeleteButton(e) {
    const { dataset } = e.target;
    const deleteTodoID = dataset.todoId
    await deleteTodoActions(deleteTodoID)
    renderProcess();
}

initModal(modalConfig);


const modalShopConfig = {
    selectorBtn: '[data-button="shop"]',
    selectorModal: "[data-modal-shop='shop']",
    async action(payload) {
        console.log(payload, 'Payload')
    },
}


initShopModal(modalShopConfig);