<script lang="ts">
  import { goto } from '$app/navigation';
  import { isGuest } from '$lib/stores/session';
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

  <!-- Saludo -->
  <div class="greeting">
    <h1><strong>Hola,</strong><br />¿Lista/o para ordenar?</h1>
  </div>

  <!-- Tarjetas -->
  <div class="cards">
    <button class="card" on:click={() => { isGuest.set(false); goto('/inicio/qr'); }}>
      <img src="/images/icon-qr.png" alt="QR" />
      <p>Identifícate escaneando tu QR</p>
    </button>

    <button class="card" on:click={() => { isGuest.set(false); goto('/inicio/telefono'); }}>
      <img src="/images/icon-phone.png" alt="Teléfono" />
      <p>Identifícate ingresando tu número</p>
    </button>

    <button class="card" on:click={() => { isGuest.set(true); goto('/pedidos'); }}>
      <img src="/images/icon-face.png" alt="Invitado" />
      <p>Realizar pedido sin identificarte</p>
    </button>
  </div>

  <!-- Banner productos -->
  <div class="banner">
    <img src="/images/products-banner.png" alt="Productos Caffenio" />
  </div>

</div>

<style>
  /* ── Fuente global para esta pantalla ── */
  :global(body) {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }

  .screen {
    /* Forzar proporción de tablet portrait sin importar el tamaño del browser */
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    overflow: hidden;
  }

  /* ── Logo ── */
  .logo-wrap {
    padding: 6vmin 2vmin 2vmin;
  }

  .logo-wrap img {
    height: 15vmin;
    object-fit: contain;
  }

  /* ── Saludo ── */
  .greeting {
    width: 100%;
    padding: 2vmin 4vmin 0;
    box-sizing: border-box;
  }

  .greeting h1 {
    font-size: 5vmin;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 1.25;
    margin: 0;
  }

  .greeting h1 strong {
    font-weight: 700;
  }

  /* ── Tarjetas ── */
  .cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2vmin;
    padding: 4vmin 3vmin 0;
    width: 90vmin;
    box-sizing: border-box;
  }

  .card {
    flex: 1;
    height: 40vmin;
    background: #ffffff;
    border: 0.3vmin solid #dedede;
    border-radius: 2.5vmin;
    padding: 3vmin 1vmin 2vmin;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5vmin;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .card:active {
    transform: scale(0.97);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .card img {
    width: 8vmin;
    height: 8vmin;
    object-fit: contain;
  }

  .card p {
    font-family: 'Poppins', sans-serif;
    font-size: 2vmin;
    font-weight: 500;
    color: #1a1a1a;
    text-align: center;
    line-height: 1.35;
    margin: 0;
  }

  /* ── Banner ── */
  .banner {
    margin-top: auto;
    width: 100%;
    height: 70vmin;
    flex-shrink: 0;
  }

  .banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
</style>