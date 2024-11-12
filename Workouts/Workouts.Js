document.addEventListener("DOMContentLoaded", function () {
    let workoutResults = document.getElementById("workout-results");
    let selectedLevel = null;
    let selectedMuscle = null;

    let workoutPlan = {
        chest: {
            beginner: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Push-Ups 3x10",
                        "Dumbbell Bench Press 3x10",
                        "Incline Dumbbell Fly 3x12",
                        "Chest Press Machine 3x12"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Incline Push-Ups 3x10",
                        "Dumbbell Pullover 3x12",
                        "Cable Chest Fly 3x12",
                        "Dumbbell Bench Press (Neutral Grip) 3x10"
                    ]
                }
            ],
            intermediate: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Barbell Bench Press 4x8",
                        "Incline Dumbbell Press 4x10",
                        "Chest Dips 3x10",
                        "Cable Crossover 3x12"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Decline Bench Press 4x8",
                        "Dumbbell Flys 3x12",
                        "Push-Ups with Feet Elevated 3x10",
                        "Machine Chest Press 3x12"
                    ]
                }
            ],
            advanced: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Barbell Bench Press 5x5",
                        "Dumbbell Incline Press 4x8",
                        "Weighted Dips 4x6",
                        "Plyometric Push-Ups 3x8"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Floor Press 4x6",
                        "Single-Arm Dumbbell Press 4x8",
                        "Cable Flys (Low to High) 3x12",
                        "Push-Up Variations (Clap, Archer) 3x6"
                    ]
                }
            ]
        },
        back: {
            beginner: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Lat Pulldown 3x10",
                        "Seated Cable Row 3x12",
                        "Face Pulls 3x15",
                        "Back Extensions 3x15"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Assisted Pull-Ups 3x10",
                        "Single-Arm Dumbbell Row 3x12",
                        "Reverse Flys 3x12",
                        "Hyperextensions 3x15"
                    ]
                }
            ],
            intermediate: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Barbell Bent-Over Rows 4x8",
                        "T-Bar Row 4x10",
                        "Lat Pulldown (Wide Grip) 4x10",
                        "Dumbbell Deadlifts 3x10"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Pull-Ups 4x6",
                        "Seated Cable Row (Close Grip) 4x10",
                        "Chest Supported Dumbbell Row 3x10",
                        "Face Pulls (with Rope) 3x12"
                    ]
                }
            ],
            advanced: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Deadlifts 5x5",
                        "Barbell Rows 4x6",
                        "Weighted Pull-Ups 4x6",
                        "Single-Arm Dumbbell Row (Heavy) 4x8"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Pendlay Rows 4x6",
                        "Lat Pulldown (Reverse Grip) 4x8",
                        "Inverted Rows 4x10",
                        "Dumbbell Shrugs (Heavy) 4x10"
                    ]
                }
            ]
        },
        legs: {
            beginner: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Bodyweight Squats 3x10",
                        "Leg Press Machine 3x12",
                        "Lunges 3x10 (each leg)",
                        "Calf Raises 3x15"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Goblet Squats 3x10",
                        "Leg Curl Machine 3x12",
                        "Step-Ups 3x10 (each leg)",
                        "Seated Calf Raises 3x15"
                    ]
                }
            ],
            intermediate: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Barbell Squats 4x8",
                        "Romanian Deadlifts 4x10",
                        "Leg Extensions 3x12",
                        "Calf Raises (Standing) 4x12"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Deadlifts 4x8",
                        "Bulgarian Split Squats 3x10 (each leg)",
                        "Leg Press 4x10",
                        "Seated Calf Raises 4x12"
                    ]
                }
            ],
            advanced: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Front Squats 5x5",
                        "Sumo Deadlifts 5x5",
                        "Walking Lunges with Dumbbells 4x8 (each leg)",
                        "Calf Raises (Weighted) 4x10"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Barbell Hip Thrusts 4x8",
                        "Leg Press (Single Leg) 4x10",
                        "Pistol Squats 3x6 (each leg)",
                        "Farmer's Walk on Toes 3x30 seconds"
                    ]
                }
            ]
        },
        arms: {
            beginner: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Bicep Curls (Dumbbell) 3x10",
                        "Tricep Dips (Bench) 3x10",
                        "Hammer Curls 3x10",
                        "Overhead Tricep Extension 3x12"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Concentration Curls 3x10",
                        "Skull Crushers 3x12",
                        "Cable Bicep Curls 3x12",
                        "Tricep Pushdowns 3x12"
                    ]
                }
            ],
            intermediate: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Barbell Bicep Curls 4x8",
                        "Close-Grip Bench Press 4x8",
                        "Preacher Curls 3x10",
                        "Dumbbell Tricep Kickbacks 3x12"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Incline Dumbbell Curls 4x10",
                        "Dumbbell Skull Crushers 4x10",
                        "Cable Rope Hammer Curls 3x12",
                        "Overhead Dumbbell Tricep Extension 3x10"
                    ]
                }
            ],
            advanced: [
                {
                    number: "Workout 1",
                    exercises: [
                        "EZ Bar Bicep Curls 5x5",
                        "Weighted Dips 4x6",
                        "Chin-Ups 4x8",
                        "Dumbbell Tricep Overhead Extension (Single Arm) 4x8"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Barbell Curls (21s) 4x7",
                        "Dumbbell Tricep Extensions (Lying) 4x8",
                        "Cable Bicep Curls (Single Arm) 3x10",
                        "Bench Dips with Weight 4x6"
                    ]
                }
            ]
        },
        shoulders: {
            beginner: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Dumbbell Shoulder Press 3x10",
                        "Lateral Raises 3x12",
                        "Front Raises 3x12",
                        "Reverse Flys 3x12"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Arnold Press 3x10",
                        "Upright Rows 3x10",
                        "Dumbbell Shrugs 3x15",
                        "Face Pulls 3x12"
                    ]
                }
            ],
            intermediate: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Barbell Overhead Press 4x8",
                        "Dumbbell Lateral Raises 4x10",
                        "Cable Front Raises 3x12",
                        "Dumbbell Rear Delt Flys 3x12"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Military Press 4x8",
                        "Dumbbell Shoulder Flys 3x10",
                        "Plate Raises 3x12",
                        "Face Pulls (with Rope) 3x12"
                    ]
                }
            ],
            advanced: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Push Press 5x5",
                        "Dumbbell Shoulder Press (Heavy) 4x6",
                        "Barbell Shrugs 4x8",
                        "Dumbbell Lateral Raises (Drop Set) 3x10"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Seated Dumbbell Press 4x6",
                        "Cable Lateral Raises 4x10",
                        "Landmine Press 4x8",
                        "Face Pulls (High Rep) 3x15"
                    ]
                }
            ]
        },
        core: {
            beginner: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Plank 3x30 seconds",
                        "Russian Twists 3x15 (each side)",
                        "Bicycle Crunches 3x15",
                        "Leg Raises 3x10"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Side Plank 3x20 seconds (each side)",
                        "Mountain Climbers 3x15 (each leg)",
                        "Flutter Kicks 3x15",
                        "Crunches 3x15"
                    ]
                }
            ],
            intermediate: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Plank with Shoulder Taps 4x10 (each side)",
                        "Hanging Leg Raises 4x10",
                        "Russian Twists with Weight 3x15 (each side)",
                        "V-Ups 3x12"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Stability Ball Plank 4x30 seconds",
                        "Cable Woodchoppers 3x10 (each side)",
                        "Ab Rollouts 3x10",
                        "Bicycle Crunches with Hold 3x15"
                    ]
                }
            ],
            advanced: [
                {
                    number: "Workout 1",
                    exercises: [
                        "Plank to Push-Up 4x10",
                        "Dragon Flags 4x6",
                        "Weighted Russian Twists 4x10 (each side)",
                        "Hanging Windshield Wipers 3x10 (each side)"
                    ]
                },
                {
                    number: "Workout 2",
                    exercises: [
                        "Stability Ball Rollouts 4x8",
                        "Cable Woodchoppers (Heavy) 4x8 (each side)",
                        "L-Sit Hold 3x20 seconds",
                        "Medicine Ball Slams 4x10"
                    ]
                }
            ]
        }
    };
    function displayWorkouts() {
        workoutResults.innerHTML = "";
        if (selectedMuscle && selectedLevel && workoutPlan[selectedMuscle][selectedLevel]) {
            workoutResults.classList.add("show");
            let workouts = workoutPlan[selectedMuscle][selectedLevel];
            workouts.forEach(workout => {
                let workoutDiv = document.createElement("div");
                workoutDiv.classList.add("workout-item");

                let workoutTitle = document.createElement("h3");
                workoutTitle.innerText = `${workout.number} - ${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Level, ${selectedMuscle.charAt(0).toUpperCase() + selectedMuscle.slice(1)}`;
                workoutDiv.appendChild(workoutTitle);

                workout.exercises.forEach(exercise => {
                    let exerciseDiv = document.createElement("p");
                    exerciseDiv.innerText = exercise;
                    workoutDiv.appendChild(exerciseDiv);
                });

                workoutResults.appendChild(workoutDiv);
            });
        } else {
            workoutResults.classList.remove("show");
        }
    }

    document.querySelectorAll(".level-button").forEach(button => {
        button.addEventListener("click", function () {
            selectedLevel = button.getAttribute("data-level");
            displayWorkouts();
        });
    });

    document.querySelectorAll(".muscle-button").forEach(button => {
        button.addEventListener("click", function () {
            selectedMuscle = button.getAttribute("data-muscle");
            displayWorkouts();
        });
    });
});
