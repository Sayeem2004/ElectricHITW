// Class imports

window.onload = function() {
    load_game();
};

function load_game() {
    // Setting canvas and field size
    const canvas = document.getElementById('canvas');
    const field = document.getElementById('field');
    canvas.width = window.innerWidth * .88;
    canvas.height = window.innerHeight * .88;

    // Testing stuff
    var circ =  new Circle(100, 100, 10, 'red');
    circ.draw(canvas);
}

function end_game() {
    // Initial url
    var parts = document.location.href.split("/");
    parts.pop();
    var url = parts.join("/") + "/home.html";

    // Adding to url

    // Moving to next screen
    document.location.href = url;
}
