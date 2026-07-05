import { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const MAX_CELL_SIZE = 40;
const MIN_CELL_SIZE = 4;
const FALLBACK_CELL_SIZE = 20;

/**
 * Renders a maze grid on an HTML Canvas, with optional pathfinding overlay.
 * When `cellSize` is omitted, the canvas auto-scales to fill its container width.
 */
export default function MazeCanvas({ grid, cellSize, visitedOrder, path }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dynamicSize, setDynamicSize] = useState(FALLBACK_CELL_SIZE);
  const rows = grid.length;
  const cols = grid[0].length;

  const computeSize = useCallback(() => {
    if (cellSize !== undefined) return cellSize;
    if (!containerRef.current) return FALLBACK_CELL_SIZE;
    const containerWidth = containerRef.current.clientWidth;
    if (containerWidth === 0) return FALLBACK_CELL_SIZE;
    const raw = Math.floor(containerWidth / cols);
    return Math.min(Math.max(raw, MIN_CELL_SIZE), MAX_CELL_SIZE);
  }, [cellSize, cols]);

  // Track container width with ResizeObserver (fallback to static size if unavailable)
  useEffect(() => {
    if (cellSize !== undefined) {
      setDynamicSize(cellSize);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    if (typeof ResizeObserver === 'undefined') {
      setDynamicSize(computeSize());
      return;
    }

    const observer = new ResizeObserver(() => {
      setDynamicSize(computeSize());
    });
    observer.observe(container);
    setDynamicSize(computeSize());

    return () => observer.disconnect();
  }, [computeSize, cellSize]);

  const width = cols * dynamicSize;
  const height = rows * dynamicSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, width, height);

    // Visited cells overlay
    if (visitedOrder && visitedOrder.length > 0) {
      ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
      for (const { row, col } of visitedOrder) {
        ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2);
      }
    }

    // Path overlay
    if (path && path.length > 0) {
      ctx.fillStyle = '#facc15';
      for (const { row, col } of path) {
        ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2);
      }
    }

    // Draw walls
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        const { top, right, bottom, left } = grid[r][c].walls;
        ctx.beginPath();
        if (top)    { ctx.moveTo(x, y); ctx.lineTo(x + cellSize, y); }
        if (right)  { ctx.moveTo(x + cellSize, y); ctx.lineTo(x + cellSize, y + cellSize); }
        if (bottom) { ctx.moveTo(x, y + cellSize); ctx.lineTo(x + cellSize, y + cellSize); }
        if (left)   { ctx.moveTo(x, y); ctx.lineTo(x, y + cellSize); }
        ctx.stroke();
      }
    }

    // Start cell (green)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(1, 1, cellSize - 2, cellSize - 2);

    // Goal cell (red)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect((cols - 1) * cellSize + 1, (rows - 1) * cellSize + 1, cellSize - 2, cellSize - 2);
  }, [grid, dynamicSize, rows, cols, width, height, visitedOrder, path]);

  // When a fixed cellSize is given, render the canvas directly to stay backward-compatible
  if (cellSize !== undefined) {
    return (
      <canvas
        ref={canvasRef}
        className="rounded-lg border border-gray-700 shadow-lg"
        style={{ width, height }}
      />
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        className="rounded-lg border border-gray-700 shadow-lg"
        style={{ width, height }}
      />
    </div>
  );
}

MazeCanvas.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
        walls: PropTypes.shape({
          top: PropTypes.bool.isRequired,
          right: PropTypes.bool.isRequired,
          bottom: PropTypes.bool.isRequired,
          left: PropTypes.bool.isRequired,
        }).isRequired,
      })
    )
  ).isRequired,
  cellSize: PropTypes.number,
  visitedOrder: PropTypes.arrayOf(PropTypes.shape({ row: PropTypes.number, col: PropTypes.number })),
  path: PropTypes.arrayOf(PropTypes.shape({ row: PropTypes.number, col: PropTypes.number })),
};
