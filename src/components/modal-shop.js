const refs = {
    btnOpenModal: null,
    modal: null,
    body: document.body,
    btnsClose: [],
    contentNode: null,
    btnCreate: null,
};


export function initShopModal(config) {
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

}


function openModalEvent() {
    openModal();
}

function actionCreatePayload(action) {
    let payload = {};

    const isEmptySomeValue = Object.values(payload).some(item => !item);

    if (!isEmptySomeValue) {
        action(payload);
        eventClose();
    } else {
        console.log('have empty value');
    }

}

function createItemTemplate(item) {
    const template = `<li class="list-item">
    <p> ${item.title} </p>
    <img src="${item.image}" alt="">
    <button class="btn btn-primary" data-todo="btn-delete-from-shop"  data-todo-id="${item.id}" type='button'> delete </button>
    <span> Counter bay items: ${item.counterBay} </span>
  </li>`;
    return template;
}

export function renderShopContent(items) {
    let template = '';
    items.forEach((item) => {
        template += createItemTemplate(item);
    });

    refs.contentNode.innerHTML = template;
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
    refs.modal && refs.modal.classList.remove('open');
    refs.body && refs.body.classList.remove('open-modal');
    window.removeEventListener('keydown', closeDownEsc);
}
