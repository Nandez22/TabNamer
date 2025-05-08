import { Rename, TryLoadRename } from "./Functions.js";

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    console.log("Switch:", activeInfo.title);

    if(tab?.url?.startsWith("chrome://")) return;
    if(tab) Rename(tab, await TryLoadRename(tab.url));
});


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if(changeInfo) {
        console.log("Change:", changeInfo.title);

        if(tab?.url?.startsWith("chrome://")) return;
        if(tab) Rename(tab, await TryLoadRename(tab.url));
    }
});
