document.addEventListener("DOMContentLoaded", () => {
    const foodInput = document.getElementById("food-name");
    const foodOptionsContainer = document.getElementById("food-suggestions");
    let foodData = {};

    // Fetch food data
    async function loadFoodData() {
        try {
            const response = await fetch("Scripts/Calculator.json");
            foodData = await response.json();
            console.log("Food data loaded:", foodData); // Debugging
        } catch (error) {
            console.error("Error loading food data:", error);
        }
    }

    document.addEventListener("click", (event) => {
        const suggestionsContainer = document.getElementById("food-suggestions");
        if (!event.target.closest(".input-group")) {
            suggestionsContainer.style.display = "none";
        }
    });

    // Filter foods on input and show suggestions
    foodInput.addEventListener("input", () => {
        const query = foodInput.value.toLowerCase();
        const filteredFoods = Object.keys(foodData).filter(food =>
            food.toLowerCase().includes(query)
        );

        displayFoodSuggestions(filteredFoods);
    });

    // Display suggestions
    function displayFoodSuggestions(filteredFoods) {
        foodOptionsContainer.innerHTML = "";

        if (filteredFoods.length === 0) {
            foodOptionsContainer.style.display = "none";
            return;
        }

        filteredFoods.forEach(food => {
            const listItem = document.createElement("li");
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

    // Add food to the table
    document.getElementById("add-food").addEventListener("click", () => {
        const foodName = foodInput.value;
        const grams = parseFloat(document.getElementById("grams").value);

        if (!foodName || isNaN(grams) || grams <= 0) {
            alert("Please enter valid food and grams.");
            return;
        }

        const food = foodData[foodName];
        if (food) {
            const proteins = ((food.protein / 100) * grams).toFixed(2);
            const carbs = ((food.carbs / 100) * grams).toFixed(2);
            const fats = ((food.fats / 100) * grams).toFixed(2);
            const calories = ((food.calories / 100) * grams).toFixed(2);

            addFoodToTable(foodName, grams, proteins, carbs, fats, calories);
            updateTotals(proteins, carbs, fats, calories);
        } else {
            alert("Food item not found in the database.");
        }
    });

    function addFoodToTable(name, grams, proteins, carbs, fats, calories) {
        const tableBody = document.getElementById("macros-body");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${name}</td>
            <td>${grams}g</td>
            <td>${proteins}g</td>
            <td>${carbs}g</td>
            <td>${fats}g</td>
            <td>${calories}</td>
        `;

        tableBody.appendChild(row);
    }

    function updateTotals(proteins, carbs, fats, calories) {
        const totalProteins = document.getElementById("total-proteins");
        const totalCarbs = document.getElementById("total-carbs");
        const totalFats = document.getElementById("total-fats");
        const totalCalories = document.getElementById("total-calories");

        totalProteins.textContent = `${(
            parseFloat(totalProteins.textContent) + parseFloat(proteins)
        ).toFixed(2)}g`;
        totalCarbs.textContent = `${(
            parseFloat(totalCarbs.textContent) + parseFloat(carbs)
        ).toFixed(2)}g`;
        totalFats.textContent = `${(
            parseFloat(totalFats.textContent) + parseFloat(fats)
        ).toFixed(2)}g`;
        totalCalories.textContent = `${(
            parseFloat(totalCalories.textContent) + parseFloat(calories)
        ).toFixed(2)}`;
    }

    document.getElementById('reset-table').addEventListener('click', () => {
        document.getElementById('macros-body').innerHTML = ''; // Clear all rows
        document.getElementById('total-proteins').textContent = '0g';
        document.getElementById('total-carbs').textContent = '0g';
        document.getElementById('total-fats').textContent = '0g';
        document.getElementById('total-calories').textContent = '0';
    });
    

    // Initialize
    loadFoodData();
});
