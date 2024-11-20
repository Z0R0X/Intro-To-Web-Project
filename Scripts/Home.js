document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.querySelector('.nutrition-advice button');

    calculateButton.addEventListener('click', () => {
        const age = parseInt(document.getElementById('age').value, 10);
        const gender = document.getElementById('gender').value;
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const activity = document.getElementById('activity').value;

        if (isNaN(age) || isNaN(height) || isNaN(weight)) {
            alert("Please enter valid numbers for age, height, and weight.");
            return;
        }

        let bmr;

        if (gender.toLowerCase() === "male") {
            bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
        } else if (gender.toLowerCase() === "female") {
            bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
        } else {
            alert("Please enter 'male' or 'female' for gender.");
            return;
        }

        let activityMultiplier = 1.2; 
        switch (activity.toLowerCase()) {
            case 'sedentary':
                activityMultiplier = 1.2;
                break;
            case 'light':
                activityMultiplier = 1.375;
                break;
            case 'moderate':
                activityMultiplier = 1.55;
                break;
            case 'active':
                activityMultiplier = 1.725;
                break;
            case 'very active':
                activityMultiplier = 1.9;
                break;
            default:
                alert("Enter activity level as sedentary, light, moderate, active, or very active.");
                return;
        }

        const dailyCalories = bmr * activityMultiplier;
        alert(`Estimated daily calories needed: ${dailyCalories.toFixed(2)}`);
    });
});
