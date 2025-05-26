const CHAR_MAP = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';

function toBinaryString(num, length) {
  return num.toString(2).padStart(length, '0');
}

export function encodeAlphanumeric(data) {
    const table = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
    let bits = '';
  
    for (let i = 0; i < data.length; i += 2) {
      const char1 = data[i];
      const char2 = data[i + 1];
  
      if (char2) {
        const val = table.indexOf(char1) * 45 + table.indexOf(char2);
        bits += val.toString(2).padStart(11, '0');
      } else {
        bits += table.indexOf(char1).toString(2).padStart(6, '0');
      }
    }
  
    return bits;
  }
  
  export function encodeByteMode(data) {
    const utf8Bytes = new TextEncoder().encode(data);
    return Array.from(utf8Bytes)
      .map((b) => b.toString(2).padStart(8, '0'))
      .join('');
  }  