// Scripts/Calculator.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("macros-form");
    const foodInput = document.getElementById("food-name");
    const gramsInput = document.getElementById("grams");
    const tableBody = document.getElementById("macros-body");
    const totals = {
        proteins: document.getElementById("total-proteins"),
        carbs: document.getElementById("total-carbs"),
        fats: document.getElementById("total-fats"),
        calories: document.getElementById("total-calories"),
    };

    let totalMacros = { proteins: 0, carbs: 0, fats: 0, calories: 0 };
    let foodData = {}; // Will hold the food data from JSON
    const foodList = document.getElementById("food-list");
    const dropdown = document.querySelector(".dropdown");

    // Fetch food data from JSON file
    fetch('foodData.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            foodData = data;
            populateFoodList(Object.keys(foodData));
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
            alert("Failed to load food data.");
        });

    // Populate the dropdown list with food items
    function populateFoodList(items) {
        foodList.innerHTML = ""; // Clear existing items
        items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            li.addEventListener("click", () => {
                foodInput.value = item;
                closeDropdown();
            });
            foodList.appendChild(li);
        });
    }

    // Filter the dropdown list based on user input
    function filterFoodList(query) {
        const filtered = Object.keys(foodData).filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        populateFoodList(filtered);
    }

    // Open the dropdown
    function openDropdown() {
        dropdown.classList.add("active");
    }

    // Close the dropdown
    function closeDropdown() {
        dropdown.classList.remove("active");
    }

    // Event listeners for dropdown functionality
    foodInput.addEventListener("input", (e) => {
        const query = e.target.value;
        filterFoodList(query);
        openDropdown();
    });

    foodInput.addEventListener("focus", () => {
        filterFoodList(foodInput.value);
        openDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    document.getElementById("add-food").addEventListener("click", () => {
        const food = foodInput.value.trim();
        const grams = parseFloat(gramsInput.value.trim());

        if (!food || isNaN(grams) || grams <= 0) {
            alert("Please enter valid food and gram values.");
            return;
        }

        if (!(food in foodData)) {
            alert("Food item not found in database!");
            return;
        }

        const macros = foodData[food];
        const multiplier = grams / 100;

        const rowData = {
            protein: (macros.protein * multiplier).toFixed(1),
            carbs: (macros.carbs * multiplier).toFixed(1),
            fats: (macros.fats * multiplier).toFixed(1),
            calories: (macros.calories * multiplier).toFixed(0),
        };

        totalMacros.proteins += parseFloat(rowData.protein);
        totalMacros.carbs += parseFloat(rowData.carbs);
        totalMacros.fats += parseFloat(rowData.fats);
        totalMacros.calories += parseInt(rowData.calories);

        const row = `<tr>
            <td>${food}</td>
            <td>${grams}g</td>
            <td>${rowData.protein}g</td>
            <td>${rowData.carbs}g</td>
            <td>${rowData.fats}g</td>
            <td>${rowData.calories}</td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);

        updateTotals();
        foodInput.value = "";
        gramsInput.value = "";
        closeDropdown();
    });

    function updateTotals() {
        totals.proteins.textContent = `${totalMacros.proteins.toFixed(1)}g`;
        totals.carbs.textContent = `${totalMacros.carbs.toFixed(1)}g`;
        totals.fats.textContent = `${totalMacros.fats.toFixed(1)}g`;
        totals.calories.textContent = totalMacros.calories.toFixed(0);
    }
});
