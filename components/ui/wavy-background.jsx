"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  waveHeightFactor = 0.6, // Adjust wave height positioning
  ...props
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef(null);
  let animationId;

  const getSpeed = () => (speed === "slow" ? 0.001 : 0.002);

  const init = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    let nt = 0;

    const drawWave = (n) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];

        for (let x = 0; x <= canvas.width; x += 2) {
          let y = noise(x / canvas.width, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + canvas.height * waveHeightFactor);
        }

        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = waveOpacity;
      drawWave(5);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden bg-background", containerClassName)}>
      <canvas className="absolute inset-0 w-full h-full" ref={canvasRef}></canvas>
      <div className={cn("relative z-10 w-full h-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
