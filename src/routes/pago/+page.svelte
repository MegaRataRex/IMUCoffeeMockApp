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
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    padding: 0 4%; /* Margen de seguridad táctil */
    box-sizing: border-box;
    overflow: hidden;
  }

  /* ── Logo ── */
  .logo-wrap {
    padding: 6vmin 0 3vmin;
  }

  .logo-wrap img {
    height: 8vmin;
    object-fit: contain;
  }

  /* ── Título ── */
  .title-wrap {
    width: 100%;
    text-align: center; /* Centramos el texto para la proporción de tablet */
    margin-bottom: 4vmin;
  }

  .title-wrap h1 {
    font-size: 4.5vmin;
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
    justify-content: center;
    gap: 2vmin;
    width: 100%;
    max-width: 90vmin; /* Límite para que las tarjetas no se deformen a lo ancho */
    margin-bottom: 4vmin;
  }

  .method-card {
    flex: 1;
    height: 40vmin;
    background: #ffffff;
    border: 0.2vmin solid #dedede;
    border-radius: 2vmin;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vmin;
    cursor: pointer;
    padding: 2vmin 1vmin;
    font-family: 'Poppins', sans-serif;
    transition: border-color 0.15s, background 0.15s;
  }

  .method-card:active {
    background: #fff5f7;
    border-color: #e8194b;
  }

  .method-card img {
    width: 8vmin;
    height: 8vmin;
    object-fit: contain;
  }

  .method-card span {
    font-size: 2vmin;
    font-weight: 500;
    color: #1a1a1a;
    text-align: center;
    line-height: 1.3;
  }

  /* ── Regresar ── */
  .back-pill {
    align-self: flex-start;
    width: 8vmin;
    height: 8vmin;
    background: #ffffff;
    border: 0.2vmin solid #dedede;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    margin-bottom: 0.5vmin;
  }

  .back-pill img {
    width: 3.5vmin;
    height: 3.5vmin;
    object-fit: contain;
  }

  .back-label {
    align-self: flex-start;
    font-size: 1.8vmin;
    color: #1a1a1a;
    margin-left: 1vmin;
  }
</style>