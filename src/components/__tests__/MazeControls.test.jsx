import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MazeControls from '../MazeControls';

const noop = () => {};

describe('MazeControls', () => {
  const props = {
    algo: 'recursive-backtracking', setAlgo: noop,
    rows: 15, setRows: noop, cols: 20, setCols: noop,
    seed: 42, setSeed: noop, showSeed: false, setShowSeed: noop,
    onGenerate: noop, generating: false,
  };

  it('renders algorithm dropdown', () => {
    render(<MazeControls {...props} />);
    expect(screen.getByText('Algorithm')).toBeInTheDocument();
  });

  it('renders rows and columns inputs', () => {
    render(<MazeControls {...props} />);
    expect(screen.getByText('Rows')).toBeInTheDocument();
    expect(screen.getByText('Columns')).toBeInTheDocument();
  });

  it('renders Generate Maze button', () => {
    render(<MazeControls {...props} />);
    expect(screen.getByRole('button', { name: 'Generate Maze' })).toBeInTheDocument();
  });

  it('shows generating state', () => {
    render(<MazeControls {...props} generating />);
    const btn = screen.getByRole('button', { name: 'Generating…' });
    expect(btn).toBeDisabled();
  });

  it('renders seed field with hide/show toggle', () => {
    render(<MazeControls {...props} />);
    expect(screen.getByText('Seed')).toBeInTheDocument();
    expect(screen.getByText('show')).toBeInTheDocument();
  });

  it('shows seed input when showSeed is true', () => {
    render(<MazeControls {...props} showSeed />);
    expect(screen.getByText('hide')).toBeInTheDocument();
  });
});
