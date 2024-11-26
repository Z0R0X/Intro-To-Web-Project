document.addEventListener('DOMContentLoaded', () => {
    let calculateButton = document.querySelector('.nutrition-advice button');

    calculateButton.addEventListener('click', () => {
        let age = parseInt(document.getElementById('age').value);
        let gender = document.getElementById('gender').value;
        let height = parseFloat(document.getElementById('height').value);
        let weight = parseFloat(document.getElementById('weight').value);
        let activity = document.getElementById('activity').value;
        let resultDisplay = document.getElementById('result');

        if (isNaN(age) || isNaN(height) || isNaN(weight)) {
            resultDisplay.innerText = "Please enter valid numbers for age, height, and weight.";
            return;
        }

        let bmr;
        if (gender === "male") {
            bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
        } else if (gender === "female") {
            bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
        } else {
            resultDisplay.innerText = "Please select a valid gender.";
            return;
        }

        let activityMultiplier = 1.2;

        if (activity === 'sedentary') {
            activityMultiplier = 1.2;
        } else if (activity === 'light') {
            activityMultiplier = 1.375;
        } else if (activity === 'moderate') {
            activityMultiplier = 1.55;
        } else if (activity === 'active') {
            activityMultiplier = 1.725;
        } else if ( activity === 'very active') {
            activityMultiplier = 1.9;
        } else {
            resultDisplay.innerText = "Please select a valid activity level.";
            return;
        }

        let dailyCalories = bmr * activityMultiplier;
        resultDisplay.innerText = `Your estimated daily caloric needs are ${Math.round(dailyCalories)} calories.`;
    });
});

/*document.addEventListener("DOMContentLoaded", () => {
    let openModalButton = document.getElementById("openModalButton");
    let reviewModal = document.getElementById("reviewModal");
    let closeModal = document.getElementById("closeModal");
    let reviewForm = document.getElementById("reviewForm");
    let reviewsContainer = document.getElementById("reviewsContainer");

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    displayReviews(reviews);

    function displayReviews(reviews) {
        reviewsContainer.innerHTML = ""; 
        reviews.forEach(review => {
            let reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `<p><b>${review.name}:</b> ${review.description}</p>`;
            reviewsContainer.appendChild(reviewElement);
        });
    }

    openModalButton.addEventListener("click", () => {
        reviewModal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        reviewModal.style.display = "none";
    });

    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let name = document.getElementById("reviewName").value;
        let reviewText = document.getElementById("reviewText").value;

        if (!name || !reviewText) {
            alert("Both fields are required!");
            return;
        }


        let newReview = { name, description: reviewText };
        reviews.push(newReview);

        localStorage.setItem("reviews", JSON.stringify(reviews));

        displayReviews(reviews);

        reviewForm.reset();
        reviewModal.style.display = "none";
    });
});
*/
document.addEventListener("DOMContentLoaded", () => {
    let openModalButton = document.getElementById("openModalButton");
    let reviewModal = document.getElementById("reviewModal");
    let closeModal = document.getElementById("closeModal");
    let reviewForm = document.getElementById("reviewForm");
    let reviewsContainer = document.getElementById("reviewsContainer");
    let resetButton = document.getElementById("resetButton");

    let initialReviews = [];

    // Fetch reviews from the JSON file
    fetch("Scripts/Home.json")
        .then(response => response.json())
        .then(data => {
            initialReviews = data.Reviewsdata || [];
            displayReviews(); // Display reviews from localStorage and JSON
        })
        .catch(error => {
            console.error("Error fetching JSON data:", error);
            initialReviews = [];  // If error, no JSON data available
            displayReviews();
        });

    // Function to load reviews from localStorage
    function loadReviewsFromLocalStorage() {
        const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        return storedReviews;
    }

    // Function to save reviews to localStorage
    function saveReviews(localReviews) {
        localStorage.setItem("reviews", JSON.stringify(localReviews));
    }

    // Display reviews: 1 from localStorage, 2 from JSON file, or 3 from JSON if localStorage is empty
    function displayReviews() {
        reviewsContainer.innerHTML = "";

        const localReviews = loadReviewsFromLocalStorage(); // Get reviews from localStorage

        // If localStorage has reviews, display the first one from there
        if (localReviews.length > 0) {
            let firstReview = localReviews[0];
            reviewsContainer.appendChild(createReviewElement(firstReview));

            // Display the next 2 reviews from JSON (if available)
            const nextReviewsFromJSON = initialReviews.slice(0, 2); // Get up to 2 reviews from JSON
            nextReviewsFromJSON.forEach(review => {
                reviewsContainer.appendChild(createReviewElement(review));
            });
        } else {
            // If localStorage is empty, show 3 reviews from the JSON file
            const firstThreeReviews = initialReviews.slice(0, 3);
            firstThreeReviews.forEach(review => {
                reviewsContainer.appendChild(createReviewElement(review));
            });
        }
    }

    // Helper function to create and return a review element with the image
    function createReviewElement(review) {
        let reviewElement = document.createElement("div");
        reviewElement.classList.add("review");

        // Add image and review content
        reviewElement.innerHTML = `
                <img src="Images/Home page/profile.png" alt="profile" class="review-image"><b class=name>${review.name}</b>
                <p> ${review.description}</p>
        `;
        return reviewElement;
    }

    openModalButton.addEventListener("click", () => {
        reviewModal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        reviewModal.style.display = "none";
    });

    // Ensure submit button triggers form submission
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();  // Prevent form from refreshing the page

        console.log("Submit button clicked!"); // Log to confirm the event is triggered

        let name = document.getElementById("reviewName").value;
        let reviewText = document.getElementById("reviewText").value;

        // Log the values to check if they're correct
        console.log("Name:", name);
        console.log("Review Text:", reviewText);

        // Check if both fields are filled
        if (!name || !reviewText) {
            alert("Both fields are required!");
            return;
        }

        let newReview = { name, description: reviewText };

        // Load existing reviews from localStorage, add the new one to the front
        let localReviews = loadReviewsFromLocalStorage();
        localReviews.unshift(newReview);  // Adds the new review to the top of the array
        saveReviews(localReviews); // Save the updated reviews to localStorage

        // Update the display with the latest reviews
        displayReviews();

        reviewForm.reset();  // Reset form fields after submission
        reviewModal.style.display = "none";  // Close the modal
    });

    // Reset localStorage (while keeping JSON data intact)
    resetButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset the reviews?")) {
            localStorage.removeItem("reviews");
            displayReviews(); // Display the JSON reviews again
        }
    });
});

