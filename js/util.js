function variable_set() {
    // Variable declarations
    time_elapsed = 0;
    total_points = 0;
    particles = [];
    charge_mode = -1 // -1 = electron, 1 = proton
    particle_radius = 12;
    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');
    cx = canvas.width/2;
    cy = canvas.height/2;
    paused = false;
    menu = document.getElementById("menu");
    menu.style["display"] = "none";

    // Parsing values from previous page
    var url = document.location.href;
    var params = (url.split('?').length <= 1 ? [] : url.split('?')[1].split('&'));
    for (var i = 0; i < params.length; i++) {
        var tmp = params[i].split('=');
        if (i == 0) mode = tmp[1];
        else if (i == 1) max_time = parseFloat(tmp[1]);
        else if (i == 2) points = parseInt(tmp[1]);
        else if (i == 3) scale = parseFloat(tmp[1]);
        else if (i == 4) charge = parseFloat(tmp[1]);
        else if (i == 5) complexity = (tmp[1] == "simple" ? 0 : tmp[1] == "normal" ? 1 : 2); // 0 = simple, 1 = normal, 2 = complex
        else if (i == 6) distribution = parseInt(tmp[1]);
        else if (i == 7) barriers = (tmp[1] == "on" ? true : false);
        else rotation = (tmp[1] == "on" ? true : false);
    }

    // Setting up settings tab
    if (mode === "freestyle") {
        // Variable declarations
        const scale_output_id = document.getElementById("scale_output_id");
        const scale_input_id = document.getElementById("scale_input_id");
        const charge_output_id = document.getElementById("charge_output_id");
        const charge_input_id = document.getElementById("charge_input_id");
        const dist_input_id = document.getElementById("dist_input_id");
        const dist_output_id = document.getElementById("dist_output_id");

        // Updating labels and values
        scale_input_id.value = scale;
        scale_output_id.innerHTML = 'Scale of outline: ' + (scale_input_id.value == 2 ? "2.00" : scale_input_id.value.padEnd(4, '0')) + 'x';
        charge_input_id.value = charge;
        charge_output_id.innerHTML = 'Magnitude of charge per cluster: ' + charge_input_id.value.padEnd(2, '.').padEnd(4, '0') + 'e10^-6';
        dist_input_id.value = distribution;
        dist_output_id.innerHTML = 'Randomness of charge distribution: ' + dist_input_id.value.padStart('3', 0) + "%";
    } else {
        // Variable declaration
        const scale_id = document.getElementById("scale_id");
        const charge_id = document.getElementById("charge_id");
        const complexity_id = document.getElementById("complexity_id");
        const distribution_id = document.getElementById("distribution_id");
        const barriers_id = document.getElementById("barriers_id");
        const rotation_id = document.getElementById("rotation_id");

        // Updating labels
        scale_id.innerHTML += scale.toString().padEnd(2, ".").padEnd(4, "0") + "x";
        charge_id.innerHTML += charge.toString().padEnd(2, ".").padEnd(4, "0") + "e10^-6 C";
        complexity_id.innerHTML += (complexity == 0 ? "simple" : complexity = 1 ? "normal" : "complex");
        distribution_id.innerHTML += distribution.toString().padStart(3, "0") + "%";
        barriers_id.innerHTML += (barriers ? "on" : "off");
        rotation_id.innerHTML += (rotation ? "on" : "off");
    }
}

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

// Function that returns the distance between two objects
function dist(obj1, obj2) {
    var dx = obj1.x-obj2.x;
    var dy = obj1.y-obj2.y;
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

// Setting up point updating
function points_update() {
    // Variable declarations
    const points_id = document.getElementById("next");
    const scale_id = document.getElementById("scale_input_id");
    const charge_id = document.getElementById("charge_input_id");
    const simple_id = document.getElementById("simple");
    const norm_id = document.getElementById("norm");
    const dist_id = document.getElementById("dist_input_id");
    const on1_id = document.getElementById("on1");
    const on2_id = document.getElementById("on2");

    // Calculating points and updating label
    var sm = 0;
    sm += 20 - Math.floor((scale_id.value - 1.0490) / 0.05);
    sm += Math.floor((charge_id.value - 1) / 0.1);
    sm += (simple_id.checked ? 5 : norm_id.checked ? 10 : 15);
    sm += Math.floor(dist_id.value / 10);
    sm += (on1_id.checked ? 20 : 0);
    sm += (on2_id.checked ? 20 : 0);
    points = sm;
    points_id.innerHTML = "Points awarded for completion: " + sm.toString().padStart(3, '0');
}

// Setting up scale slider updating
function scale_update() {
    // Variable declaration
    const scale_output_id = document.getElementById("scale_output_id");
    const scale_input_id = document.getElementById("scale_input_id");

    // Updating label
    scale = scale_input_id.value;
    scale_output_id.innerHTML = 'Scale of outline: ' + (scale_input_id.value == 2 ? "2.00" : scale_input_id.value.padEnd(4, '0')) + 'x';

    // Updating points
    points_update();
}

// Setting up charge slider updating
function charge_update() {
    // Variable declaration
    const charge_output_id = document.getElementById("charge_output_id");
    const charge_input_id = document.getElementById("charge_input_id");

    // Updating label
    charge = charge_input_id.value;
    charge_output_id.innerHTML = 'Magnitude of charge per cluster: ' + charge_input_id.value.padEnd(2, '.').padEnd(4, '0') + 'e10^-6';

    // Updating points
    points_update();
}

// Setting up dist updating
function dist_update() {
    // Variable declarations
    const dist_input_id = document.getElementById("dist_input_id");
    const dist_output_id = document.getElementById("dist_output_id");

    // Updating label
    distribution = dist_input_id.value;
    dist_output_id.innerHTML = 'Randomness of charge distribution: ' + dist_input_id.value.padStart('3', 0) + "%";

    // Updating points
    points_update();
}

// Setting up controls button
function show_controls() {
    var controls = document.getElementById("controls");
    var controllable_settings = document.getElementById("controllable_settings");
    var settings = document.getElementById("settings");
    var ending = document.getElementById("ending");
    controls.style["display"] = "block";
    controllable_settings.style["display"] = "none";
    settings.style["display"] = "none";
    ending.style["display"] = "none";
}

// Setting up settings button
function show_settings() {
    var controls = document.getElementById("controls");
    var controllable_settings = document.getElementById("controllable_settings");
    var settings = document.getElementById("settings");
    var ending = document.getElementById("ending");
    controls.style["display"] = "none";
    if (mode === "freestyle") {
        controllable_settings.style["display"] = "block";
        settings.style["display"] = "none";
    } else {
        controllable_settings.style["display"] = "none";
        settings.style["display"] = "block";
    }
    ending.style["display"] = "none";
}

// Setting up ending button
function show_ending() {
    var controls = document.getElementById("controls");
    var controllable_settings = document.getElementById("controllable_settings");
    var settings = document.getElementById("settings");
    var ending = document.getElementById("ending");
    controls.style["display"] = "none";
    controllable_settings.style["display"] = "none";
    settings.style["display"] = "none";
    ending.style["display"] = "block";
}
