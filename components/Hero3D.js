'use client';
// The one complex visual. Swap the mesh for any react-three-fiber scene later.
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]} aria-hidden="true">
      <ambientLight intensity={0.6} />
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh>
          <torusKnotGeometry args={[0.9, 0.3, 220, 32]} />
          <MeshDistortMaterial color="#2B4BFF" roughness={0.15} metalness={0.7} distort={0.25} speed={1.5} />
        </mesh>
      </Float>
      <Environment preset="city" />
    </Canvas>
  );
}
