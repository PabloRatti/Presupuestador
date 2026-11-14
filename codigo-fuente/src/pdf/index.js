// Registro de plantillas de presupuesto.
// Para agregar un modelo nuevo: crear el archivo en ./templates y sumarlo acá.

export const PLANTILLAS = {
    // import() dinámico: cada plantilla (y sus fuentes) se descarga recién cuando se usa
    loroNegro: { nombre: 'Loro Negro', cargar: () => import('./templates/loroNegro') },
    clasicoMC: { nombre: 'Clásico MC', cargar: () => import('./templates/clasicoMC') },
};

export const PLANTILLA_POR_DEFECTO = 'loroNegro';

// data: { cliente, items: [{ nombre, unidades, valor, subtotal }], manoDeObra }
export async function generarPresupuesto(data, plantilla = PLANTILLA_POR_DEFECTO) {
    const { default: generar } = await PLANTILLAS[plantilla].cargar();
    const doc = await generar(data);
    return doc;
}
