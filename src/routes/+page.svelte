<script lang="ts">
  import { goto } from '$app/navigation';

  function handleTap() {
    goto('/inicio');
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
</svelte:head>

<div
  class="splash"
  on:click={handleTap}
  on:keydown={(e) => e.key === 'Enter' && handleTap()}
  role="button"
  tabindex="0"
>
  <!-- Texto hero superior -->
  <div class="hero-text">
    <img src="/images/hero-text.png" alt="Este antojo todo que ver - Rico, rápido y ligero" />
  </div>

  <!-- Foto de productos -->
  <div class="products">
    <img src="/images/products.png" alt="Limonada frambuesa, limonada hierbabuena y panini ligero" />
  </div>

  <!-- CTA inferior -->
  <div class="cta">
    <img class="touch-icon" src="/images/touch-icon.png" alt="Toca la pantalla" />
    <p class="cta-text">Toca para empezar</p>
  </div>
</div>

<style>
  .splash {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 6vmin 4vmin 8vmin;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;

    /* Patrón de cuadros — sin necesidad de imagen */
    background-color: #ffffff;
    background-image: repeating-conic-gradient(#e5e5e5 0% 25%, #ffffff 0% 50%);
    background-size: 15vmin 15vmin;
  }

  .hero-text {
    width: 100%;
    max-width: 60vmin;
    margin-top: 2vmin;
  }

  .hero-text img {
    width: 100%;
    height: auto;
    display: block;
  }

  .products {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 3vmin 0;
  }

  .products img {
    width: 85%;
    max-width: 75vmin;
    height: auto;
    object-fit: contain;
    display: block;
  }

  .cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vmin;
  }

  .touch-icon {
    width: 12vmin;
    height: 12vmin;
    object-fit: contain;
    animation: pulse 1.8s ease-in-out infinite;
  }

  .cta-text {
    font-family: 'Poppins', sans-serif;
    font-size: 3.5vmin;
    font-weight: 500;
    color: #222222;
    margin: 0;
    letter-spacing: 0.01em;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: translateY(-1.5vmin) scale(1.08); opacity: 0.85; }
  }
</style>