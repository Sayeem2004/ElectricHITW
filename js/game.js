// Global variables
var canvas, context, field, cx, cy;
var electron, proton;

// Onload function
window.onload = function() {
    // Rendering canvas
    render_canvas();

    // Image variable declarations
    electron = document.getElementById('electron');
    proton = document.getElementById('proton');

    load_screen();
};

// Function that renders the canvas
function render_canvas() {
    // Variable declaration
    canvas = document.getElementById('canvas');
    var originalHeight = canvas.height;
    var originalWidth = canvas.width;

    // Rescaling canvas
    var dimensions = getObjectFitSize(true, canvas.clientWidth, canvas.clientHeight, canvas.width, canvas.height);
    var dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;

    // Other variable declaration
    context = canvas.getContext('2d');
    field = document.getElementById('field');
    cx = canvas.width/2;
    cy = canvas.height/2;
}

// Setting up screen
function load_screen() {
    // Setting up square class
    var square = new Square(cx, cy, 200, 1.05, canvas);
    square.draw(context);
    square.draw_outline(context);

    // Setting up circle class
    // var circle = new Circle(cx, cy, 200, 1.05, canvas);
    // circle.draw(context);
    // circle.draw_outline(context);
}

// spawning protons and electrons
//const ChargedParticle = []
//function ChargedParticle () {
//    var circle = new Circle(100, 100, 10, 0.01, canvas)
//    circle.draw(Context)
//    circle.draw_outline(context)
//}

addEventListener('click', (event) =>
{
    const circ = new Circle (
        event.ClientX, event.ClientY, 1, 'green', null
    )
    circ.draw(context)
});


// Going back to home page
function end_game() {
    // Initial url
    var parts = document.location.href.split("/");
    parts.pop();
    var url = parts.join("/") + "/home.html";

    // Moving to next screen
    document.location.href = url;
}
