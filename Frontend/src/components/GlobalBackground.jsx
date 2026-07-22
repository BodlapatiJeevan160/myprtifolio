/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedPoints() {
  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  const [positions, colors] = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const isNeonBlue = Math.random() > 0.5;
      col[i * 3] = isNeonBlue ? 0.38 : 0.65;     // R
      col[i * 3 + 1] = isNeonBlue ? 0.4 : 0.33;  // G
      col[i * 3 + 2] = isNeonBlue ? 0.94 : 0.96; // B
    }
    return [pos, col];
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <ambientLight intensity={0.2} />
      
      {/* Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Digital Dust / Sparkles */}
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.2} color="#06b6d4" />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.2} color="#a855f7" />
      
      {/* Neural Network Nodes Representation */}
      <AnimatedPoints />
    </>
  );
}

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-80">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Scene />
      </Canvas>
    </div>
  );
}
