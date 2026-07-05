import { describe, it, expect } from 'vitest';
import { shuffle } from '../mazeUtils';

describe('shuffle', () => {
  it('returns an array with the same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle([...arr]);
    expect(shuffled.sort((a, b) => a - b)).toEqual(arr);
  });

  it('handles empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('handles single-element array', () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it('is deterministic with seeded random', () => {
    const fakeRandom = () => 0.9;
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const a = shuffle([...arr], fakeRandom);
    const b = shuffle([...arr], fakeRandom);
    expect(a).toEqual(b);
  });
});
