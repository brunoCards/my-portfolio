/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from '@/lib/utils';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import { motion } from 'motion/react';

/* 
  ====== Funções puras fora do componente ======
  Isso evita que sejam recriadas a cada render 
  e previne problemas com useCallback / eslint.
*/
function rand(n: number): number {
  return n * Math.random();
}
function randRange(n: number): number {
  return n - rand(2 * n);
}
function fadeInOut(t: number, m: number): number {
  const hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
}
function lerp(n1: number, n2: number, speed: number): number {
  return (1 - speed) * n1 + speed * n2;
}

interface VortexProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --------------------------------------------------
  // ====== Parâmetros de configuração ======
  // --------------------------------------------------
  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const baseHue = props.baseHue || 220;
  const rangeHue = 100;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor = props.backgroundColor || '#000000';

  // --------------------------------------------------
  // ====== Variáveis reativas com useRef ======
  // --------------------------------------------------
  // 'tick', 'particleProps' e 'center' passam a ser .current
  // para não serem redefinidas a cada render e não gerar warnings do eslint.
  const tickRef = useRef<number>(0);
  const particlePropsRef = useRef<Float32Array>(
    new Float32Array(particlePropsLength)
  );
  const centerRef = useRef<[number, number]>([0, 0]);

  // Ruído 3D do simplex-noise (pode ficar como está sem problema).
  const noise3D = createNoise3D();

  // --------------------------------------------------
  // ====== Funções utilitárias (constantes) ======
  // --------------------------------------------------
  const TAU = 2 * Math.PI;

  // --------------------------------------------------
  // ====== 1) drawParticle sempre antes de updateParticle ======
  // --------------------------------------------------
  const drawParticle = useCallback(
    (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number,
      ctx: CanvasRenderingContext2D
    ) => {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    []
  );

  // --------------------------------------------------
  // ====== 2) updateParticle sempre antes de drawParticles ======
  // --------------------------------------------------
  const updateParticle = useCallback(
    (i: number, ctx: CanvasRenderingContext2D) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const pProps = particlePropsRef.current;

      const i2 = i + 1;
      const i3 = i + 2;
      const i4 = i + 3;
      const i5 = i + 4;
      const i6 = i + 5;
      const i7 = i + 6;
      const i8 = i + 7;
      const i9 = i + 8;

      const x = pProps[i];
      const y = pProps[i2];

      // Usando tickRef.current em vez de 'tick'
      const n =
        noise3D(x * xOff, y * yOff, tickRef.current * zOff) * noiseSteps * TAU;
      const vx = lerp(pProps[i3], Math.cos(n), 0.5);
      const vy = lerp(pProps[i4], Math.sin(n), 0.5);
      let life = pProps[i5];
      const ttl = pProps[i6];
      const speed = pProps[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = pProps[i8];
      const hue = pProps[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

      life++;

      pProps[i] = x2;
      pProps[i2] = y2;
      pProps[i3] = vx;
      pProps[i4] = vy;
      pProps[i5] = life;

      if (checkBounds(x2, y2, canvas) || life > ttl) {
        initParticle(i); // Reinicia partícula caso saia da tela ou acabe vida
      }
    },
    [TAU, noise3D, drawParticle] // Dependências usadas no callback
  );

  // --------------------------------------------------
  // ====== 3) drawParticles depois de updateParticle ======
  // --------------------------------------------------
  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i, ctx);
      }
    },
    [particlePropsLength, particlePropCount, updateParticle]
  );

  // --------------------------------------------------
  // ====== 4) initParticle usado dentro de updateParticle (tem de ficar “antes” ou ser function) ======
  // --------------------------------------------------
  // Você pode transformá-lo em function initParticle(i: number) {...} se preferir
  function initParticle(i: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pProps = particlePropsRef.current;
    const x = rand(canvas.width);
    // centerRef.current é [cx, cy]
    const [cx, cy] = centerRef.current;
    const y = cy + randRange(rangeY);
    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = baseTTL + rand(rangeTTL);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(rangeHue);

    pProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  }

  // --------------------------------------------------
  // ====== 5) initParticles, chamando initParticle (ordenado antes do uso) ======
  // --------------------------------------------------
  const initParticles = useCallback(() => {
    tickRef.current = 0;
    // Redefine o buffer inteiro
    particlePropsRef.current = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }, [particlePropsLength, particlePropCount]);

  // --------------------------------------------------
  // ====== 6) Função principal de desenho (usa drawParticles) ======
  // --------------------------------------------------
  const draw = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      tickRef.current++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawParticles(ctx);
      renderGlow(canvas, ctx);
      renderToScreen(canvas, ctx);

      window.requestAnimationFrame(() => draw(canvas, ctx));
    },
    [backgroundColor, drawParticles]
  );

  // --------------------------------------------------
  // ====== 7) checkBounds e funções "helper" sem depender de Hooks ======
  // --------------------------------------------------
  function checkBounds(x: number, y: number, canvas: HTMLCanvasElement) {
    return x > canvas.width || x < 0 || y > canvas.height || y < 0;
  }

  function renderGlow(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.save();
    ctx.filter = 'blur(8px) brightness(200%)';
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.filter = 'blur(4px) brightness(200%)';
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  }

  function renderToScreen(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  }

  // --------------------------------------------------
  // ====== 8) resize (não pode ser usada antes de declarada) ======
  // --------------------------------------------------
  const resize = useCallback((canvas: HTMLCanvasElement) => {
    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // Atualizando o .current do centerRef
    centerRef.current = [0.5 * canvas.width, 0.5 * canvas.height];
  }, []);

  // --------------------------------------------------
  // ====== 9) setup, chamando resize e initParticles e draw ======
  // --------------------------------------------------
  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        resize(canvas);
        initParticles();
        draw(canvas, ctx);
      }
    }
  }, [draw, initParticles, resize]);

  // --------------------------------------------------
  // ====== 10) useEffect final para iniciar e adicionar resize listener ======
  // --------------------------------------------------
  useEffect(() => {
    setup();

    const ac = new AbortController();
    const { signal } = ac;

    window.addEventListener(
      'resize',
      () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
          resize(canvas);
        }
      },
      { signal }
    );

    return () => {
      ac.abort();
    };
  }, [setup, resize]);

  // --------------------------------------------------
  // ====== Render ======
  // --------------------------------------------------
  return (
    <div className={cn('relative h-full w-full', props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className='absolute inset-0 z-0 h-full w-full bg-transparent'
      >
        <canvas ref={canvasRef}></canvas>
      </motion.div>
      <div className={cn('relative z-10', props.className)}>
        {props.children}
      </div>
    </div>
  );
};
