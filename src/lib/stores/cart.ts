import { writable, derived } from 'svelte/store';

export interface CartItem {
  cartId: string;
  product: any;
  selections: Record<string, any>;
  toppingQty: Record<string, number>;
  cantidad: number;
  totalPrice: number;
  summaryLines: string[];
}

export const cartItems = writable<CartItem[]>([]);

export const cartCount = derived(cartItems, $items =>
  $items.reduce((sum, item) => sum + item.cantidad, 0)
);

export function addToCart(item: Omit<CartItem, 'cartId'>) {
  cartItems.update(items => [
    ...items,
    { ...item, cartId: crypto.randomUUID() }
  ]);
}

export function removeFromCart(cartId: string) {
  cartItems.update(items => items.filter(i => i.cartId !== cartId));
}

export function updateCartItem(cartId: string, updates: Partial<CartItem>) {
  cartItems.update(items =>
    items.map(i => i.cartId === cartId ? { ...i, ...updates } : i)
  );
}