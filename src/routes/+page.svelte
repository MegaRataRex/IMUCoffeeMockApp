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
    padding: 2.5rem 1.5rem 3rem;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;

    /* Patrón de cuadros — sin necesidad de imagen */
    background-color: #ffffff;
    background-image: repeating-conic-gradient(#e5e5e5 0% 25%, #ffffff 0% 50%);
    background-size: 36px 36px;
  }

  .hero-text {
    width: 100%;
    max-width: 300px;
    margin-top: 0.5rem;
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
    padding: 1rem 0;
  }

  .products img {
    width: 92%;
    max-width: 360px;
    height: auto;
    object-fit: contain;
    display: block;
  }

  .cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .touch-icon {
    width: 60px;
    height: 60px;
    object-fit: contain;
    animation: pulse 1.8s ease-in-out infinite;
  }

  .cta-text {
    font-family: 'Poppins', sans-serif;
    font-size: 1.05rem;
    font-weight: 500;
    color: #222222;
    margin: 0;
    letter-spacing: 0.01em;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: translateY(-4px) scale(1.08); opacity: 0.85; }
  }
</style>