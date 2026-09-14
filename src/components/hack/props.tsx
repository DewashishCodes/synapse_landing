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

/**
 * Voxel Minecraft Oak Tree with wood trunk and stepped leaf canopy layers.
 */
export function VoxelTree({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {/* Oak Log Trunk */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.55, 2.2, 0.55]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.9} />
      </mesh>
      {/* Lower Leaf Canopy */}
      <mesh position={[0, 2.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.1, 2.5]} />
        <meshStandardMaterial color="#166534" roughness={0.8} />
      </mesh>
      {/* Mid Leaf Layer */}
      <mesh position={[0, 3.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.9, 2.0]} />
        <meshStandardMaterial color="#22c55e" roughness={0.75} />
      </mesh>
      {/* Top Leaf Crown */}
      <mesh position={[0, 3.75, 0]} castShadow>
        <boxGeometry args={[1.3, 0.7, 1.3]} />
        <meshStandardMaterial color="#4ade80" roughness={0.7} />
      </mesh>
      {/* Hanging Golden Apple */}
      <group position={[0.85, 1.65, 0.85]}>
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.26, 0.24]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.6} />
        </mesh>
        <pointLight color="#fbbf24" distance={2.5} intensity={2} />
      </group>
    </group>
  );
}

/**
 * Giant Minecraft Red Mushroom with white spots and glowing spores.
 */
export function VoxelMushroom({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {/* Stalk */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.5, 1.8, 0.5]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
      </mesh>
      {/* Red Cap */}
      <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.9, 2.2]} />
        <meshStandardMaterial color="#dc2626" roughness={0.8} />
      </mesh>
      {/* White Spots on Cap */}
      {[
        [0.6, 2.36, 0.5],
        [-0.5, 2.36, -0.6],
        [-0.6, 2.36, 0.5],
        [0.5, 2.36, -0.5],
        [1.11, 1.9, 0],
        [-1.11, 1.9, 0],
        [0, 1.9, 1.11],
        [0, 1.9, -1.11],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <boxGeometry args={[0.3, 0.02, 0.3]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} />
        </mesh>
      ))}
      <pointLight color="#ef4444" distance={3} intensity={2.2} />
    </group>
  );
}

/**
 * Enchanted Voxel Diamond Sword embedded in an ancient stone pedestal with sparkling glint.
 */
export function VoxelDiamondSword({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const glintRef = useRef<THREE.PointLight>(null);
  const sparkRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (glintRef.current) glintRef.current.intensity = 3 + Math.sin(t * 8) * 1.5;
    if (sparkRef.current) sparkRef.current.rotation.y = t * 1.5;
  });

  return (
    <group position={position} scale={scale}>
      {/* Pedestal Base */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.7, 1.3]} />
        <meshStandardMaterial color="#1e1e24" roughness={0.9} />
      </mesh>
      {/* Diamond Inlay */}
      <mesh position={[0, 0.71, 0]}>
        <boxGeometry args={[0.8, 0.04, 0.8]} />
        <meshBasicMaterial color="#00f5d4" toneMapped={false} />
      </mesh>

      {/* Embedded Sword angled into pedestal */}
      <group position={[0, 0.7, 0]} rotation={[0.25, 0.4, 0.15]}>
        {/* Blade */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <boxGeometry args={[0.22, 1.4, 0.08]} />
          <meshStandardMaterial color="#00e5ff" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Diamond Edge Glow */}
        <mesh position={[0, 1.0, 0]}>
          <boxGeometry args={[0.26, 1.36, 0.06]} />
          <meshBasicMaterial color="#5ffbf1" toneMapped={false} />
        </mesh>
        {/* Guard */}
        <mesh position={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[0.65, 0.12, 0.14]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Guard Diamond gems */}
        {[-0.28, 0.28].map((x) => (
          <mesh key={x} position={[x, 0.28, 0]}>
            <boxGeometry args={[0.08, 0.08, 0.16]} />
            <meshBasicMaterial color="#00f5d4" toneMapped={false} />
          </mesh>
        ))}
        {/* Hilt */}
        <mesh position={[0, -0.05, 0]} castShadow>
          <boxGeometry args={[0.12, 0.45, 0.12]} />
          <meshStandardMaterial color="#5c3a21" roughness={0.8} />
        </mesh>
        {/* Pommel */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.2, 0.12, 0.16]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>

      {/* Orbiting Enchantment Sparkles */}
      <group ref={sparkRef} position={[0, 1.6, 0]}>
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.7, Math.sin(i) * 0.3, Math.sin(angle) * 0.7]}
          >
            <octahedronGeometry args={[0.08, 0]} />
            <meshBasicMaterial color="#a855f7" toneMapped={false} />
          </mesh>
        ))}
      </group>
      <pointLight ref={glintRef} color="#00e5ff" distance={4.5} intensity={3} />
    </group>
  );
}

/**
 * Enchanting Table with rotating floating spellbook and purple arcane particles.
 */
export function VoxelEnchantingTable({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const bookRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bookRef.current) {
      bookRef.current.rotation.y = t * 0.9;
      bookRef.current.position.y = 1.15 + Math.sin(t * 2.5) * 0.08;
      bookRef.current.rotation.x = Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Obsidian Base */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.7, 1.5]} />
        <meshStandardMaterial color="#161226" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Red Carpet / Cloth */}
      <mesh position={[0, 0.71, 0]}>
        <boxGeometry args={[1.3, 0.04, 1.3]} />
        <meshStandardMaterial color="#991b1b" roughness={0.9} />
      </mesh>
      {/* 4 Diamond Corners */}
      {[
        [-0.55, 0.55],
        [0.55, 0.55],
        [-0.55, -0.55],
        [0.55, -0.55],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.52, z]}>
          <boxGeometry args={[0.25, 0.4, 0.25]} />
          <meshBasicMaterial color="#00f5d4" toneMapped={false} />
        </mesh>
      ))}

      {/* Floating Animated Spellbook */}
      <group ref={bookRef} position={[0, 1.15, 0]}>
        {/* Leather Cover */}
        <mesh rotation-z={0.2} castShadow>
          <boxGeometry args={[0.42, 0.04, 0.55]} />
          <meshStandardMaterial color="#78350f" roughness={0.7} />
        </mesh>
        <mesh rotation-z={-0.2} castShadow>
          <boxGeometry args={[0.42, 0.04, 0.55]} />
          <meshStandardMaterial color="#78350f" roughness={0.7} />
        </mesh>
        {/* Pages */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.38, 0.06, 0.5]} />
          <meshBasicMaterial color="#fef08a" toneMapped={false} />
        </mesh>
        <pointLight color="#c084fc" distance={3.5} intensity={3.5} />
      </group>
    </group>
  );
}

/**
 * Classic Minecraft TNT Block with white middle label and top fuse.
 */
export function VoxelTNT({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {/* Red Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.35, 1.35, 1.35]} />
        <meshStandardMaterial color="#dc2626" roughness={0.7} />
      </mesh>
      {/* White Middle Band */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.37, 0.45, 1.37]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.8} />
      </mesh>
      {/* "TNT" Black blocky text bars on 4 sides */}
      {[-0.69, 0.69].map((x) => (
        <mesh key={`tnt-x-${x}`} position={[x, 0, 0]}>
          <boxGeometry args={[0.01, 0.28, 0.8]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
      ))}
      {[-0.69, 0.69].map((z) => (
        <mesh key={`tnt-z-${z}`} position={[0, 0, z]}>
          <boxGeometry args={[0.8, 0.28, 0.01]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
      ))}
      {/* Top Fuse */}
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[0.08, 0.15, 0.08]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>
      <pointLight color="#ff4444" distance={2.5} intensity={1.8} />
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
