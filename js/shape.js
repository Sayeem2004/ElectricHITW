class Square {
    // Size, position, color
    var sz = ;
    var x, y = ;
    var perimeter [(x, y)]
}

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
