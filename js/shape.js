// This is where all the object/sprite classes will go (ie do your work here)
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

class Circle {
    var perimeter = [(100, 100), ]
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(c) {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0 , 360, false)
        c.fillStyle = this.color
        c.fill()
    }
}

const Circle = new Circle (100, 100, 5, 'red')
player.draw()
