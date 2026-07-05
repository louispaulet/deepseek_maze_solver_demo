import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MazeSolver from '../MazeSolver';

function renderMazeSolver() {
  return render(
    <MemoryRouter>
      <MazeSolver />
    </MemoryRouter>
  );
}

/** Click a button and flush the deferred setTimeout so state settles. */
async function clickAndFlush(button) {
  await act(async () => {
    fireEvent.click(button);
    vi.runAllTimers();
  });
}

describe('MazeSolver', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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
    expect(screen.getByRole('button', { name: 'Generate Maze' })).toBeInTheDocument();
  });

  it('shows loading skeleton while generating', () => {
    renderMazeSolver();
    fireEvent.click(screen.getByRole('button', { name: 'Generate Maze' }));
    // Timer hasn't fired yet — skeleton and disabled button should be visible
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Generating…' })).toBeDisabled();
  });

  it('does not show solver controls when no maze is generated', () => {
    renderMazeSolver();
    expect(screen.queryByText(/Solve with Pathfinding/)).not.toBeInTheDocument();
  });

  it('shows solver controls after generating a maze', async () => {
    renderMazeSolver();
    await clickAndFlush(screen.getByRole('button', { name: 'Generate Maze' }));
    expect(screen.getByRole('button', { name: 'Solve Maze' })).toBeInTheDocument();
    expect(screen.getByText('BFS (Breadth-First)')).toBeInTheDocument();
  });

  it('renders comparison canvases after generating and solving', async () => {
    renderMazeSolver();
    await clickAndFlush(screen.getByRole('button', { name: 'Generate Maze' }));
    await clickAndFlush(screen.getByRole('button', { name: 'Solve Maze' }));
    const canvases = document.querySelectorAll('canvas');
    expect(canvases.length).toBeGreaterThanOrEqual(1);
  });

  it('allows switching maze generation algorithms', () => {
    renderMazeSolver();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'prim' } });
    expect(select.value).toBe('prim');
  });

  it('solve button is enabled when maze exists and algos selected', async () => {
    renderMazeSolver();
    await clickAndFlush(screen.getByRole('button', { name: 'Generate Maze' }));
    expect(screen.getByRole('button', { name: 'Solve Maze' })).not.toBeDisabled();
  });
});
