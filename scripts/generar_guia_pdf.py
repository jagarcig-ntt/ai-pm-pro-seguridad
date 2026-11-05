"""Genera el PDF de la guía de requisitos previos a partir de su Markdown.

Uso:  python scripts/generar_guia_pdf.py
Necesita el paquete `markdown` (pip install markdown) y Google Chrome.
"""
import subprocess
import tempfile
from pathlib import Path

import markdown

RAIZ = Path(__file__).resolve().parent.parent
SESION = RAIZ / "sesiones" / "2026-11-git-deploy"
FUENTE = SESION / "Guia" / "guia_requisitos_previos.md"
DESTINO = SESION / "descargas" / "guia_requisitos_previos.pdf"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

ESTILO = """
@page { size: A4; margin: 15mm 16mm; }
body { font-family: Arial, Helvetica, sans-serif; font-size: 10.5pt; line-height: 1.42; color: #1b1d17; }
h1 { font-size: 22pt; margin: 0 0 4pt; }
h2 { font-size: 13.5pt; margin: 15pt 0 5pt; padding: 3pt 7pt; background: #DCEE3C; break-after: avoid; }
p { margin: 5pt 0; }
ol, ul { margin: 4pt 0; padding-left: 18pt; }
li { margin: 2pt 0; }
a { color: #1b1d17; }
code { font-family: Consolas, monospace; background: #f0f0ea; padding: 0 2pt; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0; break-inside: avoid; }
th, td { border: 1px solid #c9c9bf; padding: 4pt 6pt; text-align: left; vertical-align: top; }
th { background: #f0f0ea; }
img { display: block; max-width: 100%; max-height: 54mm; margin: 6pt 0; border: 1px solid #c9c9bf; break-inside: avoid; }
blockquote { margin: 7pt 0; padding: 4pt 9pt; border-left: 4px solid #DCEE3C; background: #f7f7f1; break-inside: avoid; }
.salto { break-after: page; }
.fuentes { font-size: 8pt; color: #5c5c52; }
"""


def main() -> None:
    cuerpo = markdown.markdown(
        FUENTE.read_text(encoding="utf-8"), extensions=["tables", "sane_lists", "md_in_html"]
    )
    html = (
        '<!doctype html><html lang="es"><head><meta charset="utf-8">'
        f'<base href="{FUENTE.parent.as_uri()}/"><title>Guía de requisitos previos</title>'
        f"<style>{ESTILO}</style></head><body>{cuerpo}</body></html>"
    )
    DESTINO.parent.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as carpeta:
        pagina = Path(carpeta) / "guia.html"
        pagina.write_text(html, encoding="utf-8")
        subprocess.run(
            [
                CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                f"--user-data-dir={Path(carpeta) / 'perfil'}",
                f"--print-to-pdf={DESTINO}", pagina.as_uri(),
            ],
            check=True, timeout=90,
        )
    print(f"Generado {DESTINO.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
