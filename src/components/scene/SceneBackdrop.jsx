import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const palette = {
  auth: ["#a855f7", "#22d3ee", "#f0abfc"],
  feed: ["#7c3aed", "#06b6d4", "#60a5fa"],
  profile: ["#8b5cf6", "#2dd4bf", "#f472b6"],
  network: ["#22d3ee", "#a855f7", "#38bdf8"],
  danger: ["#fb7185", "#a855f7", "#22d3ee"],
};

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
};

const useWebGLAvailable = () => {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      const lowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      setAvailable(Boolean(gl) && !lowPower);
    } catch {
      setAvailable(false);
    }
  }, []);

  return available;
};

const Network = ({ variant }) => {
  const groupRef = useRef(null);
  const lineRef = useRef(null);
  const colors = palette[variant] || palette.feed;

  const points = useMemo(() => {
    return Array.from({ length: 34 }, (_, i) => {
      const radius = 2.1 + (i % 7) * 0.22;
      const angle = (i / 34) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * radius + Math.sin(i * 2.1) * 0.7,
        Math.sin(angle * 1.4) * 1.35 + Math.cos(i) * 0.35,
        Math.sin(angle) * radius * 0.44 + Math.cos(i * 1.3) * 0.7
      );
    });
  }, []);

  const lineGeometry = useMemo(() => {
    const positions = [];
    points.forEach((point, i) => {
      const next = points[(i + 3) % points.length];
      const nextTwo = points[(i + 9) % points.length];
      positions.push(point.x, point.y, point.z, next.x, next.y, next.z);
      if (i % 4 === 0) positions.push(point.x, point.y, point.z, nextTwo.x, nextTwo.y, nextTwo.z);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      x: 0.34,
      duration: 38,
      repeat: -1,
      ease: "none",
    });
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.position.x = pointer.x * 0.26;
    groupRef.current.position.y = pointer.y * 0.16;
    if (lineRef.current) lineRef.current.material.opacity = 0.18 + Math.sin(clock.elapsedTime * 0.8) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color={colors[1]} transparent opacity={0.22} />
      </lineSegments>
      {points.map((point, index) => (
        <Float key={index} speed={1.2 + (index % 4) * 0.15} rotationIntensity={0.35} floatIntensity={0.45}>
          <mesh position={point}>
            <sphereGeometry args={[index % 5 === 0 ? 0.07 : 0.042, 16, 16]} />
            <meshStandardMaterial
              color={colors[index % colors.length]}
              emissive={colors[index % colors.length]}
              emissiveIntensity={1.35}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const GeometryCloud = ({ variant }) => {
  const colors = palette[variant] || palette.feed;
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.15) * 0.12;
  });

  return (
    <group ref={ref}>
      <Float speed={1.6} rotationIntensity={0.55} floatIntensity={1}>
        <mesh position={[-2.9, 1.4, -1.2]} rotation={[0.5, 0.6, 0.2]}>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial color={colors[0]} emissive={colors[0]} emissiveIntensity={0.45} wireframe transparent opacity={0.55} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[2.7, -1.1, -0.8]} rotation={[0.3, 0.2, 0.7]}>
          <torusKnotGeometry args={[0.32, 0.08, 70, 12]} />
          <meshStandardMaterial color={colors[1]} emissive={colors[1]} emissiveIntensity={0.5} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={1.35} rotationIntensity={0.35} floatIntensity={0.9}>
        <mesh position={[1.8, 1.7, -1.6]}>
          <octahedronGeometry args={[0.36, 0]} />
          <meshStandardMaterial color={colors[2]} emissive={colors[2]} emissiveIntensity={0.55} transparent opacity={0.75} />
        </mesh>
      </Float>
    </group>
  );
};

const CursorReactiveOrbs = ({ variant }) => {
  const colors = palette[variant] || palette.feed;
  const groupRef = useRef(null);
  const { viewport } = useThree();
  const cursor = useRef(new THREE.Vector3(0, 0, 0.35));
  const cursorTarget = useRef(new THREE.Vector3(0, 0, 0.35));

  useEffect(() => {
    const updateCursor = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      cursorTarget.current.set((x * viewport.width) / 2, (y * viewport.height) / 2, 0.35);
    };

    window.addEventListener("pointermove", updateCursor, { passive: true });
    return () => window.removeEventListener("pointermove", updateCursor);
  }, [viewport.height, viewport.width]);

  const orbs = useMemo(() => {
    return Array.from({ length: 28 }, (_, index) => {
      const column = index % 7;
      const row = Math.floor(index / 7);
      const x = (column - 3) * 1.08 + Math.sin(index * 1.7) * 0.2;
      const y = (row - 1.8) * 0.78 + Math.cos(index * 1.13) * 0.22;
      const z = -0.35 - (index % 7) * 0.18;
      const home = new THREE.Vector3(x, y, z);
      return {
        home,
        position: home.clone(),
        velocity: new THREE.Vector3(),
        size: 0.052 + (index % 5) * 0.011,
        color: colors[index % colors.length],
        phase: index * 0.57,
      };
    });
  }, [colors]);

  useFrame(({ clock }, delta) => {
    cursor.current.lerp(cursorTarget.current, 0.22);

    if (!groupRef.current) return;

    groupRef.current.children.forEach((mesh, index) => {
      const orb = orbs[index];
      const floatingHome = orb.home.clone();
      floatingHome.x += Math.sin(clock.elapsedTime * 0.42 + orb.phase) * 0.2;
      floatingHome.y += Math.cos(clock.elapsedTime * 0.36 + orb.phase) * 0.16;

      const dx = floatingHome.x - cursor.current.x;
      const dy = floatingHome.y - cursor.current.y;
      const distance2D = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
      const repelRadius = 1.9;
      const targetPosition = floatingHome.clone();
      let interaction = 0;

      if (distance2D < repelRadius) {
        interaction = 1 - distance2D / repelRadius;
        const push = interaction * interaction * 1.45;
        targetPosition.x += (dx / distance2D) * push;
        targetPosition.y += (dy / distance2D) * push;
        targetPosition.z += interaction * 0.38;
      }

      orb.velocity.add(targetPosition.clone().sub(orb.position).multiplyScalar(6.5 * delta));
      orb.velocity.multiplyScalar(0.82);
      orb.position.add(orb.velocity.clone().multiplyScalar(delta * 28));

      mesh.position.copy(orb.position);
      const pulse = 1 + Math.sin(clock.elapsedTime * 1.6 + orb.phase) * 0.1 + interaction * 0.55;
      mesh.scale.setScalar(pulse);
      mesh.material.opacity = 0.26 + interaction * 0.34;
      mesh.material.emissiveIntensity = 0.9 + interaction * 1.6;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, index) => (
        <mesh key={index} position={orb.position}>
          <sphereGeometry args={[orb.size, 24, 24]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={1.15}
            roughness={0.32}
            metalness={0.05}
            transparent
            opacity={0.34}
          />
        </mesh>
      ))}
    </group>
  );
};

const Scene = ({ variant }) => {
  return (
    <>
      <color attach="background" args={["#05050b"]} />
      <ambientLight intensity={0.52} />
      <pointLight position={[4, 4, 4]} intensity={1.45} color="#a855f7" />
      <pointLight position={[-4, -3, 2]} intensity={1.25} color="#22d3ee" />
      <Stars radius={90} depth={35} count={900} factor={3} saturation={0} fade speed={0.45} />
      <CursorReactiveOrbs variant={variant} />
      <Network variant={variant} />
      <GeometryCloud variant={variant} />
    </>
  );
};

const StaticFallback = ({ variant }) => {
  const colors = palette[variant] || palette.feed;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05050b]">
      <div className="ambient-orb left-[5%] top-[12%] h-72 w-72" style={{ background: colors[0] }} />
      <div className="ambient-orb right-[8%] top-[20%] h-80 w-80 [animation-delay:1.5s]" style={{ background: colors[1] }} />
      <div className="ambient-orb bottom-[2%] left-[30%] h-64 w-64 [animation-delay:3s]" style={{ background: colors[2] }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_1px)] [background-size:32px_32px] opacity-20" />
    </div>
  );
};

const SceneBackdrop = ({ variant = "feed" }) => {
  const reduced = useReducedMotion();
  const webglAvailable = useWebGLAvailable();

  if (reduced || !webglAvailable) return <StaticFallback variant={variant} />;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05050b]">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 48 }} dpr={[1, 1.55]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <Scene variant={variant} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.08),transparent_34rem),linear-gradient(to_bottom,rgba(5,5,11,0.2),rgba(5,5,11,0.72)_95%)]" />
    </div>
  );
};

export default SceneBackdrop;
