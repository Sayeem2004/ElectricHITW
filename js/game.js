// Global variables
var max_time, mode, points, scale, charge, complexity, distribution, barriers, rotation;
var time_elapsed, total_points, particles, charge_mode, particle_radius;
var canvas, context, cx, cy, paused, menu, object, completed = false, inside = 0;
const charge_scale = 0.000001, epsilon = 0.00000000000885, mass = 1, time = 1, meter = 10;
const electron_image = document.getElementById('electron');
const proton_image = document.getElementById('proton');
const colors = ['yellow', 'purple', 'orange', 'pink', 'brown', 'cyan', 'violet', 'white'];

// Actions taken when window loads
window.onload = function() {
    variable_set();
    create_level();
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
        // Clearing particles
        if (event.code === "KeyC") particles = [];
    }
);

// Animation function
function animate() {
    window.requestAnimationFrame(animate);
    if (!paused) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        object.update();
        particles.forEach((particle) => {
            particle.draw();
        });
        if (completed) {
            completed = false;
            create_level();
        }
    }
}

// Function to get a random int in a range
function getRandInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Function that returns the distance between two objects
function dist(obj1, obj2) {
    var dx = obj1.x-obj2.x;
    var dy = obj1.y-obj2.y;
    return Math.sqrt(dx*dx + dy*dy);
}

// Function that returns the distance between two points
function distc(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}

// Function that calculates the minimum distance between an object and an array of object, returning the index of the closest object
function min_dist(obj, array) {
    var mn_dist = 1000000, pos = -1;
    for (var i = 0; i < array.length; i++) {
        var dst = dist(obj, array[i]);
        if (mn_dist > dst) {
            mn_dist = dst;
            pos = i;
        }
    }
    return {mn_dist, pos};
}

// Function that sets up a game level
function create_level() {
    particles = [];
    if (complexity == 0) {
        object = new Circle (cx, cy, 100);
    } else if (complexity == 1) {
        object = (Math.random() < 0.5 ? new Square (cx, cy, 100) : new Triangle (cx, cy, 100));
    } else {
        object = (Math.random() < 0.5 ? new Donut (cx, cy, 100) : new Cross (cx, cy, 100));
    }
}

// Function that completes a game level
function complete_level() {
    inside = 0;
    completed = true;
    total_points += points;
    alert("You have completed this level and gained " + points + " points. Click on OK or press ENTER to go to the next level.");
}
// Function that returns the calculated force between the object and the array of particles
function calc_force(object) {
    // Calculating columbs force
    var netx = 0.0, nety = 0.0;
    for (var i = 0; i < object.charges.length; i++) {
        for (var q = 0; q < particles.length; q++) {
            var charge1 = object.charges[i];
            var charge2 = particles[q];
            var dx = charge2.x - charge1.x;
            var dy = charge2.y - charge1.y;
            var dist = Math.sqrt(dx*dx + dy*dy) / meter;
            // Making sure we dont have any infinite force errors
            if (dist < charge1.radius + charge2.radius) continue;
            var ang = Math.atan2(dy, dx);
            var magnitude = -1 / (4 * Math.PI * epsilon) * (charge1.charge * charge2.charge / (dist * dist));
            netx += magnitude * Math.cos(ang);
            nety += magnitude * Math.sin(ang);
        }
    }
    return [netx, nety];
}

// Function that calculates whether a point is inside a polygon
function point_in_poly(p, polygon) {
    // Variable delcarations
    var inside = false;
    var mnx = polygon[0][0], mxx = polygon[0][0];
    var mny = polygon[0][1], mxy = polygon[0][1];
    for (var i = 1; i < polygon.length; i++) {
        var vert = polygon[i];
        mnx = Math.min(vert[0], mnx);
        mxx = Math.max(vert[0], mxx);
        mny = Math.min(vert[1], mny);
        mxy = Math.max(vert[1], mxy);
    }

    // Base case
    if (p[0] < mnx || p[0] > mxx || p[1] < mny || p[1] > mxy) return false;

    // Actual algorithm
    var i = 0, j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
        if ( (polygon[i][1] > p[1]) != (polygon[j][1] > p[1]) &&
                p[0] < (polygon[j][0] - polygon[i][0]) * (p[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0] ) {
            inside = !inside;
        }
    }

    // Exiting function
    return inside;
}

// Function that calculates whether two line segments intersect
function line_intersect(a, b) {
    // Temporary vector declarations
    var p = [b[0][0]-a[0][0], b[0][1]-a[0][1]];
    var q = [a[1][0]-a[0][0], a[1][1]-a[0][1]];
    var r = [b[1][0]-b[0][0], b[1][1]-b[0][1]];

    // Actual algorithm
    t = ((q[0]*r[1] - q[1]*r[0]) != 0 ? (q[1]*p[0] - q[0]*p[1])/(q[0]*r[1] - q[1]*r[0]) : (q[1]*p[0] - q[0]*p[1]));
    u = (q[0] != 0 ? (p[0] + t*r[0])/q[0] : (p[1] + t*r[1])/q[1]);

    // Exiting function
    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

// Function that calculates whether a polygon is inside another polygon
function poly_in_poly(p, q) {
    // Checking all points of p is inside q
    for (var i = 0; i < p.length; i++) {
        if (!point_in_poly(p[i], q)) return false;
    }

    // Checking no edges of p intersect with edges of q
    for (var i = 0; i < p.length; i++) {
        for (var r = 0; r < q.length; r++) {
            var a1 = p[i], b1 = q[r];
            var a2 = (i === p.length-1 ? p[0] : p[i+1]);
            var b2 = (r === q.length-1 ? q[0] : q[r+1]);
            if (line_intersect([a1, a2], [b1, b2])) return false;
        }
    }

    // Exiting function
    return true;
}
