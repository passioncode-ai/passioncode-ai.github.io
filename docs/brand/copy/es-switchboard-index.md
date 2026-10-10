Contract: brand-contract v1

<!-- Generated from es/switchboard/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Switchboard | Gestor de cuentas de Claude Code y Codex | PassionCode.ai

Gestiona cuentas de Claude Code y Codex, revisa los límites de uso y cambia las solicitudes gestionadas. Descarga Switchboard para macOS y Windows.

Saltar al contenido

PassionCode

.ai

Visión

Para ti

Para organizaciones

Herramientas

Acerca de

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

Descargar

↓

FABRIC SWITCHBOARD · DE PASSIONCODE

# Tus cuentas

# Un cambio más claro

Reúne las cuentas de Claude Code y Codex CLI en un solo espacio local para revisar el uso reportado, separar las cuentas de trabajo de las personales y elegir cuál atiende tu próxima solicitud

EN LA FAMILIA Las cuentas: en qué cuenta se ejecuta cada agente, con sus límites de uso a la vista. Toda la familia

Descargar Switchboard

↓

Ver el código fuente

↗

Código abierto · macOS + Windows · App de escritorio + CLI

UNA HERRAMIENTA / TUS CUENTAS

CLAUDE CODE

+

CODEX CLI

OBTÉN SWITCHBOARD

## Elige tu plataforma

Última versión: 0.6.16. Ambas descargas incluyen la app de escritorio y la switchboard CLI.

⌘

### macOS

Universal · Apple silicon + Intel
macOS 14 o posterior · archivo ZIP

Descargar para macOS

↓

Firmada con Developer ID y notarizada por Apple. Abre el ZIP, mueve Fabric Switchboard a Aplicaciones y ábrela desde allí.

⊞

### Windows

x64 · Instalador de escritorio + CLI
Archivo ZIP · requiere WebView2

Descargar para Windows

↓

Compilada de forma nativa en Windows, aún sin firma Authenticode, por lo que SmartScreen puede mostrar una advertencia. El instalador incluye la CLI.

☰

### Antes de abrirla

Switchboard gestiona cuentas e inicia las CLI oficiales. No las sustituye.

Claude Code o Codex CLI, instalados por separado. Switchboard no incluye ninguna suscripción de proveedor ni créditos de API.

macOS 14 o posterior, en Apple silicon o Intel.

Windows x64 con WebView2. La versión para Windows aún no está firmada con Authenticode.

La app sigue ejecutándose en la barra de menús después de cerrar su ventana y se abre al iniciar sesión; ciérrala desde su menú.

ZIP de macOS · SHA-256

df7b94a8843711d80891ec91e800585eb1fd4db1440c735975615d1f4d3c7905

ZIP de Windows · SHA-256

dfba522d80e4153d45614a04506d8093c0c3374e9d23068b87f4ed29cf13c2a2

Compara antes de abrir: shasum -a 256 en Terminal, Get-FileHash en PowerShell. Un valor distinto significa un archivo distinto; vuelve a descargarlo.

Notas de la versión y sumas de verificación

↗

Notas de instalación

↗

Todas las versiones

↗

Lee las notas de la versión antes de actualizar. La aceptación con cuentas reales de proveedores en cada plataforma se sigue abiertamente en el repositorio.

EL PROBLEMA

## Los límites se agotan

## antes que el trabajo

Una sesión larga puede alcanzar el límite de uso de una cuenta a mitad de una tarea. Entonces el trabajo espera mientras cierras sesión, buscas otra cuenta y vuelves a entrar.

Switchboard evita que el trabajo se detenga. Con la rotación activada, la siguiente solicitud pasa a otra cuenta del mismo pool y la sesión sigue abierta.

DENTRO DE SWITCHBOARD

## Todas tus cuentas en una sola vista

La interfaz real de Switchboard, con cuentas de demostración sintéticas.

Demo en el navegador · sin cuentas reales, credenciales ni solicitudes a proveedores

UN ESPACIO DE TRABAJO LOCAL

## Menos malabares con cuentas

## Más contexto de un vistazo

01 / CUENTAS

### Empieza desde donde estás

Captura de forma explícita la cuenta actual de la CLI, inicia sesión con la CLI oficial o importa perfiles de Claude Swap. Tú decides qué traes a Switchboard.

02 / LÍMITES

### Lo laboral se queda en lo laboral

Agrupa las cuentas en pools, como trabajo y personal. El enrutamiento se mantiene dentro del mismo proveedor y pool.

03 / USO

### Ve los límites que tienes

Consulta las ventanas de cuota reportadas, las horas de reinicio y la antigüedad de cada comprobación. El uso no compatible o desconocido queda claramente marcado.

04 / CAMBIO

### Cambia la siguiente solicitud

Elige una ruta gestionada o activa la rotación según la cuota. Una respuesta en curso conserva la identidad con la que empezó.

05 / ALMACENAMIENTO LOCAL

### Mantén las credenciales en tu equipo

Los secretos guardados usan el llavero de macOS o Windows DPAPI. Los inicios aislados de la CLI crean la copia local del token de acceso que necesita el cliente oficial.

06 / TU FORMA DE TRABAJAR

### Usa una ventana o tu terminal

La app de escritorio y la CLI comparten el mismo runtime. Para las sesiones gestionadas, mantén abierta la app o switchboard serve.

PARA AGENTES · NUEVO EN 0.4

## Tu agente puede ver

## sus propios límites

Switchboard incluye switchboard mcp, un servidor MCP local. Claude Code, Codex u otro cliente MCP pueden leer el uso que queda y pasar su siguiente solicitud a otra cuenta. Ninguna herramienta acepta ni devuelve una credencial.

01 / USO

### Lee lo que queda

Cuota restante de cada cuenta y ventana, con horas de reinicio y la antigüedad de cada comprobación. El uso desconocido se informa como desconocido, nunca como cero.

02 / CAMBIO

### Cambia antes del límite

Un agente puede elegir la cuenta para la siguiente solicitud de su sesión, dentro del mismo proveedor y pool. Cambiar el inicio de sesión de Claude Code para todas las sesiones del Mac requiere el indicador explícito global.

03 / REGLAS DE PROYECTO

### Reglas de proyecto opcionales

Si quieres, inicia la carpeta de un proyecto con una cuenta elegida. Las reglas siguen visibles en la app, se pueden pausar o programar para que caduquen, y nunca detienen la rotación.

01

### Inicia desde Switchboard

Las sesiones que inicias desde la app o la CLI reciben las herramientas cuando se encuentra la switchboard CLI. Las sesiones aisladas reciben solo las herramientas de lectura. En macOS, el panel Agentes enlaza la CLI incluida en la app con ~/.local/bin.

02

### O conecta un agente tú mismo

claude mcp add --scope user switchboard -- switchboard mcp
codex mcp add switchboard -- switchboard mcp

LA PRIMERA SESIÓN

## Trae una cuenta

## Elige cómo se ejecuta

01

### Añade una cuenta

Captura tu autorización actual o usa el inicio de sesión de la CLI oficial. Ponle a la cuenta una etiqueta y un pool.

02

### Revisa lo que se sabe

Revisa la identidad de la cuenta y el uso reportado. La selección gestionada y la cuenta nativa actual de la CLI se muestran por separado.

03

### Inicia tu sesión

Usa el modo gestionado para cambiar de cuenta entre solicitudes, o el modo aislado para una sesión directa fijada a una sola cuenta.

ANTES DE EMPEZAR

## Unas cuantas distinciones útiles

¿Switchboard sustituye a Claude Code o a Codex?

No. Gestiona cuentas e inicia las CLI oficiales. Instala Claude Code o Codex por separado para iniciar sesión y trabajar en sesiones. Switchboard no incluye ninguna suscripción de proveedor ni créditos de API.

¿Cambia automáticamente mi cuenta actual de la CLI?

La captura es una acción explícita. La selección de ruta gestionada es independiente de la activación nativa. La activación nativa de Claude y la rotación automática son operaciones opcionales; revisa la confirmación antes de activarlas.

¿Qué diferencia hay entre gestionada y aislada?

Las sesiones gestionadas envían las solicitudes a través de un proxy local y siguen la ruta que elijas en las solicitudes posteriores. Las sesiones aisladas se conectan directamente usando un directorio de cuenta independiente; las selecciones de ruta posteriores no las modifican.

¿Switchboard es lo mismo que Fabric?

Switchboard es la herramienta de gestión de cuentas disponible hoy. Fabric es nuestro agente de IA con rol de CEO, en vista previa temprana, centrado en coordinar agentes y proyectos. Ambos forman parte del toolkit de PassionCode. Descubre lo que construimos con Fabric.

¿Qué agentes funcionan con Switchboard?

Claude Code, Codex y los demás agentes de programación populares: Hermes, Kilo Code, Cline, Goose, OpenCode y más. Ver los 30 y cómo se conecta cada uno.

¿Un proyecto puede tener sus propias cuentas?

Sí. Crea un proyecto, añade sus carpetas (por ejemplo, varios repositorios relacionados) y elige sus cuentas. Las sesiones iniciadas desde esas carpetas usan solo esas cuentas, el cambio automático se queda dentro de ellas y los agentes que trabajan en otros proyectos nunca cambian a ellas.

¿Switchboard envía algún dato?

Las versiones publicadas cuentan instalaciones, días de uso y cuántas cuentas hay conectadas, por proveedor y tipo. Nunca envían nombres de cuenta, direcciones de correo, inicios de sesión, nombres de pool ni lo que haces con tus cuentas. Un número de instalación aleatorio, compartido por las herramientas de PassionCode.ai en tu equipo, permite contar a una persona una sola vez. Desactívalo en Acerca de → Compartir recuentos de uso anónimos; el interruptor se aplica a todas las herramientas de PassionCode.ai. Qué se envía exactamente.

¿Puedo revisarlo o compilarlo yo mismo?

Sí. Switchboard es de código abierto bajo la GNU AGPL-3.0. Para el uso que la AGPL no cubre, hay una licencia comercial disponible en passioncode.ai/business. Las versiones hasta v0.3.1-beta.1 inclusive se publicaron bajo MIT y siguen disponibles bajo esa licencia. La descarga actual, 0.6.16, se publica bajo la AGPL. v0.4.0-beta.1 se publicó bajo PolyForm Noncommercial o Internal Use y conserva esa licencia. El repositorio incluye instrucciones de compilación, código fuente, pruebas y evidencias de las versiones.

PARTE DEL TOOLKIT DE PASSIONCODE

## Las cuentas son solo una parte

## de la configuración

Switchboard gestiona las cuentas de Claude Code y Codex. Project Observatory mantiene a la vista los proyectos en los que trabajan esos agentes. Fabric Dashboards muestra en una sola ventana los servicios locales de agentes de tu Mac. Fabric, nuestro agente de IA con rol de CEO, está en vista previa temprana.

Conoce Observatory

↗

Versión de Fabric Dashboards

↗

Conoce Fabric

↗

Todas las herramientas

↗

CÓDIGO ABIERTO · LOCAL PRIMERO

## Tu configuración, tu código

Pruébalo, revisa cómo funciona y cuéntanos dónde debe mejorar.

Descargar Switchboard

↑

Informar de un problema

↗

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
