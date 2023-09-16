const div_string = "div"
const item_container_string = "display-item-container"
const textarea_string = "textarea"
const button_string = "button"
const remove_string = "Remove"
const display_container_string = "display-container"
const arraykey_string = "arrayKey"
const input_string = "input"
const text_string = "text"
const input_message_string = "Press enter to add"
const store_time_string = "stored-time"
const click_string = "click"
const keyup_string = "keyup"
const enter_string = "Enter"


// Object constructor for Note
function Note() {
    // Creating the Note Item Element
    this.container = document.createElement(div_string);  
    this.container.classList.add(item_container_string);
    this.textArea = document.createElement(textarea_string);
    this.removeButton = document.createElement(button_string);
    this.removeButton.innerHTML = remove_string;
    this.removeButton.addEventListener(click_string, () => {
        this.remove();
    });
    this.container.appendChild(this.textArea); 
    this.container.appendChild(this.removeButton); 
    const displayContainer = document.getElementById(display_container_string);
    displayContainer.appendChild(this.container); 


    // Remove Method
    this.remove = function() {
        this.textArea.remove();
        this.removeButton.remove();
        this.removeFromLocalStorage();
    };

    // Remove from Local storage Method
    this.removeFromLocalStorage = function() {
        let itemList = JSON.parse(localStorage.getItem(arraykey_string)) || [];
        itemList.splice(itemList.indexOf(this.textArea.value), 1);
        localStorage.setItem(arraykey_string, JSON.stringify(itemList));
        // console.log(itemList, "ITEM REMOVED");
    };
}

let itemList = []

// Add Note function
function addTextArea() {
    let input = document.createElement(input_string);
    input.type = text_string;
    input.placeholder = input_message_string;
    
    // Add input to display container
    const displayContainer = document.getElementById(display_container_string);
    displayContainer.appendChild(input);

    input.addEventListener(keyup_string, (event) => {
        if (event.key === enter_string && input.value.trim() !== "") {
            let note = new Note();
            note.textArea.value = input.value;
            input.remove();
        }
    });
}

// Every two seconds, the function updates the time and the itemList to check for modifications to the text items
setInterval(function() {
    // Update itemList from local storage
    itemList = JSON.parse(localStorage.getItem(arraykey_string)) || [];

    let storedTime = document.getElementById(store_time_string); 
    let currentTime = new Date().toLocaleTimeString(); 
    storedTime.textContent = currentTime; 

    let textareas = document.querySelectorAll(textarea_string); 
    textareas.forEach(function(textarea, index) { 
        itemList[index] = textarea.value; 
    });

    localStorage.setItem(arraykey_string, JSON.stringify(itemList)); 
    // console.log(itemList, "THIS IS LOCAL"); 
}, 2000);


// Go back function
function goBack() {
    window.history.back();
}

// Render the page function (Incase there are Notes in the local storage)
function renderItemsFromLocalStorage() {
    let itemList = JSON.parse(localStorage.getItem(arraykey_string)) || [];
    itemList.forEach(function(item) {
        let note = new Note();
        note.textArea.value = item;
    });
}

renderItemsFromLocalStorage();


