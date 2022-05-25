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


class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw() {
        c.beginpath()
        c.arc(this.x, this.y, 1, 0, 360, false)
        c.fillStyle = 'blue';
        c.fill()
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
    draw(canvas) {
        canvas.beginPath()
        canvas.arc(this.x, this.y, this.radius, 0 , 360, false)
        canvas.fillStyle = this.color
        canvas.fill()
    }
}
const Circle = new Circle (100, 100, 5, 'red')
player.draw()


class Rectangle {
    constructor() {
        this.position = {
            x: 55
            y: 55
        }
        this.width = 20
        this.height = 40
    }

    draw(canvas) {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = 'green'
    }
}
const Rectangle = new Rectangle()
Rectangle.draw()
// For above, is it Rectangle.draw or player.draw (if latter, change all below classes)

class Sqaure {
    constructor() {
        this.position = {
            x: 115
            y: 115
        }
        this.length = 16
    }

    draw(canvas) {
        ctx.fillRect(this.position.x, this.position.y, this.length, this.length)
        ctx.fillStyle = 'orange'
    }
}
const Square = new Square()
Square.draw()


class ComplexPolygon {
    var SideCount = 8
    scalar = 10
    Xcenter = 10
    Ycenter = 10

    ctx.beginpath()
    ctx.moveTo (Xcenter + Math.cos(0) * scalar, Ycenter + Math.sin(0) * scalar)
    for (var i = 1; i <= SideCount; i += 1) {
        ctx.lineTo (Xcenter + Math.cos(2 * Math.pi * i / SideCOunt) * scalar, Ycenter + Math.sin(2 * Math.Pi * i /SideCount) * scalar)
        ctx.fillStyle = 'purple'
    }
}

ComplexPolygon.draw()
