document.addEventListener("DOMContentLoaded", function () {
    let workoutResults = document.getElementById("workout-results");
    let selectedLevel = null;
    let selectedMuscle = null;
    let workouts = [];

    fetch("./Scripts/workouts.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load workouts data.');
            }
            return response.json();
        })
        .then(data => {
            workouts = data; 
            displayWorkouts(); 
        })
        .catch(error => console.error('Error fetching workouts:', error));

        

    function displayWorkouts() {
        workoutResults.innerHTML = "";

        let filteredWorkouts = workouts.filter(workout => {
            return (!selectedLevel || workout.category.includes(selectedLevel.toUpperCase())) &&
                (!selectedMuscle || workout.category.includes(selectedMuscle.toUpperCase()));
        });

        filteredWorkouts.forEach(workout => {
            let workoutItem = document.createElement("div");
            workoutItem.classList.add("workout-item");

            let title = document.createElement("h3");
            title.textContent = workout.category + " - " + workout.workoutName;
            workoutItem.appendChild(title);

            let exerciseList = document.createElement("ul");
            exerciseList.style.listStyleType = "none";
            workout.exercises.forEach(exercise => {
                let exerciseItem = document.createElement("li");
                exerciseItem.textContent = exercise;
                exerciseList.appendChild(exerciseItem);
            });

            workoutItem.appendChild(exerciseList);
            workoutResults.appendChild(workoutItem);
        });
    }

    document.querySelectorAll(".level-button").forEach(button => {
        button.addEventListener("click", () => {
            selectedLevel = button.dataset.level;
            displayWorkouts();
        });
    });

    document.querySelectorAll(".muscle-button").forEach(button => {
        button.addEventListener("click", () => {
            selectedMuscle = button.dataset.muscle;
            displayWorkouts();
        });
    });

    document.getElementById("reset-level").addEventListener("click", () => {
        selectedLevel = null;
        displayWorkouts();
    });

    document.getElementById("reset-muscle").addEventListener("click", () => {
        selectedMuscle = null;
        displayWorkouts();
    });
});
