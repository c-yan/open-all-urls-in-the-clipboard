'use strict';
(() => {
    const MENU_ITEM_ID = 'open-urls-in-clipboard';

    function openTabs(urls) {
        for (var u of urls) browser.tabs.create({ url: u });
    }

    function openUrlsInText(text) {
        if (text == null) return;

        var urls = [];
        for (var l of text.split('\n')) {
            var m = l.match(/(https?:\/\/[^>\s]+)/g);
            if (m == null) continue;

            for (var u of m) urls.push(u);
        }

        openTabs(urls);
    }

    function pasteFromClipboardWrapper() {
        return browser.tabs.executeScript({ file: 'paste-from-clipboard.js' }).catch(console);
    }

    function onOpenUrlsInClipboard(info, tab) {
        pasteFromClipboardWrapper().then((result) => {
            openUrlsInText(result[0]);
        });
    };

    browser.menus.onClicked.addListener((info, tab) => {
        if (info.menuItemId == MENU_ITEM_ID) onOpenUrlsInClipboard(info, tab);
    });

    browser.menus.create({ id: MENU_ITEM_ID, title: browser.i18n.getMessage("menuItemTitle"), contexts: ['page', 'tools_menu'] });
})();
