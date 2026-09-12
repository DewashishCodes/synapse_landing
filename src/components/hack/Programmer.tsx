import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SKIN = "#f5c69b";
const TUNIC = "#0d9488"; // Deep emerald / teal tunic
const TUNIC_DARK = "#042f2e";
const HAIR = "#261c14";
const CHAIR = "#18181b"; // Dark obsidian stone chair
const CHAIR_ACCENT = "#00e5ff"; // Diamond cyan piping
const METAL = "#71717a";

/** Voxel Minecraft-style hacker character typing on a blocky laptop in a gaming throne. */
export function Programmer() {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftHand = useRef<THREE.Mesh>(null);
  const rightHand = useRef<THREE.Mesh>(null);
  const chair = useRef<THREE.Group>(null);
  const laptop = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (head.current) {
      head.current.rotation.z = Math.sin(t * 3.2) * 0.06;
      head.current.position.y = 1.32 + Math.sin(t * 6.4) * 0.02;
    }
    if (leftHand.current) leftHand.current.position.y = 0.72 + Math.abs(Math.sin(t * 11)) * 0.06;
    if (rightHand.current) rightHand.current.position.y = 0.72 + Math.abs(Math.cos(t * 12)) * 0.06;
    if (chair.current) chair.current.rotation.y = Math.sin(t * 0.6) * 0.1;
    if (laptop.current) {
      laptop.current.position.y = 0.62 + Math.sin(t * 2) * 0.02;
      laptop.current.rotation.z = Math.sin(t * 1.3) * 0.02;
    }
  });

  return (
    <group ref={root} scale={1.15}>
      <group ref={chair}>
        {/* Voxel chair base */}
        <mesh position={[0, -1.35, 0]} castShadow>
          <boxGeometry args={[0.95, 0.2, 0.95]} />
          <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Central stem */}
        <mesh position={[0, -0.95, 0]} castShadow>
          <boxGeometry args={[0.22, 0.7, 0.22]} />
          <meshStandardMaterial color={METAL} metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Voxel seat block */}
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.28, 1.15]} />
          <meshStandardMaterial color={CHAIR} roughness={0.8} />
        </mesh>
        {/* Seat cushion accent */}
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[1.05, 0.06, 1.0]} />
          <meshStandardMaterial color={CHAIR_ACCENT} roughness={0.5} />
        </mesh>
        {/* Voxel Backrest */}
        <group position={[0, 0.42, -0.5]} rotation-x={0.1}>
          <mesh castShadow>
            <boxGeometry args={[1.15, 1.6, 0.24]} />
            <meshStandardMaterial color={CHAIR} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.25, 0.14]}>
            <boxGeometry args={[0.85, 1.0, 0.06]} />
            <meshStandardMaterial color={CHAIR_ACCENT} roughness={0.5} />
          </mesh>
        </group>
        {/* Armrests */}
        {[-0.66, 0.66].map((x) => (
          <group key={x} position={[x, -0.12, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.18, 0.16, 0.8]} />
              <meshStandardMaterial color={CHAIR} roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.16, 0.04, 0.76]} />
              <meshStandardMaterial color={CHAIR_ACCENT} roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Blocky Legs */}
      {[-0.26, 0.26].map((x) => (
        <group key={x}>
          {/* Upper Thigh */}
          <mesh position={[x, -0.32, 0.32]} rotation-x={-0.6} castShadow>
            <boxGeometry args={[0.34, 0.62, 0.34]} />
            <meshStandardMaterial color="#1e293b" roughness={0.85} />
          </mesh>
          {/* Lower Shin */}
          <mesh position={[x, -0.74, 0.68]} rotation-x={0.25} castShadow>
            <boxGeometry args={[0.32, 0.55, 0.32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.85} />
          </mesh>
          {/* Voxel Boot */}
          <mesh position={[x, -1.05, 0.82]} castShadow>
            <boxGeometry args={[0.34, 0.22, 0.44]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Voxel Torso */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[0.88, 1.05, 0.46]} />
        <meshStandardMaterial color={TUNIC} roughness={0.85} />
      </mesh>
      {/* Tunic diamond chest crest */}
      <mesh position={[0, 0.45, 0.24]}>
        <boxGeometry args={[0.28, 0.28, 0.04]} />
        <meshBasicMaterial color="#00e5ff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.05, 0.24]}>
        <boxGeometry args={[0.78, 0.14, 0.03]} />
        <meshStandardMaterial color={TUNIC_DARK} roughness={0.9} />
      </mesh>

      {/* Voxel Arms */}
      {[-0.56, 0.56].map((x) => (
        <mesh
          key={x}
          position={[x, 0.42, 0.22]}
          rotation-x={-0.85}
          rotation-z={x > 0 ? -0.15 : 0.15}
          castShadow
        >
          <boxGeometry args={[0.26, 0.65, 0.26]} />
          <meshStandardMaterial color={TUNIC} roughness={0.85} />
        </mesh>
      ))}

      {/* Voxel Hands typing */}
      <mesh ref={leftHand} position={[-0.32, 0.72, 0.68]} castShadow>
        <boxGeometry args={[0.22, 0.2, 0.22]} />
        <meshStandardMaterial color={SKIN} roughness={0.8} />
      </mesh>
      <mesh ref={rightHand} position={[0.32, 0.72, 0.68]} castShadow>
        <boxGeometry args={[0.22, 0.2, 0.22]} />
        <meshStandardMaterial color={SKIN} roughness={0.8} />
      </mesh>

      {/* Cubic Head & Voxel Headset */}
      <group ref={head} position={[0, 1.32, 0.02]}>
        {/* Main Head Cube */}
        <mesh castShadow>
          <boxGeometry args={[0.76, 0.76, 0.76]} />
          <meshStandardMaterial color={SKIN} roughness={0.75} />
        </mesh>
        {/* Hair Cap & Fringe */}
        <mesh position={[0, 0.16, -0.04]}>
          <boxGeometry args={[0.82, 0.52, 0.82]} />
          <meshStandardMaterial color={HAIR} roughness={0.9} />
        </mesh>
        {/* Hair Front Fringe */}
        <mesh position={[0, 0.35, 0.39]}>
          <boxGeometry args={[0.76, 0.18, 0.08]} />
          <meshStandardMaterial color={HAIR} roughness={0.9} />
        </mesh>
        {/* Pixel Eyes */}
        {[-0.18, 0.18].map((x) => (
          <group key={x} position={[x, 0.02, 0.39]}>
            <mesh>
              <boxGeometry args={[0.12, 0.1, 0.02]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
            <mesh position={[x > 0 ? 0.02 : -0.02, 0, 0.01]}>
              <boxGeometry args={[0.07, 0.08, 0.02]} />
              <meshBasicMaterial color="#00e5ff" toneMapped={false} />
            </mesh>
          </group>
        ))}
        {/* Blocky Gaming Headset */}
        <mesh position={[0, 0.44, 0]}>
          <boxGeometry args={[0.86, 0.1, 0.18]} />
          <meshStandardMaterial color="#09090b" roughness={0.5} />
        </mesh>
        {[-0.42, 0.42].map((x) => (
          <mesh key={x} position={[x, 0.02, 0]}>
            <boxGeometry args={[0.12, 0.32, 0.32]} />
            <meshStandardMaterial color="#ef4444" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Floating Voxel Laptop */}
      <group ref={laptop} position={[0, 0.62, 0.84]}>
        {/* Base Keyboard */}
        <mesh rotation-x={-0.15} castShadow>
          <boxGeometry args={[1.05, 0.06, 0.75]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Keyboard keys plate */}
        <mesh position={[0, 0.04, 0.02]} rotation-x={-0.15}>
          <boxGeometry args={[0.95, 0.02, 0.65]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
        {/* Screen Display */}
        <group position={[0, 0.38, -0.34]} rotation-x={-0.28}>
          <mesh castShadow>
            <boxGeometry args={[1.05, 0.72, 0.05]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.4} />
          </mesh>
          {/* Glowing Code Screen */}
          <mesh position={[0, 0, 0.032]}>
            <boxGeometry args={[0.96, 0.62, 0.01]} />
            <meshBasicMaterial color="#00f5d4" toneMapped={false} />
          </mesh>
          {/* Code lines */}
          {[0.2, 0.08, -0.04, -0.16].map((y, i) => (
            <mesh key={y} position={[-0.18 + i * 0.05, y, 0.038]}>
              <boxGeometry args={[0.45 - i * 0.06, 0.035, 0.01]} />
              <meshBasicMaterial color="#064e3b" toneMapped={false} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
