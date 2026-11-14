// Estilo nuevo, con la identidad de Loro Negro (negro, dorado y crema).
// Una sola versión responsive: en el celular todo va en una columna con una barra
// fija abajo (total + PDF); en la computadora se divide en dos columnas.
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/montserrat/latin-600.css';
import '@fontsource/montserrat/latin-700.css';
import logo from '../loro-circular.jpg';
import PdfPreview from './PdfPreview';

const pesos = (n) =>
    '$' + (Number(n) || 0).toLocaleString('es-AR', { maximumFractionDigits: 2 });

export default function Moderno({ c }) {
    const inputItem = useRef(null);
    // Mientras se escribe en un campo (teclado del celular abierto) se oculta la barra fija
    // de abajo, para que no tape el campo.
    const [escribiendo, setEscribiendo] = useState(false);
    function onFocusCampo(e) {
        if (e.target.tagName !== 'INPUT') return;
        setEscribiendo(true);
        const campo = e.target;
        // esperar a que abra el teclado y llevar el campo al centro de la pantalla
        setTimeout(() => campo.scrollIntoView({ block: 'center', behavior: 'smooth' }), 300);
    }
    function onBlurCampo(e) {
        if (e.target.tagName === 'INPUT') setEscribiendo(false);
    }
    const subtotalPrevio = (parseFloat(c.unidades) || 0) * (parseFloat(c.valor) || 0);
    const puedeAgregar = c.item.trim() !== '' && c.unidades !== '' && c.valor !== '';
    const hayItems = c.items.length > 0;

    function onAgregar(e) {
        e.preventDefault();
        if (!puedeAgregar) return;
        c.agregarItem();
        inputItem.current && inputItem.current.focus(); // listo para cargar el siguiente
    }

    return (
        <Pagina onFocus={onFocusCampo} onBlur={onBlurCampo}>
            <Encabezado>
                <img src={logo} alt="Loro Negro" />
                <div>
                    <h1>Presupuestador</h1>
                    <p>Amoblamientos a medida</p>
                </div>
            </Encabezado>

            <Contenido>
                <Columna>
                    <Tarjeta>
                        <h2>Cliente</h2>
                        <Campo>
                            <span>Dirigido a</span>
                            <input
                                type="text"
                                placeholder="Nombre del cliente"
                                value={c.cliente}
                                onChange={(e) => c.setCliente(e.target.value)}
                            />
                        </Campo>
                    </Tarjeta>

                    <Tarjeta as="form" onSubmit={onAgregar}>
                        <h2>Agregar ítem</h2>
                        <Campo>
                            <span>Descripción</span>
                            <input
                                ref={inputItem}
                                type="text"
                                placeholder="Ej: Fenólico 18mm"
                                value={c.item}
                                onChange={(e) => c.setItem(e.target.value)}
                            />
                        </Campo>
                        <Fila>
                            <Campo>
                                <span>Cantidad</span>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    min="0"
                                    placeholder="0"
                                    value={c.unidades}
                                    onChange={(e) => c.setUnidades(e.target.value)}
                                />
                            </Campo>
                            <Campo>
                                <span>Precio unitario</span>
                                <div className="con-signo">
                                    <i>$</i>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        min="0"
                                        placeholder="0"
                                        value={c.valor}
                                        onChange={(e) => c.setValor(e.target.value)}
                                    />
                                </div>
                            </Campo>
                        </Fila>
                        <BotonPrincipal type="submit" disabled={!puedeAgregar}>
                            + Agregar {subtotalPrevio > 0 && <small>({pesos(subtotalPrevio)})</small>}
                        </BotonPrincipal>
                    </Tarjeta>
                </Columna>

                <Columna>
                    <Tarjeta>
                        <h2>
                            Ítems <Contador>{c.items.length}</Contador>
                        </h2>
                        {!hayItems && <Vacio>Todavía no agregaste ítems.</Vacio>}
                        {hayItems && (
                            <Lista>
                                <li className="titulos">
                                    <span>Ítem</span>
                                    <span>Cant.</span>
                                    <span>P. unit.</span>
                                    <span>Subtotal</span>
                                    <span />
                                </li>
                                {c.items.map((it, i) => (
                                    <li key={i}>
                                        <span className="nombre">{it.nombre}</span>
                                        <span className="cant">
                                            {it.unidades} <em>× {pesos(it.valor)}</em>
                                        </span>
                                        <span className="unit">{pesos(it.valor)}</span>
                                        <span className="sub">{pesos(it.subtotal)}</span>
                                        <button
                                            type="button"
                                            className="borrar"
                                            title="Eliminar ítem"
                                            aria-label={'Eliminar ' + it.nombre}
                                            onClick={() => c.eliminarItem(i)}
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </Lista>
                        )}
                    </Tarjeta>

                    <Tarjeta>
                        <h2>Resumen</h2>
                        <Resumen>
                            <div>
                                <span>Materiales</span>
                                <strong>{pesos(c.totalMateriales)}</strong>
                            </div>
                            <div className="mano">
                                <span>Mano de obra</span>
                                <div className="con-signo">
                                    <i>$</i>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        min="0"
                                        placeholder="0"
                                        value={c.manoDeObra}
                                        onChange={(e) => c.setManoDeObra(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="total">
                                <span>Total</span>
                                <strong>{pesos(c.total)}</strong>
                            </div>
                        </Resumen>
                        <Acciones className="escritorio">
                            <BotonSecundario type="button" onClick={c.verPdf}>Ver PDF</BotonSecundario>
                            <BotonPrincipal type="button" onClick={c.descargarPdf}>Descargar PDF</BotonPrincipal>
                        </Acciones>
                    </Tarjeta>
                </Columna>
            </Contenido>

            {/* Barra fija abajo, solo en el celular */}
            <BarraMovil $oculta={escribiendo}>
                <div className="total">
                    <span>Total</span>
                    <strong>{pesos(c.total)}</strong>
                </div>
                <BotonSecundario type="button" onClick={c.verPdf}>Ver</BotonSecundario>
                <BotonPrincipal type="button" onClick={c.descargarPdf}>Descargar PDF</BotonPrincipal>
            </BarraMovil>

            {c.pdfPreview && <PdfPreview data={c.pdfPreview} onClose={c.cerrarPdf} />}
        </Pagina>
    );
}

/* ---------- Estilos ---------- */

const C = {
    negro: '#141210',
    dorado: '#95662c',
    doradoOscuro: '#704911',
    crema: '#f6f1ea',
    linea: '#e6ddd1',
    texto: '#2a2622',
    gris: '#7a7168',
};

const ESCRITORIO = '@media (min-width: 900px)';

const Pagina = styled.div`
    min-height: 100vh;
    background: ${C.crema};
    color: ${C.texto};
    font-family: 'Montserrat', system-ui, sans-serif;
    text-align: left;
    padding-bottom: 96px; /* lugar para la barra fija del celular */
    ${ESCRITORIO} {
        padding-bottom: 48px;
    }
    * {
        box-sizing: border-box;
    }
    color-scheme: light; /* que el modo oscuro del celular no cambie los colores */
    input {
        font-family: inherit;
        color: ${C.texto};
        -webkit-text-fill-color: ${C.texto};
        opacity: 1;
    }
    input::placeholder {
        color: #b5aca2;
        -webkit-text-fill-color: #b5aca2;
    }
    /* sin flechitas en los campos numéricos */
    input[type='number'] {
        -moz-appearance: textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .con-signo {
        position: relative;
        i {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            font-style: normal;
            color: ${C.gris};
            pointer-events: none;
        }
        input {
            padding-left: 26px;
        }
    }
`;

const Encabezado = styled.header`
    background: ${C.negro};
    color: white;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 20px;
    padding-right: 120px; /* lugar para el botón de cambiar estilo */
    border-bottom: 3px solid ${C.dorado};
    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }
    h1 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 700;
        letter-spacing: 0.02em;
    }
    p {
        margin: 2px 0 0;
        font-size: 0.62rem;
        letter-spacing: 0.14em;
        white-space: nowrap;
        text-transform: uppercase;
        color: ${C.dorado};
    }
    ${ESCRITORIO} {
        padding: 18px 40px;
        img {
            width: 68px;
            height: 68px;
        }
        h1 {
            font-size: 1.5rem;
        }
        p {
            font-size: 0.72rem;
            letter-spacing: 0.18em;
        }
    }
`;

const Contenido = styled.main`
    max-width: 1180px;
    margin: 0 auto;
    padding: 16px;
    display: grid;
    gap: 16px;
    ${ESCRITORIO} {
        padding: 32px 40px;
        grid-template-columns: minmax(320px, 400px) 1fr;
        gap: 24px;
        align-items: start;
    }
`;

const Columna = styled.div`
    display: grid;
    gap: 16px;
    ${ESCRITORIO} {
        gap: 24px;
    }
`;

const Tarjeta = styled.section`
    background: white;
    border-radius: 14px;
    padding: 18px;
    box-shadow: 0 1px 2px rgba(20, 18, 16, 0.06), 0 4px 16px rgba(20, 18, 16, 0.04);
    display: grid;
    gap: 14px;
    h2 {
        margin: 0;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: ${C.doradoOscuro};
        display: flex;
        align-items: center;
        gap: 8px;
    }
    ${ESCRITORIO} {
        padding: 24px;
    }
`;

const Campo = styled.label`
    display: grid;
    gap: 6px;
    min-width: 0;
    span {
        font-size: 0.8rem;
        font-weight: 600;
        color: ${C.gris};
    }
    input {
        width: 100%;
        font-size: 16px; /* 16px evita que el iPhone haga zoom al tocar */
        padding: 12px;
        border: 1.5px solid ${C.linea};
        border-radius: 10px;
        background: #fdfbf8;
        color: ${C.texto};
        outline: none;
        transition: border-color 0.15s, box-shadow 0.15s;
        &:focus {
            border-color: ${C.dorado};
            box-shadow: 0 0 0 3px rgba(149, 102, 44, 0.15);
            background: white;
        }
    }
`;

const Fila = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
`;

const boton = `
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 10px;
    padding: 13px 18px;
    cursor: pointer;
    transition: transform 0.05s, background 0.15s, opacity 0.15s;
    white-space: nowrap;
    &:active { transform: scale(0.98); }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const BotonPrincipal = styled.button`
    ${boton}
    background: ${C.negro};
    color: white;
    border: 1.5px solid ${C.negro};
    small {
        font-weight: 500;
        color: #d8c3a5;
        margin-left: 4px;
    }
    &:hover:not(:disabled) {
        background: #2b2723;
    }
`;

const BotonSecundario = styled.button`
    ${boton}
    background: white;
    color: ${C.negro};
    border: 1.5px solid ${C.dorado};
    &:hover {
        background: #fbf6ef;
    }
`;

const Contador = styled.span`
    background: ${C.crema};
    color: ${C.doradoOscuro};
    border-radius: 999px;
    padding: 2px 9px;
    font-size: 0.75rem;
    letter-spacing: 0;
`;

const Vacio = styled.p`
    margin: 0;
    padding: 24px 0;
    text-align: center;
    color: ${C.gris};
    font-size: 0.9rem;
`;

/* En el celular cada ítem es una tarjetita; en la computadora, una fila de tabla */
const Lista = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    li {
        display: grid;
        grid-template-columns: 1fr auto auto;
        grid-template-areas:
            'nombre sub borrar'
            'cant cant borrar';
        align-items: center;
        column-gap: 12px;
        row-gap: 2px;
        padding: 12px 0;
        border-bottom: 1px solid ${C.linea};
        &:last-child {
            border-bottom: none;
        }
    }
    .titulos,
    .unit {
        display: none;
    }
    .nombre {
        grid-area: nombre;
        font-weight: 600;
        overflow-wrap: anywhere;
    }
    .cant {
        grid-area: cant;
        font-size: 0.85rem;
        color: ${C.gris};
        em {
            font-style: normal;
        }
    }
    .sub {
        grid-area: sub;
        font-weight: 700;
        text-align: right;
    }
    .borrar {
        grid-area: borrar;
        width: 34px;
        height: 34px;
        border-radius: 8px;
        border: none;
        background: transparent;
        color: #b4aaa0;
        font-size: 0.95rem;
        cursor: pointer;
        &:hover {
            background: #fbeceb;
            color: #b3261e;
        }
    }

    ${ESCRITORIO} {
        li,
        li.titulos {
            display: grid;
            grid-template-columns: 1fr 70px 120px 120px 34px;
            grid-template-areas: none;
            padding: 10px 8px;
        }
        li:nth-child(even) {
            background: #faf7f3;
        }
        li.titulos {
            background: ${C.doradoOscuro};
            color: white;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            border-radius: 8px;
            border: none;
            span:nth-child(n + 2) {
                text-align: right;
            }
        }
        .nombre,
        .cant,
        .unit,
        .sub,
        .borrar {
            grid-area: auto;
        }
        .unit {
            display: block;
            text-align: right;
        }
        .cant {
            text-align: right;
            font-size: 1rem;
            color: ${C.texto};
            em {
                display: none;
            }
        }
        .nombre {
            font-weight: 500;
        }
    }
`;

const Resumen = styled.div`
    display: grid;
    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid ${C.linea};
    }
    span {
        color: ${C.gris};
        font-weight: 500;
    }
    strong {
        font-size: 1.05rem;
    }
    .mano input {
        width: 160px;
        color: ${C.texto};
        font-weight: 600;
        text-align: right;
        font-size: 16px;
        padding: 9px 10px 9px 26px;
        border: 1.5px solid ${C.linea};
        border-radius: 10px;
        background: #fdfbf8;
        outline: none;
        &:focus {
            border-color: ${C.dorado};
            box-shadow: 0 0 0 3px rgba(149, 102, 44, 0.15);
        }
    }
    .total {
        border-bottom: none;
        padding-top: 14px;
        span {
            color: ${C.texto};
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 0.85rem;
        }
        strong {
            font-size: 1.6rem;
            color: ${C.doradoOscuro};
        }
    }
`;

const Acciones = styled.div`
    display: none;
    ${ESCRITORIO} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }
`;

const BarraMovil = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    background: white;
    border-top: 1px solid ${C.linea};
    box-shadow: 0 -4px 20px rgba(20, 18, 16, 0.08);
    padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
    display: ${(p) => (p.$oculta ? 'none' : 'flex')};
    align-items: center;
    gap: 8px;
    .total {
        flex: 1;
        display: grid;
        line-height: 1.15;
        min-width: 0;
        span {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: ${C.gris};
        }
        strong {
            font-size: 1.15rem;
            color: ${C.doradoOscuro};
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    button {
        padding: 12px 14px;
    }
    ${ESCRITORIO} {
        display: none;
    }
`;
