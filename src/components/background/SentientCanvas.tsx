import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SentientCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 1. Ambient 3D Low-Poly Wireframe Geometry ---
    const geometry = new THREE.IcosahedronGeometry(8.5, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const icosahedron = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(icosahedron);

    // Inner subtle core torus
    const torusGeo = new THREE.TorusGeometry(5, 0.4, 16, 64);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    scene.add(torus);

    // --- 2. Sentient Particle Field ---
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 55;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 20;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(125, 211, 252, 0.7)');
      grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.75,
      map: texture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Mouse Tracking Event
    const handleMouseMove = (e: MouseEvent) => {
      // Map screen coords to Three.js normalized world coordinate range
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosition.current.targetX = normX * 24;
      mousePosition.current.targetY = normY * 16;
      mousePosition.current.active = true;
    };

    const handleMouseLeave = () => {
      mousePosition.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Resize Event
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow 3D Mesh Rotation
      icosahedron.rotation.x = elapsedTime * 0.06;
      icosahedron.rotation.y = elapsedTime * 0.09;

      torus.rotation.x = Math.PI / 3 + elapsedTime * 0.04;
      torus.rotation.y = elapsedTime * 0.07;

      // Mouse position smoothing (lerp)
      mousePosition.current.x += (mousePosition.current.targetX - mousePosition.current.x) * 0.05;
      mousePosition.current.y += (mousePosition.current.targetY - mousePosition.current.y) * 0.05;

      // Subtle parallax camera tilt
      camera.position.x = mousePosition.current.x * 0.08;
      camera.position.y = mousePosition.current.y * 0.08;
      camera.lookAt(0, 0, 0);

      // Sentient Particle Physics
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      const mX = mousePosition.current.x;
      const mY = mousePosition.current.y;
      const isMouseActive = mousePosition.current.active;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Base gentle organic drift
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Bounds bounce back
        if (Math.abs(posArray[i3]) > 28) velocities[i3] *= -1;
        if (Math.abs(posArray[i3 + 1]) > 22) velocities[i3 + 1] *= -1;
        if (Math.abs(posArray[i3 + 2]) > 12) velocities[i3 + 2] *= -1;

        // Sentient Mouse Interaction (Gentle Attraction + Swarm)
        if (isMouseActive) {
          const dx = mX - posArray[i3];
          const dy = mY - posArray[i3 + 1];
          const distSq = dx * dx + dy * dy;

          if (distSq < 140 && distSq > 0.5) {
            const force = (1 - distSq / 140) * 0.015;
            posArray[i3] += dx * force;
            posArray[i3 + 1] += dy * force;
          }
        }
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      geometry.dispose();
      wireframeMaterial.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      texture.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Three.js canvas container */}
      <div ref={containerRef} className="absolute inset-0 opacity-80" />

      {/* Ambient gradient lighting layers */}
      <div className="absolute top-[-15%] left-[20%] w-[650px] h-[650px] rounded-full bg-indigo-900/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sky-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-emerald-950/15 blur-[160px] pointer-events-none" />

      {/* Subtle scanline texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
