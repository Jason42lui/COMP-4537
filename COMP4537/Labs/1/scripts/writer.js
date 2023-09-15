// Object constructor for Note
function Note() {
    // Creating the Note Item Element
    this.container = document.createElement("div");  
    this.container.classList.add("display-item-container");
    this.textArea = document.createElement("textarea");
    this.removeButton = document.createElement("button");
    this.removeButton.innerHTML = "Remove";
    this.removeButton.addEventListener("click", () => {
        this.remove();
    });
    this.container.appendChild(this.textArea); 
    this.container.appendChild(this.removeButton); 
    const displayContainer = document.getElementById("display-container");
    displayContainer.appendChild(this.container); 


    // Remove Method
    this.remove = function() {
        this.textArea.remove();
        this.removeButton.remove();
        this.removeFromLocalStorage();
    };

    // Store to Local storage Method
    this.storeToLocalStorage = function() {
        let itemList = JSON.parse(localStorage.getItem('arrayKey')) || [];
        itemList.push(this.textArea.value);
        localStorage.setItem('arrayKey', JSON.stringify(itemList));
        // console.log(itemList, "LOCAL STORE");
    };

    // Remove from Local storage Method
    this.removeFromLocalStorage = function() {
        let itemList = JSON.parse(localStorage.getItem('arrayKey')) || [];
        itemList.splice(itemList.indexOf(this.textArea.value), 1);
        localStorage.setItem('arrayKey', JSON.stringify(itemList));
        // console.log(itemList, "ITEM REMOVED");
    };
}

let itemList = []

// Add Note function
function addTextArea() {
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Press enter to add";
    
    // Add input to display container
    const displayContainer = document.getElementById("display-container");
    displayContainer.appendChild(input);

    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter" && input.value.trim() !== "") {
            let note = new Note();
            note.textArea.value = input.value;
            input.remove();
        }
    });
}

// Every two seconds, the function updates the time and the itemList to check for modifications to the text items
setInterval(function() {
    // Update itemList from local storage
    itemList = JSON.parse(localStorage.getItem("arrayKey")) || [];

    let storedTime = document.getElementById("stored-time"); 
    let currentTime = new Date().toLocaleTimeString(); 
    storedTime.textContent = currentTime; 

    let textareas = document.querySelectorAll("textarea"); 
    textareas.forEach(function(textarea, index) { 
        itemList[index] = textarea.value; 
    });

    localStorage.setItem('arrayKey', JSON.stringify(itemList)); 
    // console.log(itemList, "THIS IS LOCAL"); 
}, 2000);


// Go back function
function goBack() {
    window.history.back();
}

// Render the page function (Incase there are Notes in the local storage)
function renderItemsFromLocalStorage() {
    let itemList = JSON.parse(localStorage.getItem('arrayKey')) || [];
    itemList.forEach(function(item) {
        let note = new Note();
        note.textArea.value = item;
    });
}

renderItemsFromLocalStorage();


