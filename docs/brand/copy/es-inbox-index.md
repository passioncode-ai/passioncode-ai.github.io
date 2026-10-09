Contract: brand-contract v1

<!-- Generated from es/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | Correo con lo importante primero · vista previa para macOS | PassionCode.ai

Fabric Inbox es la herramienta de correo de Fabric y funciona por sí sola: buzones de Gmail y Cloudflare en una sola lista con el correo importante primero, y agentes en tus propias direcciones. Vista previa de desarrollo para macOS.

Saltar al contenido

PassionCode

.ai

Productos

Switchboard

Observatory

Inbox

Fabric

Español

English

Русский

Português (Brasil)

GitHub

↗

FABRIC INBOX · VISTA PREVIA DE DESARROLLO

# Tu correo

# Lo importante primero

Reúne los buzones de Gmail y Cloudflare en una sola lista, con el correo importante primero y agentes para tus propios dominios que responden lo que permites y redactan borradores del resto

EN LA FAMILIA Correo: las direcciones que los agentes leen y responden dentro de la política que defines. Toda la familia

Descargar para macOS

↓

Ver qué hace

↓

Vista previa de desarrollo 0.12.0 · macOS 12 o posterior · código abierto bajo la AGPL-3.0

FABRIC INBOX / CORREO + AGENTES

IMPORTANTE

+

RESPONDIDO

01 / QUÉ HACE

## Menos que leer

## Menos que responder

Inbox ordena todas las cuentas de la misma manera y da a las direcciones de tus dominios alguien que las responda.

LO IMPORTANTE PRIMERO

### Lo que te necesita, arriba

Primero va el correo sin leer de una persona, el de seguridad e inicio de sesión, las alertas de monitorización, los rechazos de revisión de apps, los pagos fallidos y las compilaciones fallidas. Los boletines, las notificaciones, la facturación y el resto quedan en grupos plegados con su recuento. Cada fila indica por qué está ahí.

TUS DOMINIOS

### Todas las direcciones en un solo lugar

Activa el correo para un dominio de tu cuenta de Cloudflare, incorpora las direcciones que ya tiene y añade otras nuevas. Cada dirección existente sigue reenviando una copia adonde iba antes. El correo dirigido a una dirección sin buzón aparece en la lista y nunca se descarta.

AGENTES, DENTRO DE TUS REGLAS

### Envía solo lo que puede

Un agente tiene sus propias instrucciones, conocimiento y herramientas, y puede atender varias direcciones. Solo envía una respuesta cuando se apoya en su conocimiento, encaja en un tema que permitiste y respeta su límite diario. Todo lo demás queda esperando como borrador, con el motivo.

DESCARGAR FABRIC INBOX

## Una vista previa de desarrollo

## para tu Mac

Última vista previa: 0.12.0. La app para Mac crea su servidor de correo en tu propia cuenta de Cloudflare y lo abre; tu correo se queda en tus cuentas.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 o posterior
Instalador DMG · firmado con Developer ID y notarizado por Apple

Descargar para macOS

↓

Abre el DMG y arrastra Fabric Inbox a Aplicaciones.

☰

### Antes de abrirlo

Al abrirlo por primera vez, elige Create my server on Cloudflare.

Una cuenta de Cloudflare; el plan gratuito sirve

Un token de API que creas en su panel, con los permisos que indica la app

Para Gmail: un cliente OAuth de tu propio proyecto de Google Cloud

En la guía de configuración se enumeran todos los ajustes.

DMG para macOS · SHA-256

a8e55bc8c8ad8837f079ad161104096cd14f1c09e08efaa883028642c0f136c7

Compara antes de abrirlo: shasum -a 256 en Terminal. Un valor distinto significa un archivo distinto; descárgalo de nuevo.

Notas de la versión y suma de verificación

↗

Notas de instalación

↗

Todas las versiones

↗

Esta es una vista previa de desarrollo. Las respuestas de los agentes todavía no se han probado con una llamada real a un modelo, y Gmail todavía no se ha aceptado en una cuenta real. El soporte general de IMAP y de Outlook está planificado; ninguno de los dos se ofrece hoy como una integración que funcione.

PARA AGENTES

## Todo lo que hace la app,

## puede hacerlo un agente

Tu servidor responde al Model Context Protocol en /mcp. Cada función de la app es también una herramienta MCP, así que Claude Code u otro cliente MCP puede leer, ordenar y enviar correo y gestionar direcciones dentro del nivel de su clave.

01

### Crea una clave

En la app, abre Settings → Agent access. Elige un nombre, un nivel (read, mail o admin) y si puede enviar. El secreto se muestra una sola vez.

02

### Conecta tu agente

La app muestra el comando completo: claude mcp add --transport http fabric-inbox https://<your-server>/mcp con los dos encabezados de la clave. Después pide list_accounts.

02 / LA FAMILIA PASSIONCODE

## Cada herramienta con su función

Inbox se encarga del correo. Switchboard gestiona las cuentas de Claude Code y Codex. Project Observatory mantiene a la vista los proyectos en los que trabajan esos agentes. Fabric es el agente de IA con rol de CEO que estamos construyendo para coordinar el trabajo.

Conocer Switchboard

↗

Conocer Observatory

↗

Conocer Fabric

↗

ANTES DE EMPEZAR

## En qué punto está Inbox

¿Adónde va mi correo?

Al servidor que la app crea en tu propia cuenta de Cloudflare. Las cuentas de Gmail se conectan mediante un cliente OAuth de tu propio proyecto de Google Cloud.

¿Responderá mi correo por sí solo?

Solo en las direcciones a las que asignes un agente, y solo con las respuestas que sus reglas permitan. El correo automático, masivo o de tipo no-reply nunca se responde, y cada ejecución registra exactamente lo que se envió.

¿Admite cualquier cuenta de correo?

Todavía no. En la vista previa funcionan los buzones de Cloudflare y Gmail. El soporte general de IMAP y de Outlook está planificado.

¿El código fuente es público?

Sí. Fabric Inbox es de código abierto bajo la GNU AGPL-3.0. Para los usos que la AGPL no cubre, hay una licencia comercial disponible en passioncode.ai/business. Nació como la plantilla Agentic Inbox de Cloudflare, que conserva su propio aviso Apache-2.0. En el repositorio se incluyen el código fuente, las pruebas y las notas de las versiones.

¿Inbox es el agente Fabric?

No. Inbox es un cliente de correo; sus agentes responden a tus direcciones dentro de las reglas que defines. Fabric es nuestro agente de IA con rol de CEO, en vista previa temprana. Pertenecen al mismo conjunto de herramientas y tienen funciones distintas.

PassionCode

.ai

Del vibe coding al passion coding

Empezar

Visión

Para organizaciones

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub y código fuente

Acerca de

Sistema de diseño

Privacidad

commercial@passioncode.ai

Twitter

↗
