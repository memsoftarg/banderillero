# Banderillero 🚜

Guía satelital para pulverización y siembra, pensada para usar en un celular o tablet
montado en el tractor. App web de un solo archivo, instalable (PWA) y 100% offline.

**App:** https://memsoftarg.github.io/banderillero/

## Funciones

- Ancho de labor configurable (se guarda entre sesiones)
- Línea A-B con pasadas paralelas; la pasada próxima se activa (continua, verde al estar encima)
- Barra de luces con desvío en cm/m respecto de la pasada activa
- Pintado de cobertura desde la barra del implemento; el solape se marca en rojo
- Hectáreas trabajadas, % de solape, velocidad y precisión GPS
- Tractor dibujado a escala con el botalón, las boquillas y la baliza de aplicación
- Mapa del lote desde KML, KMZ o GPX: contorno con superficie y aviso al salir, y líneas
  de referencia para drenajes o curvas de nivel
- Las líneas se marcan como hechas solas, midiendo cuánto quedó cubierto por el trabajo
- Botón de vista general: encuadra el lote entero para ver de un vistazo qué falta
- Guiado hacia una línea elegida: te lleva a la punta más cercana y después te mantiene encima
- Terminar el trabajo y volver al inicio sin cerrar la app
- Imagen de fondo del lote: KMZ con GroundOverlay (se ubica solo por sus coordenadas) o
  JPG/PNG suelto que se calza a mano con los dedos; queda guardada en el teléfono
- Imagen satelital del lote descargada de una vez con internet y guardada para usar sin señal
  (Esri World Imagery; los mosaicos de Google no se pueden usar así por sus condiciones)
- Precisión del GPS en metros arriba a la derecha
- Exportar el trabajo a KMZ para abrirlo en Google Earth: lo aplicado como imagen sobre el
  terreno, las líneas con su estado, la línea A-B y el resumen de hectáreas y solape
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
- `src/make_icons.py` — íconos originales (los actuales se generaron a partir del logo)

## Precisión

El GPS de un celular tiene un error típico de 2–5 m: sirve para pulverización con
botalones anchos. Para más precisión se puede vincular un receptor GNSS externo por
Bluetooth (el sistema lo toma como ubicación del dispositivo).
