// Actions taken when window loads
window.onload = function() {
    // Setting up the settings division
    gameplay_radio_set();
    difficulty_radio_set();
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
        radio.addEventListener("click", () => {
            if (document.getElementById("zen").checked) {
                // Zen mode case
                zen_desc.style["display"] = "block";
                timed_desc.style["display"] = "none";
            } else {
                // Timed mode case
                zen_desc.style["display"] = "none";
                timed_desc.style["display"] = "block";
            }
        });
    });
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
        radio.addEventListener("click", () => {
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
        });
    });
}

// Setting up scale slider updating
function scale_update() {
    // Variable declaration
    const scale_output_id = document.getElementById("scale_output_id");
    const scale_input_id = document.getElementById("scale_input_id");

    // Updating label
    scale_output_id.innerHTML = 'Scale of outline: ' + (scale_input_id.value == 2 ? "2.00" : scale_input_id.value.padEnd(4, '0')) + 'x';
}
