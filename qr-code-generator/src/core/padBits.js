export function padToCapacity(bitStr, capacity) {
    let output = bitStr;
  
    // Terminator
    output += '0000'.slice(0, Math.max(0, capacity - output.length));
  
    // Pad to multiple of 8
    while (output.length % 8 !== 0) output += '0';
  
    // Pad with 0xEC 0x11
    const padBytes = ['11101100', '00010001'];
    let i = 0;
    while (output.length < capacity) {
      output += padBytes[i % 2];
      i++;
    }
  
    return output.slice(0, capacity);
  }
  