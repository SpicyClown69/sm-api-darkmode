checkBox = document.getElementById("Search");

chrome.storage.local.get(["searchEnabled"], function(result) {
    checkBox.checked = result.searchEnabled;
});


function changeHandler() {
    chrome.storage.local.set({"searchEnabled":checkBox.checked});
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#Search').addEventListener('change', changeHandler);
});