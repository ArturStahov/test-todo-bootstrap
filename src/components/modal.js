const refs = {
    btnOpenModal: null,
    modal: null,
    body: document.body,
    btnsClose: [],
    contentNode: null,
    btnCreate: null,
};

let editItemId = null;

export function initModal(config) {
    refs.btnOpenModal = document.querySelector(config.selectorBtn);
    refs.modal = document.querySelector(config.selectorModal);
    refs.contentNode = refs.modal.querySelector('[data-modal-content="content"]');

    if (refs.btnOpenModal && refs.modal) {
        refs.btnOpenModal.addEventListener('click', openModalEvent);
        refs.btnsClose = refs.modal.querySelectorAll('[data-modal-close="close"]');
        refs.modal.addEventListener('click', closeModal);
        refs.btnsClose.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        refs.btnCreate = refs.modal.querySelector('[data-modal-button="create"]');
        refs.btnCreate && refs.btnCreate.addEventListener('click', (e) => {
            actionCreatePayload(config.action);
        });
    }

    renderFields(config.fields);
}

function openModalEvent() {
    editItemId = null;
    const button = refs.modal.querySelector('[data-modal-button="create"]');
    button && (button.textContent = 'Created');
    openModal();
}


export function editTodo(editItem) {
    console.log(editItem)
    editItemId = editItem.id;
    const fields = refs.modal.querySelectorAll('[data-modal="text-field"]');
    fields.forEach(field => {
        const fieldCode = field.dataset.code;
        field.value = editItem[fieldCode]; editItem['image'];
        console.log(fieldCode, 'fieldCode')
    })
    const button = refs.modal.querySelector('[data-modal-button="create"]');
    button && (button.textContent = 'Edit');
    openModal();
}

function actionCreatePayload(action) {
    let payload = {};
    const fields = refs.modal.querySelectorAll('[data-modal="text-field"]');
    if (fields.length) {
        fields.forEach(field => {
            payload = {
                ...payload,
                [field.dataset.code]: field.value,
            }
        })
    }

    if (editItemId) {
        payload.id = editItemId;
    }

    const isEmptySomeValue = Object.values(payload).some(item => !item);

    if (!isEmptySomeValue) {
        action(payload);
        eventClose();
    } else {
        console.log('have empty value');
    }

}

function clearFormFields() {
    const fields = refs.modal.querySelectorAll('[data-modal="text-field"]');
    if (fields.length) {
        fields.forEach(field => {
            field.value = '';
        })
    }
}

function createInputTemplate(option, index) {
    const template = `<div class="form-fields">
    <label for="fields-${index}">${option.label}</label>
    <input type="${option.type}" class="form-control" data-modal="text-field" data-code="${option.code}" id="fields-${index}">
  </div>`;
    return template;
}

function createTextAreaTemplate(option, index) {
    const template = `<div class="form-fields">
    <label for="fields-${index}">${option.label}</label>
    <textarea class="form-control" id="fields-${index}" data-modal="text-field" data-code="${option.code}" style="height: 100px; resize:none;"></textarea>
  </div>`;
    return template;
}

function flowRenderTemplate(option, index) {
    const flows = {
        ['text']: createInputTemplate,
        ['text-area']: createTextAreaTemplate,
    };
    return flows[option.type](option, index);
}

function renderFields(fields) {
    let template = '';
    fields.forEach((option, index) => {
        template += flowRenderTemplate(option, index);
    });

    refs.contentNode.insertAdjacentHTML('beforeend', template);
}

export function openModal() {
    refs.modal && refs.modal.classList.add('open');
    refs.body && refs.body.classList.add('open-modal');
    window.addEventListener('keydown', closeDownEsc);
}

function closeDownEsc(event) {
    if (event.key === 'Escape') {
        eventClose();
    }

}

export function closeModal(event) {
    const { modalClose, modalCreate } = event.target.dataset;
    if (modalClose || modalCreate) {
        eventClose();
    }
}

function eventClose() {
    clearFormFields();
    refs.modal && refs.modal.classList.remove('open');
    refs.body && refs.body.classList.remove('open-modal');
    window.removeEventListener('keydown', closeDownEsc);
}
