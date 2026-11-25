"""Comprueba que los tres prompts de chequeo de Seguridad v2 son idénticos en todos sus sitios.

Uso:  python scripts/check_prompts.py
Compara los prompts de:
  - HeroCamp-Teoria/Entregables/prompts_chequeo_lovable.md   (bloques ```text, la referencia)
  - HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md    (bloques ```text)
  - index.html del portal, bloques .copiable de la sección #prompts
    (el texto que copia el botón: sin el botón, con las entidades HTML deshechas y sin espacios en los extremos)
Si el portal todavía no tiene la sección #prompts, compara solo los dos .md y lo avisa.
Sale con código 1 si algún prompt no coincide o falta. Pásalo antes de cada push (SPEC-024).
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SESION = RAIZ / "sesiones" / "2026-12-seguridad-v2"
ENTREGABLES = SESION / "HeroCamp-Teoria" / "Entregables"
REFERENCIA = ENTREGABLES / "prompts_chequeo_lovable.md"
GUIA = ENTREGABLES / "guia_seguridad_alumnos.md"
PORTAL = SESION / "index.html"
NUM_PROMPTS = 3
BLOQUE_TEXT = re.compile(r"^```text\n(.*?)\n```", re.S | re.M)


def prompts_md(ruta: Path):
    """[(línea, texto)] de cada bloque ```text del fichero."""
    contenido = ruta.read_text(encoding="utf-8")
    return [(contenido[: m.start()].count("\n") + 1, m.group(1).strip()) for m in BLOQUE_TEXT.finditer(contenido)]


class ExtraeCopiables(HTMLParser):
    """Texto de los .copiable dentro de <section id="prompts">, como lo copia el botón."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.en_prompts = False
        self.secciones = 0       # profundidad de <section> dentro de #prompts
        self.hay_seccion = False
        self.profundidad = 0     # profundidad de etiquetas dentro del .copiable actual
        self.en_boton = 0
        self.actual = None       # [línea, trozos] del .copiable abierto
        self.prompts = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "section":
            if self.en_prompts:
                self.secciones += 1
            elif a.get("id") == "prompts":
                self.en_prompts, self.secciones, self.hay_seccion = True, 1, True
            return
        if not self.en_prompts:
            return
        if self.actual is not None:
            self.profundidad += 1
            if tag == "button" and "copiar" in (a.get("class") or "").split():
                self.en_boton = self.profundidad
        elif "copiable" in (a.get("class") or "").split():
            self.actual, self.profundidad = [self.getpos()[0], []], 0

    def handle_endtag(self, tag):
        if tag == "section" and self.en_prompts:
            self.secciones -= 1
            self.en_prompts = self.secciones > 0
            return
        if self.actual is None:
            return
        if self.profundidad == 0:
            self.prompts.append((self.actual[0], "".join(self.actual[1]).strip()))
            self.actual = None
            return
        if self.en_boton == self.profundidad:
            self.en_boton = 0
        self.profundidad -= 1

    def handle_data(self, data):
        if self.actual is not None and not self.en_boton:
            self.actual[1].append(data)


def prompts_portal():
    """(hay_seccion, [(línea, texto)])."""
    p = ExtraeCopiables()
    p.feed(PORTAL.read_text(encoding="utf-8"))
    return p.hay_seccion, p.prompts


def primera_diferencia(a: str, b: str) -> str:
    la, lb = a.splitlines(), b.splitlines()
    for i, (x, y) in enumerate(zip(la, lb), 1):
        if x != y:
            return f"línea {i} del prompt:\n      referencia: {x!r}\n      aquí:       {y!r}"
    return f"distinto número de líneas ({len(la)} en la referencia, {len(lb)} aquí)"


def comparar(nombre: str, ruta: Path, referencia, otros) -> int:
    errores = 0
    rel = ruta.relative_to(RAIZ).as_posix()
    if len(otros) != NUM_PROMPTS:
        print(f"✗ {nombre}: {len(otros)} prompts, se esperaban {NUM_PROMPTS} ({rel})")
        errores += 1
    for i, ((_, ref), (linea, txt)) in enumerate(zip(referencia, otros), 1):
        if ref == txt:
            print(f"✓ {nombre}, prompt {i} ({rel}:{linea})")
        else:
            print(f"✗ {nombre}, prompt {i} ({rel}:{linea}): {primera_diferencia(ref, txt)}")
            errores += 1
    return errores


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    referencia = prompts_md(REFERENCIA)
    if len(referencia) != NUM_PROMPTS:
        print(f"✗ {REFERENCIA.relative_to(RAIZ).as_posix()}: {len(referencia)} prompts, se esperaban {NUM_PROMPTS}")
        return 1
    errores = comparar("Guía", GUIA, referencia, prompts_md(GUIA))
    hay_seccion, portal = prompts_portal()
    if hay_seccion:
        errores += comparar("Portal", PORTAL, referencia, portal)
    else:
        print(f"⚠ Portal: todavía no tiene la sección #prompts ({PORTAL.relative_to(RAIZ).as_posix()}); solo se comparan la guía y el fichero de prompts")
    print("✓ Los prompts coinciden" if not errores else f"✗ {errores} diferencia(s)")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main())
