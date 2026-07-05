import { useState, useMemo, useCallback } from 'react';
import { applySteps } from '../algorithms/mazeUtils';
import useAnimation from './useAnimation';

/**
 * Hook for animating maze generation step-by-step.
 * Manages the steps array, intermediate grid, and playback control.
 */
export default function useGenerationAnimation(rows, cols) {
  const [animateGen, setAnimateGen] = useState(false);
  const [genSteps, setGenSteps] = useState(null);
  const genAnim = useAnimation(genSteps ? genSteps.length : 0);

  const animatedGrid = useMemo(() => {
    if (!genSteps || !genAnim.step) return null;
    return applySteps(rows, cols, genSteps, genAnim.step);
  }, [genSteps, genAnim.step, rows, cols]);

  const finishGeneration = useCallback((grid, steps) => {
    setGenSteps(steps);
    genAnim.play();
    return grid;
  }, [genAnim]);

  const isAnimating = genSteps && !genAnim.isComplete;

  // Clean up when animation finishes via a timeout (avoids state during render)
  if (genSteps && genAnim.isComplete && genAnim.step >= genSteps.length) {
    setTimeout(() => setGenSteps(null), 0);
  }

  return {
    animateGen, setAnimateGen,
    genSteps, setGenSteps,
    genAnim,
    animatedGrid,
    finishGeneration,
    isAnimating,
  };
}
