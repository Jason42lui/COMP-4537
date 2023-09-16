const arraykey_string = "arrayKey"
const display_container_string = "display-container"
const div_string = "div"
const item_container_string = "display-item-container"
const store_time_string = "stored-time"
const DOM_string = "DOMContentLoaded"


// Go back function
function goBack() {
    window.history.back();
}

function updateDisplayContainer() {
    // Gets the stored data, parses it to an array and grabs the reference while clearing the content in the display container
    let storedArray = JSON.parse(localStorage.getItem(arraykey_string)); 
    const displayContainer = document.getElementById(display_container_string); 
    displayContainer.innerHTML = ""; 

    // if the storedArray is not empty and IS an array, then iterate through the object and display it in the display-item-container
    if (storedArray && Array.isArray(storedArray)) { 
        storedArray.forEach(function(itemValue) {  
            const div = document.createElement(div_string); 
            div.classList.add(item_container_string); 
            div.textContent = itemValue; 
            displayContainer.appendChild(div); 
        });
    }
}

// Every two seconds update the items in the display-item-container 
document.addEventListener(DOM_string, function() {
    updateDisplayContainer(); 
    setInterval(updateDisplayContainer, 2000); 
});

// Updates the item every two seconds.
setInterval(function() {
    let storedTime = document.getElementById(store_time_string); 
    let currentTime = new Date().toLocaleTimeString(); 
    storedTime.textContent = currentTime; 
}, 2000);
