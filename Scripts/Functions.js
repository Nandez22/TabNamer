//Shouldn't need it but it's delicious!
export async function HashBrown(url) {
    const encoder = new TextEncoder();
    const data = encoder.encode(url);
    const butter = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(butter)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function StoreRename(url, name) {
    await chrome.storage.local.set({ [url]: { rename: name}});
}

export async function TryLoadRename(url) {
    const full = TryLoadFull(url);
    return (full != null)? full : TryLoadGen(url); 
}

async function TryLoadFull(url){
    const key = CleanUrl(url)
    const result = await chrome.storage.local.get(key);
    const entry = result[key];

    return (entry && typeof entry.rename === "string")? entry.rename : null;
}

async function TryLoadGen(url){
    const key = GenericUrl(url)
    const result = await chrome.storage.local.get(key);
    const entry = result[key];

    return (entry && typeof entry.rename === "string")? entry.rename : null;
}


export function Rename(tab, name){
    if (!tab?.id || tab.url == "chrome://" || !name || name == tab.title) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (title) => { document.title = title; },
        args: [name]
    });
}

export function CleanUrl(url) {
    if(!url || url.startsWith("chrome://")) return;

    const u = new URL(url);
    return u.origin + u.pathname;
}

export function GenericUrl(url) {
    if(!url || url.startsWith("chrome://")) return;
    return new URL(url).hostname;
}