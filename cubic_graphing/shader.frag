#ifdef GL_ES
precision mediump float;
#endif

uniform float x1;
uniform float x2;
uniform float x3;

uniform float y1;
uniform float y2;
uniform float y3;

uniform float x1y1;
uniform float x1y2;
uniform float x1y3;

uniform float x2y1;
uniform float x2y2;
uniform float x2y3;

uniform float x3y1;
uniform float x3y2;
uniform float x3y3;

uniform float a;

uniform float u_thickness;
uniform vec2 u_resolution;

void main() {
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;

    float x = pos.x * 2. - 1.;
    float y = pos.y * 2. - 1.;

    float scale = 10.;

    x *= scale;
    y *= scale;

    float xs = x * x;
    float xc = xs * x;
    float ys = y * y;
    float yc = ys * y;

    float res = x1 * x + x2 * xs + x3 * xc
        + y1 * y + y2 * ys + y3 * yc
        + x1y1 * x * y + x1y2 * x * ys + x1y3 * x * yc
        + x2y1 * xs * y + x2y2 * xs * ys + x2y3 * xs * yc
        + x3y1 * xc * y + x3y2 * xc * ys + x3y3 * xc * yc
        + a;

    if (abs(floor(res)) < u_thickness)
        gl_FragColor = vec4(pos.x, pos.y, 1.0, 1.0);
}