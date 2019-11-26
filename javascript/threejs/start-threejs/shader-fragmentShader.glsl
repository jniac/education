
precision mediump float;
precision mediump int;
uniform float time;
uniform vec3 foo;
uniform float angle;
varying vec3 vPosition;
varying vec4 vColor;

vec2 rotate(vec2 v, float a) {
	float cosa = cos(a);
	float sina = sin(a);
	return vec2(cosa * v.x - sina * v.y, sina * v.x + cosa * v.y);
}

void main()	{
	vec2 v = rotate(vPosition.xy, angle + time * 0.1);
	float a = sin(v.x * 3.141592 * 0.3 + time) * 0.5 + 0.5;
	a *= sin(v.y * 3.141592 * 2.0 + time * .5) * 0.5 + 0.5;
	a = 1.0 - a;
	vec4 c = vec4(foo, a);
	gl_FragColor = c;
}
