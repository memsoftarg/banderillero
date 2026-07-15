"""Genera los íconos de la PWA Banderillero GPS (tractor estilizado sobre fondo verde oscuro)."""
from PIL import Image, ImageDraw

OUT = "/private/tmp/claude-501/-Users-martinmeichtry-calude-code/1aef4e05-59f6-4eed-972e-4d328e20ced9/scratchpad/banderillero-app"

BG = (12, 18, 13)        # #0C120D
GREEN = (63, 163, 77)    # #3FA34D
BRIGHT = (91, 212, 108)  # #5BD46C
WHITE = (233, 239, 233)  # #E9EFE9
AMBER = (242, 169, 59)   # #F2A93B
GREY = (89, 101, 90)     # #59655A

def make(size, path):
    s = size / 512.0
    img = Image.new("RGB", (size, size), BG)
    d = ImageDraw.Draw(img)
    # franja de pasada pintada (verde) de fondo
    d.rectangle([200*s, 0, 312*s, size], fill=(24, 46, 28))
    # línea de guía
    d.rectangle([250*s, 0, 262*s, size], fill=GREEN)
    # barra del implemento
    d.rectangle([120*s, 380*s, 392*s, 404*s], fill=BRIGHT)
    d.rectangle([120*s, 360*s, 136*s, 424*s], fill=BRIGHT)
    d.rectangle([376*s, 360*s, 392*s, 424*s], fill=BRIGHT)
    # enganche
    d.rectangle([250*s, 330*s, 262*s, 380*s], fill=WHITE)
    # ruedas
    d.rectangle([176*s, 250*s, 216*s, 330*s], fill=GREY)
    d.rectangle([296*s, 250*s, 336*s, 330*s], fill=GREY)
    d.rectangle([190*s, 130*s, 220*s, 180*s], fill=GREY)
    d.rectangle([292*s, 130*s, 322*s, 180*s], fill=GREY)
    # cuerpo con trompa
    d.polygon([(256*s, 60*s), (312*s, 110*s), (312*s, 340*s),
               (200*s, 340*s), (200*s, 110*s)], fill=WHITE)
    # cabina
    d.rectangle([216*s, 200*s, 296*s, 310*s], fill=AMBER)
    img.save(path)
    print(path)

make(192, f"{OUT}/icon-192.png")
make(512, f"{OUT}/icon-512.png")
