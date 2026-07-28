import Character from './Character'
import { family } from './characterFamily'
import { useScene, gsap } from '../lib/motion'
import { animateCharacter, gestures } from '../lib/characterMotion'

/**
 * A character placed into a composition rather than beside it.
 *
 * `depth` decides whether the character stands in front of the type or behind
 * it, which is what makes a word feel like scenery the crew can walk through.
 * The idle loop runs on the inner element and the scroll gesture on the outer
 * one, so the two never fight over the same transform.
 */
export default function CharacterScene({
  name,
  className = '',
  depth = 'front',
  travel = true,
  style,
  gesture,
}) {
  const spec = family[name]
  const move = gesture ?? gestures[spec?.motion] ?? gestures.rise

  const scope = useScene(
    (self, root) => {
      const svg = root.querySelector('svg')
      animateCharacter(svg, spec?.motion)

      if (!travel) return
      gsap.fromTo(root, move.from, {
        ...move.to,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })
    },
    [name, travel],
  )

  if (!spec) return null

  return (
    <div className={`charscene charscene--${depth} ${className}`} style={style} ref={scope}>
      <Character name={name} />
    </div>
  )
}
