import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls, RoundedBox, Sparkles } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

export type SceneMood = 'day' | 'night';
export type SceneView = 'overview' | 'pool' | 'suites';

type HotelSceneProps = {
  mood: SceneMood;
  view: SceneView;
  reducedMotion: boolean;
};

const views: Record<SceneView, { position: [number, number, number]; target: [number, number, number] }> = {
  overview: { position: [15, 8, 19], target: [1.8, 1.1, 0] },
  pool: { position: [11, 4.5, 11], target: [2.5, 0.8, 2.6] },
  suites: { position: [-10, 5.8, 12], target: [0.5, 2.1, -0.2] },
};

const waterVertex = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vUv = uv;
    vec3 p = position;
    float wave = sin((p.x + uTime * 0.45) * 3.2) * 0.025;
    wave += cos((p.y - uTime * 0.32) * 4.0) * 0.018;
    p.z += wave;
    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const waterFragment = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    float lines = sin((vUv.x * 16.0 + vUv.y * 12.0) + uTime * 0.7) * 0.04;
    float edge = pow(1.0 - distance(vUv, vec2(0.5)), 2.0);
    vec3 color = mix(uColorA, uColorB, vUv.y + vWave * 4.0 + lines + edge * 0.08);
    gl_FragColor = vec4(color, 0.91);
  }
`;

function Water({ night = false, ocean = false, reducedMotion }: { night?: boolean; ocean?: boolean; reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color(ocean ? (night ? '#102d30' : '#3f817e') : '#4b9e9b') },
    uColorB: { value: new THREE.Color(ocean ? (night ? '#1a3d3d' : '#81b4a7') : '#a7ddd1') },
  });

  useEffect(() => {
    uniforms.current.uColorA.value.set(ocean ? (night ? '#102d30' : '#3f817e') : '#4b9e9b');
    uniforms.current.uColorB.value.set(ocean ? (night ? '#1a3d3d' : '#81b4a7') : '#a7ddd1');
  }, [night, ocean]);

  useFrame((_, delta) => {
    if (material.current && !reducedMotion) material.current.uniforms.uTime.value += delta;
  });

  return (
    <shaderMaterial
      ref={material}
      vertexShader={waterVertex}
      fragmentShader={waterFragment}
      uniforms={uniforms.current}
      transparent
      side={THREE.DoubleSide}
    />
  );
}

function Palm({ position, scale = 1, rotation = 0 }: { position: [number, number, number]; scale?: number; rotation?: number }) {
  return (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      <mesh castShadow position={[0, 1.4, 0]} rotation={[0.04, 0, -0.08]}>
        <cylinderGeometry args={[0.1, 0.19, 2.8, 7]} />
        <meshStandardMaterial color="#6f5940" roughness={1} />
      </mesh>
      <group position={[-0.11, 2.82, 0]}>
        {Array.from({ length: 7 }).map((_, index) => {
          const angle = (index / 7) * Math.PI * 2;
          return (
            <group key={index} rotation={[0, angle, index % 2 ? -0.2 : 0.12]}>
              <mesh castShadow position={[0, 0.03, 0.86]} rotation={[-0.2, 0, 0]} scale={[0.25, 0.075, 1]}>
                <sphereGeometry args={[1, 8, 5]} />
                <meshStandardMaterial color={index % 3 === 0 ? '#577a48' : '#3e693f'} roughness={0.95} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

function Shrub({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {[[0, 0.35, 0], [0.35, 0.25, 0.12], [-0.3, 0.22, 0.14], [0.06, 0.25, -0.3]].map((p, i) => (
        <mesh key={i} castShadow position={p as [number, number, number]}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial color={i % 2 ? '#466643' : '#5e7950'} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Lounger({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow position={[0, 0.12, 0]}>
        <boxGeometry args={[0.72, 0.1, 1.8]} />
        <meshStandardMaterial color="#d9c9ac" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.5, -0.72]} rotation={[-0.55, 0, 0]}>
        <boxGeometry args={[0.72, 0.09, 0.85]} />
        <meshStandardMaterial color="#d9c9ac" roughness={0.9} />
      </mesh>
      {[-0.27, 0.27].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.045, 0.28, 1.4]} />
          <meshStandardMaterial color="#655d4c" />
        </mesh>
      ))}
    </group>
  );
}

function Architecture({ night, reducedMotion }: { night: boolean; reducedMotion: boolean }) {
  const concrete = '#c5bca9';
  const darkConcrete = '#a79e8d';
  const glass = night ? '#e9ba72' : '#779b96';
  return (
    <group>
      <RoundedBox args={[11.2, 0.45, 6.2]} radius={0.12} smoothness={3} position={[0, 0.35, -0.1]} receiveShadow castShadow>
        <meshStandardMaterial color="#b8ae9b" roughness={0.92} />
      </RoundedBox>

      <RoundedBox args={[5.4, 2.45, 3.7]} radius={0.08} smoothness={3} position={[-2.6, 1.75, -0.3]} castShadow receiveShadow>
        <meshStandardMaterial color={concrete} roughness={0.88} />
      </RoundedBox>
      <mesh position={[-2.55, 1.68, 1.575]}>
        <boxGeometry args={[4.4, 1.58, 0.06]} />
        <meshStandardMaterial color={glass} metalness={0.25} roughness={0.2} emissive="#e6a55d" emissiveIntensity={night ? 1.35 : 0.03} />
      </mesh>
      {[-4.25, -3.55, -2.85, -2.15, -1.45, -0.75].map((x) => (
        <mesh key={x} castShadow position={[x, 1.72, 1.68]}>
          <boxGeometry args={[0.055, 1.92, 0.12]} />
          <meshStandardMaterial color="#76634a" roughness={0.85} />
        </mesh>
      ))}
      <mesh castShadow position={[-2.6, 3.06, -0.3]}>
        <boxGeometry args={[5.9, 0.18, 4.05]} />
        <meshStandardMaterial color="#d2c9b8" roughness={0.9} />
      </mesh>

      <RoundedBox args={[4.2, 1.85, 3.25]} radius={0.08} smoothness={3} position={[3.25, 1.4, 0.15]} castShadow receiveShadow>
        <meshStandardMaterial color={darkConcrete} roughness={0.92} />
      </RoundedBox>
      <mesh position={[3.2, 1.4, 1.8]}>
        <boxGeometry args={[3.3, 1.12, 0.06]} />
        <meshStandardMaterial color={glass} metalness={0.25} roughness={0.2} emissive="#e6a55d" emissiveIntensity={night ? 1.35 : 0.03} />
      </mesh>
      {[1.85, 2.5, 3.15, 3.8, 4.45].map((x) => (
        <mesh key={x} position={[x, 1.4, 1.87]}>
          <boxGeometry args={[0.06, 1.48, 0.12]} />
          <meshStandardMaterial color="#76634a" />
        </mesh>
      ))}
      <mesh castShadow position={[3.2, 2.42, 0.12]}>
        <boxGeometry args={[4.75, 0.18, 3.7]} />
        <meshStandardMaterial color="#c8bfad" roughness={0.9} />
      </mesh>

      <RoundedBox args={[6.15, 1.85, 3.2]} radius={0.08} smoothness={3} position={[-0.9, 4.02, -0.58]} castShadow receiveShadow>
        <meshStandardMaterial color="#cfc6b5" roughness={0.86} />
      </RoundedBox>
      <mesh position={[-0.85, 3.96, 1.055]}>
        <boxGeometry args={[5.22, 1.12, 0.07]} />
        <meshStandardMaterial color={glass} metalness={0.28} roughness={0.18} emissive="#efb66b" emissiveIntensity={night ? 1.6 : 0.03} />
      </mesh>
      {[-3.05, -2.25, -1.45, -0.65, 0.15, 0.95].map((x) => (
        <mesh key={x} position={[x, 3.98, 1.14]}>
          <boxGeometry args={[0.06, 1.5, 0.12]} />
          <meshStandardMaterial color="#76634a" />
        </mesh>
      ))}
      <mesh castShadow position={[-0.9, 5.03, -0.58]}>
        <boxGeometry args={[6.75, 0.2, 3.65]} />
        <meshStandardMaterial color="#ded5c3" roughness={0.9} />
      </mesh>

      <mesh castShadow position={[-4.9, 2.02, 2.05]}>
        <boxGeometry args={[0.16, 3.1, 0.16]} />
        <meshStandardMaterial color="#9d9280" />
      </mesh>
      <mesh castShadow position={[-4.9, 3.55, 0.7]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.18, 0.15, 3]} />
        <meshStandardMaterial color="#9d9280" />
      </mesh>

      <RoundedBox args={[7.25, 0.36, 3.35]} radius={0.12} smoothness={3} position={[2.25, 0.3, 4.05]} receiveShadow>
        <meshStandardMaterial color="#d8cdb8" roughness={0.82} />
      </RoundedBox>
      <mesh position={[2.25, 0.505, 4.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.8, 2.9, 48, 24]} />
        <Water night={night} reducedMotion={reducedMotion} />
      </mesh>
      <Lounger position={[-2.1, 0.58, 3.45]} rotation={-0.08} />
      <Lounger position={[-2.05, 0.58, 5.25]} rotation={0.06} />

      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} receiveShadow position={[-5.5 + i * 0.65, 0.23 - i * 0.055, 3.8 + i * 0.48]}>
          <boxGeometry args={[1.8, 0.18, 0.58]} />
          <meshStandardMaterial color="#b9ac94" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function HotelModel({ night, reducedMotion }: { night: boolean; reducedMotion: boolean }) {
  return (
    <group position={[1.8, -0.9, 0]} scale={0.9}>
      <mesh receiveShadow position={[0, -0.22, 0]}>
        <cylinderGeometry args={[10.6, 11.2, 0.65, 64]} />
        <meshStandardMaterial color={night ? '#4b5142' : '#a99f82'} roughness={1} />
      </mesh>
      <mesh position={[0, -0.59, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[180, 180, 90, 90]} />
        <Water night={night} ocean reducedMotion={reducedMotion} />
      </mesh>
      <Architecture night={night} reducedMotion={reducedMotion} />
      <Palm position={[-7.2, 0.1, -1.8]} scale={1.45} rotation={0.3} />
      <Palm position={[7.4, 0.08, -2.3]} scale={1.25} rotation={-0.8} />
      <Palm position={[7.5, 0.1, 4.2]} scale={1.05} rotation={1.1} />
      <Palm position={[-6.8, 0.1, 5.4]} scale={0.95} rotation={-0.3} />
      <Palm position={[1.2, 0.1, -4.6]} scale={1.2} rotation={0.7} />
      <Shrub position={[-5.6, 0.1, -3.2]} scale={1.3} />
      <Shrub position={[5.6, 0.1, -3.7]} scale={1.1} />
      <Shrub position={[-7.4, 0.1, 2.6]} />
      <Shrub position={[6.4, 0.1, 5.4]} scale={0.8} />
      <Shrub position={[-1.2, 0.1, -4.7]} scale={0.9} />
    </group>
  );
}

function Lighting({ night }: { night: boolean }) {
  const sun = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  useFrame((_, delta) => {
    const speed = Math.min(1, delta * 2.2);
    if (sun.current) {
      sun.current.intensity = THREE.MathUtils.lerp(sun.current.intensity, night ? 0.45 : 3.1, speed);
      sun.current.color.lerp(new THREE.Color(night ? '#8099c9' : '#ffe0ad'), speed);
    }
    if (ambient.current) ambient.current.intensity = THREE.MathUtils.lerp(ambient.current.intensity, night ? 0.35 : 1.25, speed);
  });
  return (
    <>
      <ambientLight ref={ambient} intensity={night ? 0.35 : 1.25} color={night ? '#607998' : '#d5e1d2'} />
      <directionalLight
        ref={sun}
        position={[-8, 14, 9]}
        intensity={night ? 0.45 : 3.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-bias={-0.0003}
      />
      {night && (
        <>
          <pointLight position={[0, 4, 3]} intensity={55} distance={16} color="#ffc079" />
          <pointLight position={[5, 2, 4]} intensity={30} distance={10} color="#ffd198" />
          <Sparkles count={75} scale={[34, 16, 34]} position={[0, 9, 0]} size={1.2} speed={0.12} opacity={0.7} color="#fff5d6" />
        </>
      )}
    </>
  );
}

function CameraRig({ view, controls }: { view: SceneView; controls: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera, size } = useThree();
  const moving = useRef(true);
  const destination = useRef(new THREE.Vector3(...views.overview.position));
  const target = useRef(new THREE.Vector3(...views.overview.target));

  useEffect(() => {
    destination.current.set(...views[view].position);
    target.current.set(...views[view].target);
    moving.current = true;
  }, [view]);

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = size.width < 640 ? 62 : size.width < 1024 ? 46 : 35;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width]);

  useFrame((_, delta) => {
    if (!moving.current || !controls.current) return;
    const factor = 1 - Math.exp(-delta * 3.2);
    camera.position.lerp(destination.current, factor);
    controls.current.target.lerp(target.current, factor);
    controls.current.update();
    if (camera.position.distanceTo(destination.current) < 0.025) moving.current = false;
  });
  return null;
}

function Scene({ mood, view, reducedMotion }: HotelSceneProps) {
  const controls = useRef<OrbitControlsImpl>(null);
  const night = mood === 'night';
  useEffect(() => {
    const element = controls.current?.domElement;
    if (element) element.style.touchAction = 'pan-y';
  }, []);
  return (
    <>
      <color attach="background" args={[night ? '#142623' : '#aebfb2']} />
      <fog attach="fog" args={[night ? '#142623' : '#aebfb2', 28, 70]} />
      <Lighting night={night} />
      <HotelModel night={night} reducedMotion={reducedMotion} />
      <ContactShadows position={[1.8, -0.77, 0]} opacity={night ? 0.25 : 0.5} scale={28} blur={2.6} far={12} color="#1d2a21" />
      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.55}
        maxPolarAngle={1.42}
        minAzimuthAngle={-1.25}
        maxAzimuthAngle={1.25}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.28}
        dampingFactor={0.06}
        enableDamping
      />
      <CameraRig view={view} controls={controls} />
    </>
  );
}

export default function HotelScene(props: HotelSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: views.overview.position, fov: 35, near: 0.1, far: 160 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}
