import Character from './Character'
import { Media } from './primitives'
import { useScene, gsap } from '../lib/motion'
import { animateCharacter } from '../lib/characterMotion'

/**
 * The inverse of the poster: here the media is held still and the typography
 * is the thing that travels, sliding across the picture and out the far side
 * while a colour bar wipes back over it. The character walks the other way
 * along the bottom edge, crossing behind the word as they pass.
 */
export default function PinnedScene({ photo, word, caption, character }) {
  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    animateCharacter(q('.pinned__char svg')[0], 'pour')

    gsap
      .timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=150%',
          pin: q('.pinned__stage')[0],
          anticipatePin: 1,
          scrub: 0.5,
        },
      })
      .fromTo(q('.pinned__word'), { xPercent: 34 }, { xPercent: -52, ease: 'none' }, 0)
      .fromTo(q('.pinned__char'), { xPercent: -140 }, { xPercent: 340, ease: 'none' }, 0)
      .fromTo(q('.pinned__bar'), { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 0.5 }, 0.35)
      .fromTo(q('.pinned__media img'), { scale: 1.18 }, { scale: 1, ease: 'none' }, 0)
  }, [photo])

  return (
    <section className="pinned" ref={scope}>
      <div className="pinned__stage">
        <figure className="pinned__media plate">
          <Media name={photo} sizes="100vw" />
        </figure>
        <span className="pinned__bar" aria-hidden="true" />
        {character && (
          <div className="pinned__char" aria-hidden="true">
            <Character name={character} />
          </div>
        )}
        <p className="pinned__word u-display" aria-hidden="true">
          {word}
        </p>
        <p className="pinned__caption u-mono">{caption}</p>
      </div>
    </section>
  )
}
