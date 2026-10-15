import { useEffect, useRef } from "react";

const NODE_COUNT = 18;
const EDGES_PER_NODE = 2;

// The luminous field the glass refracts. Large, soft, slowly drifting color
// blobs (indigo, violet, cyan, teal with faint rose and amber) are composited
// additively over a near-black base, then a restrained "request graph" is
// drawn on top. Everything lives on one Canvas2D surface, one rAF loop, so
// the liquid-glass shader has real light and color to bend. See App.jsx for
// why this stays a single root-direct dark canvas.
const BLOBS = [
  { x: 0.16, y: 0.20, r: 0.68, color: [88, 78, 246], alpha: 0.34, ax: 0.11, ay: 0.08, sx: 0.00011, sy: 0.00017, phase: 0.0, parallax: 0.10 },
  { x: 0.84, y: 0.16, r: 0.60, color: [147, 96, 250], alpha: 0.28, ax: 0.09, ay: 0.10, sx: 0.00014, sy: 0.00012, phase: 1.7, parallax: 0.16 },
  { x: 0.72, y: 0.74, r: 0.70, color: [10, 190, 216], alpha: 0.26, ax: 0.10, ay: 0.09, sx: 0.00010, sy: 0.00015, phase: 3.1, parallax: 0.22 },
  { x: 0.20, y: 0.84, r: 0.62, color: [16, 190, 168], alpha: 0.26, ax: 0.12, ay: 0.07, sx: 0.00016, sy: 0.00011, phase: 4.4, parallax: 0.28 },
  { x: 0.52, y: 0.46, r: 0.52, color: [236, 72, 153], alpha: 0.12, ax: 0.08, ay: 0.10, sx: 0.00012, sy: 0.00013, phase: 2.2, parallax: 0.14 },
  { x: 0.90, y: 0.52, r: 0.44, color: [245, 158, 11], alpha: 0.10, ax: 0.07, ay: 0.08, sx: 0.00015, sy: 0.00010, phase: 5.2, parallax: 0.18 },
];

// Light appearance: the same field as a soft pastel wash over paper white.
const BLOBS_LIGHT = [
  { x: 0.16, y: 0.20, r: 0.68, color: [129, 140, 248], alpha: 0.34, ax: 0.11, ay: 0.08, sx: 0.00011, sy: 0.00017, phase: 0.0, parallax: 0.10 },
  { x: 0.84, y: 0.16, r: 0.60, color: [167, 139, 250], alpha: 0.30, ax: 0.09, ay: 0.10, sx: 0.00014, sy: 0.00012, phase: 1.7, parallax: 0.16 },
  { x: 0.72, y: 0.74, r: 0.70, color: [103, 232, 249], alpha: 0.30, ax: 0.10, ay: 0.09, sx: 0.00010, sy: 0.00015, phase: 3.1, parallax: 0.22 },
  { x: 0.20, y: 0.84, r: 0.62, color: [94, 234, 212], alpha: 0.30, ax: 0.12, ay: 0.07, sx: 0.00016, sy: 0.00011, phase: 4.4, parallax: 0.28 },
  { x: 0.52, y: 0.46, r: 0.52, color: [251, 113, 133], alpha: 0.14, ax: 0.08, ay: 0.10, sx: 0.00012, sy: 0.00013, phase: 2.2, parallax: 0.14 },
  { x: 0.90, y: 0.52, r: 0.44, color: [252, 211, 77], alpha: 0.14, ax: 0.07, ay: 0.08, sx: 0.00015, sy: 0.00010, phase: 5.2, parallax: 0.18 },
];

function buildGraph(width, height) {
  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    driftPhase: Math.random() * Math.PI * 2,
    driftRadius: 8 + Math.random() * 14,
  }));

  const edges = [];
  const seen = new Set();
  nodes.forEach((n, i) => {
    const nearest = nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, EDGES_PER_NODE);
    nearest.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push({ a: i, b: j });
      }
    });
  });

  const packets = edges.map((_, i) => ({
    edge: i,
    t: Math.random(),
    speed: 0.12 + Math.random() * 0.18,
  }));

  return { nodes, edges, packets };
}

export default function SystemBackground({ reducedMotion }) {
  const canvasRef = useRef(null);
  const graphRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf;
    let noiseTile = null;
    let noisePattern = null;

    // A tiny pre-rendered grain tile keeps the field from banding across
    // large gradients without paying a per-pixel cost each frame.
    function makeNoise() {
      const tile = document.createElement("canvas");
      tile.width = tile.height = 128;
      const tctx = tile.getContext("2d");
      const img = tctx.createImageData(128, 128);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 200 + Math.random() * 55;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      tctx.putImageData(img, 0, 0);
      noiseTile = tile;
      // Build the repeat pattern once; recreating it per frame is a needless
      // allocation on the 60fps path.
      noisePattern = ctx.createPattern(noiseTile, "repeat");
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      graphRef.current = buildGraph(width, height);
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    }

    function drawField(time, isLight) {
      ctx.fillStyle = isLight ? "#eef1f8" : "#05070d";
      ctx.fillRect(0, 0, width, height);

      const maxDim = Math.max(width, height);
      const blobs = isLight ? BLOBS_LIGHT : BLOBS;
      const scroll = scrollRef.current;

      ctx.globalCompositeOperation = isLight ? "source-over" : "lighter";
      for (const b of blobs) {
        const cx =
          (b.x + Math.sin(time * b.sx + b.phase) * b.ax) * width;
        const cy =
          (b.y + Math.cos(time * b.sy + b.phase * 1.3) * b.ay) * height -
          scroll * b.parallax * height;
        const r = b.r * maxDim;
        const [cr, cg, cb] = b.color;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${b.alpha})`);
        g.addColorStop(0.45, `rgba(${cr},${cg},${cb},${b.alpha * 0.42})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.globalCompositeOperation = "source-over";

      // Vignette: gently deepens the corners so the center panels read as lit.
      const vg = ctx.createRadialGradient(
        width / 2,
        height * 0.42,
        maxDim * 0.1,
        width / 2,
        height * 0.5,
        maxDim * 0.85
      );
      if (isLight) {
        vg.addColorStop(0, "rgba(255,255,255,0)");
        vg.addColorStop(1, "rgba(120,130,160,0.10)");
      } else {
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, "rgba(0,0,0,0.55)");
      }
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      if (noisePattern) {
        ctx.globalAlpha = isLight ? 0.02 : 0.035;
        ctx.globalCompositeOperation = "overlay";
        ctx.fillStyle = noisePattern;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
    }

    function drawGraph(time, isLight) {
      const { nodes, edges, packets } = graphRef.current;
      const intensity = 0.6 + 0.4 * scrollRef.current;

      ctx.lineWidth = 1;
      ctx.strokeStyle = isLight
        ? "rgba(30, 41, 59, 0.10)"
        : "rgba(255, 255, 255, 0.09)";
      edges.forEach(({ a, b }) => {
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      });

      packets.forEach((p) => {
        p.t += p.speed * 0.006 * intensity;
        if (p.t > 1) {
          p.t = 0;
          p.edge = Math.floor(Math.random() * edges.length);
        }
        const { a, b } = edges[p.edge];
        const x = nodes[a].x + (nodes[b].x - nodes[a].x) * p.t;
        const y = nodes[a].y + (nodes[b].y - nodes[a].y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(13, 148, 136, ${0.5 * intensity})`
          : `rgba(190, 250, 245, ${0.85 * intensity})`;
        ctx.fill();
      });

      nodes.forEach((n) => {
        const nx =
          n.x + Math.cos(time * 0.0003 + n.driftPhase) * n.driftRadius * 0.5;
        const ny =
          n.y + Math.sin(time * 0.0004 + n.driftPhase) * n.driftRadius * 0.5;
        ctx.beginPath();
        ctx.arc(nx, ny, 9, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? "rgba(13, 148, 136, 0.10)"
          : "rgba(153, 246, 228, 0.10)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? "rgba(15, 118, 110, 0.85)"
          : "rgba(224, 255, 252, 0.95)";
        ctx.fill();
      });
    }

    function draw(time) {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      drawField(time, isLight);
      drawGraph(time, isLight);
      raf = requestAnimationFrame(draw);
    }

    makeNoise();
    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reducedMotion) {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      drawField(0, isLight);
      drawGraph(0, isLight);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      data-dynamic={reducedMotion ? undefined : "true"}
      className="fixed inset-0"
      aria-hidden="true"
    />
  );
}
