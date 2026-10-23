Contract: brand-contract v1

<!-- Generated from es/fabric/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric | El hogar de tus proyectos y sus agentes · vista previa temprana para macOS, Windows y Linux | PassionCode.ai

Fabric es el hogar de tus proyectos y sus agentes, en vista previa temprana para macOS, Windows y Linux. Reúne en un solo lugar, en tu ordenador, el tablero, las decisiones, el trabajo y las versiones de un proyecto.

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

Configurar

↓

FABRIC · VISTA PREVIA TEMPRANA

# Un hogar para tus proyectos

# y sus agentes

Fabric guarda en tu ordenador el propósito, el tablero, las decisiones y las versiones de cada proyecto, para todos los agentes que trabajan en él. Lo estamos construyendo para que actúe como el CEO de tus agentes

EN EL CONJUNTO DE HERRAMIENTAS El hogar que comparten todos los agentes de un proyecto: su propósito, su tablero, sus decisiones y sus versiones. Son los pasos 2 y 5 de «Cómo funciona». Todas las herramientas

Configúralo todo con un solo comando →

Descargar Fabric

↓

Ver cómo funciona el trabajo

↓

Vista previa temprana 0.3.11 · macOS, Windows y Linux

LA PRIMERA PANTALLA · CUATRO ACCIONES

Crear un agente

Ponle nombre, di qué hace, elige su carpeta y su agente de programación

Adaptar un agente

Trae uno creado en otro sitio, en una rama nueva

Abrir un proyecto

Una carpeta, o una carpeta con varios proyectos

Crear un proyecto

Un hogar nuevo para su propósito, su tablero y sus versiones

El trabajo del agente se hace en la consola de tu agente de programación

EL PROBLEMA

## Un proyecto dura más

## que una conversación

Un agente puede terminar una tarea y, aun así, el equipo pierde el motivo por el que se hizo. El contexto se dispersa entre chats, las decisiones hay que repetirlas y alguien tiene que volver a armar el trabajo.

Estamos construyendo Fabric en torno al proyecto: el propósito, el equipo, las decisiones y el historial que deben sobrevivir a la siguiente sesión.

EL CICLO DE TRABAJO · DIRECCIÓN

## De la intención

## a un resultado comprobado

Este es el flujo de trabajo hacia el que diseñamos. Describe la dirección de Fabric, no es una promesa de que cada paso esté disponible hoy.

01

### Entender el proyecto

Reunir en un mismo lugar su propósito, su estado actual y el contexto relevante.

02

### Hacer explícito el trabajo

Convertir el objetivo en trabajo con un responsable, un resultado esperado y límites claros.

03

### Coordinar la ejecución

Repartir el trabajo entre personas, agentes y procesos repetibles sin perder el contexto del proyecto.

04

### Revisar y seguir aprendiendo

Contrastar el resultado con la evidencia. Conservar las decisiones y lo aprendido para el siguiente ciclo.

DENTRO DE FABRIC

## Dónde lo dejaste

## Qué te necesita

La ventana real de Fabric, con un espacio de demostración sintético: cuatro proyectos y 28 días de trabajo.

Inicio · proyectos de demostración sintéticos, sin cuentas ni repositorios reales

El tablero · lo que espera tu decisión

Versiones · qué incluyen, por qué y qué lo confirma

Crear un agente · un nombre, una frase, una carpeta, un agente de programación

Adaptar un agente · Fabric lee la carpeta y nada más

La consola después de «Crear» · las preguntas, una a una

La consola después de «Adaptar» · el plan antes de cualquier cambio

Las pantallas Crear y Adaptar son la propia interfaz de Fabric, generada desde su código fuente con datos de ejemplo. El texto de la consola es un ejemplo escrito de lo que hace el agente de programación, no una grabación.

CÓMO LO ESTAMOS CONSTRUYENDO

## Las personas siguen siendo responsables

La coordinación es hacia donde va Fabric, y nunca te sustituye. Tú decides para qué sirve el proyecto y qué puede hacer cada agente.

AUTORIDAD

### El permiso sigue siendo explícito

Los objetivos, las responsabilidades y los límites pertenecen al proyecto. La seguridad de un agente no es permiso para actuar.

ELECCIÓN

### Los agentes se pueden reemplazar

El proyecto debe conservar su propósito y su historial cuando cambias de proveedor o del agente que hace el trabajo.

EVIDENCIA

### Los resultados necesitan un comprobante

Una tarea terminada debe venir con algo que una persona pueda comprobar, no solo con un agente que diga que está hecha.

DESCARGAR FABRIC

## Una vista previa temprana

## para Mac, Windows y Linux

Última vista previa: 0.3.11. Fabric funciona en tu ordenador con una base de datos local; tus proyectos se quedan en esta máquina.

⌘

### macOS

Apple silicon e Intel (universal) · macOS 13 o posterior
Instalador DMG · firmado con Developer ID y notarizado por Apple

Descargar para macOS

↓

Abre el DMG y arrastra Fabric a Aplicaciones. El mismo DMG funciona en los Mac con Apple silicon e Intel.

⊞

### Windows

x64 (Intel y AMD) y arm64 · instalador de Windows
Se instala para tu usuario · firmado con Authenticode

Descargar para Windows x64

↓

Windows en Arm (arm64) ↓

Ejecuta el archivo de instalación. Las terminales que abre Fabric usan PowerShell.

>_

### Linux

x64 y arm64
Paquete .deb o AppImage

Descargar el .deb para x64

↓

.deb para arm64 ↓

AppImage para x64 ↓

AppImage para arm64 ↓

Mejor el .deb: abre los enlaces fabric:// y mantiene una sola ruta para registrar fabric-mcp. Una AppImage se monta en una ruta nueva cada vez que arranca.

☰

### Antes de abrirlo

Fabric inicia su propia base de datos local con la CLI de Supabase dentro de Docker.

En macOS: Docker Desktop u OrbStack, en ejecución, y la CLI de Supabase: brew install supabase/tap/supabase

En Windows: Docker Desktop con WSL2, en ejecución, y la CLI de Supabase: scoop install supabase

En Linux: Docker Engine, en ejecución, y la CLI de Supabase

Claude Code o Codex CLI, con la sesión iniciada, para que los agentes trabajen

Si falta Docker o la CLI, Fabric te dice cuál en el primer inicio. Consulta con qué agentes de programación funciona Fabric y qué puede hacer cada uno en él.

Todavía no en Windows y Linux: Fabric no lee si has iniciado sesión en un agente de programación, y lo dice. Todavía no en Windows: conectar el secreto de un producto en la nube a través de Project Observatory.

Notas de la versión y suma de verificación

↗

Ver código fuente

↗

Esta es una vista previa temprana. Puedes llevar proyectos, un tablero de decisiones, tareas, objetivos, un pulso del trabajo y versiones con sus comprobantes. La conversación con Fabric guarda tus mensajes, pero Fabric todavía no responde. Una versión más reciente no actualiza por sí sola una base de datos existente; te indica el comando que debes ejecutar. Los agentes registrados en este Mac pueden pedirle a Fabric, a través de su centro local de agentes, acceso a un producto conectado, como Fabric Inbox; tú permites o rechazas cada solicitud y puedes revocarla en Ajustes. Desde la 0.3.2, Fabric envía recuentos de uso anónimos: solo cantidades y tipos, nunca nombres, rutas ni contenido; puedes desactivarlos en Ajustes → Compartir recuentos de uso, y eso se aplica a todas las apps de PassionCode.ai de tu Mac.

Fabric es de código abierto bajo la GNU AGPL-3.0, y hay una licencia comercial disponible en passioncode.ai/business para los usos que la AGPL no cubre. La vista previa 0.3.11 se compila, se firma y se notariza en CI a partir de ese código público.

FUNCIONA CON FABRIC

## Cuatro herramientas alrededor del hogar

## Cada una funciona también por su cuenta

Fabric guarda el proyecto. Estas cuatro herramientas funcionan con Fabric y también por su cuenta, así que puedes empezar por cualquiera.

Fabric Switchboard

Elige la cuenta con la que se ejecuta cada agente, con los límites de uso a la vista.

↗

Fabric Dashboards

Todos los servicios locales de agentes en una sola ventana, manejados por ti o por agentes.

↗

Project Observatory

Qué ha cambiado en cada proyecto y qué requiere atención, con las pruebas.

↗

Fabric Inbox

El correo de Gmail y de Cloudflare en una sola lista, lo importante primero; los agentes responden según las reglas.

↗

01

DISPONIBLE AHORA

### Un solo comando lo configura todo

En un Mac, las cuatro herramientas y Fabric (cuando están Docker y la CLI de Supabase), con sus servidores MCP y las skills, desde versiones verificadas. Vuelve a ejecutarlo más tarde y revisa y repara.

Configurar

02

DIRECCIÓN

### Añadir una herramienta desde Fabric

Elegir e instalar las herramientas sin salir de Fabric es lo que estamos construyendo.

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
