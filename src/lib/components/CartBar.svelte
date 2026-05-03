<script lang="ts">
  import { cartItems, cartCount } from '$lib/stores/cart';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // Últimos 3 items del carrito
  $: lastItems = $cartItems.slice(-3).reverse();

  // Total del carrito
  $: total = $cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  export let visible = true;

  function handleVerPedido() {
    dispatch('verPedido');
  }
</script>

{#if $cartCount > 0 && visible}
  <div class="cart-bar">

    <!-- Miniaturas de últimos 3 productos -->
    <div class="cart-thumbs">
      {#each lastItems as item (item.cartId)}
        <div class="thumb-wrap">
          <!-- Badge cantidad -->
          <span class="thumb-badge">{item.cantidad}</span>
          <img src={item.product.imagen} alt={item.product.name} />
          <!-- Info del producto -->
          <div class="thumb-info">
            <p class="thumb-price">${item.totalPrice.toFixed(2)}</p>
            <p class="thumb-name">{item.product.name}</p>
            <div class="thumb-summary">
            {#each item.summaryLines as line}
              <span class="thumb-summary-line">{line}</span>
            {/each}
          </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Total + botón -->
    <div class="cart-bar-right">
      <div class="total-wrap">
        <span class="total-label">TOTAL</span>
        <span class="total-amount">${total.toFixed(2)}</span>
      </div>
      <button class="ver-pedido-btn" on:click={handleVerPedido}>
        Ver pedido →
      </button>
    </div>

  </div>
{/if}

<style>
  .cart-bar {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 430px;
    background: #e8194b;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.75rem;
    box-sizing: border-box;
    gap: 0.5rem;
    z-index: 100;
    box-shadow: 0 -2px 12px rgba(232, 25, 75, 0.25);
}

  /* ── Miniaturas ── */
  .cart-thumbs {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
    overflow: visible;
  }

  .thumb-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.35rem;
    flex-shrink: 0;
    position: relative;
    overflow: visible;
    width: 100px;
  }

  .thumb-badge {
    position: absolute;
    top: -6px;
    left: -6px;
    background: #ffffff;
    color: #e8194b;
    border: 1.5px solid #dedede;
    font-size: 0.5rem;
    font-weight: 700;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    z-index: 1;
  }

  .thumb-wrap img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    border-radius: 8px;
    background: #ffffff;
    flex-shrink: 0;
  }

  .thumb-info {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
    flex: 1;
  }

  .thumb-price {
    font-size: 0.35rem;
    color: #ffffff;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  .thumb-name {
    font-size: 0.35rem;
    color: #ffffff;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .thumb-summary {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: 0;
  }

  .thumb-summary-line {
    font-size: 0.3rem;
    color: rgba(255,255,255,0.8);
    font-family: 'Poppins', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 96px;
    line-height: 1.3;
  }

  /* ── Total + botón ── */
  .cart-bar-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
    flex-shrink: 0;
  }

  .total-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .total-label {
    font-size: 0.5rem;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.05em;
  }

  .total-amount {
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    line-height: 1;
  }

  .ver-pedido-btn {
    background: #ffffff;
    color: #e8194b;
    border: none;
    border-radius: 999px;
    padding: 0.35rem 0.85rem;
    font-family: 'Poppins', sans-serif;
    font-size: 0.50rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.15s;
  }

  .ver-pedido-btn:active {
    opacity: 0.85;
  }
</style>