
const refs = {
    btn: null,
    modal: null,
    body: document.body,
    btnsClose: [],
}

export function initModal(selectorBtn, selectorModal) {
    refs.btn = document.querySelector(selectorBtn);
    refs.modal = document.querySelector(selectorModal);
    if (refs.btn && refs.modal) {
        refs.btn.addEventListener('click', openModal);
        refs.btnsClose = refs.modal.querySelectorAll('[data-modal="close"]');
        refs.btnsClose.forEach(btn => {
            btn.addEventListener('click', closeModal);
        })
    }
}

export function openModal() {
    refs.modal && refs.modal.classList.add('open');
    refs.body && refs.body.classList.add('open-modal');
}

export function closeModal() {
    refs.modal && refs.modal.classList.remove('open');
    refs.body && refs.body.classList.remove('open-modal');
}