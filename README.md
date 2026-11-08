# Una rosa para Siomara 🌹❤️

Este regalo es una página web estática personalizada para Siomara. Incluye una rosa SVG que florece progresivamente, partículas luminosas, una carta y música instrumental original generada por el navegador.

## Archivos
- `index.html`: contenido y estructura de la página.
- `styles.css`: diseño adaptable a celulares y computadoras.
- `script.js`: animación, dedicatoria y música original.

## Verla en tu computadora
1. Descomprime el archivo ZIP.
2. Abre la carpeta `rosa-para-siomara`.
3. Haz doble clic en `index.html` para abrirlo con Chrome, Edge o Firefox.
4. Pulsa **Haz florecer tu rosa**. La música comenzará con esa interacción. También puedes pausarla o activarla con el botón de música.

No necesitas instalar Python, PHP, una base de datos ni un servidor. La música es sintetizada en el navegador y no utiliza una canción comercial.

## Personalización
Los datos de Siomara ya están configurados al comienzo de `script.js`, dentro del objeto `PERSONALIZACION`:
- Título: `Para Siomara ❤️`
- Dedicatoria: `Quiero que sepas lo especial que eres para mí. Cada día a tu lado es un regalo y, aunque esta rosa sea digital, representa una pequeña parte de todo el amor que siento por ti.`
- Firma: `Tu gordito bello`

Puedes cambiar esos textos y guardar el archivo si más adelante quieres editar la dedicatoria.

## Publicarla gratis con GitHub Pages
1. Crea una cuenta o inicia sesión en https://github.com/.
2. Crea un repositorio nuevo llamado `rosa-para-siomara`.
3. Sube `index.html`, `styles.css` y `script.js` (también puedes subir este README).
4. En el repositorio, abre **Settings → Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**.
6. Elige la rama `main` y la carpeta `/(root)`; pulsa **Save**.
7. Espera a que GitHub publique la página. El enlace aparecerá en Settings → Pages y tendrá una forma similar a `https://TU-USUARIO.github.io/rosa-para-siomara/`.
8. Abre el enlace desde un celular para comprobarlo y compártelo con Siomara por WhatsApp.

El repositorio debe ser público para usar GitHub Pages en el plan gratuito. No subas información privada.

## Compatibilidad y notas
- Recomendado: Chrome, Edge, Firefox o Safari actualizados.
- La animación funciona sin conexión. Google Fonts necesita internet; si no está disponible, se usará una fuente alternativa.
- El audio se inicia después de pulsar el botón de florecer o el botón de música, porque los navegadores bloquean la reproducción automática.
- La música es una melodía sencilla original generada con Web Audio API; no es un archivo MP3 ni una canción protegida por derechos de autor.
