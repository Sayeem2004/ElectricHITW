// Global variables
const colors = [ 'yellow', 'purple', 'orange', 'pink', 'brown', 'cyan', 'violet', 'white'];
const epsilon = 0.00000000000885;

// Function to get a random int in a range
function getRandInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Function to get the minimum distance between a particle and a list of particles
function minDist(guess, particles) {
    var ans = 1000000000.0;
    for (var i = 0; i < particles.length; i++) {
        ans = Math.min(ans, dist(particles[i].cx, particles[i].cy, guess.cx, guess.cy));
    }
    return ans;
}

// Function that returns the distance between two points
function dist(x1, y1, x2, y2) {
    var dx = x2-x1;
    var dy = y2-y1;
    return Math.sqrt(dx*dx + dy*dy);
}

// Function that returns the calculated force between the object and the array of particles
function calcForce(object, particles) {
    var netx = 0.0, nety = 0.0;
    for (var i = 0; i < object.particles.length; i++) {
        for (var q = 0; q < particles.length; q++) {
            var charge1 = object.particles[i];
            var charge2 = particles[i];
            var dx = charge2.cx - charge1.cx;
            var dy = charge2.cy - charge1.cy;
            var dist = Math.sqrt(dx*dx + dy*dy);
            var ang = Math.arctan(dy / dx);
            var magnitude = 1 / (4 * Math.PI * epsilon) * (charge1.charge * charge2.charge / (dist * dist));
            netx += magnitude * Math.cos(ang);
            nety += magnitude * Math.sin(ang);
        }
    }
    return [netx, nety];
}
