
const refs = {
    btn: null,
    modal: null,
    body: document.body,
    btnsClose: [],
    contentNode: null,
}

export function initModal(config) {
    refs.btn = document.querySelector(config.selectorBtn);
    refs.modal = document.querySelector(config.selectorModal);
    refs.contentNode = refs.modal.querySelector('[data-modal-content="content"]')

    if (refs.btn && refs.modal) {
        refs.btn.addEventListener('click', openModal);
        refs.btnsClose = refs.modal.querySelectorAll('[data-modal-close="close"]');
        refs.modal.addEventListener('click', closeModal);
        refs.btnsClose.forEach(btn => {
            btn.addEventListener('click', closeModal);
        })
    }

    renderFields(config.fields);
}

function createInputTemplate(option,index) {
    const template = `<div class="form-floating">
    <input type="${option.type}" class="form-control" id="floating-${index}">
    <label for="floating-${index}">${option.label}</label>
  </div>`
  return template;
}

function createTextAreaTemplate(option,index) {
    const template = `<div class="form-floating">
    <textarea class="form-control" id="floating-${index}" style="height: 100px; resize:none;"></textarea>
    <label for="floating-${index}">${option.label}</label>
  </div>`
  return template;
}

function flowRenderTemplate(option,index) {
    const flows = {
        ['text']: createInputTemplate,
        ['text-area']: createTextAreaTemplate
    }
    return flows[option.type](option,index);
}

function renderFields(fields) {
    let template = '';
    fields.forEach((option, index) => {
        template += flowRenderTemplate(option,index);
    })

    refs.contentNode.insertAdjacentHTML("beforeend",template)
}

export function openModal() {
    refs.modal && refs.modal.classList.add('open');
    refs.body && refs.body.classList.add('open-modal');
    window.addEventListener("keydown", closeDownEsc)
}

function closeDownEsc(event) {
    if (event.key === "Escape") {
        eventClose();
    }
}

export function closeModal(event) {
    const {modalClose, modal } = event.target.dataset;
    if (modalClose || modal) {
        eventClose();
    }
}

function eventClose() {
    refs.modal && refs.modal.classList.remove('open');
    refs.body && refs.body.classList.remove('open-modal');
    window.removeEventListener("keydown", closeDownEsc);
}