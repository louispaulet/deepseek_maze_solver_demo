import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook for step-based animation playback.
 *
 * @param {number} maxStep - Total number of steps (0 means idle)
 * @returns {{ step, isPlaying, speed, isComplete, play, pause, setStep, reset, setSpeed }}
 */
export default function useAnimation(maxStep) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(20);
  const intervalRef = useRef(null);
  const maxStepRef = useRef(maxStep);
  useEffect(() => { maxStepRef.current = maxStep; });
  const isComplete = maxStep > 0 && step >= maxStep;

  // Playback interval — auto-pauses via state updater to avoid setState-in-effect
  useEffect(() => {
    if (isPlaying && !isComplete) {
      intervalRef.current = setInterval(() => {
        setStep((s) => {
          if (s + 1 >= maxStepRef.current) {
            setIsPlaying(false);
          }
          return s + 1;
        });
      }, speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, isComplete]);

  const advanceStep = useCallback(
    (target) => setStep((s) => Math.min(target ?? s + 1, maxStepRef.current)),
    []
  );

  const reset = useCallback(() => {
    setIsPlaying(false);
    setStep(0);
  }, []);

  return {
    step, isPlaying, speed, isComplete,
    play: useCallback(() => setIsPlaying(true), []),
    pause: useCallback(() => setIsPlaying(false), []),
    setStep: advanceStep,
    reset,
    setSpeed,
  };
}
