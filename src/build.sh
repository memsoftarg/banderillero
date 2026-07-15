#!/bin/sh
# Regenera ../index.html (la app publicada) a partir de banderillero.html (fuente).
cd "$(dirname "$0")"

{
  printf '<!DOCTYPE html>\n<html lang="es">\n<head>\n'
  printf '<meta name="mobile-web-app-capable" content="yes">\n'
  printf '<meta name="apple-mobile-web-app-capable" content="yes">\n'
  printf '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n'
  printf '<meta name="theme-color" content="#0C120D">\n'
  printf '<link rel="manifest" href="manifest.json">\n'
  printf '<link rel="apple-touch-icon" href="icon-192.png">\n'
  printf '<link rel="icon" type="image/png" href="icon-192.png">\n'
  printf '<script>\nif ("serviceWorker" in navigator) {\n  addEventListener("load", () => {\n    navigator.serviceWorker.register("sw.js").catch(() => {});\n  });\n}\n</script>\n'
  printf '</head>\n<body>\n'
  cat banderillero.html
  printf '\n</body>\n</html>\n'
} > ../index.html

echo "OK: ../index.html regenerado"
