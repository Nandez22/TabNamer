import { StoreRename, Rename } from "./Functions.js";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Loaded");

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTitle = tab.title;


    const input = document.getElementById("newTitle");
    input.placeholder = currentTitle;


    const confirm = document.getElementById("confirm");
    confirm.addEventListener("click", async () => {
        const newTitle = input.value;

        console.log("Confirm", newTitle)
        Rename(tab, newTitle)

        await StoreRename(tab.url, newTitle)
    });
});