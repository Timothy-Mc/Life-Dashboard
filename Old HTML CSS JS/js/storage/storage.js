// storage/storage.js

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromStorage(key, fallback) {
    const saved = localStorage.getItem(key);

    return saved ? JSON.parse(saved) : fallback;
}