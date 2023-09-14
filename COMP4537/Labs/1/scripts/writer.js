// Object constructor
function Item(value) {
    this.value = value;
}

let itemList = [];

function addTextArea() {
    // Grab the reference of the container and add the input
    const container = document.getElementById("add-button-container");
    let input = document.createElement("input"); 
    input.type = "text"; 
    container.appendChild(input); 

    // Event listenser for the input as user presses enter and calls the displayItem() function to add the textarea
    input.addEventListener("keyup", function(event) { 
        if (event.key === "Enter") { 
            let item = new Item(this.value); 
            itemList.push(item); 
            this.style.display = "none";  
            displayItems(); 
            console.log(itemList);
        }
    });
}

function displayItems() {
    // Grabs the reference to the display container and clears the container's content
    const container = document.getElementById("display-container"); 
    container.innerHTML = ""; 

    // Iterate through each item in the array and creates the div, textarea, and remove button
    itemList.forEach(function(item, index) { 
        const div = document.createElement("div"); 
        div.classList.add("display-item-container"); 
        const textarea = document.createElement("textarea"); 
        textarea.value = item.value; 
        div.appendChild(textarea); 
        const button = document.createElement("button"); 
        button.innerHTML = "Remove"; 
        button.addEventListener("click", function() { 
            removeItem(index); 
        });
        div.appendChild(button); 
        container.appendChild(div); 
    });
}

function updateLocalStorage() {
    // Store the itemList in local storage as a JSON string
    localStorage.setItem('arrayKey', JSON.stringify(itemList)); 

    // Testing purpose to see if my array is stored in local storage
    // arrayKey = JSON.parse(localStorage.getItem("arrayKey") || "[]"); 
    // console.log(arrayKey, "THIS IS LOCAL"); 
}


function removeItem(index) {
    // Removes the items according to the specified index of the itemList and call two functions(Display items and updateLocalStorage)
    itemList.splice(index, 1); 
    displayItems(); 
    updateLocalStorage(); 
}

setInterval(function() {
    // Every two seconds, the function updates the time, but also updates the itemList to check for modifications to the text items
    let storedTime = document.getElementById("stored-time"); 
    let currentTime = new Date().toLocaleTimeString(); 
    storedTime.textContent = currentTime; 
    
    let textareas = document.querySelectorAll("textarea"); 
    textareas.forEach(function(textarea, index) { 
        itemList[index].value = textarea.value; 
    });

    updateLocalStorage();
}, 2000);

document.addEventListener('DOMContentLoaded', function() {
    // Gets the saved list in local storage, converts it to an objects and displays them in the display-container.
    let savedList = JSON.parse(localStorage.getItem('arrayKey')); 
    if (savedList) { 
        itemList = savedList.map(item => new Item(item.value)); 
        displayItems(); 
    }
});

function goBack() {
    // Go back function
    window.history.back(); 
}
