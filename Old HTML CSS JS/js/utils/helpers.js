// utils/helpers.js
function formatName(name) {
    return String(name)
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

function getTodayIndex() {
    const day = new Date().getDay();

    return day === 0 ? 6 : day - 1;
}

export { formatName, getTodayIndex };