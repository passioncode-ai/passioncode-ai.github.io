// SITE-068 v5, the side diagram and the white rabbit (the operator, 2026-11-18: «где-то сбоку появляется схема,
// динамически рисуется ... потом это все переезжает дальше ... Иди за белым кроликом ... эта точка, которая нас ведет
// через это все ... это был белый кролик»). The rail lists the comic's frames as a chain; a node and the line to it are
// drawn when the reader reaches that frame, the chain slides so the current node stays in view, and the rabbit hops
// from node to node. The rabbit exists only on the red path (into the Matrix); under the pills it peeks from below and
// jumps toward the pill the reader presses.
export const RABBIT = `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
 <g fill="#f4fff8" stroke="#06110b" stroke-width="1.6" stroke-linejoin="round">
  <path class="ear ear-b" d="M33 22 C30 8 33 1 37 2 C41 3 40 13 37 23 Z"/>
  <path class="ear ear-f" d="M38 23 C39 9 44 3 48 5 C51 7 47 16 42 25 Z"/>
  <ellipse cx="24" cy="44" rx="17" ry="13"/>
  <circle cx="42" cy="32" r="10"/>
  <circle cx="9" cy="42" r="4"/>
  <path d="M30 54 q4 6 10 3 M14 54 q-2 6 6 4" fill="none"/>
 </g>
 <circle cx="45.5" cy="30" r="1.6" fill="#06110b"/>
 <circle cx="51.5" cy="33.5" r="1.3" fill="#ff7aa2"/>
</svg>`

export function mountRail({ panels, labelOf }) {
  const rail = document.createElement('aside')
  rail.className = 'rail'
  rail.setAttribute('aria-label', 'Story map')
  rail.hidden = true
  const track = document.createElement('ol')
  track.className = 'rail-track'
  panels.forEach((p, i) => {
    const li = document.createElement('li')
    li.className = 'rail-node'
    li.dataset.i = i
    li.innerHTML = `<i class="dot" aria-hidden="true"></i><span class="lbl">${labelOf(p)}</span>`
    li.addEventListener('click', () => rail.dispatchEvent(new CustomEvent('rail:go', { detail: i })))
    track.appendChild(li)
  })
  const bunny = document.createElement('span')
  bunny.className = 'rabbit rail-rabbit'
  bunny.innerHTML = RABBIT
  track.appendChild(bunny)  // inside the track: it slides with the chain and only hops between nodes
  rail.append(track)
  document.body.appendChild(rail)

  let current = -1
  const strip = matchMedia('(max-width:1240px)')
  strip.addEventListener?.('change', () => { const i = current; current = -1; if (i >= 0) set(i) })
  const nodes = [...track.querySelectorAll('.rail-node')]
  const set = i => {
    if (i === current) return
    const from = current
    current = i
    nodes.forEach((n, k) => { n.classList.toggle('drawn', k <= i); n.classList.toggle('on', k === i) })
    const node = nodes[i]
    if (!node) return
    // the chain slides so the current node sits at 40% of the rail (down the side, or along the strip on a narrow screen)
    const dot = node.querySelector('.dot')
    if (strip.matches) {
      track.style.transform = `translateX(${rail.clientWidth * 0.4 - node.offsetLeft}px)`
      bunny.style.setProperty('--x', `${node.offsetLeft + dot.offsetLeft - 9}px`)
    } else {
      track.style.transform = `translateY(${Math.min(0, rail.clientHeight * 0.4 - (node.offsetTop + 10))}px)`
      bunny.style.setProperty('--y', `${node.offsetTop + dot.offsetTop - 30}px`)
    }
    bunny.classList.remove('hop'); void bunny.offsetWidth
    if (from >= 0) bunny.classList.add('hop')
  }
  const show = on => { rail.hidden = !on; document.documentElement.classList.toggle('has-rail', on) }
  return { el: rail, bunny, set, show, index: () => current }
}
