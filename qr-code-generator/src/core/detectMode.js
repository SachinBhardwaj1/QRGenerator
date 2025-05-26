export function detectEncodingMode(data) {
    const alphanumericRegex = /^[A-Z0-9 $%*+\-./:]*$/;
  
    return alphanumericRegex.test(data) ? 'alphanumeric' : 'byte';
  }