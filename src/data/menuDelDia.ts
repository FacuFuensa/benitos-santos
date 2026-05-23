// ============================================
// MENÚ DEL DÍA — Disponible de 12:00 a 16:00hs
// Para actualizar: cambiá los valores abajo y
// hacé clic en "Commit changes" en GitHub.
// No cambies nada fuera de este bloque.
// ============================================

export interface MenuDelDiaItem {
  name: string
  price: number
}

export interface MenuDelDia {
  vigencia: string  // ← CAMBIAR: período que cubre este menú
  items: MenuDelDiaItem[]
}

export const menuDelDia: MenuDelDia = {
  vigencia: 'Semana del 19 al 25 de mayo',  // ← CAMBIAR ESTO

  // ↓ CAMBIAR los platos y precios según corresponda
  items: [
    { name: 'Tarta de Jamón y Queso', price: 15000 },
    { name: 'Tarta de Verduras', price: 15000 },
    { name: 'Ensalada Verde Toscana', price: 17000 },
    { name: 'Salteado de Lomo y Vegetales', price: 17000 },
    { name: 'Milanesa Tana', price: 17000 },
  ],
  // ↑ FIN DEL BLOQUE A EDITAR
}
