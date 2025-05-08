import { Rename, TryLoadRename } from "./Functions.js";

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if(tab?.url?.startsWith("chrome://")) return;

    if(tab) Rename(tab, await TryLoadRename(tab.url));
});

//We don't actually need to track new tabs since they appear either as a switch or change

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.title) {
        console.log("Change:", changeInfo.title);
    }
});
