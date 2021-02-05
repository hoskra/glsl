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
const vshader = `
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


  float n = cnoise( vPosition );

  gl_Position.y *= cos(gl_Position.y + u_time );
  gl_Position.x *= sin(gl_Position.x + u_time );
  gl_Position.z *= cos(gl_Position.z + u_time );

  gl_Position.y *= 0.6;
  gl_Position.x *= 0.6;
  gl_Position.z *= 0.6;

vec3 transformed = vec3(position);
float dx = position.x;
float dy = position.y;
float freq = sqrt(dx*dx + dy*dy);
float amp = 0.1;
float angle = -u_time*10.0+freq*6.0;
transformed.z += sin(angle)*amp;

// gl_Position = vec4(transformed, 1.0);


  // gl_Position.x -= 20.;
}
`

const fshader = `
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

  gl_FragColor = vec4(vUv, sin(u_time), 1.0);

}
`
