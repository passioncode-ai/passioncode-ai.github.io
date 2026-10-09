Contract: brand-contract v1

<!-- Generated from es/dashboards/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Dashboards | Los servicios de agentes de tu Mac, juntos

Una sola ventana del Mac para tus servicios de agentes locales. Ve qué necesita atención, abre paneles y deja que tus agentes usen las mismas herramientas mediante MCP.

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

Descargar

↓

FABRIC DASHBOARDS · macOS

# Tus servicios de agentes

# Un solo lugar donde mirar

Ve qué está en marcha, qué necesita atención y qué pasó por última vez, con el panel propio de cada servicio en una sola app para Mac

EN LA FAMILIA Estado, gasto y control: cada servicio de agentes, su estado, su gasto y sus actualizaciones en una sola ventana. Toda la familia

Descargar para macOS ↓

Ver código fuente ↗

Versión 0.6.5 · macOS 13+ · Apple silicon + Intel

TUS SERVICIOS LOCALES / JUNTOS

LA VENTANA

## Todos los servicios de agentes

## en una sola pantalla

Qué está listo, qué te necesita y cuánto cuesta, con la acción a un clic. Cada servicio abre su propio panel dentro de la app.

La app real, desde su compilación de desarrollo · servicios de ejemplo del kit de Fabric Agent Adapter, sin datos reales

El panel propio de un servicio, abierto en la app

01 / TEN EL TRABAJO A LA VISTA

## Una ventana a

## las herramientas que hacen el trabajo

Fabric Dashboards descubre los servicios compatibles en tu Mac. Cada servicio conserva su propia función; tú obtienes un lugar común para inspeccionarlos y controlarlos.

### Ve qué te necesita

El estado del servicio, la actividad más reciente y los puntos que requieren atención aparecen juntos. Una comprobación lenta no se trata de inmediato como una caída.

### Abre el panel real

La interfaz propia de cada servicio se abre dentro de la app, con la sesión ya iniciada. Project Observatory es un servicio compatible que puedes usar hoy.

### Ocúpate del siguiente paso

Inicia, detén o reinicia un servicio, revisa sus registros y usa las acciones que expone su contrato. Cerrar Dashboards deja tus servicios en marcha.

EN LA 0.6

## Gasto, una consola

## y actualizaciones de confianza

Lo que añadieron las versiones 0.6, desde la 0.6.0 el 6 de octubre hasta la 0.6.5 el 8 de octubre de 2026.

### Todos los límites en Spend

La página Spend lista los límites que aplica cada agente: el que más te necesita aparece en rojo cuando detuvo el trabajo o cruzó su línea, y en ámbar al 80 %, y cada agente se expande para mostrar todos sus límites con su ventana y lo gastado. Tu agente lee la misma lista mediante MCP.

### Una consola de agente junto al panel

Se abre una terminal real junto al panel de un servicio, que ejecuta Claude Code, Codex u otro runtime en el repositorio de ese agente. Cuando Fabric Switchboard asocia la carpeta a un proyecto, la sesión se inicia con la cuenta de ese proyecto.

### Actualizaciones que se comprueban primero

La app se actualiza sola: una versión debe llevar la firma de la organización y coincidir con sus sumas de verificación antes de instalarse, y espera mientras se ejecuta una consola o un comando. La instalación automática se puede desactivar en Ajustes.

### La familia, al día

Ajustes → Estate updates vigila el Fabric Agent Contract y las skills de PassionCode.ai, y puede actualizar las skills en segundo plano tras comprobar quién las publicó. Ese interruptor está desactivado por defecto.

### Inglés o ruso

Ajustes → Language: como en este Mac, English o Русский. La ventana, el menú y la bandeja cambian a la vez.

02 / DESCARGAR FABRIC DASHBOARDS

## Una descarga

## Tus servicios siguen siendo tuyos

### macOS

Versión 0.6.5. DMG universal para Apple silicon e Intel, macOS 13 o posterior. Firmado con Developer ID, notarizado y con el ticket incorporado (stapled).

Descargar Fabric Dashboards ↓

Abre el DMG, arrastra Fabric Dashboards a Aplicaciones y ábrelo. La app se inicia al iniciar sesión; puedes cambiarlo en Ajustes.

### Antes de abrirlo

Los servicios se instalan por separado. Es normal que la lista esté vacía hasta que instales un servicio compatible; Dashboards no convierte cada proceso local en un servicio de agentes.

Prueba Project Observatory, o crea tu propio servicio con el Fabric Agent Adapter. La app en sí no necesita cuenta ni clave de API.

DMG SHA-256

b1d1d7253a32a059686725befb1b9ead53252688a3ce0ae995de3a91106a3ea3

Notas de la versión y sumas de verificación ↗

Guía de instalación ↗

03 / PARA TUS AGENTES

## Los mismos servicios

## desde tu agente

Registra el servidor MCP de la app en tu cliente. Un agente puede listar servicios, obtener enlaces a paneles y usar las operaciones que exponen las reglas de la app.

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Después de instalar la app en Aplicaciones, pídele a tu agente que llame a list_services. Un resultado vacío significa que todavía no hay ningún servicio instalado. Otros clientes MCP pueden ejecutar el mismo ejecutable como servidor stdio. Consulta la guía de configuración de MCP.

04 / CONVIENE SABER

## Encaja en tu entorno

¿Necesito Fabric?

No. Fabric Dashboards funciona por sí solo. Es una de las herramientas de Fabric y puede mostrar servicios compatibles antes de que uses la vista previa temprana de Fabric.

¿Qué servicios aparecen?

Los servicios que publican un descriptor local para fabric-service/0.1. Project Observatory lo admite. El Fabric Agent Contract define el protocolo y el Adapter te ayuda a implementarlo.

¿Es de código abierto?

Fabric Dashboards es de código abierto bajo la GNU AGPL-3.0. Hay una licencia comercial disponible: passioncode.ai/business. La versión 0.1.0 conserva MIT; la 0.2.0 y la 0.3.0 conservan PolyForm Noncommercial o Internal Use. La versión 0.3.1 es la primera bajo la AGPL.

PARTE DE TU ESPACIO DE TRABAJO DE AGENTES

## Empieza con los servicios

## que ya usas

Inspecciona proyectos con Observatory. Configura cuentas con Switchboard. Añade solo las herramientas que tu trabajo necesite.

Conocer las herramientas ↗

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
