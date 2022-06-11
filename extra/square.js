class Square {
    // Constructor method
    constructor(cx, cy, radius, scale, canvas) {
        // Property declarations
        this.cx = cx;
        this.cy = cy;
        this.radius = radius;
        this.lx = cx - radius;
        this.ly = cy - radius;
        this.side = radius*2;
        this.color = colors[getRandInt(0, 8)];
        this.scale = scale;
        this.new_outline(canvas);

        // Setting up perimeter points
        this.perimeter = [];
        for (var i = 0.0; i <= 24.0; i++) {
            this.perimeter.push([this.lx+(i/24*this.side), this.ly]);
            this.perimeter.push([this.lx+this.side, this.ly+(i/24*this.side)]);
            this.perimeter.push([this.lx+(i/24*this.side), this.ly+this.side]);
            this.perimeter.push([this.lx, this.ly+(i/24*this.side)]);
        }

        // Setting up charged particles
        this.particles = [];
        var particle_radius = this.radius/8;
        for (var i = 0; i < 25; i++) {
            this.particles.push(this.new_particle(this.particles, particle_radius*2, particle_radius, 1));
        }
    }

    // Method to get a new outline position
    new_outline(canvas) {
        var i = 0;
        while (true) {
            // Making a guess for outline position
            var outx = getRandInt(this.scale*this.radius, canvas.width-this.scale*this.radius);
            var outy = getRandInt(this.scale*this.radius, canvas.height-this.scale*this.radius);

            if (dist(this.cx, this.cy, outx, outy) >= 2*this.radius || i == 1000) {
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
            var guess = new ChargedParticle(
                getRandInt(this.lx+2*radius, this.lx+this.side-2*radius),
                getRandInt(this.ly+2*radius, this.ly+this.side-2*radius),
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
        // Drawing square
        context.beginPath;
        context.rect(this.lx, this.ly, this.side, this.side);
        context.fillStyle = this.color
        context.fill();

        // Drawing particles
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(context);
        }
    }

    draw_outline(context) {
        // Variable declarations
        var side = this.side * this.scale;
        var lx = this.outx - side/2;
        var ly = this.outy - side/2;

        // Drawing perimeter of square
        context.beginPath;
        context.rect(lx, ly, side, side);
        context.strokeStyle = this.color;
        context.stroke();
    }
}
