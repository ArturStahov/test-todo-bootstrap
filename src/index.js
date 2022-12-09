import 'normalize.css';
import './scss/main.scss';


import { initModal } from './components/modal.js';

const modalConfig = {
    selectorBtn: '[data-button="add"]', 
    selectorModal: "[data-modal='create']",
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
    action: null,
}

initModal(modalConfig);