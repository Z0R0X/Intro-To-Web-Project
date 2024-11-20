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
document.addEventListener('DOMContentLoaded', () => {

    let openModalButton = document.getElementById('openModalButton');
    let reviewModal = document.getElementById('reviewModal');
    let closeModal = document.getElementById('closeModal');
    let reviewsContainer = document.getElementById('reviewsContainer');
    
    fetch('./Scripts/Home.json')
        .then(response => response.json())
        .then(Reviewsdata => {
            renderReviews(Reviewsdata);
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });
    
    
    function renderReviews(Reviews) {
        reviewsContainer.innerHTML = '';
        Reviews.Reviewsdata.forEach(a => {
            let reviewDiv = document.createElement('div');
            reviewDiv.innerHTML = `<p><b>${a.name}</b>: ${a.description}</p>`;
            reviewsContainer.appendChild(reviewDiv);
        });
    }
    });
    
document.addEventListener('DOMContentLoaded', () => {

let openModalButton = document.getElementById('openModalButton');
let reviewModal = document.getElementById('reviewModal');
let closeModal = document.getElementById('closeModal');

openModalButton.addEventListener('click', () => {
    reviewModal.style.display = 'flex'; 
});

closeModal.addEventListener('click', () => {
    reviewModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === reviewModal) {
        reviewModal.style.display = 'none';
    }
});

let reviewForm = document.getElementById('reviewForm');
reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = document.getElementById('reviewName').value;
    let review = document.getElementById('reviewText').value;

    let newReview = document.createElement('div');
    newReview.innerHTML = `<p><b>${name}</b>: ${review}</p>`;
    document.getElementById('reviewsContainer').appendChild(newReview);

    reviewModal.style.display = 'none';

    reviewForm.reset();
});});
