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
   
    let reviews = [];
    fetch('Scripts/Home.json')
        .then(response => {
            console.log("Response:", response); 
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data);  
            reviews = data.Reviewsdata || [];
            displayRandomReviews(reviews);
        })
        .catch(error => console.error('Error fetching reviews:', error));

    function displayRandomReviews(reviews) {
        console.log("Displaying Random Reviews:", reviews); 
        reviewsContainer.innerHTML = "";  
        const randomReviews = reviews.sort(() => 0.5 - Math.random()).slice(0, 3);
        randomReviews.forEach(review => {
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
        let review = document.getElementById("reviewText").value;
        
        if (!name || !reviewText) {
            alert("Both fields are required!");
            return;
        }

        const newReview = document.createElement("div");
        newReview.innerHTML = `<p><b>${name}:</b> ${review}</p>`;
        reviewsContainer.appendChild(newReview);
        reviewForm.reset();
        reviewModal.style.display = "none";
    });
});
