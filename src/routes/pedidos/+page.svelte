<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ProductOrder from '$lib/components/ProductOrder.svelte';
	import { menuData } from '$lib/menu/index';

	let selectedProduct: any = null;
	let selectedCategoryData: any = null;

	function openProduct(prod: any, categoryId: string) {
		const catData = menuData[categoryId];
		const fullProduct = catData?.products?.find((p: any) => p.id === prod.id) ?? null;
		if (!fullProduct) return;
		selectedProduct = fullProduct;
		selectedCategoryData = catData;
	}

	function handleAddToCart(e: CustomEvent) {
		console.log('Agregado al carrito:', e.detail);
		selectedProduct = null;
		itemsEnCarrito++;
	}

	$: pickupRows = productosMostrados.length <= 8 ? 1 : 2;

	const usuario = { nombre: 'Emiliano López' };

	// ── Carrusel ──
	const promos = ['/images/promo-1.png', '/images/promo-2.png', '/images/promo-3.png'];

	const promosPickup = [
		'/images/promo-pickup-1.png',
		'/images/promo-pickup-2.png',
		'/images/promo-pickup-3.png'
	];

	let promoActual = 0;
	let intervalo: ReturnType<typeof setInterval>;
	let modoPickup = false;

	function togglePickup() {
		modoPickup = !modoPickup;
	}

	onMount(() => {
		intervalo = setInterval(() => {
			promoActual = (promoActual + 1) % promos.length;
		}, 3000);
	});
	onDestroy(() => clearInterval(intervalo));

	// ── Categorías ──
	const categorias = [
		{ id: 'favoritos', label: 'Favoritos', icon: '/images/cat-favoritos.png' },
		{ id: 'bebidas-frias', label: 'Bebidas Frías', icon: '/images/productos/kfreeze.png' },
		{ id: 'bebidas-calientes', label: 'Bebidas Calientes', icon: '/images/productos/mexicano.png' },
		{ id: 'alimentos', label: 'Alimentos', icon: '/images/cat-alimentos.png' },
		{ id: 'reposteria', label: 'Repostería', icon: '/images/cat-reposteria.png' },
		{ id: 'productos', label: 'Productos Caffenio', icon: '/images/cat-productos.png' }
	];
	let categoriaActiva = 'bebidas-frias';

	// ── Productos ──
	const productos: Record<
		string,
		{ id: string; nombre: string; imagen: string; promo?: boolean; favorito?: true }[]
	> = {
		favoritos: [
			{
				id: 'fav_rockaccino',
				nombre: 'Rockaccino para despertar',
				imagen: '/images/productos/rockaccino.png',
				favorito: true
			},
			{
				id: 'fav_horchata',
				nombre: 'Horchata preferida',
				imagen: '/images/productos/horchata.png',
				favorito: true
			},
			{
				id: 'fav_dirty_chai',
				nombre: 'Dirty Chai con canela',
				imagen: '/images/productos/te-chai.png',
				favorito: true
			},
			{
				id: 'fav_vilatto',
				nombre: 'Vilatooo',
				imagen: '/images/productos/vilato.png',
				favorito: true
			},
			{
				id: 'fav_latte',
				nombre: 'Lattesito con extra shot',
				imagen: '/images/productos/latte.png',
				favorito: true
			}
		],
		'bebidas-frias': [
			{
				id: 'rockaccino',
				nombre: 'Rockaccino',
				imagen: '/images/productos/rockaccino.png',
				promo: true
			},
			{ id: 'horchata', nombre: 'Horchata', imagen: '/images/productos/horchata.png' },
			{ id: 'te_chai', nombre: 'Té Chai', imagen: '/images/productos/te-chai.png' },
			{ id: 'vilatto', nombre: 'Vilatto', imagen: '/images/productos/vilatto.png' },
			{ id: 'tisanas', nombre: 'Tisanas', imagen: '/images/productos/tisanas.png' },
			{ id: 'latte', nombre: 'Latte', imagen: '/images/productos/latte.png' },
			{ id: 'kfreeze', nombre: 'Kfreeze', imagen: '/images/productos/kfreeze.png' },
			{ id: 'mexicano', nombre: 'Mexicano', imagen: '/images/productos/mexicano-espresso.png' },
			{
				id: 'tonic',
				nombre: 'Caffenio Tonic',
				imagen: '/images/productos/caffenio-tonic.png',
				promo: true
			},
			{ id: 'yambe', nombre: 'Yambé', imagen: '/images/productos/yambe.png' },
			{ id: 'chocolate', nombre: 'Chocolate', imagen: '/images/productos/chocolate.png' },
			{ id: 'te_matcha', nombre: 'Té Matcha', imagen: '/images/productos/te-matcha.png' },
			{ id: 'lateada', nombre: 'Lateada', imagen: '/images/productos/lateada.png' },
			{ id: 'sundae', nombre: 'Sundae', imagen: '/images/productos/sundae.png' }
		],
		'bebidas-calientes': [
			{ id: 'te_matcha', nombre: 'Té Matcha', imagen: '/images/productos/te-matcha.png' },
			{ id: 'horchata', nombre: 'Horchata', imagen: '/images/productos/horchata.png' },
			{ id: 'mexicano', nombre: 'Mexicano', imagen: '/images/productos/mexicano.png' },
			{ id: 'capuccino', nombre: 'Capuccino', imagen: '/images/productos/capu-caliente.png' },
			{ id: 'latte', nombre: 'Latte', imagen: '/images/productos/latte-caliente.png' },
			{ id: 'espressos', nombre: 'Espressos', imagen: '/images/productos/espressos.png' },
			{
				id: 'chocolate-caliente',
				nombre: 'Chocolate caliente',
				imagen: '/images/productos/chocolate-caliente.png'
			},
			{ id: 'tes', nombre: 'Tés', imagen: '/images/productos/tes.png' },
			{ id: 'tisana', nombre: 'Tisana', imagen: '/images/productos/tisana.png' },
			{ id: 'te_chai', nombre: 'Té Chai', imagen: '/images/productos/chai-caliente.png' }
		],
		alimentos: [
			{
				id: 'sandwich_doble',
				nombre: 'Sandwich doble',
				imagen: '/images/productos/sandwich-doble.png'
			},
			{ id: 'chapata', nombre: 'Chapata', imagen: '/images/productos/chapata.png' },
			{ id: 'bagel', nombre: 'Bagel', imagen: '/images/productos/bagel.png' },
			{
				id: 'baguette',
				nombre: 'Baguette de carnes frías',
				imagen: '/images/productos/baguette.png'
			},
			{ id: 'croissant', nombre: 'Croissant', imagen: '/images/productos/croissant.png' },
			{ id: 'panini_italiano', nombre: 'Panini Italiano', imagen: '/images/productos/panini.png' }
		],
		reposteria: [
			{ id: 'donas', nombre: 'Donas', imagen: '/images/productos/donas.png' },
			{
				id: 'galleta_chocolate',
				nombre: 'Galleta de chocolate',
				imagen: '/images/productos/galleta-chocolate.png'
			},
			{
				id: 'galleta_avellana',
				nombre: 'Galleta de avellana',
				imagen: '/images/productos/galleta-avellana.png'
			},
			{ id: 'brownie', nombre: 'Brownie', imagen: '/images/productos/brownie.png' },
			{
				id: 'espiral_canela',
				nombre: 'Espiral de canela',
				imagen: '/images/productos/espiral-canela.png'
			},
			{
				id: 'galleta_chocolate_blanco',
				nombre: 'Galleta de chocolate blanco',
				imagen: '/images/productos/galleta-chocolate-blanco.png'
			},
			{
				id: 'galleta_red_velvet',
				nombre: 'Galleta red velvet',
				imagen: '/images/productos/galleta-red-velvet.png'
			}
		],
		productos: [
			{
				id: 'caffenio_grano',
				nombre: 'Caffenio en grano',
				imagen: '/images/productos/caffenio-grano.png'
			}
		]
	};

	$: productosMostrados = productos[categoriaActiva] ?? [];

	let itemsEnCarrito = 0;
	$: carritoActivo = itemsEnCarrito > 0;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="screen">
	{#if modoPickup}
		<!-- ══════════════════════════════════
         LAYOUT PICKUP
    ══════════════════════════════════ -->
		<div class="greeting-section">
			<div class="greeting-text">
				<h2>Hola, {usuario.nombre}.</h2>
				<p>¿Qué se te antoja hoy?</p>
			</div>
		</div>

		<!-- SECCIÓN 3 — Categorías (arriba) -->
		<div class="categories-section">
			<div class="categories-scroll">
				{#each categorias as cat}
					<button
						class="cat-btn"
						class:active={categoriaActiva === cat.id}
						on:click={() => (categoriaActiva = cat.id)}
					>
						<div class="cat-icon-wrap" class:active={categoriaActiva === cat.id}>
							<img src={cat.icon} alt={cat.label} />
						</div>
						<span>{cat.label}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- SECCIÓN 4 — Productos (arriba) -->
		{#if selectedProduct}
		<div class="order-panel">
			<ProductOrder
			product={selectedProduct}
			categoryData={selectedCategoryData}
			on:close={() => selectedProduct = null}
			on:addToCart={handleAddToCart}
			/>
		</div>
		{:else}
		<div class="products-section-pickup">
			<h3 class="section-title">
			{categorias.find(c => c.id === categoriaActiva)?.label ?? ''}
			</h3>
			<div class="products-grid-pickup" style="grid-template-rows: repeat({pickupRows}, 1fr);">
			{#each productosMostrados as prod}
				<button class="product-card" on:click={() => openProduct(prod, categoriaActiva)}>
				<div class="product-img-wrap">
					<img src={prod.imagen} alt={prod.nombre} />
					{#if prod.promo}
					<span class="promo-badge">Promoción</span>
					{/if}
					{#if prod.favorito}
					<img class="fav-star" src="/images/icon-star.png" alt="Favorito" />
					{/if}
				</div>
				<span class="prod-nombre">{prod.nombre}</span>
				</button>
			{/each}
			</div>
		</div>
		{/if}

		<!-- Carrusel ancho + botones verticales -->
		<div class="pickup-bottom">
			<div class="pickup-carousel-wrap">
				<div class="carousel">
					{#each promosPickup as promo, i}
						<img
							class="promo-slide"
							class:active={i === promoActual}
							src={promo}
							alt="Promoción {i + 1}"
						/>
					{/each}
					<div class="dots">
						{#each promosPickup as _, i}
							<button
								class="dot"
								class:active={i === promoActual}
								on:click={() => (promoActual = i)}
							></button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Botones de acción verticales -->
			<div class="pickup-actions">
				<button class="action-btn">
					<div class="action-circle-pickup">
						<img src="/images/icon-voice.png" alt="Pedido con voz" />
					</div>
				</button>

				<button class="action-btn" on:click={togglePickup}>
					<div class="action-circle-pickup circle-active">
						<img src="/images/icon-pickup.png" alt="Modo PickUp" />
					</div>
				</button>

				<button class="action-btn" class:disabled={!carritoActivo} disabled={!carritoActivo}>
					<div class="action-circle-pickup" class:circle-disabled={!carritoActivo}>
						<img src="/images/icon-cart.png" alt="Ver pedido" />
					</div>
				</button>
			</div>
		</div>

		<!-- Lealtad + Monedero horizontal abajo -->
		<div class="pickup-cards">
			<img class="pickup-card-img" src="/images/card-lealtad.png" alt="Nivel de lealtad" />
			<img class="pickup-card-img" src="/images/card-monedero.png" alt="Prepago y monedero" />
		</div>
	{:else}
		<!-- ══════════════════════════════════
         LAYOUT NORMAL
    ══════════════════════════════════ -->

		<!-- SECCIÓN 1 — Cards + Carrusel -->
		<div class="top-section">
			<div class="left-col">
				<img class="card-img" src="/images/card-lealtad.png" alt="Nivel de lealtad" />
				<img class="card-img" src="/images/card-monedero.png" alt="Prepago y monedero" />
			</div>
			<div class="right-col">
				<div class="carousel">
					{#each promos as promo, i}
						<img
							class="promo-slide"
							class:active={i === promoActual}
							src={promo}
							alt="Promoción {i + 1}"
						/>
					{/each}
					<div class="dots">
						{#each promos as _, i}
							<button
								class="dot"
								class:active={i === promoActual}
								on:click={() => (promoActual = i)}
							></button>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- SECCIÓN 2 — Saludo + Botones -->
		<div class="greeting-section">
			<div class="greeting-text">
				<h2>Hola, {usuario.nombre}.</h2>
				<p>¿Qué se te antoja hoy?</p>
			</div>
			<div class="actions">
				<button class="action-btn">
					<div class="action-circle">
						<img src="/images/icon-voice.png" alt="Pedido con voz" />
					</div>
					<span>Pedido con voz</span>
				</button>

				<button class="action-btn" on:click={togglePickup}>
					<div class="action-circle">
						<img src="/images/icon-pickup.png" alt="Modo PickUp" />
					</div>
					<span>Modo PickUp</span>
				</button>

				<button class="action-btn" class:disabled={!carritoActivo} disabled={!carritoActivo}>
					<div class="action-circle" class:circle-disabled={!carritoActivo}>
						<img src="/images/icon-cart.png" alt="Ver pedido" />
					</div>
					<span>Ver pedido</span>
				</button>
			</div>
		</div>

		<!-- SECCIÓN 3 — Categorías -->
		<div class="categories-section">
			<div class="categories-scroll">
				{#each categorias as cat}
					<button
						class="cat-btn"
						class:active={categoriaActiva === cat.id}
						on:click={() => (categoriaActiva = cat.id)}
					>
						<div class="cat-icon-wrap" class:active={categoriaActiva === cat.id}>
							<img src={cat.icon} alt={cat.label} />
						</div>
						<span>{cat.label}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- SECCIÓN 4 — Productos -->
		<div class="products-section">
			<h3 class="section-title">
				{categorias.find((c) => c.id === categoriaActiva)?.label ?? ''}
			</h3>
			{#if selectedProduct}
				<!-- Wizard de personalización -->
				<div class="order-panel">
					<ProductOrder
						product={selectedProduct}
						categoryData={selectedCategoryData}
						on:close={() => (selectedProduct = null)}
						on:addToCart={handleAddToCart}
					/>
				</div>
			{:else}
				<!-- Grid normal de productos -->
        <div class="products-grid">
          {#each productosMostrados as prod}
            <button class="product-card" on:click={() => openProduct(prod, categoriaActiva)}>
              <div class="product-img-wrap">
                <img src={prod.imagen} alt={prod.nombre} />
                {#if prod.promo}
                  <span class="promo-badge">Promoción</span>
                {/if}
                {#if prod.favorito}
                  <img class="fav-star" src="/images/icon-star.png" alt="Favorito" />
                {/if}
              </div>
              <span class="prod-nombre">{prod.nombre}</span>
            </button>
          {/each}
        </div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* ════ MODO PICKUP ════ */

	/* Carrusel ancho + botones a la derecha */
	.pickup-bottom {
		display: flex;
		flex-direction: row;
		gap: 0.6rem;
		padding: 0.5rem 0.75rem;
		align-items: stretch;
	}

	.pickup-carousel-wrap {
		flex: 1;
		min-height: 120px;
		max-height: 140px;
	}

	.pickup-carousel-wrap .carousel {
		width: 100%;
		height: 100%;
		border-radius: 14px;
		overflow: hidden;
		position: relative;
		background: #f0f0f0;
	}

	.pickup-carousel-wrap .carousel .promo-slide {
		object-fit: cover; /* ← contain en lugar de cover */
		background: #f5f5f5;
	}

	/* ════ PRODUCTOS PICKUP — 2 filas scroll horizontal ════ */
	.products-section-pickup {
		padding: 0.25rem 0.75rem 0.5rem;
	}

	.products-grid-pickup {
		display: grid;
		grid-template-rows: repeat(2, 1fr); /* exactamente 2 filas */
		grid-auto-flow: column; /* productos fluyen en columnas */
		grid-auto-columns: 72px; /* ancho de cada columna */
		gap: 0.4rem;
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: none;
		padding-bottom: 4px;
	}

	.products-grid-pickup::-webkit-scrollbar {
		display: none;
	}

	/* Las cards en pickup son un poco más compactas */
	.products-grid-pickup .product-card {
		width: 72px;
	}

	.products-grid-pickup .prod-nombre {
		font-size: 0.5rem;
	}

	/* Botones verticales en pickup */
	.pickup-actions {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		flex-shrink: 0;
		width: 72px;
		align-self: stretch;
	}

	.pickup-actions .action-btn {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.action-circle-pickup {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #ffffff;
		border: 1.5px solid #dedede;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s;
	}

	.action-circle-pickup img {
		width: 16px;
		height: 16px;
		object-fit: contain;
	}

	/* Cards horizontales abajo en pickup */
	.pickup-cards {
		display: flex;
		flex-direction: row;
		gap: 0.6rem;
		padding: 0 0.75rem 1rem;
	}

	.pickup-card-img {
		flex: 1;
		height: auto;
		border-radius: 14px;
		object-fit: contain;
		min-width: 0;
	}

	/* Botón pickup activo */
	.circle-active {
		background: #e8194b !important;
		border-color: #e8194b !important;
	}

	.circle-active img {
		filter: brightness(0) invert(1);
	}

	.screen {
		width: 430px;
		min-height: 100vh;
		margin: 0 auto;
		background: #ffffff;
		display: flex;
		flex-direction: column;
		font-family: 'Poppins', sans-serif;
		overflow-y: auto;
		overflow-x: hidden;
	}

	/* ════ SECCIÓN 1 ════ */
	.top-section {
		display: flex;
		flex-direction: row;
		gap: 0.6rem;
		padding: 0.75rem 0.75rem 0;
		align-items: flex-start;
	}

	.left-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 0;
	}

	.card-img {
		width: 100%;
		height: auto;
		border-radius: 14px;
		display: block;
		object-fit: contain;
	}

	/* Carrusel — más cuadrado */
	.right-col {
		width: 155px;
		flex-shrink: 0;
		align-self: stretch; /* ← esto hace que iguale la altura */
	}

	.carousel {
		width: 100%;
		height: 100%; /* Toma la altura del right-col */
		border-radius: 14px;
		overflow: hidden;
		position: relative;
		background: #f0f0f0;
	}

	.promo-slide {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
		opacity: 0;
		transition: opacity 0.6s ease;
	}

	.promo-slide.active {
		opacity: 1;
	}

	.dots {
		position: absolute;
		bottom: 6px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 4px;
		z-index: 2;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.5);
		border: none;
		cursor: pointer;
		padding: 0;
		transition: background 0.3s;
	}

	.dot.active {
		background: #ffffff;
	}

	/* ════ SECCIÓN 2 ════ */
	.greeting-section {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0.85rem 0.75rem 0.5rem;
		gap: 0.5rem;
	}

	.greeting-text h2 {
		font-size: 1rem;
		font-weight: 700;
		color: #1a1a1a;
		margin: 0;
		line-height: 1.2;
	}

	.greeting-text p {
		font-size: 0.82rem;
		font-style: italic;
		color: #1a1a1a;
		margin: 0;
	}

	.actions {
		display: flex;
		flex-direction: row;
		gap: 0.6rem;
		flex-shrink: 0;
	}

	.action-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		font-family: 'Poppins', sans-serif;
	}

	/* Círculo contenedor del ícono */
	.action-circle {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: #ffffff;
		border: 1.5px solid #dedede;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s;
	}

	.action-circle img {
		width: 24px;
		height: 24px;
		object-fit: contain;
	}

	.action-btn:not(.disabled):active .action-circle {
		background: #ebebeb;
	}

	.circle-disabled {
		opacity: 0.35;
	}

	.action-btn span {
		font-size: 0.56rem;
		color: #1a1a1a;
		text-align: center;
		max-width: 50px;
		line-height: 1.2;
	}

	.action-btn.disabled {
		cursor: default;
	}

	.action-btn.disabled span {
		opacity: 0.35;
	}

	/* ════ SECCIÓN 3 ════ */
	.categories-section {
		padding: 0.25rem 0 0;
	}

	.categories-scroll {
		display: flex;
		justify-content: center;
		overflow-x: auto;
		padding: 0.25rem 0.75rem 0.5rem;
		gap: 0;
		scrollbar-width: none;
	}

	.categories-scroll::-webkit-scrollbar {
		display: none;
	}

	.cat-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.2rem 0.5rem;
		flex-shrink: 0;
		font-family: 'Poppins', sans-serif;
	}

	.cat-icon-wrap {
		width: 54px;
		height: 54px;
		border-radius: 14px;
		background: #ffffff;
		border: 1.5px solid #dedede;
		display: flex;
		align-items: center; /* vuelve a center para todos */
		justify-content: center;
		padding-bottom: 0;
		transition:
			background 0.2s,
			border-color 0.2s;
	}

	.cat-icon-wrap.active {
		background: #e8194b;
		border-color: #e8194b;
	}

	.cat-icon-wrap.active img {
		filter: none; /* Reset — elimina el blanco en todos */
	}

	.cat-btn:first-child .cat-icon-wrap.active img {
		filter: brightness(0) invert(1);
	}

	.cat-icon-wrap img {
		width: 38px;
		height: 38px;
		object-fit: contain;
	}

	.cat-btn span {
		font-size: 0.58rem;
		font-weight: 500;
		color: #1a1a1a;
		text-align: center;
		max-width: 60px;
		line-height: 1.2;
	}

	/* ════ SECCIÓN 4 ════ */
	.products-section {
		padding: 0.25rem 0.75rem 2rem;
	}

	.section-title {
		font-size: 0.85rem;
		font-weight: 700;
		color: #1a1a1a;
		margin: 0 0 0.6rem;
	}

	/* 6 columnas como en el Figma */
	.products-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 0.5rem 0.4rem;
	}

	.product-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		font-family: 'Poppins', sans-serif;
	}

	/* Contenedor de imagen con badge relativo */
	.product-img-wrap {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ffffff;
		border: 1.5px solid #dedede;
		border-radius: 12px;
		padding: 4px;
		box-sizing: border-box;
	}

	.product-img-wrap img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: contain;
	}

	/* Badge abajo, pegado a la imagen */
	.promo-badge {
		position: absolute;
		bottom: 6px;
		left: 50%;
		transform: translateX(-50%);
		background: #e8194b;
		color: #ffffff;
		font-size: 0.45rem;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 999px;
		font-family: 'Poppins', sans-serif;
		white-space: nowrap;
		z-index: 1;
	}

	.prod-nombre {
		font-size: 0.55rem;
		font-weight: 500;
		color: #1a1a1a;
		text-align: center;
		line-height: 1.2;
	}

	.fav-star {
		position: absolute;
		top: 0px;
		left: 26px;
		width: 14px;
		height: 14px;
		object-fit: contain;
		z-index: 1;
	}

	/* Order Panel*/
	.order-panel {
		display: flex;
		flex-direction: row;
		width: 100%;
		min-height: 320px;
	}
</style>
