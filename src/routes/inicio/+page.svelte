<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<div class="screen">
  <img src="/images/logo-caffenio.png" alt="Caffenio" class="logo" />

  <h1 class="greeting">
    Hola,<br />
    ¿Lista/o para<br />
    ordenar?
  </h1>

  <div class="options">
    <!-- QR -->
    <button class="card" on:click={() => goto('/inicio/qr')}>
      <div class="icon-wrap">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Esquinas del marco -->
          <path d="M8 20V8h12" stroke="#D0194B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M44 8h12v12" stroke="#D0194B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M56 44v12H44" stroke="#D0194B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 56H8V44" stroke="#D0194B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Mini QR interior -->
          <rect x="18" y="18" width="10" height="10" rx="1" stroke="#D0194B" stroke-width="2.5"/>
          <rect x="36" y="18" width="10" height="10" rx="1" stroke="#D0194B" stroke-width="2.5"/>
          <rect x="18" y="36" width="10" height="10" rx="1" stroke="#D0194B" stroke-width="2.5"/>
          <line x1="36" y1="36" x2="46" y2="36" stroke="#D0194B" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="36" y1="42" x2="46" y2="42" stroke="#D0194B" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="36" y1="46" x2="46" y2="46" stroke="#D0194B" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>
      <p>Identifícate escaneando tu QR</p>
    </button>

    <!-- Teléfono -->
    <button class="card" on:click={() => goto('/inicio/telefono')}>
      <div class="icon-wrap">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 10c0 0-4 6-4 12s6 14 12 20 14 12 20 12c6 0 10-4 10-4l-8-8-6 4c0 0-6-4-12-10S22 24 22 24l4-6-8-8z"
            fill="#D0194B" opacity="0.15" stroke="#D0194B" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>
        <span class="phone-label">55**</span>
      </div>
      <p>Realizar pedido sin identificarte</p>
    </button>

    <!-- Cara / invitado -->
    <button class="card" on:click={() => goto('/pedidos')}>
      <div class="icon-wrap">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Marco -->
          <path d="M8 20V8h12" stroke="#D0194B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M44 8h12v12" stroke="#D0194B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M56 44v12H44" stroke="#D0194B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 56H8V44" stroke="#D0194B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Cara -->
          <circle cx="32" cy="28" r="8" fill="#D0194B" opacity="0.2" stroke="#D0194B" stroke-width="2.5"/>
          <path d="M18 48c0-8 6-12 14-12s14 4 14 12" stroke="#D0194B" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>
      <p>Realizar pedido sin identificarte</p>
    </button>
  </div>

  <div class="food-banner">
    <img src="/images/food-banner.png" alt="Productos Caffenio" />
  </div>
</div>

<style>
  .screen {
    width: 100%;
    height: 100vh;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
  }

  .logo {
    width: 130px;
    margin-top: 2rem;
    object-fit: contain;
  }

  .greeting {
    width: 100%;
    padding: 1.5rem 1.75rem 0.5rem;
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.2;
  }

  .options {
    display: flex;
    gap: 0.75rem;
    padding: 1.25rem 1.25rem 0;
    width: 100%;
  }

  .card {
    flex: 1;
    background: #ffffff;
    border: 1.5px solid #e5e5e5;
    border-radius: 16px;
    padding: 1.25rem 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: transform 0.15s, box-shadow 0.15s;
    text-align: center;
  }

  .card:active {
    transform: scale(0.97);
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }

  .icon-wrap {
    position: relative;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-wrap svg {
    width: 64px;
    height: 64px;
  }

  .phone-label {
    position: absolute;
    top: 4px;
    right: -2px;
    font-size: 0.65rem;
    font-weight: 700;
    color: #D0194B;
    font-family: 'Poppins', sans-serif;
  }

  .card p {
    font-size: 0.72rem;
    color: #333;
    line-height: 1.35;
    font-family: 'Poppins', sans-serif;
    margin: 0;
  }

  .food-banner {
    margin-top: auto;
    width: 100%;
  }

  .food-banner img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    object-position: top;
    display: block;
  }
</style>