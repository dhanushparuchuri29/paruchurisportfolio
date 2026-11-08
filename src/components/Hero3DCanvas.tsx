import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as per Three.js guidelines
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090b, 0.04);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.2);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xb58cff, 3.5);
    rimLight.position.set(-6, -2, -2);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0x7050ff, 0x08090b, 1.0);
    scene.add(hemiLight);

    // --- Procedural 3D Composite Cinema Camera & Reel Rig ---
    const cinemaRig = new THREE.Group();

    // 1. Main Camera Body
    const bodyGeo = new THREE.BoxGeometry(1.6, 1.1, 1.8);
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1a1c23,
      metalness: 0.85,
      roughness: 0.28,
    });
    const camBody = new THREE.Mesh(bodyGeo, darkMetalMat);
    cinemaRig.add(camBody);

    // 2. Optical Lens Cylinder Assembly
    const lensBarrelGeo = new THREE.CylinderGeometry(0.55, 0.6, 1.0, 32);
    lensBarrelGeo.rotateX(Math.PI / 2);
    const lensBarrel = new THREE.Mesh(lensBarrelGeo, new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.9,
      roughness: 0.2
    }));
    lensBarrel.position.set(0, 0, 1.25);
    cinemaRig.add(lensBarrel);

    // Lens Accent Ring (Anodized Purple)
    const ringGeo = new THREE.TorusGeometry(0.56, 0.03, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xb58cff,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x5a2d9c,
      emissiveIntensity: 0.3
    });
    const lensRing = new THREE.Mesh(ringGeo, ringMat);
    lensRing.position.set(0, 0, 1.5);
    cinemaRig.add(lensRing);

    // Lens Front Glass
    const glassGeo = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.3);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x223355,
      metalness: 0.1,
      roughness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.4 : 0.9,
      reflectivity: 0.9
    });
    const frontGlass = new THREE.Mesh(glassGeo, glassMat);
    frontGlass.position.set(0, 0, 1.7);
    cinemaRig.add(frontGlass);

    // 3. Dual Film Spools / Top Magazine
    const spoolGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.22, 28);
    spoolGeo.rotateZ(Math.PI / 2);
    const spoolMat = new THREE.MeshStandardMaterial({
      color: 0x282b35,
      metalness: 0.7,
      roughness: 0.35
    });

    const spoolLeft = new THREE.Mesh(spoolGeo, spoolMat);
    spoolLeft.position.set(-0.55, 1.05, -0.1);
    cinemaRig.add(spoolLeft);

    const spoolRight = new THREE.Mesh(spoolGeo, spoolMat);
    spoolRight.position.set(0.55, 1.05, -0.1);
    cinemaRig.add(spoolRight);

    // Film Strip Ribbon passing between spools
    const filmRibbonGeo = new THREE.BoxGeometry(1.2, 0.02, 0.18);
    const filmRibbonMat = new THREE.MeshStandardMaterial({
      color: 0x050507,
      metalness: 0.3,
      roughness: 0.6
    });
    const filmRibbon = new THREE.Mesh(filmRibbonGeo, filmRibbonMat);
    filmRibbon.position.set(0, 1.58, -0.1);
    cinemaRig.add(filmRibbon);

    // Position rig slightly right and angled for cinematic hero composition
    cinemaRig.position.set(1.4, 0.1, 0);
    cinemaRig.rotation.set(0.18, -0.45, 0.08);
    scene.add(cinemaRig);

    // --- Floating Curving Film Strips & Timeline Markers ---
    const filmStripGroup = new THREE.Group();
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.5, -2.0, -1.0),
      new THREE.Vector3(-1.5, -0.5, 1.0),
      new THREE.Vector3(1.2, 0.8, -0.5),
      new THREE.Vector3(3.2, 2.2, -2.0)
    ]);
    const stripTubeGeo = new THREE.TubeGeometry(curve, 48, 0.08, 8, false);
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0xb58cff,
      emissive: 0x7733cc,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2
    });
    const stripMesh = new THREE.Mesh(stripTubeGeo, stripMat);
    filmStripGroup.add(stripMesh);
    scene.add(filmStripGroup);

    // --- Floating Particles (Dust & Sparks) ---
    const particleCount = isSoftwareGl ? 80 : 320;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = Math.random() * 0.04 + 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xb58cff,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Tracking Coordinates
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth camera rig interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      cinemaRig.rotation.y = -0.45 + currentMouseX * 0.35 + Math.sin(elapsed * 0.8) * 0.05;
      cinemaRig.rotation.x = 0.18 - currentMouseY * 0.25 + Math.cos(elapsed * 0.7) * 0.04;
      cinemaRig.position.y = 0.1 + Math.sin(elapsed * 1.2) * 0.12;

      // Floating film strip sway
      filmStripGroup.rotation.z = Math.sin(elapsed * 0.4) * 0.08;
      filmStripGroup.position.y = Math.cos(elapsed * 0.6) * 0.08;

      // Particles gentle drift
      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = elapsed * 0.015;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;

      // Adjust camera distance for mobile
      if (width < 768) {
        camera.position.z = 9.0;
        cinemaRig.position.set(0, -0.6, 0);
      } else {
        camera.position.z = 7.5;
        cinemaRig.position.set(1.4, 0.1, 0);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
