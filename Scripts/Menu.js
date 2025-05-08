document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTitle = tab.title;

    const input = document.getElementById("newTitle");
    input.placeholder = currentTitle;


    const confirm = document.getElementById("confirm");
    confirm.addEventListener("click", () => {
        const newTitle = input.value;

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (title) => { document.title = title; },
            args: [newTitle]
        });
    })
});