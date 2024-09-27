export default function generateRamdomNumber() {
  let number = Math.random() * (29.9 - 24.0) + 24.0;
  number = Math.round(number * 10) / 10;
  return number;
}
