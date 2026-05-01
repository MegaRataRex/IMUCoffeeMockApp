<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let product: any;
	export let categoryData: any = null;
    let showFinalHardcoded = false;

	const dispatch = createEventDispatcher();

	// ── Cantidad ──
	let cantidad = 1;

	// ── Selecciones por paso ──
	let selections: Record<string, any> = {};

	// ── Cantidades de toppings ──
	let toppingQty: Record<string, number> = {};

	// ── Pasos activos — recalcula cuando cambian las selecciones ──
	$: activeSteps = computeActiveSteps(selections);

	$: canGoNext = (() => {
		// En la pestaña final nunca avanza
		if (currentStepIndex >= activeSteps.length) return false;
		// En toppings siempre puede avanzar
		if (isToppings) return true;
		// En cualquier otro paso, necesita selección
		return selections[currentStep] !== undefined && selections[currentStep] !== null;
	})();

	function computeActiveSteps(sel: Record<string, any>): string[] {
		let steps = [...(product.steps ?? [])];

		for (const [stepKey, selectedId] of Object.entries(sel)) {
			if (!selectedId) continue;
			const options = getOptionsForStep(stepKey);
			const opt = options.find((o: any) => o.id === selectedId);
			if (!opt?.conditional_steps) continue;

			const cs = opt.conditional_steps;

			// add_after_X: ["step1", "step2"]
			for (const [key, toAdd] of Object.entries(cs)) {
				if (key.startsWith('add_after_')) {
					const afterStep = key.replace('add_after_', '');
					const afterIdx = steps.indexOf(afterStep);
					if (afterIdx !== -1) {
						const arr = toAdd as string[];
						arr.forEach((s) => {
							const ex = steps.indexOf(s);
							if (ex !== -1) steps.splice(ex, 1);
						});
						steps.splice(afterIdx + 1, 0, ...arr);
					}
				}
				if (key === 'remove') {
					(toAdd as string[]).forEach((s) => {
						const idx = steps.indexOf(s);
						if (idx !== -1) steps.splice(idx, 1);
					});
				}
				if (key === 'replace') {
					const r = toAdd as any;
					(r.remove ?? []).forEach((s: string) => {
						const idx = steps.indexOf(s);
						if (idx !== -1) steps.splice(idx, 1);
					});
					for (const [rk, rv] of Object.entries(r)) {
						if (rk.startsWith('add_after_')) {
							const after = rk.replace('add_after_', '');
							const idx = steps.indexOf(after);
							if (idx !== -1) steps.splice(idx + 1, 0, ...(rv as string[]));
						}
					}
				}
			}
		}
		return steps;
	}

	// ── Paso actual ──
	let currentStepIndex = 0;

	$: currentStep = activeSteps[currentStepIndex] ?? '';
	$: currentOptions = getOptionsForStep(currentStep);
	$: stepLabel = getStepLabel(currentStep);
	$: isToppings = currentStep === 'toppings';
	$: isLastStep = currentStepIndex === activeSteps.length;
	$: isHardcoded = product.hardcoded === true;

	// Etiquetas de cada tipo de paso
	const STEP_LABELS: Record<string, string> = {
		size: 'Tamaños',
		flavor: 'Sabores',
		milk_type: 'Tipo de leche o bebida vegetal',
		toppings: 'Añadir toppings',
		grain_types: 'Tipo de grano de café',
		tipo: 'Tipo',
		presentacion: 'Presentación',
		milkshake_type: 'Tipo',
		presentacion_molido: 'Presentación',
		presentacion_regiones: 'Presentación',
		flavor_regiones: 'Región'
	};

	function getStepLabel(step: string): string {
		return STEP_LABELS[step] ?? step;
	}

	// Mapa de clave de paso → propiedad en el producto
	const STEP_KEY_MAP: Record<string, string> = {
		size: 'sizes',
		flavor: 'flavors',
		milk_type: 'milk_types',
		grain_types: 'grain_types',
		tipo: 'tipos',
		presentacion: 'presentaciones',
		milkshake_type: 'milkshake_types',
		presentacion_molido: 'presentaciones_molido',
		presentacion_regiones: 'presentaciones_regiones',
		flavor_regiones: 'flavors_regiones'
	};

	function getOptionsForStep(step: string): any[] {
		if (step === 'toppings') {
			// shared_toppings del category
			if (product.toppings_key && categoryData?.shared_toppings) {
				return categoryData.shared_toppings.options ?? [];
			}
			// toppings_key por sabor (Yambé)
			const selFlavor = selections['flavor'];
			if (selFlavor) {
				const flavorObj = (product.flavors ?? []).find((f: any) => f.id === selFlavor);
				if (flavorObj?.toppings_key) {
					return product[flavorObj.toppings_key] ?? product.toppings ?? [];
				}
			}
			return product.toppings ?? [];
		}
		const key = STEP_KEY_MAP[step];
		return key ? (product[key] ?? []) : [];
	}

	// ── Precio total ──
	$: totalPrice = computePrice(selections, toppingQty, cantidad);

	function computePrice(
		sel: Record<string, any>,
		tQty: Record<string, number>,
		qty: number
	): number {
		let base = product.precio ?? 0;

		// Tamaño
		if (sel.size) {
			const s = (product.sizes ?? []).find((x: any) => x.id === sel.size);
			if (s?.precio) base = s.precio;
			if (s?.precio_base) base = s.precio_base;
		}

		// Presentación (espressos)
		if (sel.presentacion) {
			const p = (product.presentaciones ?? []).find((x: any) => x.id === sel.presentacion);
			if (p?.precio) base = p.precio;
		}

		// Tipo de grano base (Caffenio en grano)
		if (sel.grain_types) {
			const g = (product.grain_types ?? []).find((x: any) => x.id === sel.grain_types);
			if (g?.precio_base) base = g.precio_base;
		}

		// Sabor
		if (sel.flavor) {
			const f = (product.flavors ?? []).find((x: any) => x.id === sel.flavor);
			if (f?.precio_base) base = f.precio_base;
			if (f?.precio_extra) base += f.precio_extra;
			if (f?.precio_override && sel.size) {
				const ov = f.precio_override[sel.size];
				if (ov !== null && ov !== undefined) base = ov;
			}
		}

		// Región (Caffenio en grano)
		if (sel.flavor_regiones) {
			const f = (product.flavors_regiones ?? []).find((x: any) => x.id === sel.flavor_regiones);
			if (f?.precio_base) base = f.precio_base;
		}

		// Tipo milkshake extra
		if (sel.milkshake_type) {
			const m = (product.milkshake_types ?? []).find((x: any) => x.id === sel.milkshake_type);
			if (m?.precio_extra) base += m.precio_extra;
		}

		// Leche extra
		if (sel.milk_type) {
			const m = (product.milk_types ?? []).find((x: any) => x.id === sel.milk_type);
			if (m?.precio_extra) base += m.precio_extra;
		}

		// Toppings
		const tops = getOptionsForStep('toppings');
		for (const [id, q] of Object.entries(tQty)) {
			if (q > 0) {
				const t = tops.find((x: any) => x.id === id);
				if (t?.precio_extra) base += t.precio_extra * q;
			}
		}

		return base * qty;
	}

	// ── Resumen de selecciones ──
	$: summaryLines = buildSummary(selections, toppingQty);

	function buildSummary(sel: Record<string, any>, tQty: Record<string, number>): string[] {
		if (isHardcoded) return product.resumen ?? [];

		const lines: string[] = [];
		const add = (arr: any[], key: string) => {
			const found = arr?.find((x: any) => x.id === key);
			if (found) lines.push(found.label);
		};

		if (sel.size) add(product.sizes, sel.size);
		if (sel.milkshake_type) add(product.milkshake_types, sel.milkshake_type);
		if (sel.tipo) add(product.tipos, sel.tipo);
		if (sel.presentacion) add(product.presentaciones, sel.presentacion);
		if (sel.flavor) add(product.flavors, sel.flavor);
		if (sel.flavor_regiones) add(product.flavors_regiones, sel.flavor_regiones);
		if (sel.grain_types) add(product.grain_types, sel.grain_types);
		if (sel.milk_type) add(product.milk_types, sel.milk_type);

		const tops = getOptionsForStep('toppings');
		for (const [id, q] of Object.entries(tQty)) {
			if (q > 0) {
				const t = tops.find((x: any) => x.id === id);
				if (t) lines.push(`+${q} ${t.label}`);
			}
		}

		return lines;
	}

	// ── Navegación ──
	function goNext() {
		if (currentStepIndex < activeSteps.length - 1) currentStepIndex++;
	}

	function goPrev() {
		if (currentStepIndex > 0) currentStepIndex--;
	}

	function selectOption(id: string) {
		// Si cambia el sabor, resetear pasos condicionales y toppings
		if (currentStep === 'flavor' || currentStep === 'tipo') {
			const newSel: Record<string, any> = {};
			for (const [k, v] of Object.entries(selections)) {
				if (k === currentStep) break;
				newSel[k] = v;
			}
			selections = { ...newSel, [currentStep]: id };
			toppingQty = {};
		} else {
			selections = { ...selections, [currentStep]: id };
		}

		setTimeout(() => {
			if (!isToppings && currentStepIndex < activeSteps.length - 1) {
				currentStepIndex++;
			}
		}, 180);
	}

	function setToppingQty(id: string, delta: number) {
		const cur = toppingQty[id] ?? 0;
		toppingQty = { ...toppingQty, [id]: Math.max(0, cur + delta) };
	}

	function addToCart() {
		dispatch('addToCart', {
			product,
			selections,
			toppingQty,
			cantidad,
			totalPrice,
			summaryLines
		});
	}

	function handleClose() {
		dispatch('close');
	}
</script>

<div class="wizard-layout">
	<!-- ══ PANEL IZQUIERDO ══ -->
	<div class="left-panel">
		<img class="prod-img" src={product.imagen} alt={product.name} />

		<!-- Contador de cantidad -->
		<div class="qty-row">
			<button class="qty-btn" on:click={() => (cantidad = Math.max(1, cantidad - 1))}>−</button>
			<span class="qty-num">{cantidad}</span>
			<button class="qty-btn" on:click={() => cantidad++}>+</button>
		</div>

		<!-- Precio -->
		<p class="price">${totalPrice.toFixed(2)}</p>

		<!-- Resumen de selecciones -->
		<div class="summary">
			<p class="summary-name">{product.name}</p>
			{#each summaryLines as line}
				<p class="summary-line">− {line}</p>
			{/each}
		</div>
	</div>

	<!-- ══ PANEL DERECHO — WIZARD ══ -->
	<div class="right-panel">
		{#if isHardcoded}
            <div class="step-header">
                <h2 class="step-title">Tu pedido favorito</h2>
                <button class="close-btn" on:click={handleClose}>×</button>
            </div>

            <div class="options-wrap">
                <div class="final-step">
                <button class="final-card" on:click={handleClose}>
                    <img src="/images/icon-add-product.png" alt="Agregar producto" />
                    <span>Agregar producto</span>
                </button>
                <button class="final-card" on:click={addToCart}>
                    <img src="/images/icon-pay.png" alt="Pagar Pedido" />
                    <span>Pagar Pedido</span>
                </button>
                </div>
            </div>
		{:else}
			<!-- Header del paso -->
			<div class="step-header">
				<h2 class="step-title">{stepLabel}</h2>
				<button class="close-btn" on:click={handleClose}>×</button>
			</div>

			<!-- Opciones del paso -->
			<div class="options-wrap">
				{#if currentStepIndex === activeSteps.length}
					<!-- Pestaña final -->
					<div class="final-step">
						<button class="final-card" on:click={handleClose}>
							<img src="/images/icon-add-product.png" alt="Agregar producto" />
							<span>Agregar producto</span>
						</button>
						<button class="final-card" on:click={addToCart}>
							<img src="/images/icon-pay.png" alt="Pagar Pedido" />
							<span>Pagar Pedido</span>
						</button>
					</div>
				{:else if isToppings}
					<div class="toppings-list">
						{#each currentOptions as opt}
							<div class="topping-row">
								<span class="topping-label">
									{opt.label}
									{#if opt.precio_extra > 0}
										<span class="topping-price">+${opt.precio_extra}</span>
									{/if}
								</span>
								<div class="topping-counter">
									<button class="tctr-btn" on:click={() => setToppingQty(opt.id, -1)}>−</button>
									<span class="tctr-num">{toppingQty[opt.id] ?? 0}</span>
									<button class="tctr-btn" on:click={() => setToppingQty(opt.id, +1)}>+</button>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="options-list">
						{#if currentStep === 'size'}
							<div class="sizes-grid">
								{#each currentOptions as opt}
									<button
										class="size-card"
										class:selected={selections[currentStep] === opt.id}
										on:click={() => selectOption(opt.id)}
									>
										<img class="size-icon" src="/images/size-{opt.id}.png" alt={opt.label} />
										<span class="size-label">{opt.label}</span>
										{#if opt.oz}<span class="size-oz">{opt.oz}</span>{/if}
									</button>
								{/each}
							</div>
						{:else}
							{#each currentOptions as opt}
								<button
									class="option-pill"
									class:selected={selections[currentStep] === opt.id}
									on:click={() => selectOption(opt.id)}
								>
									{opt.label}
									{#if currentStep === 'milk_type' && opt.precio_extra > 0}
										<span class="pill-price">+${opt.precio_extra}</span>
									{/if}
								</button>
							{/each}
						{/if}
					</div>
				{/if}
			</div>

			<!-- Navegación: < dots > -->
			<div class="nav-row">
				<button class="nav-arrow" on:click={goPrev} disabled={currentStepIndex === 0}>
					<img src="/images/icon-back.png" alt="Anterior" />
				</button>

				<div class="dots-row">
					{#each activeSteps as _, i}
						<button
							class="dot"
							class:active={i === currentStepIndex}
							class:done={i < currentStepIndex}
							on:click={() => (currentStepIndex = i)}
						></button>
					{/each}
					<!-- Dot final = pestaña de Agregar/Pagar -->
					<button
						class="dot"
						class:active={currentStepIndex === activeSteps.length}
						on:click={() => (currentStepIndex = activeSteps.length)}
					></button>
				</div>

				<button
					class="nav-arrow right"
					on:click={() => (currentStepIndex < activeSteps.length ? currentStepIndex++ : null)}
					disabled={!canGoNext}
				>
					<img src="/images/icon-next.png" alt="Siguiente" />
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.wizard-layout {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		font-family: 'Poppins', sans-serif;
	}

	/* ════ PANEL IZQUIERDO ════ */
	.left-panel {
		width: 130px;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.75rem 0.5rem;
		gap: 0.4rem;
	}

	.prod-img {
		width: 60px;
		height: 60px;
		object-fit: contain;
	}

	.qty-row {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.qty-btn {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 1.5px solid #dedede;
		background: #fff;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
		line-height: 1;
	}

	.qty-num {
		font-size: 0.85rem;
		/* font-weight: 600; */
		min-width: 16px;
		text-align: center;
	}

	.price {
		font-size: 0.7rem;
		/* font-weight: bold; */
		color: #1a1a1a;
		margin: 0;
	}

	.summary {
		width: 100%;
	}

	.summary-name {
		font-size: 0.65rem;
		/* font-weight: 700; */
		color: #1a1a1a;
		margin: 0 0 0.2rem;
		line-height: 1.2;
	}

	.summary-line {
		font-size: 0.58rem;
		color: #555;
		margin: 0;
		line-height: 1.4;
	}

	/* ════ PANEL DERECHO ════ */
	.right-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: #ffffff;
		border: 1.5px solid #dedede;
		border-radius: 20px;
		padding: 0.85rem 1rem;
		gap: 0.75rem;
		min-width: 0;
		margin: 0.5rem 0.5rem 0.5rem 0;
	}

	.step-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.step-title {
		font-size: 0.8rem;
		font-weight: bold;
		color: #1a1a1a;
		margin: 0;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.2rem;
		color: #888;
		cursor: pointer;
		padding: 0;
		line-height: 1;
	}

	/* ════ OPCIONES ════ */
	.options-wrap {
		flex: 1;
		overflow-y: auto;
		scrollbar-width: none;
	}

	.options-wrap::-webkit-scrollbar {
		display: none;
	}

	/* Tamaños en grid */
	.sizes-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
	}

	.size-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
		background: #fff;
		border: 1.5px solid #dedede;
		border-radius: 12px;
		padding: 0.5rem 0.25rem;
		cursor: pointer;
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.size-card.selected {
		border-color: #e8194b;
		background: #fff5f7;
	}

	.size-icon {
		width: 36px;
		height: 36px;
		object-fit: contain;
	}

	.size-label {
		font-size: 0.6rem;
		font-weight: 600;
		color: #1a1a1a;
	}

	.size-oz {
		font-size: 0.52rem;
		color: #888;
	}

	.size-price {
		font-size: 0.6rem;
		font-weight: 600;
		color: #e8194b;
	}

	/* Pills normales */
	.options-list {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.option-pill {
		width: 100%;
		height: 1rem;
		padding: 0.55rem 1rem;
		border: 1.5px solid #dedede;
		border-radius: 999px;
		background: #fff;
		font-family: 'Poppins', sans-serif;
		font-size: 0.6rem;
		color: #1a1a1a;
		cursor: pointer;
		text-align: left;
		display: flex;
		align-items: center;
		justify-content: space-between;
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.option-pill.selected {
		border-color: #e8194b;
		background: #fff5f7;
		font-weight: bold;
	}

	.pill-price {
		font-size: 0.6rem;
		color: #e8194b;
		font-weight: 500;
	}

	/* Toppings */
	.toppings-list {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.topping-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.25rem;
	}

	.topping-label {
		font-size: 0.60rem;
		color: #1a1a1a;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.topping-price {
		font-size: 0.60rem;
		color: #e8194b;
	}

	.topping-counter {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.tctr-btn {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 1.5px solid #dedede;
		background: #fff;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
		line-height: 1;
	}

	.tctr-num {
		font-size: 0.8rem;
		min-width: 14px;
		text-align: center;
	}

	/* Favorito hardcoded */
	.hardcoded-wrap {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.hardcoded-lines {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	/* ════ NAVEGACIÓN ════ */
	.nav-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-arrow {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1.5px solid #dedede;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
		transition: opacity 0.15s;
	}

	.nav-arrow:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.nav-arrow img {
		width: 14px;
		height: 14px;
		object-fit: contain;
	}

	.dots-row {
		display: flex;
		gap: 5px;
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #dedede;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: background 0.2s;
	}

	.dot.active {
		background: #e8194b;
	}

	/* .dot.done {
		background: #f5a0b0;
	} */

	/* ════ BOTONES FINALES ════ */
	.action-btns {
		display: flex;
		gap: 0.5rem;
	}

	.btn-primary,
	.btn-secondary {
		flex: 1;
		padding: 0.55rem 0.5rem;
		border-radius: 999px;
		font-family: 'Poppins', sans-serif;
		font-size: 0.7rem;
		font-weight: 600;
		cursor: pointer;
		border: none;
		transition: opacity 0.15s;
	}

	.btn-primary {
		background: #e8194b;
		color: #fff;
	}

	.btn-secondary {
		background: #fff;
		border: 1.5px solid #dedede;
		color: #1a1a1a;
	}

	.btn-primary:active,
	.btn-secondary:active {
		opacity: 0.8;
	}

	.final-step {
		flex: 1;
		display: flex;
		flex-direction: row;
		gap: 0.75rem;
		align-items: center;
		justify-content: center;
	}

	.final-card {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background: #ffffff;
		border: 1.5px solid #dedede;
		border-radius: 16px;
		padding: 1.25rem 0.5rem;
		cursor: pointer;
		font-family: 'Poppins', sans-serif;
		font-size: 0.7rem;
		font-weight: 500;
		color: #1a1a1a;
		transition: background 0.15s;
		height: 6rem;
	}

	.final-card img {
		width: 48px;
		height: 48px;
		object-fit: contain;
	}

	.final-card.primary {
		background: #ffffff;
	}

	.final-card:active {
		background: #f5f5f5;
	}
</style>
