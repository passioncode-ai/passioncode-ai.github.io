// The cast of the story (SITE-068 v2): original busts drawn for PassionCode, archetype cues only, no likeness of
// any actor. One sprite injected once; <svg><use href="#cast-<name>"/></svg> draws a character. Colours come from
// CSS custom properties so both looks recolour them: --cast-line, --cast-skin, --cast-dark, --cast-hi.
const SPRITE = `<!-- The cast of the story (SITE-068 v2): original busts drawn for PassionCode, archetype cues only, no likeness of any
     actor. Colours come from CSS custom properties so both looks (terminal, ink) recolour them:
     --cast-line (strokes), --cast-skin, --cast-dark (cloth, hair, lenses), --cast-hi (lens light, shirt). -->
<defs>
 <linearGradient id="cast-lens" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" style="stop-color:var(--cast-hi,#d6ffe2)" stop-opacity=".55"/>
  <stop offset=".35" style="stop-color:var(--cast-dark,#020604)" stop-opacity="1"/>
 </linearGradient>
</defs>

<!-- Morpheus, the PM agent: a bald mentor, small round dark lenses on a thin bridge, a high-collared coat. -->
<symbol id="cast-morpheus" viewBox="0 0 120 120">
 <g fill="none" style="stroke:var(--cast-line,#00ff66)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
  <path d="M14 120 C16 96 30 86 48 82 L60 92 L72 82 C90 86 104 96 106 120 Z" style="fill:var(--cast-dark,#020604)"/>
  <path d="M40 84 L48 74 L60 92 L72 74 L80 84" style="fill:var(--cast-dark,#020604)"/>
  <path d="M60 92 V120"/>
  <path d="M50 70 Q60 78 70 70 L70 80 Q60 86 50 80 Z" style="fill:var(--cast-skin,#0b1f13)"/>
  <path d="M38 44 C38 24 48 16 60 16 C72 16 82 24 82 44 C82 60 74 72 60 72 C46 72 38 60 38 44 Z" style="fill:var(--cast-skin,#0b1f13)"/>
  <path d="M38 44 C35 44 34 50 37 53 M82 44 C85 44 86 50 83 53"/>
  <circle cx="51" cy="44" r="6.5" fill="url(#cast-lens)"/>
  <circle cx="69" cy="44" r="6.5" fill="url(#cast-lens)"/>
  <path d="M57.5 44 H62.5"/>
  <path d="M54 61 Q60 64 66 61"/>
  <path d="M46 28 Q60 22 74 28" stroke-opacity=".35"/>
 </g>
</symbol>

<!-- Trinity, the assessment agent: short slicked hair, narrow oval lenses, a black high neck. -->
<symbol id="cast-trinity" viewBox="0 0 120 120">
 <g fill="none" style="stroke:var(--cast-line,#00ff66)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
  <path d="M20 120 C22 98 36 88 50 86 L60 90 L70 86 C84 88 98 98 100 120 Z" style="fill:var(--cast-dark,#020604)"/>
  <path d="M50 70 L50 88 Q60 92 70 88 L70 70" style="fill:var(--cast-dark,#020604)"/>
  <path d="M52 78 H68 M52 84 H68" stroke-opacity=".35"/>
  <path d="M42 46 C42 28 50 18 60 18 C70 18 78 28 78 46 C78 62 70 74 60 74 C50 74 42 62 42 46 Z" style="fill:var(--cast-skin,#0b1f13)"/>
  <path d="M40 48 C38 26 48 14 62 14 C76 14 84 26 80 48 C78 38 72 30 62 28 C56 32 48 36 40 48 Z" style="fill:var(--cast-dark,#020604)"/>
  <ellipse cx="52" cy="47" rx="7" ry="4.2" fill="url(#cast-lens)"/>
  <ellipse cx="68" cy="47" rx="7" ry="4.2" fill="url(#cast-lens)"/>
  <path d="M59 47 H61"/>
  <path d="M55 63 Q60 65 65 63"/>
 </g>
</symbol>

<!-- Neo, the DevOps agent: dark hair with a short fringe, thin narrow lenses, a long coat with a standing collar. -->
<symbol id="cast-neo" viewBox="0 0 120 120">
 <g fill="none" style="stroke:var(--cast-line,#00ff66)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
  <path d="M12 120 C14 96 30 86 48 84 L60 86 L72 84 C90 86 106 96 108 120 Z" style="fill:var(--cast-dark,#020604)"/>
  <path d="M48 84 L50 74 H70 L72 84" style="fill:var(--cast-dark,#020604)"/>
  <path d="M60 86 V120"/>
  <circle cx="60" cy="96" r="1.6" style="fill:var(--cast-line,#00ff66)"/><circle cx="60" cy="106" r="1.6" style="fill:var(--cast-line,#00ff66)"/>
  <path d="M41 46 C41 28 49 18 60 18 C71 18 79 28 79 46 C79 62 71 74 60 74 C49 74 41 62 41 46 Z" style="fill:var(--cast-skin,#0b1f13)"/>
  <path d="M39 44 C36 24 46 12 60 12 C76 12 85 24 81 44 C78 34 72 30 66 32 C62 26 52 30 46 34 C43 37 41 40 39 44 Z" style="fill:var(--cast-dark,#020604)"/>
  <path d="M44 46 H76" stroke-width="1.6"/>
  <path d="M45 44 H57 L56 50 H46 Z M63 44 H75 L74 50 H64 Z" fill="url(#cast-lens)"/>
  <path d="M55 63 H65"/>
 </g>
</symbol>

<!-- Smith, a worker agent (cloned many times): side-parted short hair, rectangular dark glasses, an earpiece with a
     coiled wire, a suit, a white shirt and a tie. -->
<symbol id="cast-smith" viewBox="0 0 120 120">
 <g fill="none" style="stroke:var(--cast-line,#00ff66)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
  <path d="M12 120 C14 98 30 88 48 86 L60 104 L72 86 C90 88 106 98 108 120 Z" style="fill:var(--cast-dark,#020604)"/>
  <path d="M48 86 L60 104 L72 86 L68 76 H52 Z" style="fill:var(--cast-hi,#d6ffe2)" fill-opacity=".9"/>
  <path d="M57 86 L60 82 L63 86 L61 104 L60 108 L59 104 Z" style="fill:var(--cast-dark,#020604)"/>
  <path d="M48 86 L54 96 M72 86 L66 96" stroke-opacity=".6"/>
  <path d="M42 46 C42 28 50 20 60 20 C70 20 78 28 78 46 C78 62 70 74 60 74 C50 74 42 62 42 46 Z" style="fill:var(--cast-skin,#0b1f13)"/>
  <path d="M41 42 C40 24 50 16 62 16 C74 16 81 24 79 42 C76 32 70 28 58 28 L54 24 C50 30 45 34 41 42 Z" style="fill:var(--cast-dark,#020604)"/>
  <path d="M54 24 L58 28" stroke-width="1.6"/>
  <rect x="44" y="41" width="13" height="8" rx="1.5" fill="url(#cast-lens)"/>
  <rect x="63" y="41" width="13" height="8" rx="1.5" fill="url(#cast-lens)"/>
  <path d="M57 44 H63 M44 44 H41 M76 44 H79"/>
  <path d="M54 63 H66"/>
  <circle cx="80" cy="52" r="2.6" style="fill:var(--cast-dark,#020604)"/>
  <path d="M80 55 C82 60 78 62 80 66 C82 70 78 72 80 78" stroke-width="1.4"/>
 </g>
</symbol>
<!-- The Architect, the agent architect: white hair, a trimmed beard, a light suit, rimless lenses. -->
<symbol id="cast-architect" viewBox="0 0 120 120">
 <g fill="none" style="stroke:var(--cast-line,#00ff66)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
  <path d="M12 120 C14 98 30 88 48 86 L60 100 L72 86 C90 88 106 98 108 120 Z" style="fill:var(--cast-hi,#d6ffe2)" fill-opacity=".85"/>
  <path d="M48 86 L60 100 L72 86" style="fill:var(--cast-dark,#020604)"/>
  <path d="M42 46 C42 28 50 20 60 20 C70 20 78 28 78 46 C78 62 70 74 60 74 C50 74 42 62 42 46 Z" style="fill:var(--cast-skin,#0b1f13)"/>
  <path d="M40 46 C38 24 50 14 62 14 C76 14 84 26 80 46 C78 34 70 28 60 28 C52 28 44 34 40 46 Z" style="fill:var(--cast-hi,#d6ffe2)" fill-opacity=".9"/>
  <path d="M46 58 C48 74 56 80 60 80 C64 80 72 74 74 58 C70 64 50 64 46 58 Z" style="fill:var(--cast-hi,#d6ffe2)" fill-opacity=".9"/>
  <circle cx="52" cy="46" r="5.5"/><circle cx="68" cy="46" r="5.5"/><path d="M57.5 46 H62.5"/>
 </g>
</symbol>

`
export const CAST = ['morpheus', 'trinity', 'neo', 'smith', 'architect']
// The portraits generated through Asset Foundry (project passioncode-site, scenario character-new, 2026-11-18), one
// pick per character; `?cast=svg` shows the drawn busts, `?cast=<name>-<n>,...` tries other candidates. The page
// recolours a portrait: a green duotone in look 1, black ink in look 2 (v2.css), so the generated palette never shows.
export const PICK = { morpheus: 'morpheus-1', trinity: 'trinity-1', neo: 'neo-1', smith: 'smith-3' }
const query = new URLSearchParams(location.search).get('cast')
const picks = query === 'svg' ? {} : { ...PICK, ...Object.fromEntries((query || '').split(',').filter(Boolean).map(v => [v.split('-')[0], v])) }
const DUO = `<filter id="cast-duo" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/>
 <feComponentTransfer><feFuncR type="table" tableValues="0.01 0 0.84"/><feFuncG type="table" tableValues="0.02 1 1"/><feFuncB type="table" tableValues="0.02 0.4 0.89"/></feComponentTransfer></filter>`
export const mountCast = () => {
  if (document.getElementById('cast-sprite')) return
  const holder = document.createElement('div')
  holder.innerHTML = `<svg id="cast-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">${DUO}${SPRITE}</svg>`
  document.body.prepend(holder.firstChild)
  paintCast(document)
}
// Swap every drawn bust under root for its picked portrait (when one is picked).
export const paintCast = root => {
  root.querySelectorAll('svg.av').forEach(svg => {
    const name = (svg.querySelector('use')?.getAttribute('href') || '').replace('#cast-', '')
    if (!picks[name]) return
    const span = document.createElement('span')
    span.className = svg.getAttribute('class') + ' photo'
    span.setAttribute('aria-hidden', 'true')
    span.innerHTML = `<img src="/story/cast/${picks[name]}.jpg" alt="" loading="lazy" decoding="async">`
    svg.replaceWith(span)
  })
}
export const avatar = (name, cls = '') => picks[name]
  ? `<span class="av av-${name} ${cls} photo" aria-hidden="true"><img src="/story/cast/${picks[name]}.jpg" alt="" loading="lazy" decoding="async"></span>`
  : `<svg class="av av-${name} ${cls}" viewBox="0 0 120 120" aria-hidden="true"><use href="#cast-${name}"/></svg>`
