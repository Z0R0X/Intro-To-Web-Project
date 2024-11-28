document.addEventListener("DOMContentLoaded", () => {
    let foodInput = document.getElementById("food-name");
    let gramsInput = document.getElementById("grams");
    let foodOptionsContainer = document.getElementById("food-suggestions");
    let errorMessage = document.createElement("div");
    errorMessage.id = "error-message";
    document.querySelector(".calculator-section").appendChild(errorMessage);
    let foodData = {};

    async function loadFoodData() {
        try {
            const response = await fetch("Scripts/Calculator.json");
            foodData = await response.json();
            console.log("Food data loaded:", foodData); 
        } catch (error) {
            displayErrorMessage("Error loading food data. Please try again.");
        }
    }

    loadFoodData();

    function displayErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 3000);
    }

    document.addEventListener("click", (event) => {
        let suggestionsContainer = document.getElementById("food-suggestions");
        if (!event.target.closest(".input-group")) {
            suggestionsContainer.style.display = "none";
        }
    });

    foodInput.addEventListener("input", () => {
        let query = foodInput.value.toLowerCase();
        let filteredFoods = Object.keys(foodData).filter((food) =>
            food.toLowerCase().includes(query)
        );

        displayFoodSuggestions(filteredFoods);
    });

    function displayFoodSuggestions(filteredFoods) {
        foodOptionsContainer.innerHTML = "";

        if (filteredFoods.length === 0) {
            foodOptionsContainer.style.display = "none";
            return;
        }

        filteredFoods.forEach((food) => {
            let listItem = document.createElement("li");
            listItem.textContent = food;
            listItem.classList.add("suggestion-item");
            listItem.addEventListener("click", () => {
                foodInput.value = food;
                foodOptionsContainer.innerHTML = "";
                foodOptionsContainer.style.display = "none";
            });
            foodOptionsContainer.appendChild(listItem);
        });

        foodOptionsContainer.style.display = "block";
    }

    document.getElementById("add-food").addEventListener("click", () => {
        let foodName = foodInput.value;
        let grams = parseFloat(gramsInput.value);

        if (!foodName || isNaN(grams) || grams <= 0) {
            displayErrorMessage("Please enter a valid food item and grams.");
            return;
        }

        const food = foodData[foodName];
        if (food) {
            let proteins = ((food.protein / 100) * grams).toFixed(2);
            let carbs = ((food.carbs / 100) * grams).toFixed(2);
            let fats = ((food.fats / 100) * grams).toFixed(2);
            let calories = ((food.calories / 100) * grams).toFixed();

            addFoodToTable(foodName, grams, proteins, carbs, fats, calories);
            updateTotals(proteins, carbs, fats, calories);

            foodInput.value = "";
            gramsInput.value = "";
        } else {
            displayErrorMessage("Food item not found in the database.");
        }
    });

    document.getElementById("reset-table").addEventListener("click", () => {
        let tableBody = document.getElementById("macros-body");
        tableBody.innerHTML = "";
    
        document.getElementById("total-proteins").textContent = "0g";
        document.getElementById("total-carbs").textContent = "0g";
        document.getElementById("total-fats").textContent = "0g";
        document.getElementById("total-calories").textContent = "0";
    
        document.getElementById("food-name").value = "";
        document.getElementById("grams").value = "";
    
        
    });
    

    function addFoodToTable(name, grams, proteins, carbs, fats, calories) {
        let tableBody = document.getElementById("macros-body");
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${name}</td>
            <td>${grams}g</td>
            <td>${proteins}g</td>
            <td>${carbs}g</td>
            <td>${fats}g</td>
            <td>${calories}</td>
            <td><button class="remove-row action-button">Remove</button></td>
        `;

        row.querySelector(".remove-row").addEventListener("click", () => {
            removeFoodFromTable(row, proteins, carbs, fats, calories);
        });

        tableBody.appendChild(row);
    }

    function removeFoodFromTable(row, proteins, carbs, fats, calories) {
        let tableBody = document.getElementById("macros-body");
        tableBody.removeChild(row);

        updateTotals(-proteins, -carbs, -fats, -calories);
    }

    function updateTotals(proteins, carbs, fats, calories) {
        let totalProteins = document.getElementById("total-proteins");
        let totalCarbs = document.getElementById("total-carbs");
        let totalFats = document.getElementById("total-fats");
        let totalCalories = document.getElementById("total-calories");

        totalProteins.textContent = `${(
            parseFloat(totalProteins.textContent) + parseFloat(proteins)
        ).toFixed(2)}g`;
        totalCarbs.textContent = `${(
            parseFloat(totalCarbs.textContent) + parseFloat(carbs)
        ).toFixed(2)}g`;
        totalFats.textContent = `${(
            parseFloat(totalFats.textContent) + parseFloat(fats)
        ).toFixed(2)}g`;
        totalCalories.textContent = `${
            parseFloat(totalCalories.textContent) + parseFloat(calories)
        }`;
    }
});
