# What to tell RK Abogados

Everything the firm has to hear or decide, in one place, so relaying it is
copy-and-paste rather than translation under pressure.

Why this exists: `docs/tracking-plan.md` opens by saying it does not go to the
client, and the things the firm actually needs are scattered through it — an
open-decisions table, a go-live warning, a caveat about behavioural modelling,
source material for a proposal. This is the client-facing half, kept as a
standing document: phases 4 through 7 append to it, and the phase 7 review is
largely a matter of adding a section.

**How to use it.** The English is scaffolding for us. The Spanish is what goes
to the firm — send it as it is. No file paths, event names or container IDs
appear in the Spanish, which is the line `docs/tracking-plan.md` already draws
for client-facing material.

---

## Decisions we are waiting on — phase 3

Each blocks something. The recommendation is ours; the decision is theirs.

| Decision | Our recommendation | If they choose otherwise |
| --- | --- | --- |
| ~~Go-live date for the consent banner~~ | **Settled: 22 September 2026** | Went live with the deploy rather than on an agreed date. It is the reporting baseline for phase 7 onward; nothing before it is comparable with anything after |
| **Banner and modal wording** | Ship ours, marked as a draft | Three category descriptions and the button labels. Pure copy — no code changes |
| **Whether "Personalizar" becomes "Configurar o rechazar"** | Yes | See the legal note below. One string |
| **Whether to re-ask people who accepted in 2025** | No | They accepted analytics before advertising was a separate question, and now read as having declined advertising. If the firm wants a fresh answer, it is one constant |
| **Declining costs them the case reference on that enquiry** | Accept it | Explained below. If they cannot live with it, the fallback is to keep the reference and drop only the campaign cookies — half a day |
| **Both switches in "Personalizar" start ON** | Their call, and they should make it knowingly — see below | Switching either to start OFF is one word each |
| **Wording of the cookie and privacy policy pages** | They write, we supply the facts | `docs/cookie-inventory.md` is the technical input. This is their liability, not ours |
| **Whether rejecting should stop data reaching Google entirely** | Theirs to decide — see below | One Tag Manager setting, no code, reversible in minutes. It decides which sentence they may write in the policy |

### The legal note on the reject button

**Their question will be: why is there no "Reject" on the banner itself?**

Because nothing in force requires one here, and because it was a deliberate
choice rather than an oversight. Ley 21.719 requires consent to be *libre,
informada, específica e inequívoca* but prescribes no banner layout, and
Chile's data protection agency has not published cookie guidance. The rule that
a reject button must sit on the first layer is European — CNIL, AEPD, Garante —
and does not reach a Chilean firm advising Chilean clients.

The residual risk is the asymmetry: accept in one click, decline in two. That
is the pattern European regulators ruled against, and Chile's new agency may
read art. 12 the same way once it starts issuing guidance. Renaming
"Personalizar" to "Configurar o rechazar" costs nothing, changes no layout, and
makes the decline path visible from the first screen. **If the firm ever
markets to Spain or the EU, this has to be revisited and the button goes on the
banner.**

### What "rechazar" means today, and the sentence they cannot write

The firm will want to write "si rechazas, no se envía ningún dato a Google".
As the site is configured today that is **false**, and it is the sentence a
complainant would quote back at them.

Rejecting stops every cookie — Google's and ours — and stops any link between
the visit and a person or an ad click. It does not stop the request itself:
Google still receives the page visited, the referring page, browser details and
the IP address, with nothing attached that identifies anyone. That is Google's
"cookieless ping", and it is lawful without consent precisely because it stores
nothing on the device.

They can choose the stronger version. Blocking Google's tags outright until
consent is one setting in Tag Manager, no code change, reversible in minutes —
and then nothing is sent at all and the sentence becomes true.

The trade, stated honestly: with the tags blocked, a declining visitor is
completely invisible, so they cannot tell "nobody came" from "everybody
declined". The usual argument for keeping the pings is that they feed Google's
statistical modelling — but that only switches on above roughly a thousand
declining visitors a day, which this site will not reach. So the main benefit
does not apply here, and what is left is knowing how many people declined.

Put to them in Spanish:

> **Una decisión sobre qué significa "rechazar"**
>
> Hoy, cuando alguien rechaza las cookies, no se instala ninguna cookie en su
> dispositivo y no es posible reconocerlo ni vincularlo con ningún anuncio. Sin
> embargo, Google sí recibe un aviso anónimo de la visita: la página vista, de
> dónde venía, el navegador y la dirección IP, sin nada que identifique a la
> persona.
>
> Podemos cambiarlo para que, al rechazar, no se envíe absolutamente nada a
> Google. Es un ajuste de configuración, no un cambio en el sitio, y se puede
> revertir en minutos.
>
> A cambio, dejarían de saber cuántas personas rechazan: un visitante que
> rechaza pasaría a ser completamente invisible, y no podrían distinguir "no
> vino nadie" de "todos rechazaron".
>
> **Esta decisión es suya**, porque determina qué pueden afirmar en su política
> de cookies. Si eligen no enviar nada, pueden escribir "no se envía ningún dato
> a Google". Con la configuración actual, esa frase no sería correcta.

### The note on the pre-ticked switches

Inside "Personalizar", both optional categories — analytics and advertising —
start switched **on**. A visitor who opens that panel and presses "Guardar
preferencias" without touching anything grants both — the same as pressing
"Aceptar todas".

This one has a clearer answer against it than the reject-button question did,
and the firm should decide it rather than inherit it. There, no rule existed.
Here, Ley 21.719 requires consent to be *inequívoca* — unambiguous — which is
the precise word a pre-ticked box fails, and the European Court of Justice
settled the identical point in *Planet49* (C-673/17, 2019): a pre-ticked
checkbox is not consent. Chile's wording is borrowed from the same source, so
an agency reading it the same way would not be a surprise.

Two things that are **not** affected, and that keep this narrower than it
sounds:

- Nothing is granted until the visitor presses "Guardar preferencias" or
  "Aceptar todas". Someone who never opens the panel, or who closes it with the
  X, remains fully denied.
- "Aceptar todas" and "Rechazar todas" are unaffected — they mean what they say.

So the exposure is limited to visitors who open the detail panel and confirm
without reading it. Whether that trade is worth making is a judgement about
the firm's own risk appetite, which is theirs. Switching either category to
start off is one word.

A refusal is remembered for thirty days rather than a year, so someone who
declines is asked again in a month. Deliberately not shorter: a refusal that
expires overnight turns the banner into a daily toll, and wearing someone down
until they accept is the textbook reason consent stops counting as freely
given.

---

## Warnings — before go-live, not after

These are the ones that get someone blamed if they arrive as a surprise.

### 1. Their Google Ads conversion numbers will drop, and that is the work doing its job

**Live in production since 22 September 2026.** This was written to be sent
*before* go-live and was not — the deploy went out first. Send it now, today,
rather than letting them find the drop in their own dashboard and ask about it.
The wording below is already adjusted for that.

Send this, in Spanish:

> **Sobre el nuevo banner de cookies, que ya está activo**
>
> Desde el 22 de septiembre el sitio respeta de verdad lo que cada visitante
> elige en el banner de cookies. Hasta ahora medía a todos por igual, aceptaran
> o no.
>
> Esto significa que verán una caída en el número de conversiones en Google Ads
> en los próximos días. **No es que menos personas los estén contactando.**
> Exactamente la misma cantidad de gente reserva y escribe por WhatsApp; lo que
> cambia es cuántas de ellas Google alcanza a ver.
>
> Si sus campañas usan puja automática, Google tardará una o dos semanas en
> ajustarse a los nuevos números. Durante ese periodo conviene no hacer cambios
> bruscos en presupuestos.
>
> A partir de la fecha de activación, cualquier comparación de resultados debe
> medirse desde esa fecha, no contra los meses anteriores: son dos formas
> distintas de contar y mezclarlas produce una caída que no es real.

### 2. People who decline cannot be measured at all

> **Sobre los visitantes que rechazan**
>
> Google ofrece estimar estadísticamente a los visitantes que rechazan cookies,
> pero esa función sólo se activa en sitios con muchísimo más tráfico que el
> suyo. En la práctica, esos visitantes simplemente no aparecerán.
>
> Los informes seguirán siendo útiles: describen a quienes aceptan, y las
> proporciones entre un paso y el siguiente siguen siendo fiables. Lo que no
> podrán decirles es el número absoluto de personas que consideraron
> contactarlos.

### 3. Declining costs the case reference on that enquiry

> **Sobre el código de caso**
>
> Cuando alguien acepta las cookies de publicidad, el sitio le asigna un código
> de caso que viaja en el mensaje de WhatsApp y en la planilla, y que es lo que
> les permite saber qué campaña trajo a esa persona.
>
> Quien rechace la publicidad no recibirá ese código. Su consulta les llega
> igual — el formulario, el correo y la fila en la planilla siguen
> funcionando — pero sin código y sin campaña asociada. Es la consecuencia
> directa de respetar lo que la persona eligió.

---

## What changes for the visitor

Three things, and nothing else:

> **Qué verán sus visitantes**
>
> 1. El banner de cookies ahora ofrece una tercera opción, **publicidad**,
>    separada de la de análisis. Quien quiera puede aceptar que midamos el uso
>    del sitio y aun así rechazar la publicidad personalizada.
> 2. Dentro de "Personalizar" hay ahora tres opciones claras — **rechazar
>    todas**, **guardar preferencias** y **aceptar todas** — y una X para
>    cerrar sin guardar nada.
> 3. Lo que la persona elija ahora controla de verdad lo que Google puede
>    guardar. Antes el banner no hacía nada.
>
> No hay ningún otro cambio visible en el sitio.

And one they will not see, which the firm should know: **the banner had stopped
appearing to anyone at the end of August 2026**, through a bug on our side. It
has been fixed as part of this work. In practice that means nobody has yet made
a choice, so everyone will see the banner as if for the first time.

---

## Answered decisions

Moved here with the date, so the record of who agreed to what outlives the
conversation it happened in.

| Date | Decision | Outcome |
| --- | --- | --- |
| 2026-09-22 | Whether chatbot leads get their own Ads conversion action | Yes, and primary, but created only after phase 7 shows the volume |
| 2026-09-22 | Reject button on the banner itself | No — modal only. Revisit if the firm markets to the EU |
| 2026-09-22 | Whether the site's own attribution cookies honour the banner | Yes, gated behind the advertising category |
| 2026-09-22 | Whether the switches in "Personalizar" start on | Yes, both — see the note above. Flagged to the firm rather than decided for them |
| 2026-09-22 | Go-live date, and therefore the phase 7 reporting baseline | 22 September 2026, set by the deploy rather than chosen |

---

## Still open from earlier phases

Carried from `docs/tracking-plan.md` so nothing is tracked in two places:

- Which of the four Ads conversions are primary and which become secondary. Our
  recommendation is unchanged: the three form conversions primary, the WhatsApp
  click secondary.
- Whether `digitalizame.cl` keeps editor access to Ads and Tag Manager. Two
  parties editing tracking configuration independently is how a container
  acquires thirteen dead linker domains.
- Whether the firm will mark case outcomes in the Sheet. Without it, the
  highest-value item in the whole project cannot happen.
- Whether the phase 6 dashboard is wanted — ask after two or three weeks of
  reading the funnels, not before.
