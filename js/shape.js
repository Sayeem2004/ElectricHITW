// Class for representing a charged particle
class Particle {
    // Constructor method
    constructor(x, y, radius, charge) {
        // Property declarations
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.charge = charge;
    }

    // Draw method
    draw() {
        if (this.charge > 0) {
            // Proton case
            context.drawImage(proton, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
        } else if (this.charge < 0) {
            // Electron case
            context.drawImage(electron, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
        }
    }
}

// Class for representing a circle shape
class Circle {
    // Constructor method
    constructor(x, y, radius) {
        // Property declarations
        this.x = x, this.y = y;
        this.radius = radius, this.scale = scale;
        this.mxx = canvas.width - this.radius, this.mnx = this.radius;
        this.mxy = canvas.height - this.radius, this.mny = this.radius;
        this.color = colors[getRandInt(0, 8)];
        this.vx = 0, this.vy = 0;
        this.ax = 0, this.ay = 0;
        this.new_outline();

        // Setting up vertices
        this.vertices = [];
        for (var i = 0.0; i <= 10.0; i++) {
            var ang = i / 10 * 2 * Math.PI;
            this.vertices.push([this.x + this.radius * Math.cos(ang), this.y + this.radius * Math.sin(ang)]);
        }

        // Setting up charged particles
        this.charges = [];
        for (var i = 0.0; i < 10.0; i++) {
            var ang = i / 10 * 2 * Math.PI;
            this.charges.push(new Particle(
                this.x + this.radius/2 * Math.cos(ang),
                this.y + this.radius/2 * Math.sin(ang),
                this.radius/8,
                (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale),
            ));
        }
    }

    // Method to get a new outline position
    new_outline() {
        this.out_radius = this.radius * this.scale;
        var i = 0;
        while (true) {
            // Making a guess for outline position
            var outx = getRandInt(this.out_radius, canvas.width-this.out_radius);
            var outy = getRandInt(this.out_radius, canvas.height-this.out_radius);

            if (distc(this.x, this.y, outx, outy) >= this.out_radius*2 || i == 1000) {
                this.outx = outx;
                this.outy = outy;
                break;
            }
            i++;
        }

        this.out_vertices = [];
        for (var i = 0.0; i <= 10.0; i++) {
            var ang = i / 10 * 2 * Math.PI;
            this.out_vertices.push([this.outx + this.out_radius * Math.cos(ang), this.outy + this.out_radius * Math.sin(ang)]);
        }
    }

    // Draw method
    draw() {
        // Drawing circle
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        context.fillStyle = this.color;
        context.fill();

        // Drawing charges
        for (var i = 0; i < this.charges.length; i++) {
            this.charges[i].draw();
        }

        // Drawing perimeter of circle
        context.beginPath();
        context.arc(this.outx, this.outy, this.radius * this.scale, 0, 2*Math.PI, false);
        context.strokeStyle = this.color;
        context.stroke();
    }

    // Update/animate method
    update() {
        // Drawing object
        this.draw();

        // Calculating net force and motion of this object
        var [fx, fy] = calc_force(this);
        this.ax = fx / mass, this.ay = fy / mass;
        var dx = ((this.vx * time) + (0.5 * this.ax * time*time)) * meter;
        var dy = ((this.vy * time) + (0.5 * this.ay * time*time)) * meter;
        this.vx += this.ax * time, this.vy += this.ay * time;

        // Making sure within bounds of screen
        if (this.x + dx < this.mnx) {
            dx = -(this.x-this.mnx);
            this.vx *= -1;
        }
        if (this.x + dx > this.mxx) {
            dx = (this.mxx-this.x);
            this.vx *= -1;
        }
        if (this.y + dy < this.mny) {
            dy = -(this.y-this.mny);
            this.vy *= -1;
        }
        if (this.y + dy > this.mxy) {
            dy = (this.mxy-this.y);
            this.vy *= -1;
        }

        // Updating positions of all relevant things
        this.x += dx, this.y += dy;
        for (var i = 0; i < this.charges.length; i++) {
            this.charges[i].x += dx, this.charges[i].y += dy;
        }
        for (var i = 0; i < this.vertices.length; i++) {
            this.vertices[i][0] += dx, this.vertices[i][1] += dy;
        }

        // Checking insideness and ending level if needed
        if (poly_in_poly(this.vertices, this.out_vertices)) inside++;
        if (inside == 3) complete_level();
    }
}
