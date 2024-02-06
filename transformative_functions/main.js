const _math = math.create(math.all);
const limited_compile = _math.compile;
const limited_evaluate = _math.evaluate;
const parser = _math.parser();

_math.import({
	'import': function () { throw new Error(`Function import is disabled`) },
	'createUnit': function () { throw new Error(`Function createUnit is disabled`) },
	'evaluate': function () { throw new Error(`Function evaluate is disabled`) },
	'parse': function () { throw new Error(`Function parse is disabled`) },
	'simplify': function () { throw new Error(`Function simplify is disabled`) },
	'derivative': function () { throw new Error(`Function derivative is disabled`) }
}, { override: true });

function setup() {
	const canvas = createCanvas(600, 600);
	canvas.parent('canvas-container');
	colorMode(HSB);
	blendMode(ADD);
	
	parser.set(`polygon`, (i, s, d) => polygon(i, s, d))
	parser.set(`circle`, (i, r) => circ(i, r))
	
	generate();
}

let limit = 10;
let x = -limit;
let interval = 0.01;
let lines_per_frame = 100;
let scale = limit * 2.5;
let line_thickness = 1;

function generate() {
	clear();

	limit = parseFloat(document.getElementById(`limit`).value || `10`);
	interval = parseFloat(document.getElementById(`interval`).value || `0.01`);
	lines_per_frame = parseFloat(document.getElementById(`lines_per_frame`).value || `100`);
	line_thickness = parseFloat(document.getElementById(`thickness`).value || `1`);

	parser.evaluate(`func(x) = ${document.getElementById(`evaluated_function`).value}`);
	parser.evaluate(`input_x(x) = ${document.getElementById(`input_function_x`).value}`);
	parser.evaluate(`input_y(x) = ${document.getElementById(`input_function_y`).value}`);
	parser.evaluate(`output_x(x) = ${document.getElementById(`output_function_x`).value}`);
	parser.evaluate(`output_y(x) = ${document.getElementById(`output_function_y`).value}`);

	x = -limit;

	stroke(0);
	fill(100);
	strokeWeight(line_thickness);

	for (let i = -10; i <= 10; i += 0.01) {
		let point = input(i);
		circle(point.x * scale + 300, 300 - point.y * scale, 1);
	}

	for (let i = -10; i <= 10; i += 0.01) {
		let point = output(i);
		circle(point.x * scale + 300, 300 - point.y * scale, 1);
	}
}
function func(i) {
	return parser.evaluate(`func(${i})`);
}

function input(i) {
	return { x: parser.evaluate(`input_x(${i})`), y: parser.evaluate(`input_y(${i})`) };
}

function output(i) {
	return { x: parser.evaluate(`output_x(${i})`), y: parser.evaluate(`output_y(${i})`) };
}

function draw() {
	for (let l = 0; l < lines_per_frame; l++)
		if (x <= limit)
			drawNextLine();
}

function drawNextLine() {
	let f = func(x);
	stroke((x + limit) / limit * 180, 100, 50);

	let in_ = input(x);
	let out_ = output(f);
	line(in_.x * scale + 300, 300 - in_.y * scale, out_.x * scale + 300, 300 - out_.y * scale);

	x += interval;
}

function circ(input, radius) {
	return { x: Math.cos(input) * radius, y: Math.sin(input) * radius }
}

function polygon(input, sides, d) {
	let a = cos(PI / sides) / cos(input - 2 * PI / sides * floor((sides * (input + PI / 2) + PI) / (2 * PI)) + PI / 2);

	return { x: a * cos(input) * d, y: a * sin(input) * d }
}
