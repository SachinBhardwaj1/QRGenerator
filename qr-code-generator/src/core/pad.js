export function padToCapacity(bitString, totalBits) {
    let result = bitString;
  
    // Terminator (up to 4 bits)
    const remaining = totalBits - result.length;
    if (remaining > 0) {
      result += '0000'.substring(0, Math.min(4, remaining));
    }
  
    // Pad to byte boundary
    while (result.length % 8 !== 0) {
      result += '0';
    }
  
    // Add padding bytes (0xEC, 0x11) alternately
    const padBytes = ['11101100', '00010001'];
    let i = 0;
    while (result.length < totalBits) {
      result += padBytes[i % 2];
      i++;
    }
  
    return result;
  }
  