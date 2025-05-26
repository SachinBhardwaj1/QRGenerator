export function buildMatrix(version = 4) {
    const size = 21 + (version - 1) * 4;
    const matrix = Array.from({ length: size }, () => Array(size).fill(null));
  
    // Place finder, alignment, timing patterns, dark module, reserved areas, etc.
    return matrix;
  }

export function buildEmptyMatrix(size) {
    return Array.from({ length: size }, () => Array(size).fill(0));
  }
  
  