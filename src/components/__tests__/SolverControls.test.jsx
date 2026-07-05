import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SolutionControls from '../SolverControls';

const noop = () => {};

describe('SolverControls', () => {
  const selected = new Set(['bfs', 'astar']);
  const props = { selected, setSelected: noop, onSolve: noop, hasMaze: true, solving: false };

  it('renders section heading', () => {
    render(<SolutionControls {...props} />);
    expect(screen.getByRole('heading').textContent).toContain('Solve');
    expect(screen.getByRole('heading').textContent).toContain('Pathfinding');
  });

  it('renders algorithm checkboxes', () => {
    render(<SolutionControls {...props} />);
    expect(screen.getByText('BFS (Breadth-First)')).toBeInTheDocument();
    expect(screen.getByText('A* (A-Star)')).toBeInTheDocument();
  });

  it('renders Solve Maze button', () => {
    render(<SolutionControls {...props} />);
    expect(screen.getByRole('button', { name: 'Solve Maze' })).toBeInTheDocument();
  });

  it('disables solve button when no maze', () => {
    render(<SolutionControls {...props} hasMaze={false} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables solve button when no algorithm selected', () => {
    render(<SolutionControls {...props} selected={new Set()} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows solving state', () => {
    render(<SolutionControls {...props} solving />);
    expect(screen.getByRole('button', { name: 'Solving…' })).toBeDisabled();
  });
});
