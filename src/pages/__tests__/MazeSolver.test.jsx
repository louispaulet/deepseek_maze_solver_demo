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
    expect(select).toBeInTheDocument();
    // Default is recursive-backtracking
    expect(select.value).toBe('recursive-backtracking');
  });

  it('renders rows and columns inputs', () => {
    renderMazeSolver();
    expect(screen.getByText('Rows')).toBeInTheDocument();
    expect(screen.getByText('Columns')).toBeInTheDocument();
    const inputs = screen.getAllByRole('spinbutton');
    // rows, cols, and seed input (when shown) — but seed is hidden by default
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the Generate Maze button', () => {
    renderMazeSolver();
    const buttons = screen.getAllByText('Generate Maze');
    // At least one button element among the matches
    expect(buttons.some((el) => el.tagName === 'BUTTON')).toBe(true);
  });

  it('shows placeholder text when no maze is generated', () => {
    renderMazeSolver();
    expect(screen.getByText(/Select parameters and click/)).toBeInTheDocument();
  });

  it('renders a canvas after clicking Generate Maze', () => {
    renderMazeSolver();
    const button = screen.getByRole('button', { name: 'Generate Maze' });
    fireEvent.click(button);
    // In jsdom, canvas renders but getContext returns null (handled gracefully)
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('hides the placeholder after generating a maze', () => {
    renderMazeSolver();
    const button = screen.getByRole('button', { name: 'Generate Maze' });
    fireEvent.click(button);
    expect(screen.queryByText(/Select parameters and click/)).not.toBeInTheDocument();
  });

  it('allows switching between algorithms', () => {
    renderMazeSolver();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'prim' } });
    expect(select.value).toBe('prim');
    fireEvent.click(screen.getByRole('button', { name: 'Generate Maze' }));
    expect(document.querySelector('canvas')).toBeInTheDocument();
  });
});
