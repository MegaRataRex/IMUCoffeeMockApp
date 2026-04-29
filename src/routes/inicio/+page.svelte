<script lang="ts">
  import { goto } from '$app/navigation';
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
    <h1><strong>Hola,</strong><br />¿Lista/o para<br />ordenar?</h1>
  </div>

  <!-- Tarjetas -->
  <div class="cards">
    <button class="card" on:click={() => goto('/inicio/qr')}>
      <img src="/images/icon-qr.png" alt="QR" />
      <p>Identifícate escaneando tu QR</p>
    </button>

    <button class="card" on:click={() => goto('/inicio/telefono')}>
      <img src="/images/icon-phone.png" alt="Teléfono" />
      <p>Identifícate ingresando tu número</p>
    </button>

    <button class="card" on:click={() => goto('/pedidos')}>
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
    width: 430px;
    height: 100vh;
    min-height: 700px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    overflow: hidden;
  }

  /* ── Logo ── */
  .logo-wrap {
    padding: 2.5rem 1rem 1rem;
  }

  .logo-wrap img {
    height: 68px;
    object-fit: contain;
  }

  /* ── Saludo ── */
  .greeting {
    width: 100%;
    padding: 1rem 1.75rem 0;
    box-sizing: border-box;
  }

  .greeting h1 {
    font-size: 1.75rem;
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
    gap: 0.75rem;
    padding: 1.5rem 1.25rem 0;
    width: 100%;
    box-sizing: border-box;
  }

  .card {
    flex: 1;
    aspect-ratio: 0.75;          /* Hace que sean verticales */
    background: #ffffff;
    border: 1.5px solid #dedede;
    border-radius: 18px;
    padding: 1.25rem 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .card:active {
    transform: scale(0.97);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .card img {
    width: 68px;
    height: 68px;
    object-fit: contain;
  }

  .card p {
    font-family: 'Poppins', sans-serif;
    font-size: 0.72rem;
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
    height: 210px;
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