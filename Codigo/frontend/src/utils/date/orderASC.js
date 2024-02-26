export default function orderDateASC(date) {
  return date.sort((a, b) => {
    let fechaA = new Date(a);
    let fechaB = new Date(b);
    return fechaA - fechaB;
  });
}
