<script lang="ts">
  import { goto } from '$app/navigation';
  import { cartItems } from '$lib/stores/cart';
  import { isGuest } from '$lib/stores/session';

  const metodosTodos = [
    { id: 'ventanilla', label: 'Paga en ventanilla',      icon: '/images/icon-pay-cash.png' },
    { id: 'tarjeta',    label: 'Paga con tarjeta',        icon: '/images/icon-pay-card.png' },
    { id: 'puntos',     label: 'Paga con puntos caffeno', icon: '/images/icon-pay-points.png' }
  ];

  $: metodos = $isGuest
  ? metodosTodos.filter(m => m.id !== 'puntos')
  : metodosTodos;

  $: total = $cartItems.reduce((s, i) => s + i.totalPrice, 0);
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="screen">

  <!-- Logo -->
  <div class="logo-wrap">
    <img src="/images/caffenio-logo.png" alt="CAFFENIO" />
  </div>

  <!-- Título -->
  <div class="title-wrap">
    <h1>Escoja su <strong>metodo de pago</strong></h1>
  </div>

  <!-- Tarjetas de método -->
  <div class="methods">
    {#each metodos as metodo}
      <button class="method-card">
        <img src={metodo.icon} alt={metodo.label} />
        <span>{metodo.label}</span>
      </button>
    {/each}
  </div>

  <!-- Botón regresar -->
  <button class="back-pill" on:click={() => goto('/pedidos')}>
    <img src="/images/icon-back.png" alt="Regresar" />
  </button>
  <span class="back-label">Regresar</span>

</div>

<style>
  .screen {
    width: 430px;
    min-height: 100vh;
    margin: 0 auto;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    padding: 0 1.25rem;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* ── Logo ── */
  .logo-wrap {
    padding: 2rem 0 1rem;
  }

  .logo-wrap img {
    height: 68px;
    object-fit: contain;
  }

  /* ── Título ── */
  .title-wrap {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .title-wrap h1 {
    font-size: 2rem;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 1.2;
    margin: 0;
  }

  .title-wrap h1 strong {
    font-weight: 700;
  }

  /* ── Tarjetas de método ── */
  .methods {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .method-card {
    flex: 1;
    /* aspect-ratio: 0.8; */
    height: 15rem;
    background: #ffffff;
    border: 1.5px solid #dedede;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    cursor: pointer;
    padding: 1rem 0.5rem;
    font-family: 'Poppins', sans-serif;
    transition: border-color 0.15s, background 0.15s;
  }

  .method-card:active {
    background: #fff5f7;
    border-color: #e8194b;
  }

  .method-card img {
    width: 64px;
    height: 64px;
    object-fit: contain;
  }

  .method-card span {
    font-size: 0.7rem;
    font-weight: 500;
    color: #1a1a1a;
    text-align: center;
    line-height: 1.3;
  }

  /* ── Regresar ── */
  .back-pill {
    align-self: flex-start;
    width: 52px;
    height: 52px;
    background: #ffffff;
    border: 1.5px solid #dedede;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    margin-bottom: 0.25rem;
  }

  .back-pill img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .back-label {
    align-self: flex-start;
    font-size: 0.72rem;
    color: #1a1a1a;
    margin-left: 0.25rem;
  }
</style>