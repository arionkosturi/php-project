export function exists(product, cart) {
  return cart.filter((c) => c.id == product.id).length > 0;
}
