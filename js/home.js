function start_game() {
    // Initial url
    var parts = document.location.href.split("/");
    parts.pop();
    var url = parts.join("/") + "/game.html";

    // Adding to url

    // Moving to next screen
    document.location.href = url;
}
