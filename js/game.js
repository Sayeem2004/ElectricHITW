// Global variables
var max_time, mode, points, scale, charge, complexity, distribution, barriers, rotation;
var time_elapsed, total_points, particles, charge_mode, particle_radius;
var canvas, context, cx, cy, paused, menu;
const charge_scale = 0.000001, epsilon = 0.00000000000885;
const electron_image = document.getElementById('electron');
const proton_image = document.getElementById('proton');

// Actions taken when window loads
window.onload = function() {
    variable_set();
    pause();
    animate();
}

// Setting up event listeners
window.addEventListener("click",
    // Charge placement and removal
    function (event) {
        if (!paused) {
            var cluster = new Particle(event.clientX, event.clientY, particle_radius, charge*charge_mode*charge_scale);
            var {mn_dist, pos} = min_dist(cluster, particles);
            if (mn_dist < particle_radius*1.5) {
                particles.splice(pos, 1);
            } else {
                particles.push(cluster);
            }
        }
    }
);
window.addEventListener("keyup",
    function (event) {
        // Pausing
        if (event.code === "Space") pause();
        // Changing charge type
        if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
            if (!paused) charge_mode *= -1;
        }
    }
);

// Animation function
function animate() {
    window.requestAnimationFrame(animate);
    if (!paused) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
            particle.draw();
        });
        console.log("animate");
    }
}

// Pause function
function pause() {
    paused = paused ^ true;
    if (paused) {
        // Switching to pause screen
        menu.style["display"] = "block";
        canvas.style["display"] = "none";

        // Initial information
        var score = document.getElementById("score");
        var next = document.getElementById("next");
        var time_remaining = document.getElementById("time_remaining");
        score.innerHTML = "Total Score: " + total_points.toString().padStart(6, "0");
        next.innerHTML = "Points For Next Completion: " + points.toString().padStart(3, "0");
        time_remaining.innerHTML = "Time Remaining: " + (max_time == -1 ? "Infinite" : (max_time - time_elapsed)) + " minutes";

        // Other information
        var controls = document.getElementById("controls");
        var controllable_settings = document.getElementById("controllable_settings");
        var settings = document.getElementById("settings");
        var ending = document.getElementById("ending");
        controls.style["display"] = "block";
        controllable_settings.style["display"] = "none";
        settings.style["display"] = "none";
        ending.style["display"] = "none";
    } else {
        // Switching back to game screen
        menu.style["display"] = "none";
        canvas.style["display"] = "block";
    }
}
