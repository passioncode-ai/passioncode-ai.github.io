Contract: brand-contract v1

<!-- Generated from es/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | Correo con lo importante primero · vista previa de escritorio | PassionCode.ai

Fabric Inbox es la herramienta de correo de Fabric y funciona por sí sola: buzones de Gmail y Cloudflare en una sola lista con el correo importante primero, y agentes en tus propias direcciones. Vista previa de desarrollo para macOS, Windows y Linux.

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

Deutsch

Français

Polski

한국어

Português (Brasil)

简体中文

日本語

Configurar

↓

FABRIC INBOX · VISTA PREVIA DE DESARROLLO

# Tu correo

# Lo importante primero

Reúne los buzones de Gmail y Cloudflare en una sola lista, con el correo importante primero. Los agentes de tus propios dominios responden lo que permites y dejan el resto como borrador

EN EL CONJUNTO DE HERRAMIENTAS Correo: las direcciones que los agentes leen y responden dentro de la política que defines. Es el paso 5 de «Cómo funciona». Todas las herramientas

Configúralo todo con un solo comando →

Descargar para macOS

↓

Ver qué hace

↓

Vista previa de desarrollo 0.77.3 · macOS 12+ · Windows · Linux · código abierto bajo la AGPL-3.0

FABRIC INBOX / CORREO + AGENTES

IMPORTANTE

+

RESPONDIDO

NUEVO EN 0.15

## Tu agente de programación

## trabajando en Inbox

La versión 0.15 pone a Claude Code o Codex junto a tu correo y le permite configurar Inbox por ti. La consola funciona desde 0.15.1: en 0.15.0 no arrancaba. Cómo se conecta un agente ↓

CONSOLA DEL AGENTE

### Tu agente en un panel lateral

Claude Code o Codex se ejecuta a la derecha de la ventana del correo, ya conectado a este Inbox, y puede hacer todo lo que hace la app. Ábrela con el botón de la barra de herramientas, View → Agent Console o ⌃⌘T (Ctrl+Mayús+T en Windows y Linux). Cada sesión recibe su propia clave, con el nivel que elijas, y la clave se revoca cuando termina la sesión. La versión de la Mac App Store no tiene la consola.

CONFIGURADO POR TU AGENTE

### Ninguna dirección ni secreto que copiar

Tu agente de programación crea el servidor en tu cuenta de Cloudflare y luego se conecta solo cuando lo permites en la app. Pegas el token, inicias sesión y eliges Allow. La pantalla de bienvenida ofrece Use the server your agent set up.

CORREO NO RECIBIDO

### El correo que el servidor no pudo recibir

Cuando un mensaje no pudo ser ni aceptado ni rechazado, los ajustes del dominio muestran para quién era, cuándo y por qué. Puede que su remitente recibiera un aviso de rebote, así sabes a quién preguntar.

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

Todas las bandejas · direcciones y correos de ejemplo, sin cuentas reales

DESCARGAR FABRIC INBOX

## Una vista previa de desarrollo

## para Mac, Windows y Linux

Última vista previa: 0.77.3. La app crea su servidor de correo en tu propia cuenta de Cloudflare y lo abre; tu correo se queda en tus cuentas.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 o posterior
Instalador DMG · firmado con Developer ID y notarizado por Apple

Descargar para macOS

↓

Abre el DMG y arrastra Fabric Inbox a Aplicaciones.

Una copia de Mac anterior a 0.15.2 no puede actualizarse sola: descarga 0.15.2 una vez e instálala sobre la anterior. Las versiones siguientes vuelven a instalarse solas.

⊞

### Windows y Linux

La versión 0.77.3 también incluye un instalador de Windows para x64 y arm64 que no necesita permisos de administrador, firmado con Authenticode desde la 0.14.1, y un AppImage y un .deb de Linux para x64 y arm64.

Descargas para Windows y Linux

↗

La app de Windows y el AppImage se actualizan solos; una copia instalada desde el .deb no, así que instala el siguiente .deb. En Linux, la app guarda tu inicio de sesión en el Secret Service (GNOME Keyring o KWallet) y no se inicia sin él.

☰

### Antes de abrirlo

Al abrirlo por primera vez, elige Create my server on Cloudflare. Si el servidor lo creó tu agente de programación, elige en su lugar Use the server your agent set up.

Una cuenta de Cloudflare; el plan gratuito sirve

Un token de API que creas en su panel, con los permisos que indica la app

Para Gmail: un cliente OAuth de tu propio proyecto de Google Cloud

En la guía de configuración se enumeran todos los ajustes.

DMG para macOS · SHA-256

eb118f3a0a9eefc337b045c0ebfcaddee83ecdeedb9343f5681bf6c6376923dd

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

### Dale una frase a tu agente

En la app, abre Settings → Agent access. Primero muestra la frase que debes darle a tu agente de programación. El agente crea el servidor en tu cuenta de Cloudflare y se conecta solo cuando eliges Allow; no copias ninguna dirección ni ningún secreto. Los pasos del agente están en la guía de configuración para agentes.

02

### O crea una clave tú mismo

En la misma pantalla, elige un nombre, un nivel (read, mail o admin) y si puede enviar. El secreto se muestra una sola vez.

03

### Conecta tu agente

Para una clave que creaste tú, la app muestra el comando completo: claude mcp add --transport http fabric-inbox https://<your-server>/mcp con los dos encabezados de la clave. Después pide list_accounts.

02 / EL CONJUNTO DE HERRAMIENTAS DE PASSIONCODE

## Cada herramienta con su función

Inbox se encarga del correo. Switchboard gestiona las cuentas de Claude Code y Codex. Project Observatory mantiene a la vista los proyectos en los que trabajan esos agentes. Fabric, en vista previa temprana, es el hogar de tus proyectos y sus agentes.

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

No. Inbox es un cliente de correo; sus agentes responden a tus direcciones dentro de las reglas que defines. Fabric, en vista previa temprana, es el hogar de tus proyectos y sus agentes. Pertenecen al mismo conjunto de herramientas y tienen funciones distintas.

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

Inversores

Colaborar

Prensa

Sistema de diseño

Privacidad

commercial@passioncode.ai

X

↗
