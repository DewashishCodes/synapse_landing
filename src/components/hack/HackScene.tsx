import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

import { Programmer } from "./Programmer";
import { SponsorStage } from "./SponsorStage";
import {
  VoxelBlock,
  VoxelCloud,
  VoxelIsland,
  VoxelTorch,
  VoxelTree,
  VoxelMushroom,
  VoxelDiamondSword,
  VoxelEnchantingTable,
  VoxelTNT,
  XPOrb,
  type BlockType,
  PALETTE,
} from "./props";
import { scrollRef } from "./useScrollProgress";

const DEPTH = 92; // total world descent in units
const SPONSOR_Y = -DEPTH * 0.795;

/** Sinuous descent path — the chair snakes down like the TreeHacks tree. */
function pathAt(p: number) {
  const y = 3 - p * DEPTH;
  const x = Math.sin(p * Math.PI * 5.5 + 0.85) * 4.6;
  const z = Math.cos(p * Math.PI * 3.5) * 2.2;
  return new THREE.Vector3(x, y, z);
}

function Rig() {
  const chair = useRef<THREE.Group>(null);
  const smooth = useRef(0);
  const prevP = useRef(0);
  const smoothVel = useRef(0);
  const target = useMemo(() => new THREE.Vector3(), []);
  const camPos = useMemo(() => new THREE.Vector3(0, 3, 12), []);

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.05);
    // Smooth scroll progress interpolation
    smooth.current += (scrollRef.current - smooth.current) * (1 - Math.exp(-7 * dt));
    const p = smooth.current;

    // Calculate signed velocity for dynamic banking & inertia
    const instVel = (p - prevP.current) / Math.max(dt, 0.001);
    prevP.current = p;
    smoothVel.current += (instVel - smoothVel.current) * (1 - Math.exp(-9 * dt));
    const vel = smoothVel.current;

    const pos = pathAt(p);
    const nextPos = pathAt(Math.min(1, p + 0.004));
    const tangent = nextPos.clone().sub(pos).normalize();

    // Smoothly shift coder to the right in the starting scene so hero text is completely visible
    const startFade = Math.max(0, 1 - p * 6);
    const startEase = startFade * startFade * (3 - 2 * startFade);
    const startOffsetX = startEase * 4.6;

    // Kenney-style dynamic banking physics:
    // Curvature in XZ plane for banking into curves
    const d2x = -Math.sin(p * Math.PI * 5.5 + 0.85);
    const rollTarget = d2x * 0.28 - THREE.MathUtils.clamp(vel * 0.12, -0.25, 0.25);
    const pitchTarget = 0.06 + THREE.MathUtils.clamp(vel * 0.35, -0.15, 0.4);
    const yawTarget = Math.sin(p * Math.PI * 5.5 + 0.85) * 0.85 + p * 1.35;

    if (chair.current) {
      chair.current.position.set(pos.x + startOffsetX, pos.y, pos.z);
      // Smoothly bank into curves & pitch with descent velocity
      chair.current.rotation.x = THREE.MathUtils.lerp(
        chair.current.rotation.x,
        pitchTarget,
        1 - Math.exp(-10 * dt),
      );
      chair.current.rotation.y = THREE.MathUtils.lerp(
        chair.current.rotation.y,
        yawTarget,
        1 - Math.exp(-10 * dt),
      );
      chair.current.rotation.z = THREE.MathUtils.lerp(
        chair.current.rotation.z,
        rollTarget,
        1 - Math.exp(-10 * dt),
      );
    }

    // Dynamic Camera Tracking with speed zoom
    const speedZoom = THREE.MathUtils.clamp(Math.abs(vel) * 1.6, 0, 2.5);
    camPos.set(
      pos.x * 0.45 + (1 - startFade) * 0.3,
      pos.y + 2.4 - vel * 0.35,
      pos.z + 11 - Math.sin(p * Math.PI) * 1.5 + speedZoom,
    );
    camera.position.lerp(camPos, 1 - Math.exp(-6 * dt));

    target.set(pos.x * 0.7 + startOffsetX * 0.25, pos.y + 0.4, pos.z);
    camera.lookAt(target);
  });

  return (
    <group ref={chair}>
      <Programmer />
    </group>
  );
}

/** Ribbon of code characters and glowing XP crystals spiralling down the shaft. */
function CodeSpiral() {
  const ref = useRef<THREE.Group>(null);
  const glyphs = useMemo(() => {
    const chars = ["{", "}", "<", "/>", "()", ";", "=>", "#", "0", "1", "[]", "&&"];
    return Array.from({ length: 60 }, (_, i) => {
      const a = i * 0.58;
      const r = 8.5 + Math.sin(i * 0.4) * 2.2;
      return {
        pos: [Math.cos(a) * r, 4 - (i / 60) * DEPTH, Math.sin(a) * r] as [number, number, number],
        c: chars[i % chars.length] as string,
        color: PALETTE[i % PALETTE.length] as string,
        size: 0.65 + (i % 3) * 0.2,
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={ref}>
      {glyphs.map((g, i) => (
        <group key={i} position={g.pos}>
          <Text
            fontSize={g.size}
            color={g.color}
            anchorX="center"
            outlineWidth={0.04}
            outlineColor="#070a14"
          >
            {g.c}
          </Text>
        </group>
      ))}
    </group>
  );
}

function World() {
  // Strategic voxel ore blocks floating down the shaft
  const oreBlocks: { y: number; x: number; z: number; type: BlockType; scale?: number }[] = useMemo(
    () => [
      { y: 1.5, x: -11, z: -8, type: "diamond_ore", scale: 1.2 },
      { y: -6, x: 9.5, z: -6, type: "emerald_ore", scale: 1.2 },
      { y: -15, x: -8.5, z: -5, type: "crafting_table", scale: 1.3 },
      { y: -25, x: 8, z: -4, type: "redstone_ore", scale: 1.25 },
      { y: -36, x: -8, z: -6, type: "gold_ore", scale: 1.2 },
      { y: -48, x: 9, z: -5, type: "chest", scale: 1.3 },
      { y: -62, x: -7.5, z: -6, type: "diamond_ore", scale: 1.35 },
      { y: -74, x: 8.5, z: -7, type: "obsidian", scale: 1.4 },
    ],
    [],
  );

  return (
    <>
      {/* Cinematic Minecraft Night Sky & Biome Atmosphere */}
      <color attach="background" args={["#070a14"]} />
      <fog attach="fog" args={["#0a0f1d", 18, 65]} />
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#c7d2fe", "#14532d", 0.7]} />

      {/* Moonlit directional light */}
      <directionalLight
        position={[14, 25, 12]}
        intensity={2.0}
        color="#e0e7ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
      />

      {/* Square Minecraft Moon in the distant night sky */}
      <mesh position={[18, 28, -40]} rotation={[0.2, -0.3, 0]}>
        <boxGeometry args={[6.5, 6.5, 0.2]} />
        <meshBasicMaterial color="#fef9c3" toneMapped={false} />
      </mesh>

      <Environment>
        <Lightformer intensity={2.0} color="#00f5d4" position={[0, 8, 4]} scale={[12, 12, 1]} />
        <Lightformer
          intensity={1.5}
          color="#50fa7b"
          position={[-8, 0, 2]}
          rotation-y={Math.PI / 2}
          scale={[18, 6, 1]}
        />
        <Lightformer
          intensity={1.2}
          color="#3b82f6"
          position={[8, -4, 2]}
          rotation-y={-Math.PI / 2}
          scale={[18, 6, 1]}
        />
      </Environment>
      <Stars radius={75} depth={60} count={2200} factor={3.5} fade speed={0.5} />

      <CodeSpiral />

      {/* Floating Voxel Ore Blocks */}
      {oreBlocks.map((b, i) => (
        <VoxelBlock
          key={i}
          position={[b.x, b.y, b.z]}
          type={b.type}
          scale={b.scale}
          rotation={[0.2, (i * Math.PI) / 3, 0.1]}
        />
      ))}

      {/* Floating Stepped Voxel Islands */}
      <VoxelIsland position={[-7.5, -9, -3]} scale={1.1} />
      <VoxelIsland position={[8.2, -18, -4]} scale={1.2} />
      <VoxelIsland position={[-7.8, -28, -2]} scale={1.0} />
      <VoxelIsland position={[8.5, -40, -3]} scale={1.15} />
      <VoxelIsland position={[-8.0, -52, -4]} scale={1.1} />
      <VoxelIsland position={[7.5, -65, -2]} scale={1.2} />

      {/* Iconic Minecraft Props on Islands */}
      <VoxelTree position={[-8.2, -8.7, -3.2]} scale={1.05} />
      <VoxelDiamondSword position={[8.2, -17.8, -3.8]} scale={1.1} />
      <VoxelEnchantingTable position={[-7.8, -27.8, -2.0]} scale={1.15} />
      <VoxelMushroom position={[8.2, -39.8, -3.2]} scale={1.2} />
      <VoxelTNT position={[9.4, -39.6, -2.2]} scale={0.8} />
      <VoxelTree position={[-8.0, -51.7, -4.0]} scale={1.1} />

      {/* Flickering Voxel Torches on Islands */}
      <VoxelTorch position={[-6.8, -7.8, -2.5]} />
      <VoxelTorch position={[7.2, -16.8, -3.5]} />
      <VoxelTorch position={[-7.0, -26.8, -1.8]} />
      <VoxelTorch position={[7.6, -38.8, -2.5]} />
      <VoxelTorch position={[-7.2, -50.8, -3.2]} />
      <VoxelTorch position={[6.8, -63.8, -1.5]} />

      {/* Floating XP Orbs */}
      <XPOrb position={[3.5, 0, 1]} />
      <XPOrb position={[-4, -14, 2]} />
      <XPOrb position={[4.2, -32, 1.5]} />
      <XPOrb position={[-3.8, -46, 2]} />
      <XPOrb position={[4.5, -60, 1.8]} />

      {/* Stepped Cubic Minecraft Clouds */}
      <VoxelCloud position={[-14, 4, -12]} scale={1.6} color="#dbeafe" />
      <VoxelCloud position={[13, -11, -12]} scale={1.8} color="#e0f2fe" />
      <VoxelCloud position={[-12, -22, -14]} scale={2.2} color="#f1f5f9" />
      <VoxelCloud position={[12, -46, -14]} scale={2.0} color="#e2e8f0" />
      <VoxelCloud position={[10, -72, -12]} scale={2.4} color="#cbd5e1" />

      {/* Village Trading Hall & Beacon Altar */}
      <SponsorStage y={SPONSOR_Y} />

      {/* Terminal Bedrock & Obsidian Platform */}
      <group position={[0, -DEPTH - 1.5, 0]}>
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <boxGeometry args={[26, 26, 1.5]} />
          <meshStandardMaterial color="#09090b" roughness={0.9} />
        </mesh>
        {/* Glowing Emerald Portal Ring */}
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.8, 0]}>
          <ringGeometry args={[8.5, 11, 48]} />
          <meshBasicMaterial color="#00f5d4" transparent opacity={0.65} />
        </mesh>
      </group>

      <Rig />
    </>
  );
}

export function HackScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 3, 12], fov: 55 }}>
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
    </div>
  );
}
