import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
import { scrollRef } from "./useScrollProgress";

// World-space height the bot should render at, regardless of the glb's own
// (unknown) unit scale — fit is computed from the model's bounding box below.
const TARGET_HEIGHT = 2.0;
const BOT_POSITION: [number, number, number] = [0, -2.7, 0];
// Faces the bot 75° to the right of its default forward-facing pose.
const BASE_ROTATION_Y = -THREE.MathUtils.degToRad(75);

/**
 * Rigged "Teal" droid (user-supplied glb, /public/teal_v2.glb), replacing the
 * hand-built voxel coder. Plays its baked animation on loop and reacts subtly
 * to scroll velocity so it still feels alive during the descent.
 */
export function TealBot() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/teal_v2.glb");
  // Skinned meshes share bone state on the cached GLTF scene — clone per
  // instance so React's dev double-mount doesn't corrupt the skeleton.
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Auto-fit: normalize whatever native scale the glb uses to a known
  // world-space height, and re-center it so it pivots at its own feet.
  const { fitScale, pivot } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = size.y > 0 ? TARGET_HEIGHT / size.y : 1;
    return {
      fitScale: scale,
      pivot: [-center.x, -box.min.y, -center.z] as [number, number, number],
    };
  }, [clone]);

  const { actions } = useAnimations(animations, group);
  const smoothVel = useRef(0);

  useEffect(() => {
    const first = Object.values(actions)[0];
    if (!first) return;
    first.reset();
    first.setLoop(THREE.LoopRepeat, Infinity);
    first.clampWhenFinished = false;
    first.fadeIn(0.4).play();
    return () => {
      first.fadeOut(0.4);
    };
  }, [actions]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);

    const currentVel = scrollRef.velocity || 0;
    smoothVel.current += (currentVel * 10 - smoothVel.current) * (1 - Math.exp(-12 * dt));
    const vel = smoothVel.current;

    if (group.current) {
      group.current.position.y = BOT_POSITION[1] + Math.sin(t * 1.8) * 0.03;
      group.current.rotation.z = Math.sin(t * 1.2) * 0.02 - vel * 0.08;
      group.current.rotation.x = THREE.MathUtils.clamp(vel * 0.2, -0.15, 0.15);
    }
  });

  return (
    <group ref={group} position={BOT_POSITION} rotation={[0, BASE_ROTATION_Y, 0]}>
      <group scale={fitScale}>
        <primitive object={clone} position={pivot} />
      </group>
    </group>
  );
}

useGLTF.preload("/teal_v2.glb");
