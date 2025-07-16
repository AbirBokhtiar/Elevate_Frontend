'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Preload, useGLTF } from '@react-three/drei';
import { useTransform, useSpring, motion } from 'framer-motion';
import { Suspense } from 'react';

interface Hero3DProps {
  scrollYProgress: any;
}

// Sneaker moves right → left → right
const Sneaker = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const ref = useRef<any>(null);
  const { scene } = useGLTF('/sneaker3d.glb');

  const inputRange = [0, 0.1, 0.2, 0.3];
  const positionX = useSpring(useTransform(scrollYProgress, inputRange, [-4, 0, 4, -1]), {
    stiffness: 120,
    damping: 18,
  });

  const rotationY = useSpring(useTransform(scrollYProgress, [0, 0.4], [0, Math.PI * 7.5]), {
    stiffness: 100,
    damping: 16,
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = positionX.get();
      ref.current.rotation.y = rotationY.get();
    }
  });

  return <primitive ref={ref} object={scene} scale={0.003} />;
};

// Scarf moves left → right → left (opposite of sneaker)
const Watch = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const ref = useRef<any>(null);
  const { scene } = useGLTF('/watch3d.glb');

  const inputRange = [0, 0.1, 0.2, 0.3];
  const positionX = useSpring(useTransform(scrollYProgress, inputRange, [4, 0, -4, 1]), {
    stiffness: 120,
    damping: 18,
  });

  const rotationY = useSpring(useTransform(scrollYProgress, [0, 0.4], [0, -Math.PI * 7]), {
    stiffness: 100,
    damping: 16,
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = positionX.get();
      ref.current.rotation.y = rotationY.get();
    }
  });

  return <primitive ref={ref} object={scene} scale={10.5} />;
};

export default function Hero3D({ scrollYProgress }: Hero3DProps) {
  const opacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);

  return (
    <motion.div
      className="h-screen w-full absolute top-0 left-0 pointer-events-none"
      style={{ opacity }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Watch scrollYProgress={scrollYProgress} />
          <Sneaker scrollYProgress={scrollYProgress} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
