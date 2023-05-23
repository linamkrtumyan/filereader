export function letterConverter(number) {
  let letter = String.fromCharCode(96 + Number(number)).toUpperCase();
  return letter;
}
