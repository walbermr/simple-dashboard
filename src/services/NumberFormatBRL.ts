export function NumberFormatBRL(price: number) {
  const formatedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return formatedPrice;
}
