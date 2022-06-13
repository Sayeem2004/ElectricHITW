// Actions taken when window loads
window.onload = function() {
    // Setting up the settings division
    gameplay_radio_set();
    difficulty_radio_set();
    gameplay_radio_update();
    difficulty_radio_update();
}

// Setting up radio for gameplay mode
function gameplay_radio_set() {
    // Variable declarations
    const gameplay_radio = document.getElementsByName("gameplay_mode");
    const zen_desc = document.getElementById("zen_desc");
    const timed_desc = document.getElementById("timed_desc");

    // Setting default values
    zen_desc.style["display"] = "none";
    timed_desc.style["display"] = "none";

    // Setting up clicking event
    gameplay_radio.forEach(radio => {
        radio.addEventListener("click", gameplay_radio_update);
    });
}

// Helper function
function gameplay_radio_update() {
    if (document.getElementById("zen").checked) {
        // Zen mode case
        zen_desc.style["display"] = "block";
        timed_desc.style["display"] = "none";
    } else {
        // Timed mode case
        zen_desc.style["display"] = "none";
        timed_desc.style["display"] = "block";
    }
}

// Setting up maximum time slider updating
function max_time_update() {
    // Variable declaration
    const time_output_id = document.getElementById("time_output_id");
    const time_input_id = document.getElementById("time_input_id");

    // Updating label
    time_output_id.innerHTML = 'Maximum time: ' + (time_input_id.value == 10 ? "10.0" : ('0' + time_input_id.value).padEnd(3, '.').padEnd(4, '0')) + ' minutes';
}

// Setting up radio for difficulty mode
function difficulty_radio_set() {
    // Variable declarations
    const difficulty_radio = document.getElementsByName("difficulty_mode");
    const easy_desc = document.getElementById("easy_desc");
    const normal_desc = document.getElementById("normal_desc");
    const hard_desc = document.getElementById("hard_desc");
    const freestyle_desc = document.getElementById("freestyle_desc");

    // Setting default values
    easy_desc.style["display"] = "none";
    normal_desc.style["display"] = "none";
    hard_desc.style["display"] = "none";
    freestyle_desc.style["display"] = "none";

    // Setting up clicking event
    difficulty_radio.forEach(radio => {
        radio.addEventListener("click", difficulty_radio_update);
    });
}

function difficulty_radio_update() {
    if (document.getElementById("easy").checked) {
        // Easy mode case
        easy_desc.style["display"] = "block";
        normal_desc.style["display"] = "none";
        hard_desc.style["display"] = "none";
        freestyle_desc.style["display"] = "none";
    } else if (document.getElementById("normal").checked) {
        // Normal mode case
        easy_desc.style["display"] = "none";
        normal_desc.style["display"] = "block";
        hard_desc.style["display"] = "none";
        freestyle_desc.style["display"] = "none";
    } else if (document.getElementById("hard").checked) {
        easy_desc.style["display"] = "none";
        normal_desc.style["display"] = "none";
        hard_desc.style["display"] = "block";
        freestyle_desc.style["display"] = "none";
    } else {
        easy_desc.style["display"] = "none";
        normal_desc.style["display"] = "none";
        hard_desc.style["display"] = "none";
        freestyle_desc.style["display"] = "block";
    }
}

// Setting up point updating
function points_update() {
    // Variable declarations
    const points = document.getElementById("points");
    const scale = document.getElementById("scale_input_id");
    const charge = document.getElementById("charge_input_id");
    const simple = document.getElementById("simple");
    const norm = document.getElementById("norm");
    const dist = document.getElementById("dist_input_id");
    const on1 = document.getElementById("on1");
    const on2 = document.getElementById("on2");

    // Calculating points and updating label
    var sm = 0;
    sm += 20 - Math.floor((scale.value - 1.0490) / 0.05);
    sm += Math.floor((charge.value - 1) / 0.1);
    sm += (simple.checked ? 5 : norm.checked ? 10 : 15);
    sm += Math.floor(dist.value / 10);
    sm += (on1.checked ? 20 : 0);
    sm += (on2.checked ? 20 : 0);
    points.innerHTML = "Points awarded for completion: " + sm.toString().padStart(3, '0');
}

// Setting up scale slider updating
function scale_update() {
    // Variable declaration
    const scale_output_id = document.getElementById("scale_output_id");
    const scale_input_id = document.getElementById("scale_input_id");

    // Updating label
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
    dist_output_id.innerHTML = 'Randomness of charge distribution: ' + dist_input_id.value.padStart('3', 0) + "%";

    // Updating points
    points_update();
}

// Leaving homepage function
function switch_to_game() {
    // Initial url
    var parts = document.location.href.split("/");
    parts.pop();
    var url = parts.join("/") + "/game.html?";

    // Variable declarations
    const points = document.getElementById("points");
    const scale = document.getElementById("scale_input_id");
    const charge = document.getElementById("charge_input_id");
    const simple = document.getElementById("simple");
    const norm = document.getElementById("norm");
    const dist = document.getElementById("dist_input_id");
    const on1 = document.getElementById("on1");
    const easy = document.getElementById("easy");
    const normal = document.getElementById("normal");
    const hard = document.getElementById("hard");
    const zen = document.getElementById("zen");
    const max_time = document.getElementById("time_input_id");

    // Casework
    if (easy.checked) {
        // Easy case
        url += "mode=" + encodeURIComponent("easy") + "&";
        url += "time=" + encodeURIComponent(zen.checked ? -1 : max_time.value) + "&";
        url += "points=" + encodeURIComponent(15) + "&";
        url += "scale=" + encodeURIComponent(1.55) + "&";
        url += "charge=" + encodeURIComponent(1.00) + "&";
        url += "complexity=" + encodeURIComponent("simple") + "&";
        url += "dist=" + encodeURIComponent(0) + "&";
        url += "barriers=" + encodeURIComponent("off") + "&";
        url += "rotation=" + encodeURIComponent("off");
    } else if (normal.checked) {
        // Normal case
        url += "mode=" + encodeURIComponent("normal") + "&";
        url += "time=" + encodeURIComponent(zen.checked ? -1 : max_time.value) + "&";
        url += "points=" + encodeURIComponent(55) + "&";
        url += "scale=" + encodeURIComponent(1.30) + "&";
        url += "charge=" + encodeURIComponent(1.50) + "&";
        url += "complexity=" + encodeURIComponent("normal") + "&";
        url += "dist=" + encodeURIComponent(50) + "&";
        url += "barriers=" + encodeURIComponent("on") + "&";
        url += "rotation=" + encodeURIComponent("off");
    } else if (hard.checked) {
        // Hard case
        url += "mode=" + encodeURIComponent("hard") + "&";
        url += "time=" + encodeURIComponent(zen.checked ? -1 : max_time.value) + "&";
        url += "points=" + encodeURIComponent(90) + "&";
        url += "scale=" + encodeURIComponent(1.20) + "&";
        url += "charge=" + encodeURIComponent(2.00) + "&";
        url += "complexity=" + encodeURIComponent("complex") + "&";
        url += "dist=" + encodeURIComponent(85) + "&";
        url += "barriers=" + encodeURIComponent("on") + "&";
        url += "rotation=" + encodeURIComponent("off");
    } else {
        // Freestyle case
        const text = points.textContent;
        url += "mode=" + encodeURIComponent("freestyle") + "&";
        url += "time=" + encodeURIComponent(zen.checked ? -1 : max_time.value) + "&";
        url += "points=" + encodeURIComponent(text.slice(-3)) + "&";
        url += "scale=" + encodeURIComponent(scale.value) + "&";
        url += "charge=" + encodeURIComponent(charge.value) + "&";
        url += "complexity=" + encodeURIComponent((simple.checked ? "simple" : norm.checked ? "normal" : "complex")) + "&";
        url += "dist=" + encodeURIComponent(dist.value) + "&";
        url += "barriers=" + encodeURIComponent((on1.checked ? "on" : "off")) + "&";
        url += "rotation=" + encodeURIComponent("off");
    }

    // Moving to next screen
    document.location.href = url;
}
