import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock Canvas 2D context for jsdom (which doesn't implement getContext)
HTMLCanvasElement.prototype.getContext = vi.fn(function (type) {
  if (type === '2d') {
    return {
      scale: vi.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fillRect: vi.fn(),
      fillText: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      arc: vi.fn(),
    };
  }
  return null;
});
