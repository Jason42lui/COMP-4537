// Go back function
function goBack() {
    window.history.back();
}

function updateDisplayContainer() {
    // Gets the stored data, parses it to an array and grabs the reference while clearing the content in the display container
    let storedArray = JSON.parse(localStorage.getItem('arrayKey')); 
    const displayContainer = document.getElementById('display-container'); 
    displayContainer.innerHTML = ""; 

    // if the storedArray is not empty and IS an array, then iterate through the object and display it in the display-item-container
    if (storedArray && Array.isArray(storedArray)) { 
        storedArray.forEach(function(itemObject) {  
            const div = document.createElement('div'); 
            div.classList.add('display-item-container'); 
            div.textContent = itemObject.value; 
            displayContainer.appendChild(div); 
        });
    }
}

// Every two seconds update the items in the display-item-container 
document.addEventListener('DOMContentLoaded', function() {
    updateDisplayContainer(); 
    setInterval(updateDisplayContainer, 2000); 
});

// Updates the item every two seconds.
setInterval(function() {
    let storedTime = document.getElementById("stored-time"); 
    let currentTime = new Date().toLocaleTimeString(); 
    storedTime.textContent = currentTime; 
}, 2000);
