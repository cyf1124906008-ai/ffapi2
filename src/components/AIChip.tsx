import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  uniform float uTime;
  uniform float uProgress;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    // 性能优化：使用正弦波叠加代替复杂的 Simplex Noise
    float pulse = sin(position.x * 2.0 + uTime) * cos(position.y * 2.0 + uTime * 0.5);
    vec3 pos = position + normal * pulse * 0.05 * (1.0 - uProgress);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vPosition = pos;
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  uniform float uTime;
  uniform float uProgress;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // 1. 苹果风格极简基底
    vec3 glassColor = vec3(0.04, 0.04, 0.06);
    
    // 2. 神经脉络 (简化版)
    float synapse = sin(vPosition.x * 5.0 + uTime) * sin(vPosition.y * 5.0 + uTime);
    synapse = smoothstep(0.95, 1.0, synapse);
    vec3 synapseColor = vec3(0.0, 0.7, 1.0) * synapse * (1.0 - uProgress) * 0.2;

    // 3. 菲涅尔反射
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
    vec3 reflection = vec3(1.0) * fresnel * 0.3;

    // 4. 内部结构感
    float grid = step(0.99, sin(vUv.x * 60.0) * sin(vUv.y * 60.0));
    vec3 gridColor = vec3(1.0) * grid * 0.03 * (1.0 - uProgress);
    
    vec3 finalColor = mix(glassColor + reflection + synapseColor + gridColor, glassColor + reflection * 0.1, uProgress);
    
    // 5. 锐利高光
    vec3 lightDir = normalize(vec3(5.0, 5.0, 10.0));
    float spec = pow(max(dot(normal, normalize(lightDir + viewDir)), 0.0), 128.0);
    finalColor += vec3(1.0) * spec * 0.4;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function AIChip({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 }
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    uniforms.uTime.value = time;
    uniforms.uProgress.value = progress;
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.08 + progress * Math.PI;
      meshRef.current.rotation.z = time * 0.03;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.03);
    }
  });

  return (
    <group scale={2.4}>
      {/* 外层几何壳 - 降低细分度以提升性能 */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
      
      {/* 内层核心 - 降低分段数 */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.1 * (1.0 - progress)} />
      </mesh>
    </group>
  );
}
