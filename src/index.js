import 'normalize.css';
import './scss/main.scss';


import { initModal } from './components/modal.js';
import { renderCardsList } from './components/list-cards.js'

let todos = []

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
        todos = [payload, ...todos];
        renderCardsList(todos, actionDeleteTodo);
    },
}

function actionDeleteTodo(idTodo) {
    todos = todos.filter(todo => todo.id !== idTodo);
    renderCardsList(todos, actionDeleteTodo);
}

initModal(modalConfig);