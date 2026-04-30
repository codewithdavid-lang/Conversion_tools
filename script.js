// gets calculator display input element
const display = document.getElementById('display');
// store the first number before an operator was clicked
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;
//
let buttons = document.querySelectorAll("#keys button");
// Loop through every button and add a click listener to each one
for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function() {

        let value = this.textContent;
        //If the button is a digit (0-9) or a dot, add it to the display
        if (!isNaN(value) || value === ".") {
            appendToDisplay(value);
        }
        // is c was clicked, clear everything
        else if (value === "C") {
            clearDisplay();
        }
        // clear last character
        else if (value === "⌫") {
            deleteLast();
        }
        // calculate is equals to was clicked
        else if (value === "=") {
            calculate();
        }
        
        else {
            setOperator(value);
        }

    });

}
//
function appendToDisplay(Input){
    //
    if (display.value === "0" || shouldResetDisplay){
        display.value = Input;
        shouldResetDisplay = false;
    }
    else{
        display.value += Input;
    }
}
// reset calculator to initial state
function clearDisplay(){
    //Reset display to zero
    display.value = "0";
    previousInput = "";
    operator = null;
}
// function that store the operator and the display value
function setOperator(op){
    // store the operator
    operator = op;
    // save current number
    previousInput = display.value;
    // Reset with next number
    shouldResetDisplay = true;

}
// Remove last number using slice
// Reference -W3schools
function deleteLast (){
    display.value = display.value.slice(0, -1);
    // if display is empty, set to zero
    if(display.value === "") {
        display.value = "0";
    }
}
function calculate(){
    // do nothing if no operator/input
    if (operator === null || previousInput === "") {
        return;  
    }
    let current = Number(display.value);
    let previous = Number(previousInput);
    let result;
    // Performs calculator
    if (operator === "+") {
        result = previous + current;
    }
    else if (operator === "-") {
        result = previous - current;
    }
    else if (operator === "*") {
        result = previous * current;
    }
    else if (operator === "/") {
        if (current === 0) {
            display.value = "Error";
            return;
        }
        result = previous / current;
    }
    // Rounds up to 6 decimal place
    result = Math.round(result* 1000000)/1000000;
    // Dipslay result
    display.value = result;
    //clears for next calculation
    operator = null;
    shouldResetDisplay = true; 

}
let celsius = document.getElementById("celsius");
let fahrenheit = document.getElementById("fahrenheit");
let kelvin = document.getElementById("kelvin");

//Updates fahrenheit and kelvin when celsius input changes
celsius.addEventListener("input", function() {

    let c = Number(this.value);
    // Updates the visual indicator
    updateVisual(c);
    // returns empty if other fields are empty
    if (this.value === "") {
        fahrenheit.value = "";
        kelvin.value = "";
        return;
    }

    fahrenheit.value = (c * 9/5) + 32;
    kelvin.value = c + 273.15;

});

// updates celsius and kelvin, when fahrenheit input changes
fahrenheit.addEventListener("input", function() {

    let f = Number(this.value);
    //// returns empty if other fields are empty
    if (this.value === "") {
        celsius.value = "";
        kelvin.value = "";
        return;
    }
    let c = (f-32) * 5/9;
    // Updates indicator
    updateVisual(c);
    celsius.value = (f - 32) * 5/9;
    kelvin.value = (f - 32) * 5/9 + 273.15;

});

// When Kelvin changes
kelvin.addEventListener("input", function() {

    let k = Number(this.value);
     // If field is empty, clear the other fields
    if (this.value === "") {
        celsius.value = "";
        fahrenheit.value = "";
        return;
    }
    let c  = k - 273.15;
    //Visual indicator
    updateVisual(c);
    //updates other temperature field
    celsius.value = c;
    fahrenheit.value =  (c* 9/5) + 32;
});
// Visual functions
    function updateVisual(c){

        let visual = document.getElementById("tempVisual");

        if (c > 30) {
            visual.textContent = "🔥 Hot";
        }
        else if (c < 10) {
            visual.textContent = "❄️ Cold";
        }
        else {
            visual.textContent = "😊 Mild";
        } }
// Tabs
let tabs = document.querySelectorAll(".tab");
let panels = document.querySelectorAll(".panel");
// tabs switch
for(let tab of tabs){
    tab.addEventListener("click", function(){
        let selectedTabId = tab.dataset.tab;
        let selectedPanel = document.getElementById(selectedTabId);

        panels.forEach((panel)=>{
            panel.classList.remove("active");
        })
        selectedPanel.classList.add("active");

        tabs.forEach((t)=>{
            t.classList.remove("active");

        })
        tab.classList.add("active");
    })
}
let amount = document.getElementById("amount");
let toCurrency = document.getElementById("toCurrency");
let toFlag = document.getElementById("toFlag");
let resultBox = document.getElementById("currencyResult");
let convertBtn = document.getElementById("convertBtn");

// get info from flags image
let fromFlags = document.querySelectorAll("#fromFlag img");
let selectedFrom = "USD";
// Add click event to each from-flag image
fromFlags.forEach(img => {
    img.addEventListener("click", function() {
        // Remove active class from all flags
        fromFlags.forEach(i => i.classList.remove("active"));
        // Add active class to clicked flag
        this.classList.add("active");
        // Update selectedFrom variable
        selectedFrom = this.getAttribute("data-currency");
    });
});
// update flag image when currnecy chnages
toCurrency.addEventListener("change", function() {
    let value = this.value;
    // if statement to determine the selected flag
    if(value === "USD") toFlag.src = "https://flagcdn.com/w40/us.png";
    else if(value === "EUR") toFlag.src = "https://flagcdn.com/w40/eu.png";
    else if(value === "GBP") toFlag.src = "https://flagcdn.com/w40/gb.png";
    else if(value === "NGN") toFlag.src = "https://flagcdn.com/w40/ng.png";
});

// CONVERT BUTTON

convertBtn.addEventListener("click", function() {

    let amt = Number(amount.value);
    // check if empty
    if (amount.value === "") {
        resultBox.value = "Enter amount";
        return;
    }

    let from = selectedFrom;
    let to = toCurrency.value;

    let result;

    // conversion rates
    if (from === "USD" && to === "EUR") result = amt * 0.92;
    else if (from === "USD" && to === "GBP") result = amt * 0.79;
    else if (from === "USD" && to === "NGN") result = amt * 1500;

    else if (from === "EUR" && to === "USD") result = amt * 1.08;
    else if (from === "EUR" && to === "GBP") result = amt * 0.86;
    else if (from === "EUR" && to === "NGN") result = amt * 1600;

    else if (from === "GBP" && to === "USD") result = amt * 1.27;
    else if (from === "GBP" && to === "EUR") result = amt * 1.16;
    else if (from === "GBP" && to === "NGN") result = amt * 1800;

    else if (from === "NGN" && to === "USD") result = amt * 0.00067;
    else if (from === "NGN" && to === "EUR") result = amt * 0.00062;
    else if (from === "NGN" && to === "GBP") result = amt * 0.00056;
    // same currency
    else result = amt; 

    // round result
    result = Math.round(result * 100) / 100;

    // display in input
    resultBox.value = result;
});


    
