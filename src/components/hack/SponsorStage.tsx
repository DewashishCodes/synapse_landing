import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

const SLOTS = 6;

/** Minecraft Village Trading Hall & Luminous Beacon Altar */
export function SponsorStage({ y }: { y: number }) {
  const ring = useRef<THREE.Group>(null);
  const beaconBeam = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring.current) ring.current.rotation.y += delta * 0.2;
    if (beaconBeam.current) {
      beaconBeam.current.rotation.y += delta * 0.5;
    }
    if (halo.current) {
      const t = state.clock.getElapsedTime();
      halo.current.rotation.z += delta * 0.4;
      halo.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.03);
    }
  });

  return (
    <group position={[0, y, 0]}>
      {/* Central Minecraft Beacon Beam */}
      <mesh ref={beaconBeam} position={[0, 20, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 60, 16]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.42} />
      </mesh>
      {/* Inner White Core of Beacon */}
      <mesh position={[0, 20, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 60, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.75} />
      </mesh>

      {/* Beacon Lighting */}
      <spotLight
        position={[0, 14, 0]}
        angle={0.8}
        penumbra={0.8}
        intensity={240}
        color="#00f5d4"
        distance={50}
        castShadow
      />
      <pointLight position={[0, 2, 0]} intensity={80} color="#38ef7d" distance={30} />

      {/* Stepped Obsidian & Diamond Altar Base */}
      <group position={[0, -5, 0]}>
        {/* Tier 1: Obsidian */}
        <mesh receiveShadow>
          <boxGeometry args={[14, 1.2, 14]} />
          <meshStandardMaterial color="#161226" roughness={0.7} />
        </mesh>
        {/* Tier 2: Diamond Block Ring */}
        <mesh position={[0, 0.9, 0]} receiveShadow>
          <boxGeometry args={[10, 0.8, 10]} />
          <meshStandardMaterial color="#00e5ff" roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Tier 3: Beacon Glass Enclosure */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[3, 1.2, 3]} />
          <meshStandardMaterial color="#a7f3d0" roughness={0.1} transparent opacity={0.65} />
        </mesh>
        {/* Nether Star inside beacon */}
        <mesh position={[0, 1.8, 0]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
      </group>

      {/* Rune Energy Ring */}
      <mesh ref={halo} rotation-x={-Math.PI / 2} position={[0, -4.2, 0]}>
        <ringGeometry args={[12, 14.5, 32, 1]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      <Text
        position={[0, 13, -7]}
        fontSize={1.6}
        color="#ffd166"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.08}
        outlineColor="#09090b"
      >
        TRADING HALL // SPONSORS
      </Text>

      {/* Rotating Hanging Signs & Trade Banners */}
      <group ref={ring}>
        {Array.from({ length: SLOTS }, (_, i) => {
          const a = (i / SLOTS) * Math.PI * 2;
          const r = 13.5;
          return (
            <Billboard
              key={i}
              position={[Math.cos(a) * r, Math.sin(i * 1.6) * 2.2 + 1.2, Math.sin(a) * r]}
            >
              {/* Dark Oak Wood Sign Frame */}
              <mesh castShadow>
                <boxGeometry args={[6.6, 4.2, 0.35]} />
                <meshStandardMaterial color="#38220f" roughness={0.8} />
              </mesh>
              {/* Iron corner braces */}
              {[-3.1, 3.1].map((x) =>
                [-1.9, 1.9].map((y) => (
                  <mesh key={`${x}-${y}`} position={[x, y, 0.2]}>
                    <boxGeometry args={[0.3, 0.3, 0.08]} />
                    <meshStandardMaterial color="#71717a" metalness={0.8} roughness={0.3} />
                  </mesh>
                )),
              )}
              {/* Parchment trading placard */}
              <mesh position={[0, 0, 0.19]}>
                <planeGeometry args={[5.8, 3.4]} />
                <meshStandardMaterial
                  color="#fef3c7"
                  emissive="#fef3c7"
                  emissiveIntensity={0.65}
                  roughness={0.9}
                />
              </mesh>
              <Text
                position={[0, 0.2, 0.22]}
                fontSize={0.42}
                color="#78350f"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.12}
              >
                PARTNER EMBLEM
              </Text>
              <Text
                position={[0, -0.4, 0.22]}
                fontSize={0.24}
                color="#b45309"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.16}
              >
                REVEAL: 15 SEP
              </Text>
              {/* Diamond Glow Edge */}
              <mesh position={[0, 0, -0.25]}>
                <planeGeometry args={[7.4, 5.0]} />
                <meshBasicMaterial color="#00f5d4" transparent opacity={0.22} />
              </mesh>
            </Billboard>
          );
        })}
      </group>

      {/* Floating Cubic XP & Ore Sparks */}
      {Array.from({ length: 45 }, (_, i) => {
        const a = (i / 45) * Math.PI * 2 * 3;
        const r = 3.5 + ((i * 7) % 11);
        const colors = ["#00f5d4", "#50fa7b", "#ffd166", "#38ef7d", "#a855f7"];
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, -5 + ((i * 3) % 15), Math.sin(a) * r]}
            rotation={[a, a, 0]}
          >
            <boxGeometry args={[0.24, 0.24, 0.24]} />
            <meshBasicMaterial color={colors[i % colors.length] as string} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}
