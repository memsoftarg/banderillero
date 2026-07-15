# Banderillero GPS 🚜

Guía satelital para pulverización y siembra, pensada para usar en un celular o tablet
montado en el tractor. App web de un solo archivo, instalable (PWA) y 100% offline.

**App:** https://memsoftarg.github.io/banderillero/

## Funciones

- Ancho de labor configurable (se guarda entre sesiones)
- Línea A-B con pasadas paralelas; la pasada próxima se activa (continua, verde al estar encima)
- Barra de luces con desvío en cm/m respecto de la pasada activa
- Pintado de cobertura desde la barra del implemento; el solape se marca en rojo
- Hectáreas trabajadas, % de solape, velocidad y precisión GPS
- Modo demo con volante para probar sin GPS
- Funciona sin señal: el GPS no usa datos y el service worker deja la app instalada

## Instalación en el teléfono

1. Abrir la URL en el navegador del celu
2. Menú → "Agregar a pantalla de inicio" (Android Chrome ofrece "Instalar aplicación")
3. La primera carga necesita internet; después abre siempre, aun sin señal

## Estructura

- `index.html` — la app completa (generada)
- `sw.js`, `manifest.json`, `icon-*.png` — PWA/offline
- `src/banderillero.html` — código fuente de la app
- `src/build.sh` — regenera `index.html` desde la fuente
- `src/make_icons.py` — regenera los íconos

## Precisión

El GPS de un celular tiene un error típico de 2–5 m: sirve para pulverización con
botalones anchos. Para más precisión se puede vincular un receptor GNSS externo por
Bluetooth (el sistema lo toma como ubicación del dispositivo).
