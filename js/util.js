// Global variables
const colors = ['blue', 'red', 'yellow', 'purple', 'orange', 'green', 'magenta', 'pink', 'brown', 'cyan', 'violet', 'white'];
const epsilon = 0.00000000000885;

// Adapted from: https://www.npmjs.com/package/intrinsic-scale
function getObjectFitSize(
    contains /* true = contain, false = cover */,
    containerWidth,
    containerHeight,
    width,
    height
) {
    // Variable declarations
    var doRatio = width / height;
    var cRatio = containerWidth / containerHeight;
    var targetWidth = 0;
    var targetHeight = 0;
    var test = contains ? doRatio > cRatio : doRatio < cRatio;

    // Conditional cases
    if (test) {
        targetWidth = containerWidth;
        targetHeight = targetWidth / doRatio;
    } else {
        targetHeight = containerHeight;
        targetWidth = targetHeight * doRatio;
    }

    // Exiting function
    return {
        width: targetWidth,
        height: targetHeight,
        x: (containerWidth - targetWidth) / 2,
        y: (containerHeight - targetHeight) / 2
    };
}

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

// Class used for drawing electrons/protons
class ChargedParticle {
    // Constructor method
    constructor(cx, cy, radius, charge) {
        // Property declaration
        this.cx = cx;
        this.cy = cy;
        this.lx = cx - radius;
        this.ly = cy - radius;
        this.radius = radius;
        this.charge = charge;
    }

    // Draw method
    draw(context) {
        if (this.charge > 0) {
            context.drawImage(proton, this.lx, this.ly, this.radius, this.radius);
        } else if (this.charge < 0) {
            context.drawImage(electron, this.lx, this.ly, this.radius, this.radius);
        }
    }
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
            var ang = Math.arctan(dy / dx);
            var magnitude =
        }
    }
}
