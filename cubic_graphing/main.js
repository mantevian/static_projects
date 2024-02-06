let sh;

function preload() {
    sh = loadShader('shader.vert', 'shader.frag');
}

function setup() {
	const canvas = createCanvas(600, 600, WEBGL);
	canvas.parent('canvas-container');

    pixelDensity(1);
    noStroke();
}

function draw() {
    shader(sh);

    let x1 = document.getElementById('x1').value || `0`;
    let x2 = document.getElementById('x2').value || `0`;
    let x3 = document.getElementById('x3').value || `0`;

    let y1 = document.getElementById('y1').value || `0`;
    let y2 = document.getElementById('y2').value || `0`;
    let y3 = document.getElementById('y3').value || `0`;

    let x1y1 = document.getElementById('x1y1').value || `0`;
    let x1y2 = document.getElementById('x1y2').value || `0`;
    let x1y3 = document.getElementById('x1y3').value || `0`;

    let x2y1 = document.getElementById('x2y1').value || `0`;
    let x2y2 = document.getElementById('x2y2').value || `0`;
    let x2y3 = document.getElementById('x2y3').value || `0`;

    let x3y1 = document.getElementById('x3y1').value || `0`;
    let x3y2 = document.getElementById('x3y2').value || `0`;
    let x3y3 = document.getElementById('x3y3').value || `0`;

    let a = document.getElementById('a').value || `0`;


    sh.setUniform("u_resolution", [width, height]);

    sh.setUniform("x1", x1);
    sh.setUniform("x2", x2);
    sh.setUniform("x3", x3);

    sh.setUniform("y1", y1);
    sh.setUniform("y2", y2);
    sh.setUniform("y3", y3);

    sh.setUniform("x1y1", x1y1);
    sh.setUniform("x1y2", x1y2);
    sh.setUniform("x1y3", x1y3);

    sh.setUniform("x2y1", x2y1);
    sh.setUniform("x2y2", x2y2);
    sh.setUniform("x2y3", x2y3);

    sh.setUniform("x3y1", x3y1);
    sh.setUniform("x3y2", x3y2);
    sh.setUniform("x3y3", x3y3);

    sh.setUniform("a", a);

    sh.setUniform("u_thickness", document.getElementById('thickness').value || 0);

    rect(0, 0, width, height);
}