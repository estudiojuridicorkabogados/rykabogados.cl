# Cookies y medición del sitio web: lo que cambió y lo que necesitamos de ustedes

*22 de septiembre de 2026*

Este documento tiene dos partes: qué cambió en el sitio, y cinco decisiones
que son suyas. La más importante tiene fecha: **1 de diciembre de 2026**,
cuando entra en vigencia la Ley 21.719.

## 1. Qué cambió

Desde el 22 de septiembre el sitio respeta de verdad lo que cada visitante
elige en el banner de cookies. Hasta ahora medía a todos por igual, aceptaran
o no: por un error nuestro, el banner había dejado de mostrarse a fines de
agosto. Está corregido, y en la práctica todos los visitantes verán el banner
como si fuera la primera vez.

Lo que verán:

1. Además de las cookies de **análisis** (medir cómo se usa el sitio), el
   banner ahora pregunta por separado por las cookies de **publicidad**
   (vincular una consulta con el anuncio de Google que la trajo). Se puede
   aceptar una y rechazar la otra.
2. Dentro de "Personalizar" hay tres opciones: **rechazar todas**, **guardar
   preferencias** y **aceptar todas**, más una X para cerrar sin guardar.
3. Quien rechaza es recordado durante 30 días y después se le vuelve a
   preguntar. Quien acepta, durante un año.

No hay ningún otro cambio visible.

## 2. Decisiones que son suyas

### Decisión 1, con fecha: qué significa "rechazar" a partir del 1 de diciembre

**Situación actual.** Cuando alguien rechaza, no se instala ninguna cookie y
Google no puede reconocerlo ni vincularlo con un anuncio. Pero Google sí
recibe un aviso de cada página visitada: la página, de dónde venía, el
navegador y la **dirección IP**. Es el diseño estándar de Google y es de uso
generalizado en Europa.

**El problema.** La Ley 21.719 define dato personal de forma muy parecida a
la europea, y una dirección IP enviada a un tercero muy probablemente
encaja. Chile no tiene una ley de cookies, así que el argumento "no se guarda
nada en el dispositivo" no sirve aquí: lo que hace falta es una base legal
para tratar ese dato. La única disponible sería el interés legítimo, y
sostenerlo frente a una persona que acaba de pulsar "Rechazar" es difícil,
más aún cuando ese aviso no les aporta nada: quien rechaza no aparece en los
informes de todas formas. No podemos decir que sea ilegal —la agencia que
aplicará la ley aún no existe y no ha publicado criterios—, pero es la parte
del sitio con más exposición a partir de diciembre.

**Nuestra recomendación.** Mantener la configuración actual, que es la
estándar de Google, hasta que la ley entre en vigencia, y cambiarla antes
del 1 de diciembre para que, al rechazar, no se envíe absolutamente nada a
Google. Es un ajuste de configuración que toma minutos y se puede revertir.
El costo es casi nulo, porque esos visitantes ya no aparecen en los informes
hoy. Si prefieren hacer el cambio ahora, se hace de inmediato.

**Mientras tanto, la política de cookies no puede decir "si rechazas, no se
envía ningún dato a Google".** Esa frase hoy no es correcta y es la que
alguien citaría en una reclamación. Sí puede decir que no se instalan
cookies y que Google no puede identificar ni reconocer al visitante.

Lo mismo aplica a las métricas de Vercel (la empresa que aloja el sitio):
no usan cookies, pero derivan un identificador diario a partir de la IP y el
navegador. Lo que decidan para Google conviene aplicarlo también ahí, o
mencionar en la política de privacidad el interés legítimo en que se apoya.

### Decisión 2: los interruptores de "Personalizar" empiezan encendidos

Cuando alguien abre "Personalizar", las dos categorías opcionales aparecen
**activadas**. Quien pulsa "Guardar preferencias" sin tocar nada acepta
ambas, igual que si hubiera pulsado "Aceptar todas".

Esto es una casilla premarcada. La Ley 21.719 exige que el consentimiento
sea *inequívoco*, y el Tribunal de Justicia de la Unión Europea resolvió en
*Planet49* (C-673/17, 2019) que una casilla premarcada no es consentimiento.
Como la redacción chilena viene de la misma fuente, no sería raro que la
nueva agencia la lea igual.

El alcance es acotado: nadie acepta nada sin pulsar un botón, y "Aceptar
todas" y "Rechazar todas" significan exactamente lo que dicen. La exposición
se limita a quien abre el panel y confirma sin leerlo. Un dato de nuestras
propias pruebas: a alguien que sabía exactamente lo que quería hacer se le
escapó un clic en un interruptor y terminó aceptando todo sin darse cuenta.

**Nuestra recomendación:** que empiecen apagados. Cambiarlo toma minutos.
Pero la decisión es suya, porque el riesgo es suyo.

### Decisión 3: si "Personalizar" pasa a llamarse "Configurar o rechazar"

El banner tiene dos botones: "Personalizar" y "Aceptar todas". Rechazar está
a un clic más, dentro de "Personalizar". Ninguna norma vigente en Chile
exige un botón de rechazo en el primer plano; esa regla es europea. El
riesgo residual es la asimetría —aceptar en un clic, rechazar en dos—, que
es exactamente el patrón que los reguladores europeos han sancionado.

**Nuestra recomendación:** renombrar el botón a "Configurar o rechazar". No
cambia nada más y hace visible desde el primer momento que se puede
rechazar.

### Decisión 4: si se vuelve a preguntar a quienes aceptaron en 2025

Quienes aceptaron antes de que existiera la categoría de publicidad
aceptaron sólo análisis, y hoy el sitio los trata como si hubieran rechazado
la publicidad. **Nuestra recomendación:** no volver a preguntarles. Si
prefieren que hagan una elección nueva, se cambia en minutos.

### Decisión 5: los textos

- **El texto del banner y del panel** está publicado con nuestra redacción,
  como borrador. Cualquier cambio es sólo de texto.
- **La política de cookies y la de privacidad** las redactan ustedes.
  Nosotros entregamos el inventario completo de cookies del sitio (qué
  guarda cada una, por cuánto tiempo y quién la recibe). Dos puntos que la
  política actual no refleja: el sitio envía a Google Ads, con consentimiento
  de publicidad, una versión cifrada del correo y teléfono de quien envía un
  formulario; y la sección que dice que no se comparte información con
  terceros no se sostiene junto a eso.

## Resumen

| Decisión | Nuestra recomendación | Fecha |
| --- | --- | --- |
| 1. Qué se envía a Google cuando alguien rechaza | Mantener hasta la vigencia de la ley, cambiar antes del 1 de diciembre | **1 de diciembre de 2026** |
| 2. Interruptores premarcados en "Personalizar" | Que empiecen apagados | Cuanto antes |
| 3. Renombrar "Personalizar" a "Configurar o rechazar" | Sí | Cuanto antes |
| 4. Volver a preguntar a quienes aceptaron en 2025 | No | — |
| 5. Textos del banner y de las políticas | Banner: revisar el borrador. Políticas: las redactan ustedes con nuestro inventario | Antes del 1 de diciembre |

---

## Respuesta del estudio — 24 de septiembre de 2026

Recibida y aplicada. Tres decisiones quedaron resueltas y ya están en el sitio;
dos siguen abiertas, y una de ellas es una pregunta dirigida a nosotros.

| Decisión | Su respuesta | Estado |
| --- | --- | --- |
| 1. Qué se envía a Google al rechazar | sin respuesta | **Abierta** — sigue con fecha: 1 de diciembre de 2026 |
| 2. Interruptores premarcados | Apagados por defecto, activación manual | **Hecho** |
| 3. Botón de rechazo | Más de lo propuesto: "Rechazar" explícito en el banner, junto a "Personalizar" | **Hecho** |
| 4. Volver a pedir el consentimiento | Sí, aunque ya se haya otorgado | **Hecho** |
| 5. Textos | El texto del banner no es del todo exacto y lo reescriben ustedes | **Abierta** — esperamos su redacción |
| Nueva | Plazos de conservación: 6 meses con consentimiento, nada si se rechaza. ¿Qué plazo es técnicamente necesario? | **Abierta** — la respuesta es nuestra |

Sobre la decisión 4, conviene dejar constancia de cómo la interpretamos: al
pie de la letra. La pregunta era por quienes aceptaron antes de que existiera
la categoría de publicidad, pero "aunque se haya otorgado previamente" alcanza
también a quienes aceptaron entre el 22 y el 24 de septiembre, con el panel
premarcado y sin botón de rechazo en el banner —es decir, exactamente de la
forma que ustedes acaban de descartar—. Se borra todo y se vuelve a preguntar
a todos.

**Una advertencia que corresponde repetir.** Los tres cambios empujan el
consentimiento hacia abajo y entran juntos. Las conversiones registradas van a
bajar otro escalón en los días siguientes, y la puja automática de Google
tardará unas dos semanas en reajustarse, encima del reajuste que empezó el 22
de septiembre. Es un cambio de medición, no del negocio, pero conviene saberlo
antes y no después.

**Lo que les debemos.** La respuesta técnica sobre plazos de conservación
—qué período hace falta realmente para que los informes sigan sirviendo—,
antes de que ustedes decidan. Entran tres plazos distintos en la cuenta y no
son el mismo: la cookie que guarda su propia elección (hoy un año si aceptan,
30 días si rechazan), el período de retención de Google Analytics, y las
ventanas de conversión de Google Ads.
