import bebidasFrias     from './bebidas-frias.json';
import bebidasCalientes from './bebidas-calientes.json';
import alimentos        from './alimentos.json';
import reposteria       from './reposteria.json';
import productosCaffenio from './productos-caffenio.json';
import favoritos        from './favoritos.json';

export const menuData: Record<string, any> = {
  'favoritos':          favoritos,
  'bebidas-frias':      bebidasFrias,
  'bebidas-calientes':  bebidasCalientes,
  'alimentos':          alimentos,
  'reposteria':         reposteria,
  'productos':          productosCaffenio
};

export function findProduct(categoryId: string, productId: string): any {
  const cat = menuData[categoryId];
  return cat?.products?.find((p: any) => p.id === productId) ?? null;
}