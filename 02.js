// https://www.youtube.com/watch?v=5wUunlzhzHk&list=PLFky-gauhF452rW98W4cyZ8_2fXBjfGOT&index=2
// https://www.youtube.com/watch?v=LrgyISOLCbg&list=PLFky-gauhF452rW98W4cyZ8_2fXBjfGOT&index=3

/*
uv values

 + ---- (1.0, 1.0)
 |            |
 |            |
(0.0, 0.0) ---+

position values

 + ---- (1.0, 1.0, 0.0)
 |                   |
 |                   |
(-1.0, -1.0, 0.0) ---+

*/
const vshader2 = `
#define EULER 2.718281828459045
#include <noise>
varying vec3 vPosition;
varying vec2 vUv;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;


void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position * 0.4, 1.0 );

  gl_Position.x /= EULER*(cos(u_time));
  gl_Position.y /= EULER*(sin(u_time));
}
`

const fshader2 = `
#include <noise>

#define PI2 6.28318530718
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

varying vec2 vUv;
varying vec3 vPosition;

void main (void)
{
  float n = snoise( vPosition );

  vec3 color = vec3(0.0);

  // color.r = vUv.x * vUv.y;
  color.g = clamp(vUv.y, n, 1.0);
  color.b = clamp(vUv.y, 1.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
  gl_FragColor.a *= n;
}
`
