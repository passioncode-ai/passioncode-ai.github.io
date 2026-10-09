Contract: brand-contract v1

<!-- Generated from es/observatory/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Project Observatory | Panel local para proyectos operados por agentes | PassionCode.ai

Ve qué cambió en tus proyectos, qué necesita atención y dónde dejaron una copia las claves de API conocidas. Project Observatory es un panel local de código abierto de PassionCode.ai, en inglés o ruso.

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

PROJECT OBSERVATORY · DE PASSIONCODE

# Tus proyectos

# De nuevo a la vista

Ve qué cambió en los proyectos de tus agentes, qué necesita atención y dónde dejaron una copia las claves de API conocidas, en un panel local disponible en inglés o ruso

EN LA FAMILIA Memoria y evidencia: qué cambió en cada proyecto, qué se decidió y qué necesita atención. Toda la familia

Empezar

↓

Ver código fuente

↗

Código abierto · macOS + Linux · Python 3.11+

UNA VISTA / TUS PROYECTOS

PROYECTOS

+

HALLAZGOS

DENTRO DE OBSERVATORY

## Primero lo que necesita atención

La vista general real de Observatory, generada por el motor sobre los proyectos de una empresa ficticia.

Entorno de demostración sintético · sin proyectos, repositorios ni credenciales reales

UN OBSERVATORY LOCAL

## Menos conjeturas

## Más evidencia de un vistazo

01 / INVENTARIO

### Sabe qué existe

Elige la carpeta de proyectos que quieres observar. Observatory encuentra los repositorios que hay dentro y mantiene un registro local, con la regla detrás de cada vínculo.

02 / ACTIVIDAD

### Ve qué se movió

Commits, estado del árbol de trabajo y trabajo que solo existe en esta máquina, en cada proyecto del alcance, con la evolución semana a semana de cada uno.

03 / HALLAZGOS

### Empieza por lo que importa

Los hallazgos vienen con su evidencia y un siguiente paso, ordenados de crítico a informativo. Los hallazgos silenciados conservan quién los silenció, cuándo y por qué.

04 / CLAVES

### Encuentra copias de claves conocidas

Los metadatos de las credenciales se mantienen separados de los valores. Las transcripciones, los registros y los almacenes SQLite seleccionados se comparan con las claves ya conocidas localmente; los hallazgos nunca repiten un valor.

05 / TU IDIOMA

### Inglés o ruso

El panel está en inglés por defecto. Configura el ruso para el espacio de trabajo o cambia con EN/RU en la barra lateral; los recuentos usan las formas de plural de cada idioma.

06 / AGENTES

### Dale contexto al siguiente agente

Una CLI, herramientas MCP y un plugin de Claude Code comparten los mismos datos locales. Las integraciones y las tareas en segundo plano se mantienen desactivadas hasta que las elijas.

DESCARGAR OBSERVATORY

## Empieza con tu propio espacio de trabajo

Última versión: 0.19.4. No se necesita ninguna clave de API para la primera observación local. Entrega la instalación a tu agente de programación o ejecútala tú mismo.

01

### Instala la versión

Descargar project_observatory-0.19.4-py3-none-any.whl y SHA256SUMS de la versión 0.19.4, compruébalos con shasum -a 256 -c SHA256SUMS --ignore-missing, y luego, en un entorno aislado de Python 3.11+ con soporte para extensiones de SQLite, ejecuta pip install --no-deps para el wheel y después para su extra [full] con -c "$(project-observatory full-path)/requirements-full.lock", el conjunto de dependencias con el que se probó la versión. En macOS, usa Python de Homebrew.

02

### Crea un espacio de trabajo privado

project-observatory full init, y luego elige la carpeta que quieres observar con full configure sources projects. La configuración, las claves y el historial se quedan fuera del código instalado.

03

### Observa y abre

project-observatory full local, y luego full open. Para ruso: full configure interface locale ru.

04

### Conecta tu agente

El servidor MCP habla por stdio: claude mcp add observatory --scope user -e OBSERVATORY_HOME="$OBSERVATORY_HOME" -- "$(python -c 'import sys; print(sys.executable)')" "$(project-observatory full-path)/mcp/server.py", y luego pide observatory_overview.

Guía de instalación

↗

Puesta en marcha e integraciones

↗

Todas las versiones

↗

App para Mac: ProjectObservatory-0.19.4-macos.zip, firmada con Developer ID y notarizada por Apple, para macOS 14+. Se abre en el panel y usa el motor instalado arriba; compárala con el mismo SHA256SUMS.

La versión actual, 0.19.4, está bajo la AGPL, como todas las versiones desde la 0.10.0, la primera bajo la AGPL; la 0.9.1 y las anteriores conservan la licencia con la que se publicaron.

El análisis de valores conocidos compara artefactos seleccionados con claves ya conocidas localmente. No puede encontrar secretos desconocidos ni demostrar que no queda ninguna copia, y una copia local no es prueba de que otra persona haya obtenido una clave. La rotación en vivo con proveedores y los hosts MCP externos quedan fuera de la suite de pruebas sin conexión.

ANTES DE EMPEZAR

## Algunas distinciones útiles

¿Observatory sube mis proyectos o mis claves?

No. El inventario, el historial y las observaciones viven en tu espacio de trabajo privado, en tu máquina. Las integraciones opcionales tienen su propio acceso; cada una se activa por separado con tu propia cuenta.

¿Qué lee?

Solo las carpetas y las fuentes que configuras. full doctor informa de qué está activado y qué falta, y el panel indica cuándo una fuente no se midió en lugar de mostrar cero.

¿Es lo mismo que Switchboard?

No. Switchboard gestiona tus cuentas de Claude Code y Codex. Observatory mantiene a la vista los proyectos en los que trabajan esos agentes. Ambas son herramientas de código abierto de PassionCode que puedes usar hoy.

¿Y Fabric?

Fabric es nuestro agente de IA con rol de CEO, en vista previa temprana, centrado en coordinar agentes y proyectos. Observatory está disponible ahora como una herramienta local independiente. Conocer Fabric.

¿Puedo inspeccionarlo o compilarlo yo mismo?

Sí. Project Observatory es de código abierto bajo la GNU AGPL-3.0. Para los usos que la AGPL no cubre, hay una licencia comercial disponible en passioncode.ai/business. Las versiones publicadas conservan su licencia: la 0.8.1 y las anteriores, bajo MIT; de la 0.8.2 a la 0.9.1, bajo PolyForm Noncommercial o Internal Use. En el repositorio se incluyen el código fuente, las pruebas, el modelo de seguridad y las notas de las versiones.

CÓDIGO ABIERTO · LOCAL PRIMERO

## Tus proyectos, tu evidencia

Configura un espacio de trabajo privado, observa tus propias carpetas y cuéntanos dónde debe mejorar.

Empezar

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
