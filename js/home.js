function switch_to_game() {
    // Initial url
    var parts = document.location.href.split("/");
    parts.pop();
    var url = parts.join("/") + "/game.html";

    // Moving to next screen
    document.location.href = url;
}
