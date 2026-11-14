// Muestra un PDF dentro de la página (sin descargarlo), dibujando cada hoja en un canvas.
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export default function PdfPreview({ data, onClose }) {
    const contenedor = useRef(null);

    useEffect(() => {
        let cancelado = false;
        const destino = contenedor.current;
        (async () => {
            const pdf = await pdfjs.getDocument({ data }).promise;
            for (let n = 1; n <= pdf.numPages && !cancelado; n++) {
                const pagina = await pdf.getPage(n);
                const viewport = pagina.getViewport({ scale: 2 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                destino.appendChild(canvas);
                await pagina.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
            }
        })();
        return () => {
            cancelado = true;
            destino.innerHTML = '';
        };
    }, [data]);

    return (
        <Overlay onClick={onClose}>
            <div className="panel" onClick={(e) => e.stopPropagation()}>
                <button className="cerrar" onClick={onClose}>Cerrar</button>
                <div className="paginas" ref={contenedor} />
            </div>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    overflow-y: auto;
    padding: 1rem;
    .panel {
        max-width: 1100px;
        margin: 0 auto;
    }
    .cerrar {
        display: block;
        margin: 0 0 1rem auto;
        border: 2px solid black;
        border-radius: 2rem;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
    }
    canvas {
        width: 100%;
        display: block;
        margin-bottom: 1rem;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        background: white;
    }
`;
