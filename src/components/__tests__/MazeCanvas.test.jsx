import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MazeCanvas from '../MazeCanvas';

function makeGrid(rows, cols) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r, col: c,
      walls: { top: true, right: true, bottom: true, left: true },
    }))
  );
}

describe('MazeCanvas', () => {
  it('renders a canvas element', () => {
    render(<MazeCanvas grid={makeGrid(3, 3)} />);
    expect(document.querySelector('canvas')).toBeInTheDocument();
  });

  it('sets canvas style dimensions from grid size × cellSize', () => {
    const grid = makeGrid(4, 6);
    render(<MazeCanvas grid={grid} cellSize={25} />);
    const canvas = document.querySelector('canvas');
    expect(canvas.style.width).toBe('150px');  // 6 * 25
    expect(canvas.style.height).toBe('100px'); // 4 * 25
  });

  it('uses default cellSize of 20 when not specified', () => {
    render(<MazeCanvas grid={makeGrid(5, 5)} />);
    const canvas = document.querySelector('canvas');
    expect(canvas.style.width).toBe('100px');
    expect(canvas.style.height).toBe('100px');
  });

  it('handles 1×1 grid', () => {
    render(<MazeCanvas grid={makeGrid(1, 1)} />);
    expect(document.querySelector('canvas')).toBeInTheDocument();
  });

  it('applies border and shadow styling classes', () => {
    render(<MazeCanvas grid={makeGrid(2, 2)} />);
    const canvas = document.querySelector('canvas');
    expect(canvas.className).toContain('rounded-lg');
    expect(canvas.className).toContain('border-gray-800');
  });
});
