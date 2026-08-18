import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function createSeededRandom(seed: number) {
  let state = seed % 2147483647;

  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

// Particle System Component
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  // Create particle geometry
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const random = createSeededRandom(20260818);

    for (let i = 0; i < count; i++) {
      const radius = 10 + random() * 15;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Emerald to teal gradient
      const color = new THREE.Color();
      color.setHSL(0.42 + random() * 0.1, 0.7, 0.4 + random() * 0.2);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.05 + random() * 0.15;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return geometry;
  }, []);

  // Particle material
  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Animate particles using useFrame
  useFrame((_state, delta) => {
    if (particlesRef.current) {
      timeRef.current += delta;
      const bufferGeometry = particlesRef.current.geometry as THREE.BufferGeometry;
      const positions = bufferGeometry.attributes.position.array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        // Gentle floating animation
        positions[i * 3 + 1] += Math.sin(timeRef.current * 0.5 + i * 0.01) * 0.001;
        positions[i * 3] += Math.cos(timeRef.current * 0.3 + i * 0.01) * 0.0005;
      }
      bufferGeometry.attributes.position.needsUpdate = true;

      // Slow rotation of entire system
      particlesRef.current.rotation.y += delta * 0.0003;
      particlesRef.current.rotation.x += delta * 0.0001;
    }
  });

  return <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />;
}

// Floating geometric shapes component
function FloatingShapes() {
  const meshesRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const shapeGeometries = useMemo(() => [
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.TetrahedronGeometry(0.6, 0),
    new THREE.IcosahedronGeometry(0.7, 0),
  ], []);

  const shapeMaterials = useMemo(() => [
    new THREE.MeshPhysicalMaterial({
      color: '#10b981',
      metalness: 0.1,
      roughness: 0.3,
      transparent: true,
      opacity: 0.15,
      transmission: 0.3,
      thickness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    }),
    new THREE.MeshPhysicalMaterial({
      color: '#34d399',
      metalness: 0.1,
      roughness: 0.3,
      transparent: true,
      opacity: 0.15,
      transmission: 0.3,
      thickness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    }),
    new THREE.MeshPhysicalMaterial({
      color: '#059669',
      metalness: 0.1,
      roughness: 0.3,
      transparent: true,
      opacity: 0.15,
      transmission: 0.3,
      thickness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    }),
  ], []);

  useFrame((_state, delta) => {
    if (meshesRef.current) {
      timeRef.current += delta;
      meshesRef.current.children.forEach((mesh, i) => {
        mesh.rotation.x += delta * 0.05 * (i + 1) * 0.3;
        mesh.rotation.y += delta * 0.03 * (i + 1) * 0.3;
        mesh.position.y += Math.sin(timeRef.current * 0.5 + i) * 0.002;
      });
    }
  });

  return (
    <group ref={meshesRef}>
      {shapeGeometries.map((geometry, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={shapeMaterials[i]}
          position={[
            (i - 1) * 4 + Math.sin(i) * 2,
            Math.cos(i) * 3,
            (i - 1) * -3
          ]}
          rotation={[Math.PI / 6, Math.PI / 4, 0]}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
}

export default function ThreeDScene() {
  return (
    <Canvas
      className="absolute inset-0 -z-10"
      camera={{ position: [0, 0, 25], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Fog for depth */}
      <fog attach="fog" args={['#0f172a', 15, 50]} />

      {/* Stars background */}
      <Stars radius={100} depth={100} count={2000} factor={4} saturation={0} />

      {/* Ambient light */}
      <ambientLight intensity={0.4} />

      {/* Directional lights for depth */}
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#10b981" />
      <directionalLight position={[-10, -5, 5]} intensity={0.4} color="#34d399" />
      <pointLight position={[0, 5, 10]} intensity={0.5} color="#10b981" decay={2} distance={50} />

      {/* Particle system */}
      <ParticleSystem />

      {/* Subtle floating geometric shapes */}
      <FloatingShapes />

      {/* Orbit controls - limited for subtle interaction */}
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        enablePan={false}
        enableZoom={true}
        minZoom={0.8}
        maxZoom={1.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={true}
        autoRotateSpeed={0.2}
      />
    </Canvas>
  );
}