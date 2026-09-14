import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { scrollRef } from "./useScrollProgress";

// Color Palette for Realistic Developer Setup
const SKIN_TONE = "#e4a887";
const SKIN_SHADOW = "#cc8b69";
const HAIR_COLOR = "#1c1510";
const HOODIE_COLOR = "#181b22";
const HOODIE_ACCENT = "#0d9488";
const DENIM_COLOR = "#1e2535";
const SNEAKER_WHITE = "#f8fafc";
const SNEAKER_DARK = "#0f172a";
const CHAIR_FRAME = "#11141a";
const CHAIR_MESH = "#1a1f29";
const CHAIR_ACCENT = "#00e5ff";
const METAL_CHROME = "#94a3b8";
const LAPTOP_CHASSIS = "#2d3440";

/**
 * Floating Holographic Code Particle rising from the laptop screen.
 */
function HolographicSyntax() {
  const group = useRef<THREE.Group>(null);
  const glyphs = useMemo(
    () => [
      { text: "def train_ai():", x: -0.28, z: 0.08, speed: 0.9, offset: 0 },
      { text: "model.fit()", x: 0.24, z: -0.06, speed: 1.1, offset: 1.1 },
      { text: "loss: 0.0012", x: -0.12, z: 0.14, speed: 1.0, offset: 2.2 },
      { text: "accuracy: 99.8%", x: 0.16, z: 0.18, speed: 1.2, offset: 3.3 },
      { text: "return solution", x: -0.26, z: -0.12, speed: 0.95, offset: 4.4 },
    ],
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const g = glyphs[i];
      const life = (t * g.speed + g.offset) % 3.5;
      child.position.y = 0.42 + life * 0.38;
      child.position.x = g.x + Math.sin(t * 1.8 + i) * 0.03;
      const opacity = life < 0.5 ? life / 0.5 : Math.max(0, 1 - (life - 2.0) / 1.5);
      child.scale.set(opacity * 0.38, opacity * 0.38, opacity * 0.38);
    });
  });

  return (
    <group ref={group} position={[0, 0.42, 0.4]}>
      {glyphs.map((g, i) => (
        <group key={i} position={[g.x, 0, g.z]}>
          <Text
            fontSize={0.24}
            color="#5ffbf1"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.018}
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
 * Realistic Developer Workstation: Sleek Aluminum Unibody Laptop
 * with precision backlit chiclet keyboard, glass trackpad, and code display.
 */
function RealisticLaptop({ lightRef }: { lightRef: React.RefObject<THREE.PointLight | null> }) {
  return (
    <group position={[0, 0.58, 0.82]}>
      {/* CNC Aluminum Laptop Base Chassis */}
      <mesh rotation-x={-0.12} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.045, 0.78]} />
        <meshStandardMaterial
          color={LAPTOP_CHASSIS}
          metalness={0.75}
          roughness={0.28}
        />
      </mesh>

      {/* Recessed Keyboard Well */}
      <mesh position={[0, 0.026, 0.04]} rotation-x={-0.12}>
        <boxGeometry args={[1.02, 0.01, 0.44]} />
        <meshStandardMaterial color="#131720" roughness={0.7} />
      </mesh>

      {/* Individual Key Rows (Chiclet Backlit Keyboard) */}
      {[-0.14, -0.07, 0, 0.07, 0.14].map((z, rowIdx) => (
        <mesh key={rowIdx} position={[0, 0.036, 0.04 + z]} rotation-x={-0.12}>
          <boxGeometry args={[0.98, 0.012, 0.052]} />
          <meshStandardMaterial color="#1e232e" roughness={0.5} />
        </mesh>
      ))}

      {/* Soft Cyan RGB Key Backlight Glow Plate */}
      <mesh position={[0, 0.031, 0.04]} rotation-x={-0.12}>
        <boxGeometry args={[1.0, 0.005, 0.42]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
      </mesh>

      {/* Precision Glass Trackpad */}
      <mesh position={[0, 0.026, 0.3]} rotation-x={-0.12}>
        <boxGeometry args={[0.42, 0.008, 0.22]} />
        <meshStandardMaterial
          color="#384050"
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Ultra-thin Laptop Display Lid (angled comfortably toward developer) */}
      <group position={[0, 0.38, -0.36]} rotation-x={-0.24}>
        {/* Rear Aluminum Cover */}
        <mesh castShadow>
          <boxGeometry args={[1.15, 0.78, 0.035]} />
          <meshStandardMaterial
            color={LAPTOP_CHASSIS}
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
        {/* Glowing Apple/Tech Logo on Back of Lid */}
        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[0.07, 32]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>

        {/* Minimal Black Screen Bezel */}
        <mesh position={[0, 0, 0.019]}>
          <boxGeometry args={[1.12, 0.75, 0.005]} />
          <meshStandardMaterial color="#090b0e" roughness={0.15} />
        </mesh>

        {/* Realistic High-Res IDE Code Screen Display */}
        <mesh position={[0, 0, 0.024]}>
          <boxGeometry args={[1.06, 0.69, 0.005]} />
          <meshBasicMaterial color="#071a1d" toneMapped={false} />
        </mesh>

        {/* Editor Sidebar (File Tree) */}
        <mesh position={[-0.42, 0, 0.028]}>
          <boxGeometry args={[0.18, 0.67, 0.002]} />
          <meshBasicMaterial color="#051316" toneMapped={false} />
        </mesh>

        {/* Line Numbers Column */}
        <mesh position={[-0.31, 0, 0.028]}>
          <boxGeometry args={[0.04, 0.67, 0.002]} />
          <meshBasicMaterial color="#0b282d" toneMapped={false} />
        </mesh>

        {/* Realistic Syntax Lines in Editor (Cyan, Emerald, Amber, Purple) */}
        {[
          { y: 0.27, w: 0.45, x: -0.05, color: "#00f5d4" },
          { y: 0.21, w: 0.58, x: 0.02, color: "#38ef7d" },
          { y: 0.15, w: 0.36, x: -0.09, color: "#a855f7" },
          { y: 0.09, w: 0.52, x: -0.01, color: "#ffd166" },
          { y: 0.03, w: 0.42, x: -0.06, color: "#00f5d4" },
          { y: -0.03, w: 0.62, x: 0.04, color: "#38ef7d" },
          { y: -0.09, w: 0.32, x: -0.11, color: "#ff5555" },
          { y: -0.15, w: 0.48, x: -0.03, color: "#00f5d4" },
          { y: -0.21, w: 0.54, x: 0.0, color: "#ffd166" },
          { y: -0.27, w: 0.28, x: -0.13, color: "#a855f7" },
        ].map((line, idx) => (
          <mesh key={idx} position={[line.x, line.y, 0.03]}>
            <boxGeometry args={[line.w, 0.024, 0.002]} />
            <meshBasicMaterial color={line.color} toneMapped={false} />
          </mesh>
        ))}

        {/* Status Bar at Bottom of Screen */}
        <mesh position={[0, -0.32, 0.028]}>
          <boxGeometry args={[1.06, 0.035, 0.002]} />
          <meshBasicMaterial color="#0d9488" toneMapped={false} />
        </mesh>
      </group>

      {/* Real-time Dynamic Screen Light casting onto developer's face, hands & chest */}
      <pointLight
        ref={lightRef}
        position={[0, 0.35, 0.15]}
        color="#00f5d4"
        distance={3.2}
        intensity={2.8}
        castShadow
      />

      {/* Rising Holographic Syntax Particles */}
      <HolographicSyntax />
    </group>
  );
}

/**
 * Designer Ergonomic Gaming Throne (Herman Miller Embody / Secretlab Titan Style)
 * Sculpted spine vertebrae, breathable contoured mesh back, waterfall seat,
 * 3D armrests, and 5-star metallic caster base with anti-gravity hover stabilizer.
 */
function ErgonomicThrone() {
  return (
    <group>
      {/* 5-Star Spider Caster Wheel Base */}
      <group position={[0, -1.36, 0]}>
        {/* Center Hub */}
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.24, 0.14, 16]} />
          <meshStandardMaterial color={METAL_CHROME} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* 5 Radial Base Arms */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * 2 * Math.PI) / 5;
          return (
            <group key={i} rotation-y={angle}>
              <mesh position={[0.42, -0.04, 0]} rotation-z={-0.1} castShadow>
                <boxGeometry args={[0.82, 0.08, 0.14]} />
                <meshStandardMaterial color={CHAIR_FRAME} roughness={0.5} metalness={0.4} />
              </mesh>
              {/* Dual-Wheel Roller Caster */}
              <group position={[0.78, -0.16, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.07, 0.07, 0.08, 12]} />
                  <meshStandardMaterial color="#090b0e" roughness={0.7} />
                </mesh>
              </group>
            </group>
          );
        })}

        {/* Subtle Anti-Gravity Ion Ring beneath base */}
        <mesh position={[0, -0.14, 0]} rotation-x={Math.PI / 2}>
          <ringGeometry args={[0.65, 0.85, 32]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} />
        </mesh>
        <pointLight position={[0, -0.2, 0]} color="#00e5ff" distance={2.5} intensity={1.5} />
      </group>

      {/* Hydraulic Steel Gas-Lift Cylinder */}
      <mesh position={[0, -0.96, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.68, 20]} />
        <meshStandardMaterial color={METAL_CHROME} metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.24, 16]} />
        <meshStandardMaterial color={CHAIR_FRAME} roughness={0.6} />
      </mesh>

      {/* Mechanical Tilt Mechanism Box under Seat */}
      <mesh position={[0, -0.54, 0]} castShadow>
        <boxGeometry args={[0.65, 0.16, 0.6]} />
        <meshStandardMaterial color="#1e232e" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Ergonomic Seat Pan with Contoured Thigh Bolsters & Waterfall Front */}
      <group position={[0, -0.42, 0.02]}>
        {/* Main Seat Core */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.25, 0.18, 1.15]} />
          <meshStandardMaterial color={CHAIR_MESH} roughness={0.8} />
        </mesh>
        {/* Contoured Padded Seat Cushion */}
        <mesh position={[0, 0.09, 0]}>
          <boxGeometry args={[1.15, 0.06, 1.05]} />
          <meshStandardMaterial color="#11141b" roughness={0.7} />
        </mesh>
        {/* Waterfall Curved Front Lip */}
        <mesh position={[0, 0.04, 0.56]} rotation-x={0.4}>
          <boxGeometry args={[1.14, 0.08, 0.14]} />
          <meshStandardMaterial color={CHAIR_MESH} roughness={0.8} />
        </mesh>
        {/* Side Cushion Bolsters */}
        {[-0.56, 0.56].map((x) => (
          <mesh key={x} position={[x, 0.13, 0]}>
            <boxGeometry args={[0.14, 0.09, 1.02]} />
            <meshStandardMaterial color="#0c0e13" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Ergonomic Spine Backrest with Lumbar Ribs (Embody Matrix Style) */}
      <group position={[0, 0.44, -0.52]} rotation-x={0.06}>
        {/* Central Spine Column */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.55, 16]} />
          <meshStandardMaterial color={METAL_CHROME} metalness={0.7} roughness={0.25} />
        </mesh>

        {/* Flexible Lumbar Rib Matrix */}
        {[-0.45, -0.22, 0.02, 0.26, 0.5].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0.06]} castShadow>
            <boxGeometry args={[1.05 - Math.abs(y) * 0.35, 0.07, 0.08]} />
            <meshStandardMaterial color={CHAIR_FRAME} roughness={0.6} />
          </mesh>
        ))}

        {/* Breathable Mesh Backrest Membrane */}
        <mesh position={[0, 0.04, 0.12]} castShadow receiveShadow>
          <boxGeometry args={[1.16, 1.52, 0.06]} />
          <meshStandardMaterial color={CHAIR_MESH} roughness={0.85} />
        </mesh>

        {/* Lumbar Support Pillow */}
        <mesh position={[0, -0.2, 0.16]}>
          <boxGeometry args={[0.82, 0.28, 0.08]} />
          <meshStandardMaterial color="#0c0e13" roughness={0.7} />
        </mesh>

        {/* Stitched Cyan Edge Piping */}
        {[-0.58, 0.58].map((x) => (
          <mesh key={x} position={[x, 0.04, 0.13]}>
            <boxGeometry args={[0.03, 1.5, 0.06]} />
            <meshBasicMaterial color={CHAIR_ACCENT} toneMapped={false} />
          </mesh>
        ))}

        {/* Ergonomic Headrest with Neck Support */}
        <group position={[0, 0.88, 0.16]} rotation-x={-0.1}>
          <mesh castShadow>
            <boxGeometry args={[0.72, 0.28, 0.14]} />
            <meshStandardMaterial color="#11141b" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[0.62, 0.22, 0.04]} />
            <meshStandardMaterial color="#0a0c10" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* 3D Adjustable Armrests with Soft PU Foam Pads */}
      {[-0.66, 0.66].map((x) => (
        <group key={x} position={[x, -0.06, 0.02]}>
          {/* Steel Arm Stems */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.05, 0.44, 12]} />
            <meshStandardMaterial color={METAL_CHROME} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Contoured Padded Armrest Top */}
          <mesh position={[0, 0.22, 0.06]} castShadow>
            <boxGeometry args={[0.18, 0.065, 0.76]} />
            <meshStandardMaterial color="#0a0c10" roughness={0.65} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Highly Realistic & Defined Developer Character:
 * - Anatomically proportioned human coder seated in ergonomic posture
 * - Detailed sculpted face with blinking eyes, nose bridge, jawline, and stylish textured hair
 * - Premium studio over-ear headphones with metallic yoke and glowing earcups
 * - Streetwear developer hoodie with natural cloth folds, kangaroo pouch & cuffs
 * - Tapered denim jeans with knee wrinkles
 * - Stylized designer sneakers resting on footrests
 * - Articulated arms and realistic sculpted hands actively typing across the keyboard
 */
export function Programmer() {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Group>(null);
  const rightEye = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftHand = useRef<THREE.Group>(null);
  const rightHand = useRef<THREE.Group>(null);
  const chair = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const screenLight = useRef<THREE.PointLight>(null);

  const smoothVel = useRef(0);
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);

    // Track scroll velocity with smooth spring physics
    const currentVel = scrollRef.velocity || 0;
    smoothVel.current += (currentVel * 10 - smoothVel.current) * (1 - Math.exp(-12 * dt));
    const vel = smoothVel.current;
    const absVel = Math.abs(vel);

    // Natural Blinking Animation (Blinks every ~3.8 seconds for 0.12s)
    blinkTimer.current += dt;
    if (blinkTimer.current > 3.8) {
      isBlinking.current = true;
      if (blinkTimer.current > 3.94) {
        isBlinking.current = false;
        blinkTimer.current = 0;
      }
    }
    const eyeScaleY = isBlinking.current ? 0.08 : 1;
    if (leftEye.current) leftEye.current.scale.y = eyeScaleY;
    if (rightEye.current) rightEye.current.scale.y = eyeScaleY;

    // Head Animation: Natural breathing bob + focused gaze + reactive descent tilt
    if (head.current) {
      head.current.rotation.z = Math.sin(t * 1.8) * 0.02 - vel * 0.06;
      head.current.rotation.x = Math.max(-0.2, Math.min(0.35, 0.12 + vel * 0.22));
      head.current.rotation.y = Math.sin(t * 1.2) * 0.04;
      head.current.position.y = 1.32 + Math.sin(t * 3.4) * 0.012;
    }

    // Torso Natural Breathing (chest rises & falls organically)
    if (torso.current) {
      torso.current.rotation.x = Math.max(-0.1, Math.min(0.24, 0.04 + vel * 0.18));
      torso.current.position.y = 0.38 + Math.sin(t * 2.2) * 0.01;
      torso.current.scale.set(
        1 + Math.sin(t * 2.2) * 0.008,
        1 + Math.sin(t * 2.2) * 0.012,
        1 + Math.sin(t * 2.2) * 0.01,
      );
    }

    // Realistic Typing Dynamics (Burst typing with natural rhythmic pacing)
    const burstPhase = Math.sin(t * 4);
    const typingMultiplier = burstPhase > 0 ? 1 : 0.4;
    const baseSpeed = (14 + absVel * 22) * typingMultiplier;

    if (leftHand.current) {
      leftHand.current.position.y = 0.71 + Math.abs(Math.sin(t * baseSpeed)) * 0.045;
      leftHand.current.position.z = 0.72 + Math.cos(t * baseSpeed * 0.6) * 0.018;
      leftHand.current.rotation.x = -0.2 + Math.sin(t * baseSpeed) * 0.06;
    }
    if (rightHand.current) {
      rightHand.current.position.y = 0.71 + Math.abs(Math.cos(t * (baseSpeed + 2.5))) * 0.045;
      rightHand.current.position.z = 0.72 + Math.sin(t * (baseSpeed + 2.5) * 0.6) * 0.018;
      rightHand.current.rotation.x = -0.2 + Math.cos(t * baseSpeed) * 0.06;
    }

    // Arms subtle sway following fingers
    if (leftArm.current) leftArm.current.rotation.x = -0.78 + Math.sin(t * baseSpeed * 0.4) * 0.025;
    if (rightArm.current) rightArm.current.rotation.x = -0.78 + Math.cos(t * baseSpeed * 0.4) * 0.025;

    // Chair subtle hydraulic float
    if (chair.current) {
      chair.current.position.y = Math.sin(t * 1.8) * 0.025;
      chair.current.rotation.y = Math.sin(t * 0.6) * 0.03;
    }

    // Dynamic Screen Light Flicker from live code compiling
    if (screenLight.current) {
      screenLight.current.intensity = 2.6 + Math.sin(t * 14) * 0.35 + absVel * 1.2;
    }
  });

  return (
    <group ref={root} scale={1.16}>
      {/* ERGONOMIC DESIGNER GAMING THRONE */}
      <group ref={chair}>
        <ErgonomicThrone />
      </group>

      {/* LOWER BODY: DENIM JEANS & STYLED SNEAKERS */}
      {[-0.27, 0.27].map((x) => (
        <group key={x}>
          {/* Thigh (resting naturally flat on chair cushion) */}
          <mesh position={[x, -0.28, 0.32]} rotation-x={-0.45} castShadow>
            <boxGeometry args={[0.34, 0.62, 0.34]} />
            <meshStandardMaterial color={DENIM_COLOR} roughness={0.88} />
          </mesh>
          {/* Natural Cloth Crease at Knee */}
          <mesh position={[x, -0.4, 0.52]} rotation-x={-0.45}>
            <boxGeometry args={[0.32, 0.18, 0.12]} />
            <meshStandardMaterial color="#171c28" roughness={0.9} />
          </mesh>
          {/* Shin (angled comfortably toward floor) */}
          <mesh position={[x, -0.72, 0.64]} rotation-x={0.22} castShadow>
            <boxGeometry args={[0.31, 0.54, 0.31]} />
            <meshStandardMaterial color={DENIM_COLOR} roughness={0.88} />
          </mesh>
          {/* Pant Leg Cuff */}
          <mesh position={[x, -0.96, 0.72]}>
            <cylinderGeometry args={[0.17, 0.175, 0.08, 16]} />
            <meshStandardMaterial color="#141824" roughness={0.9} />
          </mesh>

          {/* Stylized Modern Sneakers (Nike / Retro Runner Style) */}
          <group position={[x, -1.06, 0.82]}>
            {/* White Rubber Midsole */}
            <mesh position={[0, -0.05, 0.04]} castShadow>
              <boxGeometry args={[0.35, 0.09, 0.54]} />
              <meshStandardMaterial color={SNEAKER_WHITE} roughness={0.3} />
            </mesh>
            {/* Sneaker Upper Body */}
            <mesh position={[0, 0.04, 0.02]} castShadow>
              <boxGeometry args={[0.33, 0.15, 0.5]} />
              <meshStandardMaterial color={SNEAKER_DARK} roughness={0.65} />
            </mesh>
            {/* Cyan Accent Swoosh / Stripe */}
            <mesh position={[x > 0 ? 0.17 : -0.17, 0.03, 0.02]}>
              <boxGeometry args={[0.015, 0.05, 0.28]} />
              <meshBasicMaterial color="#00e5ff" toneMapped={false} />
            </mesh>
            {/* White Laces */}
            <mesh position={[0, 0.12, 0.08]} rotation-x={-0.3}>
              <boxGeometry args={[0.18, 0.02, 0.2]} />
              <meshStandardMaterial color={SNEAKER_WHITE} roughness={0.4} />
            </mesh>
          </group>
        </group>
      ))}

      {/* UPPER BODY: STREETWEAR DEVELOPER HOODIE */}
      <group ref={torso} position={[0, 0.38, 0]}>
        {/* Main Torso Block with Natural Taper */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.92, 1.08, 0.52]} />
          <meshStandardMaterial color={HOODIE_COLOR} roughness={0.85} />
        </mesh>

        {/* Kangaroo Front Pouch Pocket */}
        <mesh position={[0, -0.22, 0.28]}>
          <boxGeometry args={[0.68, 0.32, 0.08]} />
          <meshStandardMaterial color="#13151b" roughness={0.9} />
        </mesh>

        {/* Draped Hood Volume Resting on Upper Back / Neck */}
        <mesh position={[0, 0.44, -0.26]} rotation-x={-0.2}>
          <boxGeometry args={[0.76, 0.28, 0.24]} />
          <meshStandardMaterial color={HOODIE_COLOR} roughness={0.85} />
        </mesh>

        {/* Ribbed Bottom Hem Band */}
        <mesh position={[0, -0.52, 0]}>
          <boxGeometry args={[0.94, 0.12, 0.54]} />
          <meshStandardMaterial color="#0f1115" roughness={0.95} />
        </mesh>

        {/* Subtle Cyber Crest on Chest */}
        <mesh position={[0, 0.18, 0.27]}>
          <boxGeometry args={[0.22, 0.22, 0.02]} />
          <meshBasicMaterial color={HOODIE_ACCENT} toneMapped={false} />
        </mesh>
      </group>

      {/* ARMS (NATURALLY RESTING ON ARMRESTS) */}
      {[-0.58, 0.58].map((x) => (
        <group
          key={x}
          ref={x < 0 ? leftArm : rightArm}
          position={[x, 0.78, 0.14]}
          rotation-x={-0.78}
          rotation-z={x > 0 ? -0.12 : 0.12}
        >
          {/* Upper Arm with Realistic Shoulder Curve */}
          <mesh position={[0, -0.32, 0]} castShadow>
            <boxGeometry args={[0.27, 0.68, 0.27]} />
            <meshStandardMaterial color={HOODIE_COLOR} roughness={0.85} />
          </mesh>
          {/* Forearm angled comfortably toward keyboard */}
          <mesh position={[0, -0.68, 0.06]} rotation-x={0.28} castShadow>
            <boxGeometry args={[0.25, 0.48, 0.25]} />
            <meshStandardMaterial color={HOODIE_COLOR} roughness={0.85} />
          </mesh>
          {/* Ribbed Sleeve Cuff */}
          <mesh position={[0, -0.92, 0.14]}>
            <boxGeometry args={[0.26, 0.08, 0.26]} />
            <meshStandardMaterial color="#0f1115" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* ARTICULATED REALISTIC HANDS & FINGERS (TYPING ON KEYBOARD) */}
      {[-0.32, 0.32].map((x) => (
        <group
          key={x}
          ref={x < 0 ? leftHand : rightHand}
          position={[x, 0.71, 0.72]}
          rotation-x={-0.2}
          rotation-z={x > 0 ? -0.08 : 0.08}
        >
          {/* Palm Base */}
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.07, 0.2]} />
            <meshStandardMaterial color={SKIN_TONE} roughness={0.65} />
          </mesh>
          {/* Thumb */}
          <mesh position={[x > 0 ? -0.12 : 0.12, -0.01, 0.04]} rotation-y={x > 0 ? 0.3 : -0.3}>
            <boxGeometry args={[0.07, 0.06, 0.14]} />
            <meshStandardMaterial color={SKIN_TONE} roughness={0.65} />
          </mesh>
          {/* 4 Articulated Fingers poised over keys */}
          {[-0.07, -0.02, 0.03, 0.08].map((fx, fIdx) => (
            <mesh
              key={fIdx}
              position={[fx, -0.02, 0.13]}
              rotation-x={0.22}
            >
              <boxGeometry args={[0.045, 0.05, 0.13]} />
              <meshStandardMaterial color={SKIN_SHADOW} roughness={0.65} />
            </mesh>
          ))}
        </group>
      ))}

      {/* SCULPTED REALISTIC HEAD & PREMIUM HEADPHONES */}
      <group ref={head} position={[0, 1.32, 0.02]}>
        {/* Anatomical Head Contour (Jawline & Cranium) */}
        <mesh castShadow>
          <boxGeometry args={[0.72, 0.78, 0.72]} />
          <meshStandardMaterial color={SKIN_TONE} roughness={0.65} />
        </mesh>
        {/* Chin & Jaw Taper */}
        <mesh position={[0, -0.34, 0.12]} rotation-x={0.2}>
          <boxGeometry args={[0.48, 0.18, 0.44]} />
          <meshStandardMaterial color={SKIN_SHADOW} roughness={0.7} />
        </mesh>
        {/* Sculpted Nose Bridge */}
        <mesh position={[0, -0.04, 0.38]} rotation-x={-0.1}>
          <boxGeometry args={[0.11, 0.18, 0.09]} />
          <meshStandardMaterial color={SKIN_SHADOW} roughness={0.6} />
        </mesh>
        {/* Realistic Lips / Focused Expression */}
        <mesh position={[0, -0.22, 0.37]}>
          <boxGeometry args={[0.22, 0.05, 0.04]} />
          <meshStandardMaterial color="#be7c60" roughness={0.6} />
        </mesh>

        {/* Sculpted Ears */}
        {[-0.38, 0.38].map((x) => (
          <mesh key={x} position={[x, -0.02, 0.04]}>
            <boxGeometry args={[0.05, 0.22, 0.14]} />
            <meshStandardMaterial color={SKIN_SHADOW} roughness={0.7} />
          </mesh>
        ))}

        {/* Expressive Eyes with Eyelids & Screen Reflections */}
        {[-0.17, 0.17].map((x) => (
          <group
            key={x}
            ref={x < 0 ? leftEye : rightEye}
            position={[x, 0.06, 0.37]}
          >
            {/* Almond Sclera */}
            <mesh>
              <boxGeometry args={[0.13, 0.08, 0.02]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Dark Iris with Screen Reflection */}
            <mesh position={[x > 0 ? 0.02 : -0.02, -0.01, 0.01]}>
              <boxGeometry args={[0.075, 0.07, 0.02]} />
              <meshBasicMaterial color="#00e5ff" toneMapped={false} />
            </mesh>
            {/* Upper Eyelid Crease */}
            <mesh position={[0, 0.048, 0.012]}>
              <boxGeometry args={[0.14, 0.02, 0.02]} />
              <meshStandardMaterial color={SKIN_SHADOW} roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Natural Eyebrows */}
        {[-0.17, 0.17].map((x) => (
          <mesh key={x} position={[x, 0.15, 0.38]}>
            <boxGeometry args={[0.15, 0.04, 0.02]} />
            <meshStandardMaterial color={HAIR_COLOR} roughness={0.9} />
          </mesh>
        ))}

        {/* STYLISH TEXTURED HAIR HELMET WITH SWEPT BANGS */}
        {/* Hair Cap */}
        <mesh position={[0, 0.22, -0.04]} castShadow>
          <boxGeometry args={[0.78, 0.48, 0.78]} />
          <meshStandardMaterial color={HAIR_COLOR} roughness={0.8} />
        </mesh>
        {/* Swept Bangs & Textured Fringe */}
        <mesh position={[0, 0.36, 0.36]} rotation-x={-0.15}>
          <boxGeometry args={[0.74, 0.22, 0.12]} />
          <meshStandardMaterial color={HAIR_COLOR} roughness={0.8} />
        </mesh>
        {/* Side Hair Strands */}
        {[-0.39, 0.39].map((x) => (
          <mesh key={x} position={[x, 0.18, 0.16]}>
            <boxGeometry args={[0.05, 0.34, 0.28]} />
            <meshStandardMaterial color={HAIR_COLOR} roughness={0.8} />
          </mesh>
        ))}

        {/* PREMIUM STUDIO OVER-EAR HEADPHONES (Sony XM5 / Bose Style) */}
        {/* Sleek Curved Headband */}
        <mesh position={[0, 0.46, 0]}>
          <boxGeometry args={[0.84, 0.08, 0.16]} />
          <meshStandardMaterial color="#090b0e" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.76, 0.04, 0.14]} />
          <meshStandardMaterial color="#1a1f29" roughness={0.8} />
        </mesh>

        {/* Angled Oval Earcups with Plush Cushions & Glowing LED Rings */}
        {[-0.42, 0.42].map((x) => (
          <group key={x} position={[x, 0.02, 0]}>
            {/* Earcup Shell */}
            <mesh castShadow>
              <boxGeometry args={[0.12, 0.36, 0.28]} />
              <meshStandardMaterial color="#141822" roughness={0.35} metalness={0.7} />
            </mesh>
            {/* Plush Leatherette Cushion */}
            <mesh position={[x > 0 ? -0.05 : 0.05, 0, 0]}>
              <boxGeometry args={[0.04, 0.32, 0.24]} />
              <meshStandardMaterial color="#090b0e" roughness={0.85} />
            </mesh>
            {/* Glowing Accent LED Ring */}
            <mesh position={[x > 0 ? 0.065 : -0.065, 0, 0]}>
              <boxGeometry args={[0.015, 0.2, 0.16]} />
              <meshBasicMaterial color="#00e5ff" toneMapped={false} />
            </mesh>
          </group>
        ))}

        {/* Sleek Boom Microphone */}
        <group position={[-0.44, -0.08, 0.18]} rotation={[0.42, -0.38, 0]}>
          <mesh position={[0, 0, 0.18]}>
            <cylinderGeometry args={[0.018, 0.018, 0.36, 8]} />
            <meshStandardMaterial color="#1e232e" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Glowing Red Recording Indicator LED */}
          <mesh position={[0, 0, 0.36]}>
            <boxGeometry args={[0.05, 0.05, 0.06]} />
            <meshBasicMaterial color="#ef4444" toneMapped={false} />
          </mesh>
          <pointLight color="#ef4444" distance={1.2} intensity={1.2} />
        </group>
      </group>

      {/* REALISTIC WORKSTATION LAPTOP & SCREEN GLOW */}
      <RealisticLaptop lightRef={screenLight} />
    </group>
  );
}
