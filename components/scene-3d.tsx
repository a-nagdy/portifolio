"use client";

import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";
import type { Mesh } from "three";

function FloatingCube() {
  const meshRef = useRef<Mesh>(null);
  const geometry = useMemo(() => [0.8, 0.8, 0.8] as const, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[2, 0, 0]}>
        <boxGeometry args={geometry} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.2}
          emissive="#8b5cf6"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  const meshRef = useRef<Mesh>(null);
  const geometry = useMemo(() => [0.4, 16, 16] as const, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      const morphFactor = Math.sin(state.clock.elapsedTime * 1.5) * 0.2 + 1;
      meshRef.current.scale.set(morphFactor, 1, morphFactor);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[-2, 1, -1]}>
        <sphereGeometry args={geometry} />
        <meshStandardMaterial
          color="#ea580c"
          transparent
          opacity={0.8}
          emissive="#ea580c"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus() {
  const meshRef = useRef<Mesh>(null);
  const geometry = useMemo(() => [0.3, 0.1, 16, 32] as const, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.6;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 1.2) * 0.5;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, -1, 1]}>
        <torusGeometry args={geometry} />
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#6366f1" transparent opacity={0.6} />
    </points>
  );
}

export function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      <FloatingCube />
      <FloatingSphere />
      <FloatingTorus />
      <ParticleField />
      <Environment preset="city" environmentIntensity={0.6} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}
