import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AnimationControls from '../AnimationControls';

const noop = () => {};

describe('AnimationControls', () => {
  const props = {
    isPlaying: false, step: 0, maxStep: 100,
    speed: 80, onPlay: noop, onPause: noop,
    onStep: noop, onReset: noop, onSpeedChange: noop,
  };

  it('renders play button when paused', () => {
    render(<AnimationControls {...props} />);
    expect(screen.getByTitle('Play')).toBeInTheDocument();
  });

  it('renders pause button when playing', () => {
    render(<AnimationControls {...props} isPlaying />);
    expect(screen.getByTitle('Pause')).toBeInTheDocument();
  });

  it('renders step and reset buttons', () => {
    render(<AnimationControls {...props} />);
    expect(screen.getByTitle('Step forward')).toBeInTheDocument();
    expect(screen.getByTitle('Reset')).toBeInTheDocument();
  });

  it('disables reset when step is 0', () => {
    render(<AnimationControls {...props} step={0} />);
    expect(screen.getByTitle('Reset')).toBeDisabled();
  });

  it('disables step when at max step', () => {
    render(<AnimationControls {...props} step={100} maxStep={100} />);
    expect(screen.getByTitle('Step forward')).toBeDisabled();
  });

  it('renders progress percentage', () => {
    render(<AnimationControls {...props} step={25} maxStep={100} />);
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('renders speed slider with ms label', () => {
    render(<AnimationControls {...props} />);
    expect(screen.getByText('80ms')).toBeInTheDocument();
  });
});
