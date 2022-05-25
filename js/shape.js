class Square {
    // Size, position, color
    var sz = ;
    var x, y = ;
    var perimeter [(x, y)]
}
// Think we need this part somewhere, but I'm not sure,
// var canvas = document.querySelector('canvas')
// var c = canvas.getContext('2d')
// to import sprites
    // import ---- from

class Star {

let {Sprite} = Star1
let image = new Image();
image.src = 'assets/star.png'
image.onload = function() {
    let sprite = Sprite({
        x: 188
        y: 89
        anchor: {x: 0.5, y: 0.5}
        image: image
    })
    // sprite.render()
}
}


class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(context) {
        context.beginpath()
        context.arc(this.x, this.y, 1, 0, 360, false)
        context.fillStyle = 'blue';
        context.fill()
    }
}


// Class for drawing circles on the screen
class Circle {
    // Constructor method
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    // Draw method
    draw(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0 , 360, false)
        context.fillStyle = this.color
        context.fill()
    }
}


class Rectangle {
    constructor() {
        this.position = {
            x: 55
            y: 55
        }
        this.width = 20
        this.height = 40
    }

    draw(context) {
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        context.fillStyle = 'green'
    }
}


class Sqaure {
    constructor() {
        this.position = {
            x: 115
            y: 115
        }
        this.length = 16
    }

    draw(context) {
        context.fillRect(this.position.x, this.position.y, this.length, this.length)
        context.fillStyle = 'orange'
    }
}


class ComplexPolygon {
    var SideCount = 8
    scalar = 10
    Xcenter = 10
    Ycenter = 10

    context.beginpath()
    context.moveTo (Xcenter + Math.cos(0) * scalar, Ycenter + Math.sin(0) * scalar)
    for (var i = 1; i <= SideCount; i += 1) {
        context.lineTo (Xcenter + Math.cos(2 * Math.pi * i / SideCount) * scalar, Ycenter + Math.sin(2 * Math.Pi * i /SideCount) * scalar)
        context.fillStyle = 'purple'
    }
}
