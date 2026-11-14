// Lógica del cotizador, compartida por todos los estilos visuales.
// Los estilos (themes) solo muestran estos datos y llaman a estas acciones.
import { useState } from 'react';
import { generarPresupuesto } from './pdf';

export default function useCotizador() {
    const [cliente, setCliente] = useState('');
    const [item, setItem] = useState('');
    const [unidades, setUnidades] = useState('');
    const [valor, setValor] = useState('');
    const [manoDeObra, setManoDeObra] = useState('');
    const [items, setItems] = useState([]);
    const [pdfPreview, setPdfPreview] = useState(null);

    const totalMateriales = items.reduce((acc, it) => acc + it.unidades * it.valor, 0);
    const totalUnidades = items.reduce((acc, it) => acc + (parseInt(it.unidades) || 0), 0);
    const total = totalMateriales + (parseFloat(manoDeObra) || 0);

    function agregarItem() {
        if (!item) return;
        setItems([...items, { nombre: item, unidades, valor, subtotal: unidades * valor }]);
        setItem('');
        setUnidades('');
        setValor('');
    }

    function eliminarItem(indice) {
        setItems(items.filter((_, i) => i !== indice));
    }

    function datos() {
        return { cliente, items, manoDeObra };
    }

    async function descargarPdf() {
        const doc = await generarPresupuesto(datos());
        doc.save('Presupuesto ' + cliente + '.pdf');
    }

    async function verPdf() {
        const doc = await generarPresupuesto(datos());
        setPdfPreview(new Uint8Array(doc.output('arraybuffer')));
    }

    return {
        cliente, setCliente,
        item, setItem,
        unidades, setUnidades,
        valor, setValor,
        manoDeObra, setManoDeObra,
        items, agregarItem, eliminarItem,
        totalMateriales, totalUnidades, total,
        descargarPdf, verPdf,
        pdfPreview, cerrarPdf: () => setPdfPreview(null),
    };
}
