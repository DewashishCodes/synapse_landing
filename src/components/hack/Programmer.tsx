import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { scrollRef } from "./useScrollProgress";

const SKIN = "#f5c69b";
const SKIN_SHADOW = "#e0ab7c";
const TUNIC = "#0d9488"; // Deep emerald / teal tunic
const TUNIC_DARK = "#042f2e";
const HAIR = "#261c14";
const CHAIR = "#18181b"; // Dark obsidian stone chair
const CHAIR_ACCENT = "#00e5ff"; // Diamond cyan piping
const METAL = "#71717a";

/**
 * Floating Holographic Code Particle rising from the laptop screen.
 */
function HoloCode() {
  const group = useRef<THREE.Group>(null);
  const glyphs = useMemo(
    () => [
      { text: "{ }", x: -0.25, z: 0.1, speed: 1.2, offset: 0 },
      { text: "AI", x: 0.22, z: -0.05, speed: 1.5, offset: 1.2 },
      { text: "</>", x: -0.1, z: 0.15, speed: 1.1, offset: 2.3 },
      { text: "01", x: 0.15, z: 0.2, speed: 1.4, offset: 3.1 },
      { text: "=>", x: -0.3, z: -0.1, speed: 1.3, offset: 4.0 },
    ],
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const g = glyphs[i];
      const life = (t * g.speed + g.offset) % 3;
      child.position.y = 0.4 + life * 0.45;
      child.position.x = g.x + Math.sin(t * 2 + i) * 0.05;
      // Fade out near the top
      const scale = life < 0.4 ? life / 0.4 : Math.max(0, 1 - (life - 1.8) / 1.2);
      child.scale.set(scale * 0.45, scale * 0.45, scale * 0.45);
    });
  });

  return (
    <group ref={group} position={[0, 0.4, 0.4]}>
      {glyphs.map((g, i) => (
        <group key={i} position={[g.x, 0, g.z]}>
          <Text
            fontSize={0.28}
            color="#5ffbf1"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#022c22"
          >
            {g.text}
          </Text>
        </group>
      ))}
    </group>
  );
}

/**
 * Cute Miniature Voxel Allay / Cyber-Companion floating near the coder's shoulder.
 */
function VoxelAllay({ velocity }: { velocity: number }) {
  const allayRef = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Mesh>(null);
  const rightWing = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!allayRef.current) return;

    // Bobbing and playful lag
    allayRef.current.position.y = 1.35 + Math.sin(t * 3.5) * 0.12 - velocity * 0.5;
    allayRef.current.position.x = 1.05 + Math.cos(t * 2.2) * 0.08;
    allayRef.current.position.z = 0.25 + Math.sin(t * 2.8) * 0.1;
    allayRef.current.rotation.y = Math.sin(t * 1.8) * 0.35 - 0.2;
    allayRef.current.rotation.z = Math.sin(t * 3.5) * 0.15 - velocity * 0.4;
    allayRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, velocity * 0.8));

    // Fast fluttering wings
    const wingFlap = Math.sin(t * 28) * 0.7;
    if (leftWing.current) leftWing.current.rotation.y = wingFlap;
    if (rightWing.current) rightWing.current.rotation.y = -wingFlap;
  });

  return (
    <group ref={allayRef} position={[1.05, 1.35, 0.25]} scale={0.42}>
      {/* Allay Body */}
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.6, 0.45]} />
        <meshStandardMaterial color="#00e5ff" roughness={0.4} />
      </mesh>
      {/* Cute Big Eyes */}
      {[-0.14, 0.14].map((x) => (
        <group key={x} position={[x, 0.08, 0.24]}>
          <mesh>
            <boxGeometry args={[0.1, 0.16, 0.02]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, -0.02, 0.01]}>
            <boxGeometry args={[0.07, 0.1, 0.02]} />
            <meshBasicMaterial color="#042f2e" />
          </mesh>
        </group>
      ))}
      {/* Floating Diamond in Hand */}
      <mesh position={[0, -0.42, 0.3]}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshBasicMaterial color="#50fa7b" toneMapped={false} />
      </mesh>
      <pointLight color="#00e5ff" distance={2} intensity={1.8} />

      {/* Translucent Wings */}
      <mesh ref={leftWing} position={[-0.26, 0.1, -0.15]}>
        <boxGeometry args={[0.55, 0.35, 0.02]} />
        <meshStandardMaterial color="#a5f3fc" transparent opacity={0.7} roughness={0.2} />
      </mesh>
      <mesh ref={rightWing} position={[0.26, 0.1, -0.15]}>
        <boxGeometry args={[0.55, 0.35, 0.02]} />
        <meshStandardMaterial color="#a5f3fc" transparent opacity={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

/**
 * Animated Voxel Thruster Flame underneath the hover chair.
 */
function ThrusterFlame({ position }: { position: [number, number, number] }) {
  const flameRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (flameRef.current) {
      const scaleY = 1 + Math.sin(t * 22) * 0.35;
      const scaleXZ = 1 + Math.cos(t * 18) * 0.2;
      flameRef.current.scale.set(scaleXZ, scaleY, scaleXZ);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(t * 20) * 1.0;
    }
  });

  return (
    <group position={position}>
      <group ref={flameRef} position={[0, -0.12, 0]}>
        {/* Outer Cyan Flame */}
        <mesh>
          <boxGeometry args={[0.18, 0.35, 0.18]} />
          <meshBasicMaterial color="#00e5ff" toneMapped={false} />
        </mesh>
        {/* Core White-Hot Flame */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.1, 0.22, 0.1]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
      </group>
      <pointLight ref={lightRef} color="#00e5ff" distance={2.5} intensity={2.5} />
    </group>
  );
}

/**
 * Ultra-defined Kenney + Minecraft style hacker character with responsive physics,
 * blinking eyes, animated typing flurries, screen glow, hover throne thrusters,
 * and a floating voxel Allay pet companion.
 */
export function Programmer() {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Group>(null);
  const rightEye = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftHand = useRef<THREE.Mesh>(null);
  const rightHand = useRef<THREE.Mesh>(null);
  const chair = useRef<THREE.Group>(null);
  const laptop = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const screenLight = useRef<THREE.PointLight>(null);

  // Smooth tracker for scroll velocity
  const smoothVel = useRef(0);
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);

    // Track scroll velocity with snappy spring smoothing (Kenney style!)
    const currentVel = scrollRef.velocity || 0;
    smoothVel.current += (currentVel * 10 - smoothVel.current) * (1 - Math.exp(-12 * dt));
    const vel = smoothVel.current;
    const absVel = Math.abs(vel);

    // Blinking animation: Every ~3.6s, blink for 0.12s
    blinkTimer.current += dt;
    if (blinkTimer.current > 3.6) {
      isBlinking.current = true;
      if (blinkTimer.current > 3.75) {
        isBlinking.current = false;
        blinkTimer.current = 0;
      }
    }
    const eyeScaleY = isBlinking.current ? 0.1 : 1;
    if (leftEye.current) leftEye.current.scale.y = eyeScaleY;
    if (rightEye.current) rightEye.current.scale.y = eyeScaleY;

    // Head Animation: Dynamic look-at + breathing bob + reactive forward pitch on descent
    if (head.current) {
      head.current.rotation.z = Math.sin(t * 2.8) * 0.04 - vel * 0.08;
      head.current.rotation.x = Math.max(-0.25, Math.min(0.4, 0.08 + vel * 0.25));
      head.current.rotation.y = Math.sin(t * 1.4) * 0.08;
      head.current.position.y = 1.34 + Math.sin(t * 5.2) * 0.025;
    }

    // Torso breathing & reactive forward lean during fast scrolling
    if (torso.current) {
      torso.current.rotation.x = Math.max(-0.15, Math.min(0.3, vel * 0.2));
      torso.current.position.y = 0.38 + Math.sin(t * 2.6) * 0.015;
    }

    // Typing speed scales with scroll velocity (frenzied typing when descending!)
    const typingSpeed = 12 + absVel * 24;
    if (leftHand.current) {
      leftHand.current.position.y = 0.72 + Math.abs(Math.sin(t * typingSpeed)) * 0.08;
      leftHand.current.position.z = 0.68 + Math.cos(t * typingSpeed * 0.5) * 0.02;
    }
    if (rightHand.current) {
      rightHand.current.position.y = 0.72 + Math.abs(Math.cos(t * (typingSpeed + 2))) * 0.08;
      rightHand.current.position.z = 0.68 + Math.sin(t * (typingSpeed + 2) * 0.5) * 0.02;
    }

    // Arms subtle sway
    if (leftArm.current)
      leftArm.current.rotation.x = -0.85 + Math.sin(t * typingSpeed * 0.5) * 0.05;
    if (rightArm.current)
      rightArm.current.rotation.x = -0.85 + Math.cos(t * typingSpeed * 0.5) * 0.05;

    // Chair subtle hovering float
    if (chair.current) {
      chair.current.position.y = Math.sin(t * 2.2) * 0.04;
      chair.current.rotation.y = Math.sin(t * 0.8) * 0.05;
    }

    // Laptop subtle vibration from aggressive typing
    if (laptop.current) {
      laptop.current.position.y = 0.62 + Math.sin(t * typingSpeed * 0.3) * 0.008;
      laptop.current.rotation.z = Math.sin(t * 1.5) * 0.015;
    }

    // Laptop screen glow light flicker
    if (screenLight.current) {
      screenLight.current.intensity = 2.4 + Math.sin(t * 16) * 0.4 + absVel * 1.2;
    }
  });

  return (
    <group ref={root} scale={1.18}>
      {/* Voxel Allay Pet Companion */}
      <VoxelAllay velocity={smoothVel.current} />

      {/* ENCHANTED HOVER GAMING THRONE */}
      <group ref={chair}>
        {/* Base Plate with Diamond Inlay */}
        <mesh position={[0, -1.35, 0]} castShadow>
          <boxGeometry args={[1.05, 0.18, 1.05]} />
          <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, -1.25, 0]}>
          <boxGeometry args={[0.85, 0.04, 0.85]} />
          <meshBasicMaterial color={CHAIR_ACCENT} toneMapped={false} />
        </mesh>

        {/* 4 Corner Hover Thruster Blocks with animated flames */}
        {[
          [-0.42, -0.42],
          [0.42, -0.42],
          [-0.42, 0.42],
          [0.42, 0.42],
        ].map(([x, z], i) => (
          <group key={i} position={[x, -1.38, z]}>
            <mesh>
              <boxGeometry args={[0.2, 0.16, 0.2]} />
              <meshStandardMaterial color="#0f172a" roughness={0.6} />
            </mesh>
            <ThrusterFlame position={[0, -0.06, 0]} />
          </group>
        ))}

        {/* Central Hydraulic Piston Stem */}
        <mesh position={[0, -0.92, 0]} castShadow>
          <boxGeometry args={[0.24, 0.72, 0.24]} />
          <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Voxel Seat Block */}
        <mesh position={[0, -0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.25, 0.28, 1.2]} />
          <meshStandardMaterial color={CHAIR} roughness={0.8} />
        </mesh>
        {/* Seat Cushion with diamond cyan piping */}
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[1.1, 0.06, 1.05]} />
          <meshStandardMaterial color={CHAIR_ACCENT} roughness={0.4} />
        </mesh>

        {/* High-back Ergonomic Throne Rest */}
        <group position={[0, 0.46, -0.52]} rotation-x={0.08}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 1.65, 0.24]} />
            <meshStandardMaterial color={CHAIR} roughness={0.8} />
          </mesh>
          {/* Inner Padded Inlay */}
          <mesh position={[0, 0.22, 0.13]}>
            <boxGeometry args={[0.9, 1.05, 0.04]} />
            <meshStandardMaterial color="#09090b" roughness={0.9} />
          </mesh>
          {/* Embedded Glowing Diamond Crest in Headrest */}
          <mesh position={[0, 0.6, 0.14]}>
            <octahedronGeometry args={[0.15, 0]} />
            <meshBasicMaterial color="#00e5ff" toneMapped={false} />
          </mesh>
        </group>

        {/* Armrests */}
        {[-0.68, 0.68].map((x) => (
          <group key={x} position={[x, -0.1, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.18, 0.18, 0.85]} />
              <meshStandardMaterial color={CHAIR} roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.16, 0.04, 0.8]} />
              <meshStandardMaterial color={CHAIR_ACCENT} roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* CHARACTER LEGS & SNEAKERS */}
      {[-0.26, 0.26].map((x) => (
        <group key={x}>
          {/* Thigh */}
          <mesh position={[x, -0.3, 0.32]} rotation-x={-0.6} castShadow>
            <boxGeometry args={[0.34, 0.62, 0.34]} />
            <meshStandardMaterial color="#1e293b" roughness={0.85} />
          </mesh>
          {/* Knee Patch */}
          <mesh position={[x, -0.42, 0.54]} rotation-x={-0.6}>
            <boxGeometry args={[0.26, 0.2, 0.04]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          {/* Shin */}
          <mesh position={[x, -0.74, 0.68]} rotation-x={0.25} castShadow>
            <boxGeometry args={[0.32, 0.55, 0.32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.85} />
          </mesh>
          {/* Chunky Voxel Sneaker */}
          <group position={[x, -1.05, 0.82]}>
            <mesh castShadow>
              <boxGeometry args={[0.36, 0.22, 0.48]} />
              <meshStandardMaterial color="#09090b" roughness={0.6} />
            </mesh>
            {/* White Sneaker Sole */}
            <mesh position={[0, -0.08, 0.02]}>
              <boxGeometry args={[0.38, 0.07, 0.5]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.4} />
            </mesh>
            {/* Cyan Accent Stripe */}
            <mesh position={[0, 0.02, 0.12]}>
              <boxGeometry args={[0.37, 0.05, 0.12]} />
              <meshBasicMaterial color="#00e5ff" toneMapped={false} />
            </mesh>
          </group>
        </group>
      ))}

      {/* TORSO / HOODIE */}
      <group ref={torso} position={[0, 0.38, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 1.08, 0.48]} />
          <meshStandardMaterial color={TUNIC} roughness={0.85} />
        </mesh>
        {/* Creeper / Diamond Icon on chest */}
        <group position={[0, 0.12, 0.25]}>
          <mesh>
            <boxGeometry args={[0.28, 0.28, 0.02]} />
            <meshBasicMaterial color="#00e5ff" toneMapped={false} />
          </mesh>
          {/* Creeper Eyes & Mouth Cutout */}
          <mesh position={[-0.06, 0.05, 0.012]}>
            <boxGeometry args={[0.06, 0.06, 0.01]} />
            <meshBasicMaterial color="#042f2e" />
          </mesh>
          <mesh position={[0.06, 0.05, 0.012]}>
            <boxGeometry args={[0.06, 0.06, 0.01]} />
            <meshBasicMaterial color="#042f2e" />
          </mesh>
          <mesh position={[0, -0.04, 0.012]}>
            <boxGeometry args={[0.08, 0.08, 0.01]} />
            <meshBasicMaterial color="#042f2e" />
          </mesh>
        </group>
        {/* Dark Hem Trim */}
        <mesh position={[0, -0.46, 0]}>
          <boxGeometry args={[0.92, 0.14, 0.5]} />
          <meshStandardMaterial color={TUNIC_DARK} roughness={0.9} />
        </mesh>
        {/* Cyber Backpack on back */}
        <mesh position={[0, 0.06, -0.28]} castShadow>
          <boxGeometry args={[0.62, 0.75, 0.18]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
        {/* Battery LEDs on backpack */}
        <mesh position={[-0.14, 0.25, -0.38]}>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <meshBasicMaterial color="#22c55e" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.25, -0.38]}>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <meshBasicMaterial color="#22c55e" toneMapped={false} />
        </mesh>
        <mesh position={[0.14, 0.25, -0.38]}>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <meshBasicMaterial color="#eab308" toneMapped={false} />
        </mesh>
      </group>

      {/* ARMS & FAST-TYPING HANDS */}
      {[-0.58, 0.58].map((x) => (
        <group
          key={x}
          ref={x < 0 ? leftArm : rightArm}
          position={[x, 0.78, 0.18]}
          rotation-x={-0.85}
          rotation-z={x > 0 ? -0.15 : 0.15}
        >
          {/* Upper Arm / Shoulder */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.28, 0.65, 0.28]} />
            <meshStandardMaterial color={TUNIC} roughness={0.85} />
          </mesh>
          {/* Forearm skin / cuff */}
          <mesh position={[0, -0.65, 0.04]} rotation-x={0.35} castShadow>
            <boxGeometry args={[0.26, 0.45, 0.26]} />
            <meshStandardMaterial color={SKIN_SHADOW} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Dynamic Typing Hands */}
      <mesh ref={leftHand} position={[-0.32, 0.72, 0.68]} castShadow>
        <boxGeometry args={[0.22, 0.18, 0.22]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>
      <mesh ref={rightHand} position={[0.32, 0.72, 0.68]} castShadow>
        <boxGeometry args={[0.22, 0.18, 0.22]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>

      {/* DETAILED VOXEL HEAD (STEVE PROPORTIONS + GAMING HEADSET) */}
      <group ref={head} position={[0, 1.34, 0.02]}>
        {/* Skin Head Cube */}
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.78, 0.78]} />
          <meshStandardMaterial color={SKIN} roughness={0.75} />
        </mesh>

        {/* Stepped 3D Hair Cap */}
        <mesh position={[0, 0.18, -0.04]} castShadow>
          <boxGeometry args={[0.84, 0.52, 0.84]} />
          <meshStandardMaterial color={HAIR} roughness={0.95} />
        </mesh>
        {/* Hair Fringe Front */}
        <mesh position={[0, 0.38, 0.38]}>
          <boxGeometry args={[0.8, 0.18, 0.08]} />
          <meshStandardMaterial color={HAIR} roughness={0.95} />
        </mesh>
        {/* Hair Sideburns */}
        {[-0.41, 0.41].map((x) => (
          <mesh key={x} position={[x, 0.15, 0.12]}>
            <boxGeometry args={[0.04, 0.35, 0.3]} />
            <meshStandardMaterial color={HAIR} roughness={0.95} />
          </mesh>
        ))}

        {/* Blinking Pixel Eyes */}
        {[-0.18, 0.18].map((x) => (
          <group key={x} ref={x < 0 ? leftEye : rightEye} position={[x, 0.04, 0.4]}>
            {/* White Sclera */}
            <mesh>
              <boxGeometry args={[0.13, 0.1, 0.02]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Glowing Cyan Pupil */}
            <mesh position={[x > 0 ? 0.025 : -0.025, -0.01, 0.01]}>
              <boxGeometry args={[0.07, 0.08, 0.02]} />
              <meshBasicMaterial color="#00e5ff" toneMapped={false} />
            </mesh>
          </group>
        ))}

        {/* Brown Eyebrows */}
        {[-0.18, 0.18].map((x) => (
          <mesh key={x} position={[x, 0.14, 0.4]}>
            <boxGeometry args={[0.14, 0.04, 0.02]} />
            <meshStandardMaterial color="#451a03" roughness={0.9} />
          </mesh>
        ))}

        {/* Confident Smile / Mouth */}
        <mesh position={[0, -0.16, 0.4]}>
          <boxGeometry args={[0.22, 0.05, 0.02]} />
          <meshStandardMaterial color="#b45309" roughness={0.8} />
        </mesh>

        {/* CHUNKY GAMING HEADSET */}
        {/* Headband */}
        <mesh position={[0, 0.46, 0]}>
          <boxGeometry args={[0.88, 0.1, 0.22]} />
          <meshStandardMaterial color="#09090b" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.47, 0]}>
          <boxGeometry args={[0.74, 0.09, 0.12]} />
          <meshBasicMaterial color="#00e5ff" toneMapped={false} />
        </mesh>
        {/* Large Earcups with glowing RGB rings */}
        {[-0.43, 0.43].map((x) => (
          <group key={x} position={[x, 0.04, 0]}>
            {/* Earcup Cushion */}
            <mesh>
              <boxGeometry args={[0.12, 0.34, 0.34]} />
              <meshStandardMaterial color="#09090b" roughness={0.5} />
            </mesh>
            {/* Glowing Ring */}
            <mesh position={[x > 0 ? 0.065 : -0.065, 0, 0]}>
              <boxGeometry args={[0.02, 0.22, 0.22]} />
              <meshBasicMaterial color="#ef4444" toneMapped={false} />
            </mesh>
          </group>
        ))}
        {/* Swiveling Boom Mic */}
        <group position={[-0.44, -0.04, 0.15]} rotation={[0.45, -0.4, 0]}>
          <mesh position={[0, 0, 0.18]}>
            <boxGeometry args={[0.04, 0.04, 0.32]} />
            <meshStandardMaterial color="#27272a" roughness={0.5} />
          </mesh>
          {/* Red Recording LED Tip */}
          <mesh position={[0, 0, 0.36]}>
            <boxGeometry args={[0.07, 0.07, 0.08]} />
            <meshBasicMaterial color="#ef4444" toneMapped={false} />
          </mesh>
          <pointLight color="#ef4444" distance={1.2} intensity={1.5} />
        </group>
      </group>

      {/* FLOATING VOXEL LAPTOP + SCREEN GLOW + HOLOGRAPHIC PARTICLES */}
      <group ref={laptop} position={[0, 0.62, 0.86]}>
        {/* Base Keyboard Body */}
        <mesh rotation-x={-0.14} castShadow>
          <boxGeometry args={[1.08, 0.06, 0.78]} />
          <meshStandardMaterial color="#334155" roughness={0.35} metalness={0.5} />
        </mesh>
        {/* Glowing Keyboard Keys Plate */}
        <mesh position={[0, 0.038, 0.02]} rotation-x={-0.14}>
          <boxGeometry args={[0.98, 0.02, 0.66]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
        {/* Keycap Glow Accents */}
        <mesh position={[0, 0.048, 0.02]} rotation-x={-0.14}>
          <boxGeometry args={[0.92, 0.01, 0.6]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} />
        </mesh>

        {/* Display Screen */}
        <group position={[0, 0.4, -0.34]} rotation-x={-0.26}>
          <mesh castShadow>
            <boxGeometry args={[1.08, 0.74, 0.05]} />
            <meshStandardMaterial color="#334155" roughness={0.35} metalness={0.5} />
          </mesh>
          {/* Glowing Code Screen */}
          <mesh position={[0, 0, 0.032]}>
            <boxGeometry args={[0.98, 0.64, 0.01]} />
            <meshBasicMaterial color="#00f5d4" toneMapped={false} />
          </mesh>
          {/* Animated Syntax Code Lines */}
          {[0.2, 0.09, -0.02, -0.13, -0.22].map((y, i) => (
            <mesh key={y} position={[-0.2 + (i % 2) * 0.06, y, 0.038]}>
              <boxGeometry args={[0.48 - (i % 3) * 0.08, 0.035, 0.01]} />
              <meshBasicMaterial color="#042f2e" toneMapped={false} />
            </mesh>
          ))}
        </group>

        {/* Dynamic Screen Glow Light casting on programmer's face & chest */}
        <pointLight
          ref={screenLight}
          position={[0, 0.35, 0.1]}
          color="#00f5d4"
          distance={3.2}
          intensity={2.8}
        />

        {/* Floating Holographic Particles rising from the screen */}
        <HoloCode />
      </group>
    </group>
  );
}
