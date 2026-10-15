import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCw, RefreshCw, Sparkles, MessageSquare, Eye } from 'lucide-react';
import { RobotEmotion } from '../types';

interface Robot3DCanvasProps {
  currentEmotion: RobotEmotion;
  onEmotionChange: (emotion: RobotEmotion) => void;
  onRobotClick: () => void;
}

export const Robot3DCanvas: React.FC<Robot3DCanvasProps> = ({
  currentEmotion,
  onEmotionChange,
  onRobotClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  // References for mutable animation variables to avoid re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const robotGroupRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const leftArmRef = useRef<THREE.Group | null>(null);
  const rightArmRef = useRef<THREE.Group | null>(null);
  const eyeTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const eyeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Rotation & pointer drag state
  const rotationTarget = useRef({ x: 0, y: 0 });
  const rotationCurrent = useRef({ x: 0, y: 0 });
  const pointerState = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    hasDragged: false,
  });

  // Draw procedural eye texture on 2D canvas
  const drawEyeTexture = useCallback((emotion: RobotEmotion) => {
    if (!eyeCanvasRef.current || !eyeTextureRef.current) return;
    const canvas = eyeCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Visor dark background
    ctx.fillStyle = '#05070D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle digital grid scanlines
    ctx.fillStyle = 'rgba(56, 189, 248, 0.05)';
    for (let y = 0; y < canvas.height; y += 8) {
      ctx.fillRect(0, y, canvas.width, 1);
    }

    const eyeGlowColor = '#38BDF8';
    const eyeCoreColor = '#FFFFFF';

    ctx.shadowBlur = 18;
    ctx.shadowColor = eyeGlowColor;

    const leftX = 140;
    const rightX = 372;
    const centerY = 128;

    if (emotion === 'normal') {
      // Sleek focused glowing pill eyes
      [leftX, rightX].forEach((x) => {
        ctx.fillStyle = eyeGlowColor;
        ctx.beginPath();
        ctx.ellipse(x, centerY, 42, 48, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = eyeCoreColor;
        ctx.beginPath();
        ctx.ellipse(x, centerY, 20, 24, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (emotion === 'happy') {
      // Inverted happy curved arcs (^ ^)
      ctx.lineWidth = 14;
      ctx.strokeStyle = eyeGlowColor;
      ctx.lineCap = 'round';

      [leftX, rightX].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, centerY + 18, 44, Math.PI * 1.15, Math.PI * 1.85, false);
        ctx.stroke();

        ctx.lineWidth = 6;
        ctx.strokeStyle = eyeCoreColor;
        ctx.beginPath();
        ctx.arc(x, centerY + 18, 44, Math.PI * 1.25, Math.PI * 1.75, false);
        ctx.stroke();
      });
    } else if (emotion === 'excited') {
      // Starry bright energetic pupils
      [leftX, rightX].forEach((x) => {
        ctx.fillStyle = eyeGlowColor;
        ctx.beginPath();
        ctx.arc(x, centerY, 52, 0, Math.PI * 2);
        ctx.fill();

        // Star cross
        ctx.fillStyle = eyeCoreColor;
        ctx.fillRect(x - 6, centerY - 32, 12, 64);
        ctx.fillRect(x - 32, centerY - 6, 64, 12);
        ctx.beginPath();
        ctx.arc(x, centerY, 14, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (emotion === 'curious') {
      // Left eye raised & wide, right eye tilted inquisitive
      // Left eye
      ctx.fillStyle = eyeGlowColor;
      ctx.beginPath();
      ctx.ellipse(leftX, centerY - 10, 48, 54, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = eyeCoreColor;
      ctx.beginPath();
      ctx.arc(leftX + 4, centerY - 10, 22, 0, Math.PI * 2);
      ctx.fill();

      // Right eye squinting
      ctx.lineWidth = 14;
      ctx.strokeStyle = eyeGlowColor;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(rightX, centerY + 8, 38, Math.PI * 0.15, Math.PI * 0.85, false);
      ctx.stroke();
    } else if (emotion === 'wink') {
      // Left eye winking line (-), right eye wide sparkling
      ctx.lineWidth = 14;
      ctx.strokeStyle = eyeGlowColor;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(leftX - 36, centerY);
      ctx.lineTo(leftX + 36, centerY);
      ctx.stroke();

      // Right eye normal bright
      ctx.fillStyle = eyeGlowColor;
      ctx.beginPath();
      ctx.ellipse(rightX, centerY, 44, 50, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = eyeCoreColor;
      ctx.beginPath();
      ctx.arc(rightX, centerY, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    eyeTextureRef.current.needsUpdate = true;
  }, []);

  // Update eyes when currentEmotion changes
  useEffect(() => {
    drawEyeTexture(currentEmotion);
  }, [currentEmotion, drawEyeTexture]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const isMobile = width < 640;
    const camera = new THREE.PerspectiveCamera(isMobile ? 44 : 38, width / height, 0.1, 100);
    camera.position.set(0, isMobile ? 0.15 : 0.35, isMobile ? 5.7 : 5.2);
    cameraRef.current = camera;

    // 2. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Studio Reflections Environment via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 4. Three-Point Studio Lighting
    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    // Cool rim / back light for silhouette definition
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.8);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    // Soft sky-ground hemisphere fill
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x090a10, 1.2);
    scene.add(hemiLight);

    // Point light beneath for levitation glow
    const thrusterPointLight = new THREE.PointLight(0x06b6d4, 4.0, 3.5);
    thrusterPointLight.position.set(0, -1.0, 0);
    scene.add(thrusterPointLight);

    // 5. Materials definition
    const chassisMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x181c2b,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      envMapIntensity: 1.2,
    });

    const accentSilverMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      envMapIntensity: 1.5,
    });

    const neonCyanMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });

    const darkJointMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b0d14,
      metalness: 0.5,
      roughness: 0.6,
    });

    // 6. Eye Canvas & Visor Texture Setup
    const eyeCanvas = document.createElement('canvas');
    eyeCanvas.width = 512;
    eyeCanvas.height = 256;
    eyeCanvasRef.current = eyeCanvas;

    const eyeTexture = new THREE.CanvasTexture(eyeCanvas);
    eyeTexture.colorSpace = THREE.SRGBColorSpace;
    eyeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    eyeTextureRef.current = eyeTexture;

    drawEyeTexture(currentEmotion);

    const visorMaterial = new THREE.MeshPhysicalMaterial({
      map: eyeTexture,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.25,
      ior: 1.45,
      emissive: 0x050811,
      emissiveIntensity: 0.4,
    });

    // 7. Assemble Procedural Hierarchical 3D Robot
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, 0.1, 0);
    robotGroupRef.current = robotGroup;
    scene.add(robotGroup);

    // --- TORSO / CHASSIS ---
    const torsoGroup = new THREE.Group();
    robotGroup.add(torsoGroup);

    // Main torso body (aerodynamic curved box)
    const torsoGeometry = new THREE.CylinderGeometry(0.55, 0.42, 0.95, 32);
    const torsoMesh = new THREE.Mesh(torsoGeometry, chassisMaterial);
    torsoMesh.castShadow = true;
    torsoMesh.receiveShadow = true;
    torsoGroup.add(torsoMesh);

    // Torso armor plate with bevel
    const chestPlateGeo = new THREE.CylinderGeometry(0.56, 0.44, 0.45, 32, 1, false, 0, Math.PI * 1.1);
    const chestPlateMesh = new THREE.Mesh(chestPlateGeo, accentSilverMaterial);
    chestPlateMesh.rotation.y = Math.PI * 0.45;
    chestPlateMesh.position.y = 0.15;
    torsoGroup.add(chestPlateMesh);

    // Torso Reactor Core (Glowing cyan emitter ring)
    const coreRingGeo = new THREE.TorusGeometry(0.14, 0.035, 16, 32);
    const coreRingMesh = new THREE.Mesh(coreRingGeo, neonCyanMaterial);
    coreRingMesh.position.set(0, 0.12, 0.52);
    torsoGroup.add(coreRingMesh);

    const coreInnerGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const coreInnerMesh = new THREE.Mesh(coreInnerGeo, neonCyanMaterial);
    coreInnerMesh.position.set(0, 0.12, 0.5);
    torsoGroup.add(coreInnerMesh);

    // Waist connector ring
    const waistRingGeo = new THREE.TorusGeometry(0.42, 0.06, 16, 32);
    const waistRingMesh = new THREE.Mesh(waistRingGeo, darkJointMaterial);
    waistRingMesh.rotation.x = Math.PI / 2;
    waistRingMesh.position.y = -0.48;
    torsoGroup.add(waistRingMesh);

    // --- LEVITATION THRUSTER BASE ---
    const thrusterBaseGeo = new THREE.ConeGeometry(0.38, 0.35, 32);
    const thrusterBaseMesh = new THREE.Mesh(thrusterBaseGeo, chassisMaterial);
    thrusterBaseMesh.rotation.x = Math.PI;
    thrusterBaseMesh.position.y = -0.68;
    thrusterBaseMesh.castShadow = true;
    torsoGroup.add(thrusterBaseMesh);

    // Glowing energy ring around thruster
    const thrusterRingGeo = new THREE.TorusGeometry(0.28, 0.03, 16, 32);
    const thrusterRingMesh = new THREE.Mesh(thrusterRingGeo, neonCyanMaterial);
    thrusterRingMesh.rotation.x = Math.PI / 2;
    thrusterRingMesh.position.y = -0.76;
    torsoGroup.add(thrusterRingMesh);

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.82, 0);
    headGroupRef.current = headGroup;
    robotGroup.add(headGroup);

    // Neck joint ball
    const neckGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const neckMesh = new THREE.Mesh(neckGeo, darkJointMaterial);
    neckMesh.position.y = -0.22;
    headGroup.add(neckMesh);

    // Helmet outer shell (modern rounded silhouette)
    const helmetGeo = new THREE.SphereGeometry(0.58, 32, 24);
    helmetGeo.scale(1, 0.92, 1.05);
    const helmetMesh = new THREE.Mesh(helmetGeo, chassisMaterial);
    helmetMesh.castShadow = true;
    headGroup.add(helmetMesh);

    // Visor faceplate (curved front where eyes display)
    const visorGeo = new THREE.SphereGeometry(0.56, 32, 24, 0, Math.PI, 0, Math.PI * 0.65);
    const visorMesh = new THREE.Mesh(visorGeo, visorMaterial);
    visorMesh.rotation.x = -Math.PI * 0.12;
    visorMesh.rotation.y = Math.PI / 2;
    visorMesh.position.set(0, 0.02, 0.06);
    headGroup.add(visorMesh);

    // Ears / Audio Sensors
    [-0.6, 0.6].forEach((x) => {
      const earGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 24);
      const earMesh = new THREE.Mesh(earGeo, accentSilverMaterial);
      earMesh.rotation.z = Math.PI / 2;
      earMesh.position.set(x, 0.05, 0);
      headGroup.add(earMesh);

      const earLightGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.14, 16);
      const earLightMesh = new THREE.Mesh(earLightGeo, neonCyanMaterial);
      earLightMesh.rotation.z = Math.PI / 2;
      earLightMesh.position.set(x * 1.02, 0.05, 0);
      headGroup.add(earLightMesh);
    });

    // Antenna & glowing tip
    const antennaStemGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.35, 12);
    const antennaStemMesh = new THREE.Mesh(antennaStemGeo, accentSilverMaterial);
    antennaStemMesh.position.set(0, 0.65, -0.05);
    headGroup.add(antennaStemMesh);

    const antennaBeaconGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const antennaBeaconMesh = new THREE.Mesh(antennaBeaconGeo, neonCyanMaterial);
    antennaBeaconMesh.position.set(0, 0.84, -0.05);
    headGroup.add(antennaBeaconMesh);

    // --- ARMS (Articulated Left & Right) ---
    const buildArm = (isLeft: boolean) => {
      const armGroup = new THREE.Group();
      const side = isLeft ? -1 : 1;
      armGroup.position.set(side * 0.72, 0.28, 0);

      // Shoulder ball
      const shoulderGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const shoulderMesh = new THREE.Mesh(shoulderGeo, accentSilverMaterial);
      armGroup.add(shoulderMesh);

      // Upper arm
      const upperArmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.42, 16);
      const upperArmMesh = new THREE.Mesh(upperArmGeo, chassisMaterial);
      upperArmMesh.position.set(side * 0.06, -0.25, 0);
      upperArmMesh.rotation.z = side * -0.15;
      armGroup.add(upperArmMesh);

      // Forearm & hand group
      const forearmGroup = new THREE.Group();
      forearmGroup.position.set(side * 0.1, -0.46, 0);
      armGroup.add(forearmGroup);

      const elbowGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const elbowMesh = new THREE.Mesh(elbowGeo, darkJointMaterial);
      forearmGroup.add(elbowMesh);

      const forearmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.38, 16);
      const forearmMesh = new THREE.Mesh(forearmGeo, chassisMaterial);
      forearmMesh.position.set(0, -0.2, 0.05);
      forearmMesh.rotation.x = 0.25;
      forearmGroup.add(forearmMesh);

      // Magnetic hand palm
      const handGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const handMesh = new THREE.Mesh(handGeo, accentSilverMaterial);
      handMesh.position.set(0, -0.42, 0.12);
      forearmGroup.add(handMesh);

      // Fingertip magnetic nodes
      const fingerGeo = new THREE.CapsuleGeometry(0.025, 0.08, 8, 8);
      const finger1 = new THREE.Mesh(fingerGeo, neonCyanMaterial);
      finger1.position.set(side * 0.04, -0.48, 0.15);
      forearmGroup.add(finger1);

      const finger2 = new THREE.Mesh(fingerGeo, neonCyanMaterial);
      finger2.position.set(-side * 0.04, -0.48, 0.15);
      forearmGroup.add(finger2);

      return armGroup;
    };

    const leftArm = buildArm(true);
    const rightArm = buildArm(false);
    leftArmRef.current = leftArm;
    rightArmRef.current = rightArm;
    robotGroup.add(leftArm);
    robotGroup.add(rightArm);

    // 8. Ground Contact Shadow Disc
    // Radial soft grounded shadow to prevent floating in empty void
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      gradient.addColorStop(0.4, 'rgba(6, 182, 212, 0.18)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;

    const shadowPlaneGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.45;
    scene.add(shadowPlane);

    // 9. Pointer drag interaction handlers for 360° rotation
    const dom = renderer.domElement;

    const handlePointerDown = (e: PointerEvent) => {
      pointerState.current.isDown = true;
      pointerState.current.startX = e.clientX;
      pointerState.current.startY = e.clientY;
      pointerState.current.hasDragged = false;
      setIsInteracting(true);
      dom.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!pointerState.current.isDown) return;
      const deltaX = e.clientX - pointerState.current.startX;
      const deltaY = e.clientY - pointerState.current.startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        pointerState.current.hasDragged = true;
      }

      rotationTarget.current.y += deltaX * 0.009;
      rotationTarget.current.x += deltaY * 0.005;

      // Clamp vertical pitch tilt to avoid camera disorientation
      rotationTarget.current.x = Math.max(-0.4, Math.min(0.5, rotationTarget.current.x));

      pointerState.current.startX = e.clientX;
      pointerState.current.startY = e.clientY;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (pointerState.current.isDown && !pointerState.current.hasDragged) {
        // Simple tap / click without drag triggers robot interaction!
        onRobotClick();
      }
      pointerState.current.isDown = false;
      setIsInteracting(false);
      try {
        dom.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture was lost
      }
    };

    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('pointermove', handlePointerMove);
    dom.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('pointercancel', handlePointerUp);

    // 10. Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const isMob = w < 640;
      cameraRef.current.fov = isMob ? 44 : 38;
      cameraRef.current.position.set(0, isMob ? 0.15 : 0.35, isMob ? 5.7 : 5.2);
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 11. Animation Loop with frame-rate independent smooth damping
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Auto-rotation when not manually dragging
      if (autoRotate && !pointerState.current.isDown) {
        rotationTarget.current.y += delta * 0.45;
      }

      // Smooth damping interpolation for silky 60fps rotation
      rotationCurrent.current.x = THREE.MathUtils.damp(
        rotationCurrent.current.x,
        rotationTarget.current.x,
        10,
        delta
      );
      rotationCurrent.current.y = THREE.MathUtils.damp(
        rotationCurrent.current.y,
        rotationTarget.current.y,
        10,
        delta
      );

      if (robotGroupRef.current) {
        robotGroupRef.current.rotation.y = rotationCurrent.current.y;
        robotGroupRef.current.rotation.x = rotationCurrent.current.x;

        // Smooth levitation bobbing & breathing
        const hoverOffset = Math.sin(elapsed * 2.2) * 0.08;
        robotGroupRef.current.position.y = 0.12 + hoverOffset;

        // Shadow scale breathes subtly with levitation
        const shadowScale = 1 - hoverOffset * 0.4;
        shadowPlane.scale.set(shadowScale, shadowScale, 1);
      }

      // Idle articulated arm breathing
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(elapsed * 1.8) * 0.06;
        rightArmRef.current.rotation.x = -Math.sin(elapsed * 1.8) * 0.06;
      }

      // Subtle inquisitive head tilt
      if (headGroupRef.current) {
        headGroupRef.current.rotation.z = Math.sin(elapsed * 1.2) * 0.04;
      }

      // Thruster pulse intensity
      thrusterPointLight.intensity = 3.6 + Math.sin(elapsed * 6) * 0.8;

      renderer.render(scene, camera);
    };

    // Pre-warm shaders
    renderer.compile(scene, camera);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('pointermove', handlePointerMove);
      dom.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('pointercancel', handlePointerUp);

      renderer.dispose();
      envTexture.dispose();
      scene.clear();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [drawEyeTexture, onRobotClick, autoRotate, currentEmotion]);

  const resetAngle = () => {
    rotationTarget.current = { x: 0, y: 0 };
  };

  const emotions: { key: RobotEmotion; label: string }[] = [
    { key: 'normal', label: 'Fokus' },
    { key: 'happy', label: 'Senang' },
    { key: 'excited', label: 'Antusias' },
    { key: 'curious', label: 'Ingin Tahu' },
    { key: 'wink', label: 'Kedip' },
  ];

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] min-h-[350px] flex flex-col items-center select-none overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0e121d]/80 via-[#090b12]/90 to-[#07080c]">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full flex-1 cursor-grab active:cursor-grabbing touch-none"
        title="Klik dan seret untuk memutar 360° | Klik robot untuk interaksi"
      />

      {/* Top Floating Helper Badge */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none text-xs text-slate-400">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-black/50 border border-white/10 backdrop-blur-md">
          <Eye className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="font-medium text-slate-200 text-[11px] sm:text-xs">StarBot 3D</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 text-[11px] sm:text-xs">Putar 360° Drag</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] text-slate-300">
          <span>{isInteracting ? 'Memutar...' : 'Bisa Diajak Interaksi'}</span>
        </div>
      </div>

      {/* Sleek Collapsible Bottom Dock (Zero Viewport Occlusion Discipline) */}
      <div className="w-full px-3 pb-3 pt-1 z-10">
        <div className="max-w-xl mx-auto p-1.5 sm:p-2 rounded-xl bg-[#0d101a]/95 border border-white/[0.1] shadow-2xl backdrop-blur-md flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Emotion Switcher */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar scroll-smooth">
            {emotions.map((item) => (
              <button
                key={item.key}
                onClick={() => onEmotionChange(item.key)}
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  currentEmotion === item.key
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={() => setAutoRotate((prev) => !prev)}
              className={`p-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1 ${
                autoRotate
                  ? 'border-sky-500/40 bg-sky-500/10 text-sky-300'
                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
              }`}
              title={autoRotate ? 'Matikan Auto-Rotate' : 'Nyalakan Auto-Rotate 360°'}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span className="text-[10px] sm:text-[11px] hidden sm:inline">360°</span>
            </button>

            <button
              onClick={resetAngle}
              className="p-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="Reset Sudut Pandang"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onRobotClick}
              className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-[11px] sm:text-xs transition-colors flex items-center gap-1 shadow-md shadow-sky-500/20 whitespace-nowrap"
              title="Ajak StarBot Berbicara"
            >
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Bicara</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
