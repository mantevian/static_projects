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

let selected_degree_node;
let degree_slider;

function setup() {
	const canvas = createCanvas(600, 600);
	canvas.parent('canvas-container');
	colorMode(HSB);
	blendMode(ADD);

	generate();
}

let degree = 10;
let precision = 0.1;
let scale = 10;

let maclaurin = ``;
let init_func = `sin(x)`;

function generate() {
	clear();

	selected_degree_node = document.getElementById(`selected_degree`);
	degree_slider = document.getElementById(`degree`);

	update_current_degree();

	precision = parseFloat(document.getElementById(`precision`).value || `0.1`);
	scale = parseFloat(document.getElementById(`scale`).value || `10`);

	init_func = document.getElementById(`evaluated_function`).value;

	stroke(100);
	fill(100);

	loop();
}

function start_generating() {
	generate();
}

function draw() {
	stroke(30);
	line(0, 300, 600, 300);
	line(300, 0, 300, 600);
	stroke(0);

	let derivative = math.parse(init_func);
	maclaurin = math.evaluate(init_func, { x: 0 });

	for (let x = -scale; x <= scale; x += precision)
		circle(x * 300 / scale + 300, 300 - math.evaluate(init_func, { x }) * 300 / scale, 1.5);

	for (let i = 1; i < degree; i++) {
		derivative = math.derivative(derivative, `x`);
		maclaurin += ` + x^${i} * ${derivative.evaluate({ x: 0 })}/${i}!`;
	}

	fill(100, 100, 100);
	for (let x = -scale; x <= scale; x += precision)
		circle(x * 300 / scale + 300, 300 - math.evaluate(maclaurin, { x }) * 300 / scale, 4);

	noLoop();
}

function update_current_degree() {
	degree = parseFloat(document.getElementById(`degree`).value || `10`);
	selected_degree_node.innerText = degree;
}

function change_max_degree() {
	let d = parseInt(document.getElementById(`max_degree`).value || `30`);
	degree_slider.max = d;
	update_current_degree();
}