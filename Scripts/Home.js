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

document.addEventListener("DOMContentLoaded", () => {
    let openModalButton = document.getElementById("openModalButton");
    let reviewModal = document.getElementById("reviewModal");
    let closeModal = document.getElementById("closeModal");
    let reviewForm = document.getElementById("reviewForm");
    let reviewsContainer = document.getElementById("reviewsContainer");
    let resetButton = document.getElementById("resetButton");

    let initialReviews = [];

    fetch("Scripts/Home.json")
        .then(response => response.json())
        .then(data => {
            initialReviews = data.Reviewsdata || [];
            displayReviews();
        })
        .catch(error => {
            console.error("Error fetching JSON data:", error);
            initialReviews = []; 
            displayReviews();
        });

    function loadReviewsFromLocalStorage() {
        let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        return storedReviews;
    }

    function saveReviews(localReviews) {
        localStorage.setItem("reviews", JSON.stringify(localReviews));
    }

    function displayReviews() {
        reviewsContainer.innerHTML = "";

        let localReviews = loadReviewsFromLocalStorage();

        if (localReviews.length > 0) {
            let firstReview = localReviews[0];
            reviewsContainer.appendChild(createReviewElement(firstReview));

            let nextReviewsFromJSON = initialReviews.slice(0, 2); 
            nextReviewsFromJSON.forEach(review => {
                reviewsContainer.appendChild(createReviewElement(review));
            });
        } else {
            const firstThreeReviews = initialReviews.slice(0, 3);
            firstThreeReviews.forEach(review => {
                reviewsContainer.appendChild(createReviewElement(review));
            });
        }
    }

    function createReviewElement(review) {
        let reviewElement = document.createElement("div");
        reviewElement.classList.add("review");

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

    reviewForm.addEventListener("submit", (prevent) => {
        prevent.preventDefault(); 

        let name = document.getElementById("reviewName").value;
        let reviewText = document.getElementById("reviewText").value;

        if (!name || !reviewText) {
            alert("Both fields are required!");
            return;
        }

        let newReview = { name: name, description: reviewText };
        let localReviews = loadReviewsFromLocalStorage();
        localReviews.unshift(newReview);


         
        let maxReviews = 5;
     if (localReviews.length > maxReviews) {
        localReviews.pop(); 
     }
        saveReviews(localReviews);

        displayReviews();

        reviewForm.reset(); 
        reviewModal.style.display = "none"; 
    });

    resetButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset the reviews?")) {
            localStorage.removeItem("reviews");
            displayReviews();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let loginButton = document.querySelector('.login-button'); 
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        loginButton.textContent = loggedInUser.name; 
        loginButton.href = '#';

        loginButton.addEventListener('click', function () {
            let Confirm = confirm('Do you want to log out?');
            if (Confirm) {
                localStorage.removeItem('loggedInUser'); 
                window.location.reload();
            }
        });
    }
});
