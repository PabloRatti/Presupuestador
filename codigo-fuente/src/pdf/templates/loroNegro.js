// Plantilla "Loro Negro - Amoblamientos a medida".
// A4 apaisado (297 x 210 mm). Todas las medidas en mm.
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/loroNegro-logo.png';
import marcaDeAgua from '../assets/loroNegro-marca-agua.png'; // mismo logo con 13% de opacidad
import * as montserrat from '../fonts/montserrat';

const EMPRESA = {
    nombre: 'Loro negro',
    telefono: '2234-261271',
    email: 'hola.loronegro@gmail.com',
    ciudad: 'Mar del plata',
};

const COLORES = {
    marron: [112, 73, 17],     // encabezado de la tabla
    filaGris: [245, 245, 245], // filas alternadas
    textoTabla: [45, 45, 45],
    texto: [20, 20, 20],
};

const PIE = 'Presupuesto válido por 7 días, para la realización del trabajo es necesaria una seña del 50% del presupuesto.';

// Proporciones del logo (ancho / alto) para no deformarlo
const LOGO_RATIO = 1088 / 572;

function registrarFuentes(doc) {
    const fuentes = [
        ['Montserrat-Regular.ttf', montserrat.regular, 'normal'],
        ['Montserrat-Bold.ttf', montserrat.bold, 'bold'],
    ];
    fuentes.forEach(([archivo, base64, estilo]) => {
        doc.addFileToVFS(archivo, base64);
        doc.addFont(archivo, 'Montserrat', estilo);
    });
}

function cargarImagen(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Logo grande y transparente de fondo (marca de agua)
function dibujarMarcaDeAgua(doc, img) {
    // Igual que en el ejemplo: ocupa todo el ancho, la tabla tapa el arco y se corta abajo
    const ancho = 282;
    const alto = ancho / LOGO_RATIO;
    const x = (doc.internal.pageSize.getWidth() - ancho) / 2; // centrado
    const y = 58;
    doc.addImage(img, 'PNG', x, y, ancho, alto, 'marcaDeAgua', 'FAST');
}

// Escribe "Etiqueta : valor" con la etiqueta en negrita y el valor normal
function textoConEtiqueta(doc, etiqueta, valor, x, y) {
    const prefijo = etiqueta + ' : ';
    doc.setFont('Montserrat', 'bold');
    doc.text(prefijo, x, y);
    const anchoPrefijo = doc.getTextWidth(prefijo);
    doc.setFont('Montserrat', 'normal');
    doc.text(String(valor), x + anchoPrefijo, y);
}

function fechaHoy() {
    const d = new Date();
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

export default async function generarLoroNegro(data) {
    const doc = new jsPDF('landscape');
    registrarFuentes(doc);
    const [img, imgMarca] = await Promise.all([cargarImagen(logo), cargarImagen(marcaDeAgua)]);
    const paginaAlto = doc.internal.pageSize.getHeight();

    // --- Marca de agua de la primera página (antes que todo, para que quede detrás)
    const paginasConMarca = new Set([1]);
    dibujarMarcaDeAgua(doc, imgMarca);

    // --- Encabezado
    doc.setFont('Montserrat', 'normal');
    doc.setFontSize(15);
    doc.setTextColor(...COLORES.texto);
    textoConEtiqueta(doc, EMPRESA.nombre, EMPRESA.telefono, 20, 20);
    textoConEtiqueta(doc, 'E-mail', EMPRESA.email, 20, 29.5);
    textoConEtiqueta(doc, 'Dirigido a', data.cliente, 20, 39);
    doc.setFont('Montserrat', 'bold');
    doc.text(fechaHoy(), 160, 20);
    doc.setFont('Montserrat', 'normal');
    doc.text(EMPRESA.ciudad, 160, 29.5);

    const logoAncho = 71;
    doc.addImage(img, 'PNG', 205, 5, logoAncho, logoAncho / LOGO_RATIO, 'logo', 'FAST');

    // --- Tabla de ítems
    let totalMateriales = 0;
    const body = data.items.map((item) => {
        totalMateriales += item.unidades * item.valor;
        return [item.nombre, item.unidades, '$' + item.valor, '$' + item.subtotal];
    });

    doc.autoTable({
        startY: 50.5,
        margin: { left: 14, right: 14.5, top: 15 },
        head: [['Item', 'Cantidad', 'P.Unitario', 'Subtotal']],
        body,
        theme: 'plain',
        styles: {
            font: 'Montserrat',
            fontStyle: 'normal',
            fontSize: 12,
            textColor: COLORES.textoTabla,
            cellPadding: { top: 2.4, bottom: 2.4, left: 2.5, right: 2.5 },
        },
        headStyles: {
            font: 'Montserrat',
            fontStyle: 'bold',
            fillColor: COLORES.marron,
            textColor: COLORES.texto,
        },
        bodyStyles: { fillColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: COLORES.filaGris }, // empieza en la 1ª fila
        columnStyles: {
            0: { cellWidth: 90.5 },
            1: { cellWidth: 60 },
            2: { cellWidth: 63.5 },
        },
        // Si la tabla pasa a otra página, esa página también lleva marca de agua
        willDrawCell: ({ pageNumber }) => {
            if (!paginasConMarca.has(pageNumber)) {
                paginasConMarca.add(pageNumber);
                dibujarMarcaDeAgua(doc, imgMarca);
            }
        },
    });

    // --- Totales y condiciones
    const manoDeObra = parseFloat(data.manoDeObra) || 0;
    const total = totalMateriales + manoDeObra;
    const lineas = [
        ['Total en materiales', '$' + totalMateriales],
        ['Mano de obra', '$' + manoDeObra],
        ['Total', '$' + total],
    ];

    doc.setFont('Montserrat', 'normal');
    doc.setFontSize(15);
    doc.setTextColor(...COLORES.texto);
    const pie = doc.splitTextToSize(PIE, 268);

    // Los totales van abajo de la página; si la tabla no deja lugar, pasan a una hoja nueva
    const interlineado = 9.6;
    const altoBloque = (lineas.length + pie.length) * interlineado;
    let y = 167;
    if (doc.lastAutoTable.finalY + 8 > y || y + altoBloque - interlineado > paginaAlto - 2) {
        if (doc.lastAutoTable.finalY + 8 > y) {
            doc.addPage();
            dibujarMarcaDeAgua(doc, imgMarca);
            doc.setFont('Montserrat', 'normal');
            doc.setFontSize(15);
            doc.setTextColor(...COLORES.texto);
            y = 25;
        }
    }

    lineas.forEach(([etiqueta, valor], i) => {
        textoConEtiqueta(doc, etiqueta, valor, 15, y + i * interlineado);
    });
    doc.setFont('Montserrat', 'normal');
    pie.forEach((linea, i) => {
        doc.text(linea, 15, y + (lineas.length + i) * interlineado);
    });

    return doc;
}
