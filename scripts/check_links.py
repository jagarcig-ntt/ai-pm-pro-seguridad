"""Comprueba que los enlaces locales de los portales apuntan a ficheros que existen.

Uso:  python scripts/check_links.py [fichero.html ...]
Sin argumentos revisa index.html, portal_sesion.html y sesiones/*/index.html.
Sale con código 1 si hay algún enlace roto. Pásalo antes de cada push.
"""
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

RAIZ = Path(__file__).resolve().parent.parent
ATRIBUTO = re.compile(r'\b(?:href|src)="([^"]+)"')
REDIRECCION = re.compile(r"location\.replace\('([^']+)'")
EXTERNO = ("http://", "https://", "mailto:", "data:", "#", "javascript:")


def destinos(html: str):
    """(línea, enlace) de cada href/src y del destino de location.replace."""
    for n, linea in enumerate(html.splitlines(), 1):
        for patron in (ATRIBUTO, REDIRECCION):
            for enlace in patron.findall(linea):
                yield n, enlace


def roto(base: Path, enlace: str) -> bool:
    ruta = base / unquote(urlsplit(enlace).path)
    if enlace.endswith("/"):
        ruta = ruta / "index.html"  # GitHub Pages sirve el index.html de la carpeta
    return not ruta.exists()


def main(argv: list[str]) -> int:
    ficheros = [Path(f).resolve() for f in argv] or [
        RAIZ / "index.html",
        RAIZ / "portal_sesion.html",
        *sorted(RAIZ.glob("sesiones/*/index.html")),
    ]
    errores = revisados = 0
    for fichero in ficheros:
        if not fichero.exists():
            continue
        html = fichero.read_text(encoding="utf-8")
        for n, enlace in destinos(html):
            if enlace.startswith(EXTERNO):
                continue
            revisados += 1
            if roto(fichero.parent, enlace):
                errores += 1
                print(f"ROTO  {fichero.relative_to(RAIZ).as_posix()}:{n}  ->  {enlace}")
    print(f"{revisados} enlaces locales revisados en {len(ficheros)} ficheros, {errores} rotos")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
