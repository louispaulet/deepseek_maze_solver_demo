import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MazeSolver from '../MazeSolver';

function renderMazeSolver() {
  return render(
    <MemoryRouter>
      <MazeSolver />
    </MemoryRouter>
  );
}

describe('MazeSolver', () => {
  it('renders the page title', () => {
    renderMazeSolver();
    expect(screen.getByText('Maze')).toBeInTheDocument();
    expect(screen.getByText('Solver')).toBeInTheDocument();
  });

  it('renders algorithm selector', () => {
    renderMazeSolver();
    expect(screen.getByText('Algorithm')).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    expect(select.value).toBe('recursive-backtracking');
  });

  it('renders rows and columns inputs', () => {
    renderMazeSolver();
    expect(screen.getByText('Rows')).toBeInTheDocument();
    expect(screen.getByText('Columns')).toBeInTheDocument();
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the Generate Maze button', () => {
    renderMazeSolver();
    const buttons = screen.getAllByText('Generate Maze');
    expect(buttons.some((el) => el.tagName === 'BUTTON')).toBe(true);
  });

  it('does not show solver controls when no maze is generated', () => {
    renderMazeSolver();
    expect(screen.queryByText(/Solve with Pathfinding/)).not.toBeInTheDocument();
  });

  it('shows solver controls after generating a maze', () => {
    renderMazeSolver();
    fireEvent.click(screen.getByRole('button', { name: 'Generate Maze' }));
    expect(screen.getByRole('button', { name: 'Solve Maze' })).toBeInTheDocument();
    expect(screen.getByText('BFS (Breadth-First)')).toBeInTheDocument();
  });

  it('renders comparison canvases after generating and solving', () => {
    renderMazeSolver();
    fireEvent.click(screen.getByRole('button', { name: 'Generate Maze' }));
    fireEvent.click(screen.getByRole('button', { name: 'Solve Maze' }));
    const canvases = document.querySelectorAll('canvas');
    expect(canvases.length).toBeGreaterThanOrEqual(1);
  });

  it('allows switching maze generation algorithms', () => {
    renderMazeSolver();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'prim' } });
    expect(select.value).toBe('prim');
  });

  it('solve button is enabled when maze exists and algos selected', () => {
    renderMazeSolver();
    fireEvent.click(screen.getByRole('button', { name: 'Generate Maze' }));
    expect(screen.getByRole('button', { name: 'Solve Maze' })).not.toBeDisabled();
  });
});
