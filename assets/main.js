window.requestAnimFrame = (function() { return window.requestAnimationFrame })();

const canvas = document.getElementById("background");
const c = canvas.getContext("2d");

var numStars = 900;
var radius = '0.' + Math.floor(Math.random() * 3) + 1;
var focalLength = canvas.width * 2;
var warp = 0;
var centerX, centerY;

var stars = [], star;
var i;

var animate = true;

initializeStars();

function executeFrame() {
    if (animate)
        requestAnimFrame(executeFrame);
    moveStars();
    drawStars();
}

function initializeStars() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    stars = [];
    for (i = 0; i < numStars; i++) {
        star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            o: '0.' + Math.floor(Math.random() * 25) + 1
        };
        stars.push(star);
    }
}

function moveStars() {
    for (i = 0; i < numStars; i++) {
        star = stars[i];
        star.z--;

        if (star.z <= 0)
            star.z = canvas.width;
    }
}

function drawStars() {
    let pixelX, pixelY, pixelRadius;

    if (canvas.width !== window.innerWidth || canvas.width !== window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars();
    }
    if (warp === 0) {
        c.fillStyle = "#16161d";
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
    c.fillStyle = "rgba(255, 255, 255, " + radius + ")";
    for (i = 0; i < numStars; i++) {
        star = stars[i];

        pixelX = (star.x - centerX) * (focalLength / star.z);
        pixelX += centerX;
        pixelY = (star.y - centerY) * (focalLength / star.z);
        pixelY += centerY;
        pixelRadius = (focalLength / star.z);

        c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
        c.fillStyle = "rgba(255, 255, 255, " + star.o + ")";
        c.fill();
    }
}

executeFrame();
