// utils/date.js

export function renderDate() {
    const dateEl = document.querySelector('header p');

    const today = new Date();

    dateEl.textContent = today.toLocaleDateString('en-GB', {
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
    });
}