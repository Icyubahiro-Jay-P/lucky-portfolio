import { useEffect, useRef } from "react";

const NODE_COUNT = 16;
const EDGES_PER_NODE = 2;

function buildGraph(width, height) {
  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    driftPhase: Math.random() * Math.PI * 2,
    driftRadius: 6 + Math.random() * 10,
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
    speed: 0.15 + Math.random() * 0.2,
  }));

  return { nodes, edges, packets };
}

// The site's core visual: a small, honest backend-system diagram (nodes,
// connections, traveling request/response "packets") that liquid-glass
// panels refract throughout the page. Canvas2D, single rAF loop, no
// per-frame layout work, cheap enough to coexist with the WebGL glass
// shader. See the plan's "Concept: The System Beneath" section.
export default function SystemBackground({ reducedMotion }) {
  const canvasRef = useRef(null);
  const graphRef = useRef(null);
  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.35 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf;

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

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    function draw(time) {
      const { nodes, edges, packets } = graphRef.current;
      const intensity = 0.55 + 0.45 * scrollRef.current;
      // Opaque fill, not clearRect: the glass shader's capture pipeline
      // only sees this canvas's own pixels, never the page's CSS body
      // background, so the dark backdrop has to be painted here or every
      // glass panel refracts white (the library's capture base fill).
      ctx.fillStyle = "#0a0e14";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(45, 212, 191, 0.45)";
      ctx.lineWidth = 1.5;
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
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 234, 212, ${0.9 * intensity})`;
        ctx.fill();
      });

      nodes.forEach((n) => {
        const dx = Math.cos(time * 0.0003 + n.driftPhase) * n.driftRadius * 0.15;
        const dy = Math.sin(time * 0.0004 + n.driftPhase) * n.driftRadius * 0.15;
        const nx = n.x + dx;
        const ny = n.y + dy;
        ctx.beginPath();
        ctx.arc(nx, ny, 12, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 212, 191, 0.15)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(153, 246, 228, 1)";
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    if (reducedMotion) {
      draw(0);
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
