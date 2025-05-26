import { reedSolomonEncode } from './reedSolomon'; // Use open-source JS RS library

export function generateECC(dataBytes, ecCodewords) {
  return reedSolomonEncode(dataBytes, ecCodewords);
}
