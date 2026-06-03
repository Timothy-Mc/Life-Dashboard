// modules/modal.js

let modalMode = '';

const modal = document.getElementById('modal')
const modalInput = document.getElementById('modal-input')

export function getModalInput() {
    return modalInput;
}

export function getModalMode() {
    return modalMode;
}

export function openModal(mode) {
    modalMode = mode;

    const modalTitle = document.getElementById('modal-title')

    modalTitle.textContent = mode === "task" ? "Add Task" : "Add Habit";
    modalInput.placeholder = mode === "task" ? "New task..." : "New habit...";

    modal.classList.add('active');
}

export function closeModal() {
    modalInput.value = "";
    modal.classList.remove('active');
}

export function initModal() {
    document.getElementById('modal-close').onclick = closeModal;

    window.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    }

    modalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const saveBtn = document.getElementById('modal-save-btn');
            if (saveBtn) saveBtn.click();
        }

        if  (e.key === 'Escape') {
            closeModal();
        }
    });
}