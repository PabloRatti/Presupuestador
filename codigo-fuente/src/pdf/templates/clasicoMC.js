// Plantilla original "Mauro Canet realizaciones".
// Es el mismo código que generaba el PDF antes, movido acá sin cambios de diseño.
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logoBlanco from '../assets/logoCanetBlanco.png';

function controlarPosicionFooter(doc, { items, manoDeObra }, montoTotal) {
    const footerMsg = 'Presupuesto válido por 7 días, para la realización del trabajo es necesaria una seña del 50% del presupuesto.';
    const total = parseInt(montoTotal) + parseInt(manoDeObra);

    if (items.length <= 13) {
        doc.text(15, 170, 'Total  en materiales : $' + montoTotal);
        doc.text(15, 180, 'Mano de obra : $' + manoDeObra);
        doc.text(15, 190, 'Total : $' + total);
        doc.text(15, 200, footerMsg);
    }
    if (items.length > 13 && items.length <= 18) {
        doc.addPage();
        doc.setPage(2);
        doc.text(15, 10, 'Total  en materiales : $' + montoTotal);
        doc.text(15, 20, 'Mano de obra : $' + manoDeObra);
        doc.text(15, 30, 'Total : $' + total);
        doc.text(15, 40, footerMsg);
    }
    if (items.length > 18) {
        doc.setPage(2);
        doc.text(15, 170, 'Total  en materiales : $' + montoTotal);
        doc.text(15, 180, 'Mano de obra : $' + manoDeObra);
        doc.text(15, 190, 'Total : $' + total);
        doc.text(15, 200, footerMsg);
    }
}

export default function generarClasicoMC(data) {
    const doc = new jsPDF('landscape');
    const today = new Date();
    const img = new Image();
    img.src = logoBlanco;

    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    doc.text(20, 20, 'Mauro Canet realizaciones : 2234-261271');
    doc.text(20, 30, 'E-mail : mcrealizaciones@gmail.com');
    doc.text(20, 40, 'Dirigido a : ' + data.cliente);
    doc.text(160, 20, date);
    doc.text(160, 30, 'Mar del plata');
    doc.addImage(img, 'png', 220, 10, 60, 35);

    let montoTotal = 0;
    const body = data.items.map((item) => {
        montoTotal = montoTotal + item.unidades * item.valor;
        return [item.nombre, item.unidades, '$' + item.valor, '$' + item.subtotal];
    });

    doc.autoTable({
        headStyles: { fontStyle: 'bold', textColor: 20, fillColor: [255, 248, 83] },
        startY: 50,
        head: [['Item', 'Cantidad', 'P.Unitario', 'Subtotal']],
        body,
    });

    controlarPosicionFooter(doc, data, montoTotal);
    return doc;
}
