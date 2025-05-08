import { StoreRename, Rename, GenericUrl, CleanUrl } from "./Functions.js";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Loaded");

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTitle = tab.title;

    const save = document.getElementById("save");
    const generic = document.getElementById("generic");
    const confirm = document.getElementById("confirm");
    const input = document.getElementById("newTitle");
    
    input.placeholder = currentTitle;
    

    confirm.addEventListener("click", async () => {
        const newTitle = input.value;

        console.log("Confirm", newTitle);
        Rename(tab, newTitle);

        if(save.classList.contains("active")){

            const b = (!generic.classList.contains("disabled") && generic.classList.contains("active"))
            const url = (b)? GenericUrl(tab.url) : CleanUrl(tab.url);
            await StoreRename(url, newTitle);
        }
    });


    save.addEventListener("click", () => {
        save.classList.toggle("active");
        generic.classList.toggle("disabled");
    });

    generic.addEventListener("click", () => {
        if(save.classList.contains("active")){
            generic.classList.toggle("active");
        }
    });
});