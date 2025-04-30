// const workoutForm = document.getElementById('workout-form');
// const workoutNameInput = document.getElementById('workout-name');
// const caloriesBurnedInput = document.getElementById('calories-burned');
// const workoutsList = document.getElementById('workouts');
// const totalCaloriesDisplay = document.getElementById('total-calories');

// let workouts = []; 
// let totalCalories = 0; 

// let caloriesChart;

// document.addEventListener('DOMContentLoaded', () => {
//     loadWorkouts(); 
//     initChart(); 
//     updateTotalCalories(); 
// });

// workoutForm.addEventListener('submit', function(event) {
//     event.preventDefault(); 
//     addWorkout(); 
//     workoutForm.reset(); 
// });

// function loadWorkouts() {
//     const storedWorkouts = localStorage.getItem('workouts'); 
//     if (storedWorkouts) {
//         workouts = JSON.parse(storedWorkouts); 
//         workouts.forEach(workout => displayWorkout(workout)); 
//         updateTotalCalories(); 
//     }
// }

// function saveWorkouts() {
//     localStorage.setItem('workouts', JSON.stringify(workouts)); 
// }

// function addWorkout() {
//     const workoutName = workoutNameInput.value.trim(); 
//     const caloriesBurned = parseInt(caloriesBurnedInput.value.trim()); 
    
//     if (workoutName === '' || isNaN(caloriesBurned) || caloriesBurned <= 0) {
//         alert('Please enter valid workout details.');
//         return; 
//     }

//     const workout = {
//         id: Date.now(), 
//         name: workoutName, 
//         calories: caloriesBurned 
//     };

//     workouts.push(workout); 
//     displayWorkout(workout); 
//     updateTotalCalories(); 
//     saveWorkouts(); 
//     updateChart(); 
// }

// function displayWorkout(workout) {
//     const li = document.createElement('li'); 
//     li.dataset.id = workout.id; 

//     li.innerHTML = `
//         <span>${workout.name}</span>
//         <span>${workout.calories} Calories</span>
//         <button class="delete-btn">&times;</button>
//     `;

//     li.querySelector('.delete-btn').addEventListener('click', function() {
//         deleteWorkout(workout.id); 
//     });

//     workoutsList.appendChild(li); 
// }

// function deleteWorkout(id) {
//     workouts = workouts.filter(workout => workout.id !== id); 
//     const workoutItem = workoutsList.querySelector(`[data-id='${id}']`); 
//     if (workoutItem) {
//         workoutsList.removeChild(workoutItem); 
//     }
//     updateTotalCalories(); 
//     saveWorkouts(); 
//     updateChart(); 
// }

// function updateTotalCalories() {
//     totalCalories = workouts.reduce((total, workout) => total + workout.calories, 0); 
//     totalCaloriesDisplay.textContent = totalCalories; 
// }

// function initChart() {
//     const ctx = document.getElementById('caloriesChart').getContext('2d');
//     caloriesChart = new Chart(ctx, {
//         type: 'bar', 
//         data: {
//             labels: workouts.map(workout => workout.name), 
//             datasets: [{
//                 label: 'Calories Burned',
//                 data: workouts.map(workout => workout.calories), 
//                 backgroundColor: 'rgba(16, 170, 218, 0.6)', 
//                 borderColor: 'rgb(31, 8, 240)', 
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true, 
//             scales: {
//                 x: {
//                     title: {
//                         display: true,
//                         text: 'Workout' 
//                     }
//                 },
//                 y: {
//                     beginAtZero: true, 
//                     title: {
//                         display: true,
//                         text: 'Calories Burned' 
//                     }
//                 }
//             }
//         }
//     });
// }

// function updateChart() {
//     caloriesChart.data.labels = workouts.map(workout => workout.name); 
//     caloriesChart.data.datasets[0].data = workouts.map(workout => workout.calories); 
//     caloriesChart.update(); 
// }
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workout-form');
    const workoutNameInput = document.getElementById('workout-name');
    const caloriesBurnedInput = document.getElementById('calories-burned');
    const workoutsList = document.getElementById('workouts');
    const totalCaloriesDisplay = document.getElementById('total-calories');
    const ctx = document.getElementById('caloriesChart').getContext('2d');
  
    let workouts = [];
    let caloriesChart;
  
    // Load workouts from localStorage
    function loadWorkouts() {
      const storedWorkouts = localStorage.getItem('workouts');
      if (storedWorkouts) {
        workouts = JSON.parse(storedWorkouts);
      }
    }
  
    // Save workouts to localStorage
    function saveWorkouts() {
      localStorage.setItem('workouts', JSON.stringify(workouts));
    }
  
    // Update total calories display
    function updateTotalCalories() {
      const totalCalories = workouts.reduce((total, workout) => total + workout.calories, 0);
      totalCaloriesDisplay.textContent = totalCalories;
    }
  
    // Generate distinct colors for each bar
    function getBarColors(length) {
      const colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ];
      const barColors = [];
      for (let i = 0; i < length; i++) {
        barColors.push(colors[i % colors.length]);
      }
      return barColors;
    }
  
    // Initialize the chart
    function initChart() {
      caloriesChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: workouts.map(workout => workout.name),
          datasets: [{
            label: 'Calories Burned',
            data: workouts.map(workout => workout.calories),
            backgroundColor: getBarColors(workouts.length),
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Workout'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Calories Burned'
              }
            }
          }
        }
      });
    }
  
    // Update the chart with new data
    function updateChart() {
      caloriesChart.data.labels = workouts.map(workout => workout.name);
      caloriesChart.data.datasets[0].data = workouts.map(workout => workout.calories);
      caloriesChart.data.datasets[0].backgroundColor = getBarColors(workouts.length);
      caloriesChart.update();
    }
  
    // Display a single workout in the list
    function displayWorkout(workout) {
      const li = document.createElement('li');
      li.dataset.id = workout.id;
  
      li.innerHTML = `
        <span>${workout.name}</span>
        <span>${workout.calories} Calories</span>
        <button class="delete-btn">&times;</button>
      `;
  
      li.querySelector('.delete-btn').addEventListener('click', () => {
        deleteWorkout(workout.id);
      });
  
      workoutsList.appendChild(li);
    }
  
    // Render all workouts in the list
    function renderWorkouts() {
      workoutsList.innerHTML = '';
      workouts.forEach(workout => displayWorkout(workout));
    }
  
    // Add a new workout
    function addWorkout() {
      const workoutName = workoutNameInput.value.trim();
      const caloriesBurned = parseInt(caloriesBurnedInput.value.trim());
  
      if (workoutName === '' || isNaN(caloriesBurned) || caloriesBurned <= 0) {
        alert('Please enter valid workout details.');
        return;
      }
  
      const workout = {
        id: Date.now(),
        name: workoutName,
        calories: caloriesBurned
      };
  
      workouts.push(workout);
      saveWorkouts();
      renderWorkouts();
      updateTotalCalories();
      updateChart();
    }
  
    // Delete a workout
    function deleteWorkout(id) {
      workouts = workouts.filter(workout => workout.id !== id);
      saveWorkouts();
      renderWorkouts();
      updateTotalCalories();
      updateChart();
    }
  
    // Event listener for form submission
    workoutForm.addEventListener('submit', event => {
      event.preventDefault();
      addWorkout();
      workoutForm.reset();
    });
  
    // Initial setup
    loadWorkouts();
    renderWorkouts();
    updateTotalCalories();
    initChart();
  });
  
