import React, { useEffect, useRef } from 'react';

interface PulsePacket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
  horizontal: boolean;
  length: number;
}

export const ArchitecturalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Handle Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Zero-Trust Telemetry Pulses (simulating encrypted data bus lines)
    const gridSize = 64;
    const subGridSize = 32;
    const packets: PulsePacket[] = [];
    const packetColors = ['#818cf8', '#38bdf8', '#34d399', '#a78bfa'];

    const spawnPacket = () => {
      if (packets.length >= 14) return;
      const horizontal = Math.random() > 0.5;
      const speed = 0.003 + Math.random() * 0.005;
      const color = packetColors[Math.floor(Math.random() * packetColors.length)];
      const length = 20 + Math.random() * 40;

      if (horizontal) {
        const gridY = Math.floor((Math.random() * height) / gridSize) * gridSize;
        const forward = Math.random() > 0.5;
        const startX = forward ? -length : width + length;
        const targetX = forward ? width + length : -length;
        packets.push({
          x: startX,
          y: gridY,
          targetX,
          targetY: gridY,
          progress: 0,
          speed,
          color,
          horizontal: true,
          length,
        });
      } else {
        const gridX = Math.floor((Math.random() * width) / gridSize) * gridSize;
        const forward = Math.random() > 0.5;
        const startY = forward ? -length : height + length;
        const targetY = forward ? height + length : -length;
        packets.push({
          x: gridX,
          y: startY,
          targetX: gridX,
          targetY,
          progress: 0,
          speed,
          color,
          horizontal: false,
          length,
        });
      }
    };

    // Initialize initial packets
    for (let i = 0; i < 8; i++) {
      spawnPacket();
    }

    const render = () => {
      // Mouse lerp smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Base Subtle Blueprint Sub-Grid (Passive)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.beginPath();
      for (let x = 0; x < width; x += subGridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += subGridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Primary Architectural Grid (with Intersection Crosshairs)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Grid Intersection Crosshairs (+)
      const crossSize = 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
      ctx.beginPath();
      for (let x = gridSize; x < width; x += gridSize * 2) {
        for (let y = gridSize; y < height; y += gridSize * 2) {
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
        }
      }
      ctx.stroke();

      // 4. Interactive Mouse-Following Spotlight (Luminescent Architectural Reveal)
      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;
      if (mX > -500 && mY > -500) {
        const spotRadius = 260;
        const spotGrad = ctx.createRadialGradient(mX, mY, 0, mX, mY, spotRadius);
        spotGrad.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
        spotGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.03)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mX, mY, spotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Highlight nearby grid lines under cursor
        ctx.save();
        ctx.beginPath();
        ctx.arc(mX, mY, spotRadius, 0, Math.PI * 2);
        ctx.clip();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        const startGX = Math.floor((mX - spotRadius) / gridSize) * gridSize;
        const endGX = Math.ceil((mX + spotRadius) / gridSize) * gridSize;
        for (let x = startGX; x <= endGX; x += gridSize) {
          ctx.moveTo(x, mY - spotRadius);
          ctx.lineTo(x, mY + spotRadius);
        }
        const startGY = Math.floor((mY - spotRadius) / gridSize) * gridSize;
        const endGY = Math.ceil((mY + spotRadius) / gridSize) * gridSize;
        for (let y = startGY; y <= endGY; y += gridSize) {
          ctx.moveTo(mX - spotRadius, y);
          ctx.lineTo(mX + spotRadius, y);
        }
        ctx.stroke();

        // Highlight crosshairs under spotlight
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.4)';
        ctx.beginPath();
        for (let x = startGX; x <= endGX; x += gridSize * 2) {
          for (let y = startGY; y <= endGY; y += gridSize * 2) {
            ctx.moveTo(x - 4, y);
            ctx.lineTo(x + 4, y);
            ctx.moveTo(x, y - 4);
            ctx.lineTo(x, y + 4);
          }
        }
        ctx.stroke();

        ctx.restore();
      }

      // 5. Zero-Trust Telemetry Pulses (Only if not prefers-reduced-motion)
      if (!prefersReducedMotion) {
        if (Math.random() < 0.04) {
          spawnPacket();
        }

        for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          p.progress += p.speed;

          if (p.progress >= 1) {
            packets.splice(i, 1);
            continue;
          }

          if (p.horizontal) {
            const currentX = p.x + (p.targetX - p.x) * p.progress;
            const grad = ctx.createLinearGradient(
              currentX - p.length,
              p.y,
              currentX,
              p.y
            );
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(0.7, p.color);
            grad.addColorStop(1, '#ffffff');

            ctx.lineWidth = 1.5;
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(currentX - p.length, p.y);
            ctx.lineTo(currentX, p.y);
            ctx.stroke();

            // Head micro-beacon
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(currentX, p.y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const currentY = p.y + (p.targetY - p.y) * p.progress;
            const grad = ctx.createLinearGradient(
              p.x,
              currentY - p.length,
              p.x,
              currentY
            );
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(0.7, p.color);
            grad.addColorStop(1, '#ffffff');

            ctx.lineWidth = 1.5;
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(p.x, currentY - p.length);
            ctx.lineTo(p.x, currentY);
            ctx.stroke();

            // Head micro-beacon
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(p.x, currentY, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070709]">
      {/* 1. Architectural Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* 2. Structured Ambient Depth Gradients */}
      <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-indigo-950/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-5%] w-[550px] h-[550px] rounded-full bg-sky-950/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[5%] w-[650px] h-[650px] rounded-full bg-emerald-950/10 blur-[170px] pointer-events-none" />

      {/* 3. Subtle Vignette to Frame Content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(7, 7, 9, 0.85) 100%)',
        }}
      />
    </div>
  );
};
