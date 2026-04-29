<script lang="ts">
  import { goto } from '$app/navigation';

  let digits: string[] = [];
  const MAX = 10;

  function press(val: string) {
    if (digits.length < MAX) {
      digits = [...digits, val];
    }
    if (digits.length === MAX) {
      setTimeout(() => goto('/pedidos'), 300);
    }
  }

  function erase() {
    digits = digits.slice(0, -1);
  }

  $: displaySlots = Array.from({ length: MAX }, (_, i) => digits[i] ?? '');
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

  <!-- Instrucción -->
  <p class="instruction">
    Ingrese su <strong>numero celular o identifícate con tu QR</strong> en la App CAFFENIO
  </p>

  <!-- Slots de dígitos -->
  <div class="slots">
    {#each displaySlots as digit}
      <div class="slot {digit ? 'filled' : ''}">
        {digit}
      </div>
    {/each}
  </div>

    <!-- Fila: píldora back + teclado -->
  <div class="keypad-row">
    <button class="back-pill" on:click={() => goto('/inicio')}>
      <img src="/images/icon-back.png" alt="Regresar" />
    </button>

    <div class="keypad-wrap">
      <div class="keypad">
        {#each ['1','2','3','4','5','6','7','8','9'] as k}
          <button class="key" on:click={() => press(k)}>{k}</button>
        {/each}
        <div class="key empty"></div>
        <button class="key" on:click={() => press('0')}>0</button>
        <button class="key delete" on:click={erase}>
          <img src="/images/icon-delete.png" alt="Borrar" />
        </button>
      </div>
    </div>
  </div>

</div>

<style>
  .screen {
    width: 430px;
    height: 100vh;
    margin: 0 auto;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1.5rem 2rem;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
  }

  /* ── Logo ── */
  .logo-wrap {
    padding: 2.5rem 0 1.25rem;
  }

  .logo-wrap img {
    height: 68px;
    object-fit: contain;
  }

  /* ── Instrucción ── */
  .instruction {
    font-size: 0.88rem;
    color: #1a1a1a;
    text-align: left;
    width: 100%;
    margin: 0 0 1.25rem;
    line-height: 1.45;
  }

  /* ── Slots ── */
  .slots {
    display: flex;
    flex-direction: row;
    gap: 0.35rem;
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .slot {
    flex: 1;
    height: 42px;
    border-radius: 999px;
    background: #EDEDED;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    transition: background 0.15s;
  }

  .slot.filled {
    background: #e0e0e0;
  }

  /* ── Teclado ── */
  .keypad-wrap {
    background: #D4D4D4BD;
    border-radius: 20px;
    padding: 1rem;
    width: 100%;
    max-width: 290px;
  }

  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }

  .key {
    background: #ffffff;
    border: none;
    border-radius: 12px;
    height: 54px;
    font-size: 1.2rem;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: #1a1a1a;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s ease, background 0.1s;
  }

  .key.delete{
    background: #F5F5F5;
  }

  .key:active {
    transform: scale(0.94);
    background: #e5e5e5;
  }

  .key.empty {
    background: transparent;
    pointer-events: none;
  }

  .key.delete img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }

  /* ── Fila teclado + píldora ── */
  .keypad-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: 100%;
    justify-content: center;
  }

  .back-pill {
    width: 52px;
    height: 120px;
    background: #ffffff;
    border: 1.5px solid #dedede;
    border-radius: 999px;
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
</style>