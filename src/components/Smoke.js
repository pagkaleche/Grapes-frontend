// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// const SmokeEffect = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5;

//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     const textureLoader = new THREE.TextureLoader();
//     const smokeTexture = textureLoader.load("/images/smoke.png");
//     const smokeMaterial = new THREE.MeshLambertMaterial({
//       map: smokeTexture,
//       transparent: true,
//     });

//     const smokeGeometry = new THREE.PlaneGeometry(5, 5);
//     const smokeParticles = [];

//     for (let i = 0; i < 20; i++) {
//       const smokeMesh = new THREE.Mesh(smokeGeometry, smokeMaterial);
//       smokeMesh.position.set(
//         Math.random() * 10 - 5,
//         Math.random() * 10 - 5,
//         Math.random() * 10 - 5
//       );
//       smokeMesh.rotation.z = Math.random() * Math.PI * 2;
//       scene.add(smokeMesh);
//       smokeParticles.push(smokeMesh);
//     }

//     const light = new THREE.DirectionalLight(0xffffff, 0.5);
//     light.position.set(0, 0, 1);
//     scene.add(light);

//     const animate = () => {
//       smokeParticles.forEach((particle) => {
//         particle.rotation.z += 0.01;
//       });
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       mountRef.current.removeChild(renderer.domElement);
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />;
// };

// export default SmokeEffect;


// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// const SmokeEffect = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5;

//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     const textureLoader = new THREE.TextureLoader();
    
//     // Smoke Shader
//     const smokeShader = {
//       uniforms: {
//         time: { value: 0 },
//         resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
//       },
//       vertexShader: `
//         void main() {
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform float time;
//         uniform vec2 resolution;

//         float noise(vec2 p) {
//           return sin(p.x * 0.1 + time) * cos(p.y * 0.1 + time);
//         }

//         void main() {
//           vec2 uv = gl_FragCoord.xy / resolution.xy;
//           float n = noise(uv * 5.0);
//           gl_FragColor = vec4(vec3(1.0, 1.0, 1.0) * n, 0.1 + n * 0.9);
//         }
//       `,
//     };

//     // Create a plane geometry and apply the smoke shader
//     const planeGeometry = new THREE.PlaneGeometry(10, 10);
//     const smokeMaterial = new THREE.ShaderMaterial({
//       uniforms: smokeShader.uniforms,
//       vertexShader: smokeShader.vertexShader,
//       fragmentShader: smokeShader.fragmentShader,
//       transparent: true,
//     });
//     const smokePlane = new THREE.Mesh(planeGeometry, smokeMaterial);
//     scene.add(smokePlane);

//     const animate = () => {
//       smokeMaterial.uniforms.time.value += 0.05;

//       // Rotate the smoke for animation
//       smokePlane.rotation.z += 0.01;

//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       mountRef.current.removeChild(renderer.domElement);
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />;
// };

// export default SmokeEffect;
