import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Form from './Components/Form';
import Moderno from './Components/Moderno';
import useCotizador from './useCotizador';

const CLAVE_ESTILO = 'presupuestador.estilo';

function leerEstilo() {
    try {
        return localStorage.getItem(CLAVE_ESTILO) || 'moderno';
    } catch (e) {
        return 'moderno';
    }
}

function App() {
    // Los datos cargados se comparten: al cambiar de estilo no se pierde nada
    const c = useCotizador();
    const [estilo, setEstilo] = useState(leerEstilo);

    useEffect(() => {
        try {
            localStorage.setItem(CLAVE_ESTILO, estilo);
        } catch (e) {
            /* sin localStorage: se usa el estilo por defecto */
        }
    }, [estilo]);

    const esModerno = estilo === 'moderno';

    return (
        <>
            <CambiarEstilo
                type="button"
                $moderno={esModerno}
                onClick={() => setEstilo(esModerno ? 'clasico' : 'moderno')}
                title="Cambiar el estilo visual"
            >
                {esModerno ? 'Estilo clásico' : 'Estilo nuevo'}
            </CambiarEstilo>

            {esModerno ? (
                <Moderno c={c} />
            ) : (
                <div className="App">
                    <header className="App-header">
                        <Form c={c} />
                    </header>
                </div>
            )}
        </>
    );
}

const CambiarEstilo = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20;
    font-family: 'Montserrat', system-ui, sans-serif;
    font-size: 11px;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid ${(p) => (p.$moderno ? '#95662c' : 'black')};
    background: ${(p) => (p.$moderno ? 'transparent' : 'white')};
    color: ${(p) => (p.$moderno ? '#d8c3a5' : 'black')};
`;

export default App;
