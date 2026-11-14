# Presupuestador

Cotizador web para armar presupuestos y generarlos en PDF. No tiene backend: corre entero en el navegador y se publica gratis con GitHub Pages.

**Web:** https://pabloratti.github.io/Presupuestador/

## Cómo está organizado el repo

- **Raíz del repo** → la web ya compilada (`index.html`, `assets/`). Es lo que publica GitHub Pages. No se edita a mano.
- **`codigo-fuente/`** → el proyecto React (Vite). Acá se hacen los cambios.

```
codigo-fuente/src/
├── App.jsx                  # botón para cambiar de estilo (nuevo / clásico)
├── useCotizador.js          # lógica: ítems, totales, generar PDF (la comparten los dos estilos)
├── Components/
│   ├── Moderno.jsx          # estilo nuevo Loro Negro (responsive: celular y compu)
│   ├── Form.jsx             # estilo clásico original
│   └── PdfPreview.jsx       # visor del PDF dentro de la página ("Ver PDF")
└── pdf/
    ├── index.js             # plantillas de PDF disponibles y cuál se usa por defecto
    └── templates/
        ├── loroNegro.js     # plantilla Loro Negro (la que se usa)
        └── clasicoMC.js     # plantilla original Mauro Canet
```

## Hacer un cambio y publicarlo

```bash
cd codigo-fuente
npm install
npm run dev          # para probar en http://localhost:5173
npm run build        # compila en codigo-fuente/dist
```

Después de compilar, reemplazar el `index.html` y la carpeta `assets/` de la raíz del repo por los de `codigo-fuente/dist/`, hacer commit y push a `master`. GitHub Pages se actualiza solo en uno o dos minutos.
