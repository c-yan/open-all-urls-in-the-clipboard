'use strict';
(() => {
    function saveOptions(e) {
        browser.storage.sync.set({
            shortcut: document.querySelector('#shortcut').value
        });
        e.preventDefault();
    }

    async function getShortcut() {
        return (await browser.storage.sync.get()).shortcut || "";
    }

    async function restoreOptions() {
        document.querySelector('#shortcut').value = await getShortcut();
    }

    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.querySelector('form').addEventListener('submit', saveOptions);
})();
