'use strict';
(() => {
    const MENU_ITEM_ID = 'open-urls-in-clipboard';

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
        return browser.tabs.executeScript({ file: 'paste-from-clipboard.js' }).catch(console.log);
    }

    async function onOpenUrlsInClipboard(info, tab) {
        const result = await pasteFromClipboardWrapper();
        openUrlsInText(result[0]);
    }

    browser.menus.onClicked.addListener((info, tab) => {
        if (info.menuItemId == MENU_ITEM_ID) onOpenUrlsInClipboard(info, tab);
    });

    browser.menus.create({ id: MENU_ITEM_ID, title: browser.i18n.getMessage("menuItemTitle"), contexts: ['page', 'tools_menu'] });
})();
