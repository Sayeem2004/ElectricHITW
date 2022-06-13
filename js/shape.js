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

        // Setting up vertices
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

        // // Drawing vertices
        // for (var i = 0; i < this.vertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.vertices[i][0], this.vertices[i][1], this.radius/8, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }

        // Drawing perimeter of circle
        context.beginPath();
        context.arc(this.outx, this.outy, this.radius * this.scale, 0, 2*Math.PI, false);
        context.strokeStyle = this.color;
        context.stroke();

        // // Drawing outline vertices
        // for (var i = 0; i < this.out_vertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.out_vertices[i][0], this.out_vertices[i][1], this.out_radius/8, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }
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
        var revx = false, revy = false;
        for (var i = 0; i < this.vertices.length; i++) {
            var x = this.vertices[i][0], y = this.vertices[i][1];
            if (x + dx <= 0) {
                dx = -Math.min(Math.abs(dx), x);
                revx = true;
            }
            if (x + dx >= canvas.width) {
                dx = Math.min(canvas.width-x, dx);
                revx = true;
            }
            if (y + dy <= 0) {
                dy = -Math.min(Math.abs(dy), y);
                revy = true;
            }
            if (y + dy >= canvas.height) {
                dy = Math.min(canvas.height-y, dy);
                revy = true;
            }
        }
        if (revx) this.vx *= -1;
        if (revy) this.vy *= -1;

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

// Class for representing a square shape
class Square {
    // Constructor method
    constructor(x, y, radius) {
        // Property declarations
        this.x = x, this.y = y;
        this.radius = radius, this.scale = scale;
        this.half = this.radius / Math.sqrt(2);
        this.color = colors[getRandInt(0, 8)];
        this.vx = 0, this.vy = 0;
        this.ax = 0, this.ay = 0;
        this.new_outline();

        // Setting up vertices
        this.vertices = [];
        this.vertices.push([this.x-this.half, this.y-this.half]);
        this.vertices.push([this.x, this.y-this.half]);
        this.vertices.push([this.x+this.half, this.y-this.half]);
        this.vertices.push([this.x+this.half, this.y]);
        this.vertices.push([this.x+this.half, this.y+this.half]);
        this.vertices.push([this.x, this.y+this.half]);
        this.vertices.push([this.x-this.half, this.y+this.half]);
        this.vertices.push([this.x-this.half, this.y]);

        // Setting up charged particles
        this.charges = [];
        this.charges.push(new Particle(this.x-this.half/2, this.y-this.half/2, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
        this.charges.push(new Particle(this.x, this.y-this.half/2, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
        this.charges.push(new Particle(this.x+this.half/2, this.y-this.half/2, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
        this.charges.push(new Particle(this.x+this.half/2, this.y, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
        this.charges.push(new Particle(this.x+this.half/2, this.y+this.half/2, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
        this.charges.push(new Particle(this.x, this.y+this.half/2, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
        this.charges.push(new Particle(this.x-this.half/2, this.y+this.half/2, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
        this.charges.push(new Particle(this.x-this.half/2, this.y, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
    }

    // Method to get a new outline position
    new_outline() {
        this.out_radius = this.radius * this.scale;
        this.out_half = this.out_radius / Math.sqrt(2);
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

        // Setting up vertices
        this.out_vertices = [];
        this.out_vertices.push([this.outx-this.out_half, this.outy-this.out_half]);
        this.out_vertices.push([this.outx, this.outy-this.out_half]);
        this.out_vertices.push([this.outx+this.out_half, this.outy-this.out_half]);
        this.out_vertices.push([this.outx+this.out_half, this.outy]);
        this.out_vertices.push([this.outx+this.out_half, this.outy+this.out_half]);
        this.out_vertices.push([this.outx, this.outy+this.out_half]);
        this.out_vertices.push([this.outx-this.out_half, this.outy+this.out_half]);
        this.out_vertices.push([this.outx-this.out_half, this.outy]);
    }

    // Draw method
    draw() {
        // Drawing square
        context.beginPath();
        context.rect(this.x-this.half, this.y-this.half, this.half*2, this.half*2);
        context.fillStyle = this.color;
        context.fill();

        // Drawing charges
        for (var i = 0; i < this.charges.length; i++) {
            this.charges[i].draw();
        }

        // // Drawing vertices
        // for (var i = 0; i < this.vertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.vertices[i][0], this.vertices[i][1], this.radius/8, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }

        // Drawing perimeter of square
        context.beginPath();
        context.rect(this.outx-this.out_half, this.outy-this.out_half, this.out_half*2, this.out_half*2);
        context.strokeStyle = this.color;
        context.stroke();

        // // Drawing outline vertices
        // for (var i = 0; i < this.out_vertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.out_vertices[i][0], this.out_vertices[i][1], this.out_radius/8, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }
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
        var revx = false, revy = false;
        for (var i = 0; i < this.vertices.length; i++) {
            var x = this.vertices[i][0], y = this.vertices[i][1];
            if (x + dx <= 0) {
                dx = -Math.min(Math.abs(dx), x);
                revx = true;
            }
            if (x + dx >= canvas.width) {
                dx = Math.min(canvas.width-x, dx);
                revx = true;
            }
            if (y + dy <= 0) {
                dy = -Math.min(Math.abs(dy), y);
                revy = true;
            }
            if (y + dy >= canvas.height) {
                dy = Math.min(canvas.height-y, dy);
                revy = true;
            }
        }
        if (revx) this.vx *= -1;
        if (revy) this.vy *= -1;

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

// Class for representing a triangle shape
class Triangle {
    // Constructor method
    constructor(x, y, radius) {
        // Property declarations
        this.x = x, this.y = y;
        this.radius = radius, this.scale = scale;
        this.half = this.radius / 2 * Math.sqrt(3);
        this.color = colors[getRandInt(0, 8)];
        this.vx = 0, this.vy = 0;
        this.ax = 0, this.ay = 0;
        this.new_outline();

        // Setting up vertices
        this.vertices = [];
        this.vertices.push([this.x, this.y-this.radius]);
        this.vertices.push([this.x-this.half, this.y+this.radius/2]);
        this.vertices.push([this.x+this.half, this.y+this.radius/2]);

        // Setting up charged particles
        this.charges = [];
        this.charges.push(new Particle(this.x, this.y-this.radius/2, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
        this.charges.push(new Particle(this.x-this.half/2, this.y+this.radius/4, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
        this.charges.push(new Particle(this.x+this.half/2, this.y+this.radius/4, this.radius/8, (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)));
    }

    // Method to get a new outline position
    new_outline() {
        this.out_radius = this.radius * this.scale;
        this.out_half = this.out_radius / 2 * Math.sqrt(3);
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

        // Setting up vertices
        this.out_vertices = [];
        this.out_vertices.push([this.outx, this.outy-this.out_radius]);
        this.out_vertices.push([this.outx-this.out_half, this.outy+this.out_radius/2]);
        this.out_vertices.push([this.outx+this.out_half, this.outy+this.out_radius/2]);
    }

    // Draw method
    draw() {
        // Drawing triangle
        context.beginPath();
        context.moveTo(this.x-this.half, this.y+this.radius/2);
        context.lineTo(this.x, this.y-this.radius);
        context.lineTo(this.x+this.half, this.y+this.radius/2);
        context.fillStyle = this.color;
        context.fill();

        // Drawing charges
        for (var i = 0; i < this.charges.length; i++) {
            this.charges[i].draw();
        }

        // // Drawing vertices
        // for (var i = 0; i < this.vertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.vertices[i][0], this.vertices[i][1], this.radius/8, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }

        // Drawing perimeter of triangle
        context.beginPath();
        context.moveTo(this.outx-this.out_half, this.outy+this.out_radius/2);
        context.lineTo(this.outx, this.outy-this.out_radius);
        context.lineTo(this.outx+this.out_half, this.outy+this.out_radius/2);
        context.closePath()
        context.strokeStyle = this.color;
        context.stroke();

        // // Drawing outline vertices
        // for (var i = 0; i < this.out_vertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.out_vertices[i][0], this.out_vertices[i][1], this.out_radius/8, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }
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
        var revx = false, revy = false;
        for (var i = 0; i < this.vertices.length; i++) {
            var x = this.vertices[i][0], y = this.vertices[i][1];
            if (x + dx <= 0) {
                dx = -Math.min(Math.abs(dx), x);
                revx = true;
            }
            if (x + dx >= canvas.width) {
                dx = Math.min(canvas.width-x, dx);
                revx = true;
            }
            if (y + dy <= 0) {
                dy = -Math.min(Math.abs(dy), y);
                revy = true;
            }
            if (y + dy >= canvas.height) {
                dy = Math.min(canvas.height-y, dy);
                revy = true;
            }
        }
        if (revx) this.vx *= -1;
        if (revy) this.vy *= -1;

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

// Class for representing a donut shape
class Donut {
    // Constructor method
    constructor(x, y, radius) {
        // Property declarations
        this.x = x, this.y = y;
        this.oradius = radius, this.scale = scale;
        this.iradius = this.oradius / 2;
        this.color = colors[getRandInt(0, 8)];
        this.vx = 0, this.vy = 0;
        this.ax = 0, this.ay = 0;
        this.new_outline();

        // Setting up vertices
        this.ivertices = [], this.overtices = [];
        for (var i = 0.0; i <= 10.0; i++) {
            var ang = i / 10 * 2 * Math.PI;
            this.overtices.push([this.x + this.oradius * Math.cos(ang), this.y + this.oradius * Math.sin(ang)]);
            this.ivertices.push([this.x + this.iradius * Math.cos(ang), this.y + this.iradius * Math.sin(ang)]);
        }

        // Setting up charged particles
        this.charges = [];
        for (var i = 0.0; i < 10.0; i++) {
            var ang = i / 10 * 2 * Math.PI;
            this.charges.push(new Particle(
                this.x + (this.oradius + this.iradius)/2 * Math.cos(ang),
                this.y + (this.oradius + this.iradius)/2 * Math.sin(ang),
                this.oradius/8,
                (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale),
            ));
        }
    }

    // Method to get a new outline position
    new_outline() {
        this.out_oradius = this.oradius * this.scale;
        this.out_iradius = this.iradius * 4 / 5;
        var i = 0;
        while (true) {
            // Making a guess for outline position
            var outx = getRandInt(this.out_oradius, canvas.width-this.out_oradius);
            var outy = getRandInt(this.out_oradius, canvas.height-this.out_oradius);

            if (distc(this.x, this.y, outx, outy) >= this.out_oradius*2 || i == 1000) {
                this.outx = outx;
                this.outy = outy;
                break;
            }
            i++;
        }

        // Setting up vertices
        this.out_overtices = [], this.out_ivertices = [];
        for (var i = 0.0; i <= 10.0; i++) {
            var ang = i / 10 * 2 * Math.PI;
            this.out_overtices.push([this.outx + this.out_oradius * Math.cos(ang), this.outy + this.out_oradius * Math.sin(ang)]);
            this.out_ivertices.push([this.outx + this.out_iradius * Math.cos(ang), this.outy + this.out_iradius * Math.sin(ang)]);
        }
    }

    // Draw method
    draw() {
        // Drawing circle
        context.beginPath();
        context.arc(this.x, this.y, this.oradius, 0, 2*Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.globalCompositeOperation = 'destination-out';
        context.beginPath();
        context.arc(this.x, this.y, this.iradius, 0, 2*Math.PI, false);
        context.fill();
        context.globalCompositeOperation = 'source-over';


        // Drawing charges
        for (var i = 0; i < this.charges.length; i++) {
            this.charges[i].draw();
        }

        // // Drawing vertices
        // for (var i = 0; i < this.overtices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.overtices[i][0], this.overtices[i][1], this.oradius/32, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }
        // for (var i = 0; i < this.ivertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.ivertices[i][0], this.ivertices[i][1], this.oradius/32, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }

        // Drawing perimeter of circle
        context.beginPath();
        context.arc(this.outx, this.outy, this.oradius * this.scale, 0, 2*Math.PI, false);
        context.strokeStyle = this.color;
        context.stroke();
        context.beginPath();
        context.arc(this.outx, this.outy, this.iradius * 4 / 5, 0, 2*Math.PI, false);
        context.strokeStyle = this.color;
        context.stroke();

        // // Drawing outline vertices
        // for (var i = 0; i < this.out_overtices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.out_overtices[i][0], this.out_overtices[i][1], this.out_oradius/32, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }
        // for (var i = 0; i < this.out_ivertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.out_ivertices[i][0], this.out_ivertices[i][1], this.out_oradius/32, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }
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
        var revx = false, revy = false;
        for (var i = 0; i < this.overtices.length; i++) {
            var x = this.overtices[i][0], y = this.overtices[i][1];
            if (x + dx <= 0) {
                dx = -Math.min(Math.abs(dx), x);
                revx = true;
            }
            if (x + dx >= canvas.width) {
                dx = Math.min(canvas.width-x, dx);
                revx = true;
            }
            if (y + dy <= 0) {
                dy = -Math.min(Math.abs(dy), y);
                revy = true;
            }
            if (y + dy >= canvas.height) {
                dy = Math.min(canvas.height-y, dy);
                revy = true;
            }
        }
        if (revx) this.vx *= -1;
        if (revy) this.vy *= -1;

        // Updating positions of all relevant things
        this.x += dx, this.y += dy;
        for (var i = 0; i < this.charges.length; i++) {
            this.charges[i].x += dx, this.charges[i].y += dy;
        }
        for (var i = 0; i < this.overtices.length; i++) {
            this.overtices[i][0] += dx, this.overtices[i][1] += dy;
        }
        for (var i = 0; i < this.ivertices.length; i++) {
            this.ivertices[i][0] += dx, this.ivertices[i][1] += dy;
        }

        // Checking insideness and ending level if needed
        if (poly_in_poly(this.overtices, this.out_overtices) && poly_in_poly(this.out_ivertices, this.ivertices)) inside++;
        if (inside == 3) complete_level();
    }
}

// Class for representing a cross shape
class Cross {
    // Constructor method
    constructor(x, y, radius) {
        // Property declarations
        this.x = x, this.y = y;
        this.bradius = radius, this.scale = scale;
        this.sradius = this.bradius / 8;
        this.color = colors[getRandInt(0, 8)];
        this.vx = 0, this.vy = 0;
        this.ax = 0, this.ay = 0;
        this.new_outline();

        // Setting up vertices
        this.vertices = [];
        this.vertices.push([this.x - this.bradius, this.y - this.sradius]);
        this.vertices.push([this.x - this.bradius, this.y + this.sradius]);
        this.vertices.push([this.x - this.sradius, this.y + this.sradius]);
        this.vertices.push([this.x - this.sradius, this.y + this.bradius]);
        this.vertices.push([this.x + this.sradius, this.y + this.bradius]);
        this.vertices.push([this.x + this.sradius, this.y + this.sradius]);
        this.vertices.push([this.x + this.bradius, this.y + this.sradius]);
        this.vertices.push([this.x + this.bradius, this.y - this.sradius]);
        this.vertices.push([this.x + this.sradius, this.y - this.sradius]);
        this.vertices.push([this.x + this.sradius, this.y - this.bradius]);
        this.vertices.push([this.x - this.sradius, this.y - this.bradius]);
        this.vertices.push([this.x - this.sradius, this.y - this.sradius]);

        // Setting up charged particles
        this.charges = [];
        for (var i = 0.0; i < 7.0; i++) {
            if (i === 0.0 || i === 6.0) continue;
            this.charges.push(new Particle(
                this.x - this.bradius + this.bradius * i / 3,
                this.y,
                this.bradius/8,
                (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)
            ));
            this.charges.push(new Particle(
                this.x,
                this.y - this.bradius + this.bradius * i / 3,
                this.bradius/8,
                (Math.random() < 1 - (distribution / 200) ? charge*charge_scale : -charge*charge_scale)
            ));
        }
    }

    // Method to get a new outline position
    new_outline() {
        this.out_bradius = this.bradius * this.scale;
        this.out_sradius = this.out_bradius / 8
        var i = 0;
        while (true) {
            // Making a guess for outline position
            var outx = getRandInt(this.out_bradius, canvas.width-this.out_bradius);
            var outy = getRandInt(this.out_bradius, canvas.height-this.out_bradius);

            if (distc(this.x, this.y, outx, outy) >= this.out_bradius*2 || i == 1000) {
                this.outx = outx;
                this.outy = outy;
                break;
            }
            i++;
        }

        // Setting up vertices
        this.out_vertices = [];
        this.out_vertices.push([this.outx - this.out_bradius, this.outy - this.out_sradius]);
        this.out_vertices.push([this.outx - this.out_bradius, this.outy + this.out_sradius]);
        this.out_vertices.push([this.outx - this.out_sradius, this.outy + this.out_sradius]);
        this.out_vertices.push([this.outx - this.out_sradius, this.outy + this.out_bradius]);
        this.out_vertices.push([this.outx + this.out_sradius, this.outy + this.out_bradius]);
        this.out_vertices.push([this.outx + this.out_sradius, this.outy + this.out_sradius]);
        this.out_vertices.push([this.outx + this.out_bradius, this.outy + this.out_sradius]);
        this.out_vertices.push([this.outx + this.out_bradius, this.outy - this.out_sradius]);
        this.out_vertices.push([this.outx + this.out_sradius, this.outy - this.out_sradius]);
        this.out_vertices.push([this.outx + this.out_sradius, this.outy - this.out_bradius]);
        this.out_vertices.push([this.outx - this.out_sradius, this.outy - this.out_bradius]);
        this.out_vertices.push([this.outx - this.out_sradius, this.outy - this.out_sradius]);


    }

    // Draw method
    draw() {
        // Drawing cross
        context.beginPath();
        context.rect(this.x-this.bradius, this.y-this.sradius, 2*this.bradius, 2*this.sradius);
        context.fillStyle = this.color;
        context.fill();
        context.beginPath();
        context.rect(this.x-this.sradius, this.y-this.bradius, 2*this.sradius, 2*this.bradius);
        context.fillStyle = this.color;
        context.fill();

        // Drawing charges
        for (var i = 0; i < this.charges.length; i++) {
            this.charges[i].draw();
        }

        // // Drawing vertices
        // for (var i = 0; i < this.vertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.vertices[i][0], this.vertices[i][1], this.bradius/32, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }

        // Drawing perimeter of cross
        context.beginPath();
        context.rect(this.outx-this.out_bradius, this.outy-this.out_sradius, 2*this.out_bradius, 2*this.out_sradius);
        context.strokeStyle = this.color;
        context.stroke();
        context.beginPath();
        context.rect(this.outx-this.out_sradius, this.outy-this.out_bradius, 2*this.out_sradius, 2*this.out_bradius);
        context.strokeStyle = this.color;
        context.stroke();

        // // Drawing outline vertices
        // for (var i = 0; i < this.out_vertices.length; i++) {
        //     context.beginPath();
        //     context.arc(this.out_vertices[i][0], this.out_vertices[i][1], this.out_bradius/32, 0, 2*Math.PI, false);
        //     context.fillStyle = this.color;
        //     context.fill();
        // }
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
        var revx = false, revy = false;
        for (var i = 0; i < this.vertices.length; i++) {
            var x = this.vertices[i][0], y = this.vertices[i][1];
            if (x + dx <= 0) {
                dx = -Math.min(Math.abs(dx), x);
                revx = true;
            }
            if (x + dx >= canvas.width) {
                dx = Math.min(canvas.width-x, dx);
                revx = true;
            }
            if (y + dy <= 0) {
                dy = -Math.min(Math.abs(dy), y);
                revy = true;
            }
            if (y + dy >= canvas.height) {
                dy = Math.min(canvas.height-y, dy);
                revy = true;
            }
        }
        if (revx) this.vx *= -1;
        if (revy) this.vy *= -1;

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
        console.log(poly_in_poly(this.vertices, this.out_vertices));
        if (inside == 3) complete_level();
    }
}
