"""Genera los PDF de las guías de los alumnos a partir de su Markdown.

Uso:  python scripts/generar_guia_pdf.py [nombre ...]
Sin argumentos genera las de la sesión Git/Deploy (POR_DEFECTO). Las demás guías,
como la de seguridad, se generan pidiéndolas por su nombre:
      python scripts/generar_guia_pdf.py guia_seguridad_alumnos
Necesita el paquete `markdown` (pip install markdown) y Google Chrome o Microsoft Edge.
"""
import posixpath
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import markdown

RAIZ = Path(__file__).resolve().parent.parent
GIT_DEPLOY = "sesiones/2026-11-git-deploy"
SEGURIDAD = "sesiones/2026-12-seguridad-v2"
# nombre de la guía → (carpeta del Markdown, carpeta del PDF), relativas a la raíz del repo
GUIAS = {
    "guia_requisitos_previos": (f"{GIT_DEPLOY}/Guia", f"{GIT_DEPLOY}/descargas"),
    "guia_practica_sesion": (f"{GIT_DEPLOY}/Guia", f"{GIT_DEPLOY}/descargas"),
    "kit_alumno": (f"{GIT_DEPLOY}/Guia", f"{GIT_DEPLOY}/descargas"),
    "guia_seguridad_alumnos": (f"{SEGURIDAD}/HeroCamp-Teoria/Entregables", f"{SEGURIDAD}/descargas"),
}
POR_DEFECTO = ["guia_requisitos_previos", "guia_practica_sesion", "kit_alumno"]
WEB = "https://jagarcig-ntt.github.io/ai-pm-pro-seguridad"
# Chrome o, si no está, Edge (también es Chromium y acepta las mismas opciones)
NAVEGADORES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]

ESTILO = """
@page { size: A4; margin: 15mm 16mm; }
body { font-family: Arial, Helvetica, sans-serif; font-size: 10.5pt; line-height: 1.42; color: #1b1d17; }
h1 { font-size: 22pt; margin: 0 0 4pt; }
h2 { font-size: 13.5pt; margin: 15pt 0 5pt; padding: 3pt 7pt; background: #DCEE3C; break-after: avoid; }
h3 { font-size: 11.5pt; margin: 12pt 0 4pt; break-after: avoid; }
p { margin: 5pt 0; }
ol, ul { margin: 4pt 0; padding-left: 18pt; }
li { margin: 2pt 0; }
a { color: #1b1d17; }
code { font-family: Consolas, monospace; background: #f0f0ea; padding: 0 2pt; }
pre { white-space: pre-wrap; background: #f0f0ea; padding: 5pt 7pt; font-size: 9pt; break-inside: avoid; }
pre code { padding: 0; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0; break-inside: avoid; }
th, td { border: 1px solid #c9c9bf; padding: 4pt 6pt; text-align: left; vertical-align: top; }
th { background: #f0f0ea; }
img { display: block; max-width: 100%; max-height: 54mm; margin: 6pt 0; border: 1px solid #c9c9bf; break-inside: avoid; }
blockquote { margin: 7pt 0; padding: 4pt 9pt; border-left: 4px solid #DCEE3C; background: #f7f7f1; break-inside: avoid; }
.salto { break-after: page; }
.fuentes { font-size: 8pt; color: #5c5c52; }
"""


def enlaces_absolutos(html: str, carpeta: str) -> str:
    """En un PDF los enlaces relativos no funcionan: se convierten en enlaces a la web publicada (GitHub Pages)."""
    def cambiar(m: re.Match) -> str:
        ruta = posixpath.normpath(posixpath.join(carpeta, m.group(1)))
        return f'href="{WEB}/{ruta}"'
    return re.sub(r'href="(?!https?:|#|mailto:)([^"]+)"', cambiar, html)


def navegador() -> str:
    for ruta in NAVEGADORES:
        if Path(ruta).exists():
            return ruta
    sys.exit("No se encuentra Chrome ni Edge. Instala uno de los dos o añade su ruta a NAVEGADORES.")


def generar(nombre: str) -> None:
    if nombre not in GUIAS:
        sys.exit(f"Guía desconocida: {nombre}. Disponibles: {', '.join(GUIAS)}")
    carpeta_md, carpeta_pdf = GUIAS[nombre]
    fuente = RAIZ / carpeta_md / f"{nombre}.md"
    destino = RAIZ / carpeta_pdf / f"{nombre}.pdf"
    cuerpo = markdown.markdown(
        fuente.read_text(encoding="utf-8"), extensions=["tables", "sane_lists", "md_in_html", "fenced_code"]
    )
    cuerpo = enlaces_absolutos(cuerpo, carpeta_md)
    html = (
        '<!doctype html><html lang="es"><head><meta charset="utf-8">'
        f'<base href="{fuente.parent.as_uri()}/"><title>{nombre}</title>'
        f"<style>{ESTILO}</style></head><body>{cuerpo}</body></html>"
    )
    destino.parent.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as carpeta:
        pagina = Path(carpeta) / "guia.html"
        pagina.write_text(html, encoding="utf-8")
        subprocess.run(
            [
                navegador(), "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                f"--user-data-dir={Path(carpeta) / 'perfil'}",
                f"--print-to-pdf={destino}", pagina.as_uri(),
            ],
            check=True, timeout=90,
        )
    print(f"Generado {destino.relative_to(RAIZ)}")


def main() -> None:
    for nombre in sys.argv[1:] or POR_DEFECTO:
        generar(nombre)


if __name__ == "__main__":
    main()
