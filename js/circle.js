class Circle {
    // Constructor method
    constructor(cx, cy, radius, scale, canvas) {
        // Property declarations
        this.cx = cx;
        this.cy = cy;
        this.radius = radius;
        this.color = colors[getRandInt(0, 8)];
        this.scale = scale;
        this.new_outline();

        // Setting up perimeter points
        this.perimeter = [];
        for (var i = 0.0; i <= 120.0; i++) {
            this.perimeter.push([cx + radius * Math.cos(i/60), cy + radius * Math.sin(i/60)]);
        }

        // Setting up charged particles
        this.particles = [];
        var particle_radius = this.radius/8;
        for (var i = 0; i < 25; i++) {
            this.particles.push(this.new_particle(this.particles, particle_radius*2, particle_radius, 1));
        }
    }

    // Method to get a new outline position
    new_outline() {
        var i = 0;
        while (true) {
            // Making a guess for outline position
            var outx = getRandInt(this.scale*this.radius, canvas.width-this.scale*this.radius);
            var outy = getRandInt(this.scale*this.radius, canvas.height-this.scale*this.radius);

            if (dist(this.cx, this.cy, outx, outy) >= this.radius || i == 1000) {
                this.outx = outx;
                this.outy = outy;
                break;
            }
            i++;
        }
    }

    // Method to get a new particle
    new_particle(particles, dist, radius, charge) {
        var i = 0;
        while (true) {
            // Making a guess to a possible position
            var rad = getRandInt(0, this.radius-2*radius);
            var ang = getRandInt(0, 360);
            var guess = new ChargedParticle(
                this.cx + rad * Math.cos(ang),
                this.cy + rad * Math.sin(ang),
                radius,
                getRandInt(-2, 3) * charge,
            );

            // Making sure it is at least a certain distance away from the rest of the particle
            if (minDist(guess, particles) >= dist || i == 1000) {
                return guess;
            }
            i++;
        }
    }

    // Draw method
    draw(context) {
        // Drawing circle
        context.beginPath;
        context.arc(this.cx, this.cy, this.radius, 0, 2*Math.PI, false);
        context.fillStyle = this.color;
        context.fill();

        // Drawing particles
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(context);
        }
    }

    draw_outline(context) {
        // Drawing perimeter of circle
        context.arc(this.outx, this.outy, this.radius * this.scale, 0, 2*Math.PI, false);
        context.strokeStyle = this.color;
        context.stroke();
    }
}
