import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PALETTE = ["#00f5d4", "#50fa7b", "#ffd166", "#ff5555", "#bd93f9", "#38ef7d"];

export type BlockType =
  | "grass"
  | "stone"
  | "diamond_ore"
  | "emerald_ore"
  | "redstone_ore"
  | "gold_ore"
  | "crafting_table"
  | "chest"
  | "obsidian";

/**
 * 3D Minecraft Voxel Block with detailed pixel faces, ore deposits & emissive crystal specks.
 */
export function VoxelBlock({
  position,
  type = "grass",
  scale = 1,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  type?: BlockType;
  scale?: number;
  rotation?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Group>(null);

  // Ore fleck positions on 4 outer faces for high visual realism
  const oreSpots = useMemo(() => {
    return [
      // front
      [0.3, 0.25, 0.76],
      [-0.25, -0.2, 0.76],
      [-0.1, 0.35, 0.76],
      [0.2, -0.3, 0.76],
      // back
      [-0.3, 0.2, -0.76],
      [0.2, -0.25, -0.76],
      // left
      [-0.76, 0.2, 0.25],
      [-0.76, -0.25, -0.15],
      // right
      [0.76, 0.15, -0.2],
      [0.76, -0.3, 0.2],
    ] as [number, number, number][];
  }, []);

  const oreColor =
    type === "diamond_ore"
      ? "#00f5d4"
      : type === "emerald_ore"
        ? "#50fa7b"
        : type === "redstone_ore"
          ? "#ff3344"
          : type === "gold_ore"
            ? "#ffd166"
            : "#ffffff";

  const isOre =
    type === "diamond_ore" ||
    type === "emerald_ore" ||
    type === "redstone_ore" ||
    type === "gold_ore";

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={1.2}>
      <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
        {/* GRASS BLOCK */}
        {type === "grass" && (
          <group>
            {/* Dirt Core */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.5, 1.5, 1.5]} />
              <meshStandardMaterial color="#543821" roughness={0.9} />
            </mesh>
            {/* Top Grass Turf */}
            <mesh position={[0, 0.65, 0]} receiveShadow>
              <boxGeometry args={[1.52, 0.22, 1.52]} />
              <meshStandardMaterial color="#47a025" roughness={0.8} />
            </mesh>
            {/* Stepped side grass fringes */}
            {[-0.77, 0.77].map((x) => (
              <mesh key={`fringe-x-${x}`} position={[x, 0.42, 0]}>
                <boxGeometry args={[0.04, 0.35, 1.1]} />
                <meshStandardMaterial color="#47a025" roughness={0.8} />
              </mesh>
            ))}
            {[-0.77, 0.77].map((z) => (
              <mesh key={`fringe-z-${z}`} position={[0, 0.42, z]}>
                <boxGeometry args={[1.1, 0.35, 0.04]} />
                <meshStandardMaterial color="#47a025" roughness={0.8} />
              </mesh>
            ))}
          </group>
        )}

        {/* ORE BLOCKS */}
        {isOre && (
          <group>
            {/* Stone base */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.5, 1.5, 1.5]} />
              <meshStandardMaterial color="#595f6e" roughness={0.88} />
            </mesh>
            {/* Glowing crystal ore specks */}
            {oreSpots.map(([ox, oy, oz], i) => (
              <mesh key={i} position={[ox, oy, oz]}>
                <boxGeometry args={[0.22, 0.22, 0.04]} />
                <meshBasicMaterial color={oreColor} toneMapped={false} />
              </mesh>
            ))}
            {/* Subtle pointlight for dramatic ore glow */}
            <pointLight color={oreColor} distance={3.5} intensity={2.5} />
          </group>
        )}

        {/* OBSIDIAN BLOCK */}
        {type === "obsidian" && (
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.5, 1.5, 1.5]} />
              <meshStandardMaterial color="#161226" roughness={0.5} />
            </mesh>
            {/* Purple crystal veins */}
            {[
              [0.3, 0.2, 0.76],
              [-0.2, -0.3, 0.76],
              [-0.76, 0.1, -0.2],
            ].map(([ox, oy, oz], i) => (
              <mesh key={i} position={[ox as number, oy as number, oz as number]}>
                <boxGeometry args={[0.18, 0.18, 0.02]} />
                <meshBasicMaterial color="#a855f7" toneMapped={false} />
              </mesh>
            ))}
          </group>
        )}

        {/* CHEST BLOCK */}
        {type === "chest" && (
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.35, 1.25, 1.35]} />
              <meshStandardMaterial color="#a06024" roughness={0.7} />
            </mesh>
            {/* Latch */}
            <mesh position={[0, 0.08, 0.72]} castShadow>
              <boxGeometry args={[0.2, 0.32, 0.12]} />
              <meshStandardMaterial color="#d4d4d8" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Dark trim bands */}
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[1.38, 0.08, 1.38]} />
              <meshStandardMaterial color="#38220f" roughness={0.8} />
            </mesh>
          </group>
        )}

        {/* CRAFTING TABLE */}
        {type === "crafting_table" && (
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.5, 1.5, 1.5]} />
              <meshStandardMaterial color="#854d0e" roughness={0.75} />
            </mesh>
            {/* Checkered top board */}
            <mesh position={[0, 0.76, 0]}>
              <boxGeometry args={[1.42, 0.04, 1.42]} />
              <meshStandardMaterial color="#b45309" roughness={0.65} />
            </mesh>
            {/* Corner braces */}
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[1.54, 0.18, 1.54]} />
              <meshStandardMaterial color="#451a03" roughness={0.8} />
            </mesh>
          </group>
        )}

        {/* PLAIN STONE */}
        {type === "stone" && (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color="#64748b" roughness={0.9} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

/**
 * Stepped cubic voxel cloud made of clustered Minecraft-style rectangular slabs.
 */
export function VoxelCloud({
  position,
  scale = 1,
  color = "#edf4fc",
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const slabs: [number, number, number, number, number, number][] = [
    [0, 0, 0, 4.2, 0.8, 2.6],
    [1.1, 0.35, 0.2, 2.8, 0.75, 2.2],
    [-1.2, -0.2, -0.1, 2.4, 0.7, 2.0],
    [0.3, 0.7, -0.2, 1.8, 0.6, 1.6],
  ];

  return (
    <Float speed={0.9} floatIntensity={0.5} rotationIntensity={0}>
      <group position={position} scale={scale}>
        {slabs.map(([x, y, z, w, h, d], i) => (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color={color} roughness={0.95} transparent opacity={0.88} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/**
 * Minecraft Torch with blocky wooden post, flickering cubic ember flame & pointlight.
 */
export function VoxelTorch({ position }: { position: [number, number, number] }) {
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(t * 14) * 0.12;
      flameRef.current.scale.x = 1 + Math.cos(t * 11) * 0.08;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 10 + Math.sin(t * 18) * 2.5;
    }
  });

  return (
    <group position={position}>
      {/* Wooden Stick */}
      <mesh position={[0, -0.25, 0]} castShadow>
        <boxGeometry args={[0.16, 0.85, 0.16]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      {/* Coal Base */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.14, 0.18]} />
        <meshStandardMaterial color="#1c1917" roughness={0.95} />
      </mesh>
      {/* Cubic Flame */}
      <mesh ref={flameRef} position={[0, 0.36, 0]}>
        <boxGeometry args={[0.22, 0.24, 0.22]} />
        <meshBasicMaterial color="#f59e0b" toneMapped={false} />
      </mesh>
      {/* Inner White-Hot Ember */}
      <mesh position={[0, 0.36, 0]}>
        <boxGeometry args={[0.1, 0.12, 0.1]} />
        <meshBasicMaterial color="#fef08a" toneMapped={false} />
      </mesh>
      <pointLight ref={lightRef} color="#fbbf24" distance={8} intensity={10} castShadow />
    </group>
  );
}

/**
 * Floating Stepped Voxel Island with grass surface and tapered dirt/stone layers.
 */
export function VoxelIsland({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1.5}>
      <group position={position} scale={scale}>
        {/* Top Grass Level */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[3.2, 0.45, 3.2]} />
          <meshStandardMaterial color="#47a025" roughness={0.8} />
        </mesh>
        {/* Upper Dirt Layer */}
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[2.8, 0.6, 2.8]} />
          <meshStandardMaterial color="#543821" roughness={0.9} />
        </mesh>
        {/* Middle Dirt & Stone Layer */}
        <mesh position={[0, -1.05, 0]}>
          <boxGeometry args={[2.0, 0.55, 2.0]} />
          <meshStandardMaterial color="#451a03" roughness={0.9} />
        </mesh>
        {/* Lower Tapered Stone Spire */}
        <mesh position={[0, -1.6, 0]}>
          <boxGeometry args={[1.2, 0.6, 1.2]} />
          <meshStandardMaterial color="#475569" roughness={0.85} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Pulsing Green/Yellow XP Orb particle that spins and floats.
 */
export function XPOrb({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y += 0.05;
      ref.current.rotation.x = Math.sin(t * 2) * 0.25;
      const s = 1 + Math.sin(t * 6) * 0.15;
      ref.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial color="#50fa7b" toneMapped={false} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshBasicMaterial color="#fef08a" toneMapped={false} />
      </mesh>
      <pointLight color="#50fa7b" distance={3} intensity={1.8} />
    </group>
  );
}

// Backwards-compatible aliases to preserve any external imports seamlessly
export const KeyCap = VoxelBlock;
export const Cloud = VoxelCloud;
export const CodeSlab = VoxelIsland;
export const Gear = VoxelBlock;
export const CoffeeCup = VoxelTorch;
export { PALETTE };
