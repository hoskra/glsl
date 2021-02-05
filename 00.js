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


// float rect(vec3 pt, vec3 size, vec3 center) {
//   vec3 halfsize = size * 0.5;
//   vec3 p = pt - center;
//   float horz = step (-halfsize.x, p.x) - step(halfsize.x, p.x);
//   float vert = step (-halfsize.y, p.y) - step(halfsize.y, p.y);

//   return horz * vert;
// }

// mat3 getRotationMatrix(float theta) {
//   float s = sin(theta);
//   float c = cos(theta);
//   return mat3(c, -s, s, c);
// }

void main() {
  vUv = uv;
  vPosition = position;
  // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position * 0.4, 1.0 );
  // gl_Position = projectionMatrix * modelViewMatrix * vec4( position * 0.5, 1.0 );
  // gl_Position.x += sin(u_time)*0.1;
  // gl_Position.y = clamp(position.y, cos(u_time)*0.8, u_time*10.0);


  // gl_Position.y /= EULER*(sin(u_time));
  gl_Position.x /= EULER*(sin(u_time));
  gl_Position.y /= EULER*(cos(u_time));

  // gl_Position.y *= clamp(gl_Position.x * sin(u_time) / 26.0, gl_Position.x * sin(u_time) / 17.0, 1.0);
  // gl_Position.x *= clamp(gl_Position.y * sin(u_time) / 26.0, gl_Position.y * sin(u_time) / 17.0, 1.0);

  // gl_Position.x 
  // gl_Position.y 

  float n = snoise( position );

  // color.g = clamp(vUv.y, n, 1.0);

  // gl_Position.x = gl_Position.x * n;
  // gl_Position.y = gl_Position.x * n;

  // vec3 tilecount = vec3(1.0, 3.0);
  // vec3 center = vec3(0.5);
  // mat2 mat = getRotationMatrix(u_time);

  // // vec3 p =  (vUv * tilecount) - floor((vUv * tilecount));
  // vec3 p =  fract(vUv * tilecount);


  // vec3 pt = (mat * (p - center)) + center;
  // float inRect = rect(pt, vec3(0.5), center);

  // float d = length(vUv);
  // vec3 color = vec3(0.0);
  // color = vec3(d);
  // // color.r = clamp(vPosition.x, n, 1.0);
  // // color.g = clamp(vPosition.y, n, 1.0);
  // // color.b = clamp(vPosition.y, 1.0, 1.0);


  // color *= inRect;
  // tilecount = vec3(3.0, 1.0);
  // p =  fract(vUv * tilecount);
  // pt = (mat * (p - center)) + center;
  // inRect = rect(pt, vec3(0.5), center);
  // color *= inRect;
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


float rect(vec2 pt, vec2 size, vec2 center) {
  vec2 halfsize = size * 0.5;
  vec2 p = pt - center;
  float horz = step (-halfsize.x, p.x) - step(halfsize.x, p.x);
  float vert = step (-halfsize.y, p.y) - step(halfsize.y, p.y);

  return horz * vert;
}

mat2 getRotationMatrix(float theta) {
  float s = sin(theta);
  float c = cos(theta);
  return mat2(c, -s, s, c);
}


void main (void)
{
  float n = snoise( vPosition );

  // vec2 tilecount = vec2(1.0, 3.0);
  // vec2 center = vec2(0.5);
  // mat2 mat = getRotationMatrix(u_time);

  // // vec2 p =  (vUv * tilecount) - floor((vUv * tilecount));
  // vec2 p =  fract(vUv * tilecount);


  // vec2 pt = (mat * (p - center)) + center;
  // float inRect = rect(pt, vec2(0.5), center);

  // float d = length(vUv);
  // vec3 color = vec3(0.0);
  // color = vec3(d);
  // // color.r = clamp(vPosition.x, n, 1.0);
  // // color.g = clamp(vPosition.y, n, 1.0);
  // // color.b = clamp(vPosition.y, 1.0, 1.0);

  
  // color *= inRect;
  // tilecount = vec2(3.0, 1.0);
  // p =  fract(vUv * tilecount);
  // pt = (mat * (p - center)) + center;
  // inRect = rect(pt, vec2(0.5), center);
  // color *= inRect;
  
  
  vec3 color = vec3(0.0);
  
  color.r = vUv.x * vUv.y;
  color.g = clamp(vUv.y, n, 1.0);
  color.b = clamp(vUv.y, 1.0, 1.0);
  

  gl_FragColor = vec4(color, 1.0);
  gl_FragColor.a *= n;
}
`
