let opacities = [255, 255, 255, 255];
let colors = [];
let inc = 0.1;
let scl = 10;
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield;

function setup() {
    createCanvas(600, 450);
    cols = floor(width / scl);
    rows = floor(height / scl);
    flowfield = new Array(cols * rows);

    colors = [
        color(234, 160, 91,60), // Orange
        color(100, 191, 128,80),   // Green
        color(51, 175, 255,90 ),   // Blue
        color(153, 76, 214,10)  // Purple
     
    ];

    for (let i = 0; i < 300; i++) {
        particles[i] = new Particle();
    }
    background(255);

    let orangeSlider = select('#orange');
    let greenSlider = select('#green');
    let blueSlider = select('#blue');
    let purpleSlider = select('#purple');
    
    orangeSlider.input(() => { opacities[0] = orangeSlider.value(); draw(); });
    greenSlider.input(() => { opacities[1] = greenSlider.value(); draw(); });
    blueSlider.input(() => { opacities[2] = blueSlider.value(); draw(); });
    purpleSlider.input(() => { opacities[3] = purpleSlider.value(); draw(); });
}

function draw() {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;
        }
        yoff += inc;
        zoff += 0.0002;
    }

    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
}

function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();
    this.color = colors[floor(random(0, colors.length))];

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.show = function() {
        stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], opacities[colors.indexOf(this.color)]);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.edges = function() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }

    this.follow = function(vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }
}

