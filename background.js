'use strict';
(() => {
    const COMMAND_ID = 'open-urls-in-clipboard';

    function openTabs(urls) {
        for (const u of urls) browser.tabs.create({ url: u });
    }

    function openUrlsInText(text) {
        if (text == null) return;

        let urls = [];
        for (const l of text.split('\n')) {
            const m = l.match(/(https?:\/\/[^>\s]+)/g);
            if (m == null) continue;

            for (const u of m) urls.push(u);
        }

        openTabs(urls);
    }

    async function pasteFromClipboardWrapper() {
        return browser.tabs.executeScript({ file: 'paste-from-clipboard.js' });
    }

    async function onOpenUrlsInClipboard() {
        const text = (await pasteFromClipboardWrapper())[0];
        openUrlsInText(text);
    }

    async function getShortcut() {
        return (await browser.storage.sync.get()).shortcut || '';
    }

    async function updateShortcut() {
        const shortcut = await getShortcut();
        if (shortcut == '') return;

        browser.commands.update({
            name: COMMAND_ID,
            shortcut: shortcut
        });
    }

    browser.menus.onClicked.addListener((info, tab) => {
        if (info.menuItemId == COMMAND_ID) onOpenUrlsInClipboard();
    });
    browser.menus.create({ id: COMMAND_ID, title: browser.i18n.getMessage('menuItemTitle'), contexts: ['page', 'tools_menu'] });

    browser.commands.onCommand.addListener(command => {
        if (command == COMMAND_ID) onOpenUrlsInClipboard();
    });
    updateShortcut();
    browser.storage.onChanged.addListener((changes, areaName) => {
        updateShortcut();
    });
})();
