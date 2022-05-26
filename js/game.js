// Global variables
var canvas, context, field;
var charge_mode;

// Onload function
window.onload = function() {
    load_screen();
};

// Setting up screen
function load_screen() {
    // Setting canvas, context, and field variables
    canvas = document.getElementById('canvas');
    field = document.getElementById('field');
    context = canvas.getContext('2d');

    let electron = new Electron(canvas.width/2, canvas.height/2, 3);
    electron.draw(context);
}

// // Setting up clicking
// addEventListener('click',
//     (event) => {
//         var clump = new Circle(event.clientX, event.clientY, 100, 'blue')
//
//     }
// );

// Going back to home page
function end_game() {
    // Initial url
    var parts = document.location.href.split("/");
    parts.pop();
    var url = parts.join("/") + "/home.html";

    // Moving to next screen
    document.location.href = url;
}
