"use client"

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Environment } from '@react-three/drei'
import * as THREE from 'three'

function PlasmaSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Rotate the sphere slowly
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial
        color="#ff2a5f"
        emissive="#9d00ff"
        emissiveIntensity={0.8}
        attach="material"
        distort={0.6} // Amount of distortion
        speed={1.5}   // Speed of distortion
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

export default function PlasmaBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} color="#00d2ff" intensity={2} />
        <PlasmaSphere />
        <Environment preset="city" />
      </Canvas>
      {/* Overlay to dim the sphere slightly so text is readable */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
    </div>
  )
}
