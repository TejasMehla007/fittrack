// FitTrack JavaScript
// Add food, show it in a list, update meal count, and save it in the browser.

let foods = JSON.parse(localStorage.getItem("foods")) || [];

const foodName = document.getElementById("foodName");
const foodQty = document.getElementById("foodQty");
const addFoodBtn = document.getElementById("addFoodBtn");
const foodList = document.getElementById("foodList");
const mealCount = document.getElementById("mealCount");
const message = document.getElementById("message");

function saveFoods() {
    localStorage.setItem("foods", JSON.stringify(foods));
}

function showFoods() {
    foodList.innerHTML = "";

    foods.forEach(function(food, index) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = food.name + " - " + food.qty;
        li.appendChild(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            foods.splice(index, 1);
            saveFoods();
            showFoods();
        };

        li.appendChild(deleteBtn);
        foodList.appendChild(li);
    });

    mealCount.textContent = foods.length + (foods.length === 1 ? " Meal" : " Meals");
}

addFoodBtn.onclick = function() {
    const name = foodName.value.trim();
    const qty = foodQty.value.trim();

    if (name === "" || qty === "") {
        message.textContent = "Please enter food name and quantity.";
        return;
    }

    foods.push({ name: name, qty: qty });
    saveFoods();
    showFoods();

    foodName.value = "";
    foodQty.value = "";
    message.textContent = "Food added.";
};

showFoods();
