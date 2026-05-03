// ── Etiquetas de pasos ──
export const STEP_LABELS: Record<string, string> = {
  size:                  'Tamaños',
  flavor:                'Sabores',
  milk_type:             'Tipo de leche o bebida vegetal',
  toppings:              'Añadir toppings',
  grain_types:           'Tipo de grano de café',
  grain_type:            'Tipo de grano de café',
  tipo:                  'Tipo',
  presentacion:          'Presentación',
  milkshake_type:        'Tipo',
  presentacion_molido:   'Presentación',
  presentacion_regiones: 'Presentación',
  flavor_regiones:       'Región'
};

export const STEP_KEY_MAP: Record<string, string> = {
  size:                  'sizes',
  flavor:                'flavors',
  milk_type:             'milk_types',
  grain_types:           'grain_types',
  grain_type:            'grain_types',
  tipo:                  'tipos',
  presentacion:          'presentaciones',
  milkshake_type:        'milkshake_types',
  presentacion_molido:   'presentaciones_molido',
  presentacion_regiones: 'presentaciones_regiones',
  flavor_regiones:       'flavors_regiones'
};

export function getStepLabel(step: string): string {
  return STEP_LABELS[step] ?? step;
}

export function getOptionsForStep(
  step: string,
  product: any,
  categoryData: any,
  selections: Record<string, any>
): any[] {
  if (step === 'toppings') {
    if (product.toppings_key && categoryData?.shared_toppings) {
      return categoryData.shared_toppings.options ?? [];
    }
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

export function computeActiveSteps(
  product: any,
  selections: Record<string, any>,
  getOptions: (step: string) => any[]
): string[] {
  let steps = [...(product.steps ?? [])];

  for (const [stepKey, selectedId] of Object.entries(selections)) {
    if (!selectedId) continue;
    const options = getOptions(stepKey);
    const opt = options.find((o: any) => o.id === selectedId);
    if (!opt?.conditional_steps) continue;

    const cs = opt.conditional_steps;

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

export function computePrice(
  product: any,
  selections: Record<string, any>,
  toppingQty: Record<string, number>,
  cantidad: number,
  getOptions: (step: string) => any[]
): number {
  let base = product.precio ?? 0;

  if (selections.size) {
    const s = (product.sizes ?? []).find((x: any) => x.id === selections.size);
    if (s?.precio)      base = s.precio;
    if (s?.precio_base) base = s.precio_base;
  }
  if (selections.presentacion) {
    const p = (product.presentaciones ?? []).find((x: any) => x.id === selections.presentacion);
    if (p?.precio) base = p.precio;
  }
  if (selections.grain_types) {
    const g = (product.grain_types ?? []).find((x: any) => x.id === selections.grain_types);
    if (g?.precio_base) base = g.precio_base;
  }
  if (selections.flavor) {
    const f = (product.flavors ?? []).find((x: any) => x.id === selections.flavor);
    if (f?.precio_base)  base = f.precio_base;
    if (f?.precio_extra) base += f.precio_extra;
    if (f?.precio_override && selections.size) {
      const ov = f.precio_override[selections.size];
      if (ov !== null && ov !== undefined) base = ov;
    }
  }
  if (selections.flavor_regiones) {
    const f = (product.flavors_regiones ?? []).find((x: any) => x.id === selections.flavor_regiones);
    if (f?.precio_base) base = f.precio_base;
  }
  if (selections.milkshake_type) {
    const m = (product.milkshake_types ?? []).find((x: any) => x.id === selections.milkshake_type);
    if (m?.precio_extra) base += m.precio_extra;
  }
  if (selections.milk_type) {
    const m = (product.milk_types ?? []).find((x: any) => x.id === selections.milk_type);
    if (m?.precio_extra) base += m.precio_extra;
  }

  const tops = getOptions('toppings');
  for (const [id, q] of Object.entries(toppingQty)) {
    if (q > 0) {
      const t = tops.find((x: any) => x.id === id);
      if (t?.precio_extra) base += t.precio_extra * q;
    }
  }

  return base * cantidad;
}

export function buildSummary(
  product: any,
  selections: Record<string, any>,
  toppingQty: Record<string, number>,
  isHardcoded: boolean,
  getOptions: (step: string) => any[]
): string[] {
  if (isHardcoded) return product.resumen ?? [];

  const lines: string[] = [];
  const add = (arr: any[], key: string) => {
    const found = arr?.find((x: any) => x.id === key);
    if (found) lines.push(found.label);
  };

  if (selections.size)            add(product.sizes,             selections.size);
  if (selections.milkshake_type)  add(product.milkshake_types,   selections.milkshake_type);
  if (selections.tipo)            add(product.tipos,             selections.tipo);
  if (selections.presentacion)    add(product.presentaciones,    selections.presentacion);
  if (selections.flavor)          add(product.flavors,           selections.flavor);
  if (selections.flavor_regiones) add(product.flavors_regiones,  selections.flavor_regiones);
  if (selections.grain_types)     add(product.grain_types,       selections.grain_types);
  if (selections.milk_type)       add(product.milk_types,        selections.milk_type);

  const tops = getOptions('toppings');
  for (const [id, q] of Object.entries(toppingQty)) {
    if (q > 0) {
      const t = tops.find((x: any) => x.id === id);
      if (t) lines.push(`+${q} ${t.label}`);
    }
  }

  return lines;
}