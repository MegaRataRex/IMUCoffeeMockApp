<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="screen">

  <!-- Píldora back — solo la flecha -->
  <button class="back-pill" on:click={() => goto('/inicio')}>
    <img src="/images/icon-back.png" alt="Regresar" />
  </button>

  <!-- Contenido principal — directo sobre el fondo -->
  <div class="content">
    <img class="logo" src="/images/caffenio-logo.png" alt="CAFFENIO" />

    <p class="instruction">
      Escanee este <strong>código QR</strong> con la cámara de tu teléfono o tu <strong>APP CAFFENIO</strong>
    </p>

    <img class="qr" src="/images/qr-code.png" alt="Código QR" />
  </div>

</div>

<style>
  .screen {
    width: 430px;
    height: 100vh;
    margin: 0 auto;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    padding: 0 1.25rem;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  /* ── Píldora tall solo con la flecha ── */
  .back-pill {
    flex-shrink: 0;
    width: 52px;
    height: 120px;
    background: #ffffff;
    border: 1.5px solid #dedede;
    border-radius: 999px;        /* Píldora perfecta */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    transition: background 0.15s;
  }

  .back-pill:active {
    background: #f5f5f5;
  }

  .back-pill img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }

  /* ── Contenido: logo + texto + QR ── */
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.75rem;
  }

  .logo {
    height: 72px;
    object-fit: contain;
  }

  .instruction {
    font-size: 0.9rem;
    color: #1a1a1a;
    text-align: center;
    line-height: 1.55;
    margin: 0;
  }

  .qr {
    width: 190px;
    height: 190px;
    object-fit: contain;
  }
</style>