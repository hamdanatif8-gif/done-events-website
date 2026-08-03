const base = import.meta.env.BASE_URL;

export interface MediaSource {
  readonly src: string;
  readonly type: string;
}

/**
 * Local encodes are the primary source: they are keyframe-dense, which is what
 * makes scroll scrubbing smooth. Two codecs are offered on one element — the
 * browser downloads exactly one — so Chrome and Firefox take the lighter VP9
 * while Safari takes H.264.
 *
 * The supplied CloudFront asset is kept only as a runtime fallback for the case
 * where the local files are missing.
 */
export const heroMedia = {
  desktop: [
    { src: `${base}media/nova-hero.webm`, type: 'video/webm; codecs="vp9"' },
    { src: `${base}media/nova-hero.mp4`, type: 'video/mp4; codecs="avc1.4d4028"' },
  ],
  mobile: [
    { src: `${base}media/nova-hero-mobile.webm`, type: 'video/webm; codecs="vp9"' },
    { src: `${base}media/nova-hero-mobile.mp4`, type: 'video/mp4; codecs="avc1.4d401f"' },
  ],
  poster: `${base}media/nova-hero-poster.jpg`,
  remote: [
    {
      src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4',
      type: 'video/mp4',
    },
  ],
} satisfies Record<string, readonly MediaSource[] | string>;

/** Described for assistive technology in place of the decorative footage. */
export const heroMediaDescription =
  'Slow cinematic footage of hanging white cable forms with glowing gold tips above an organic, brain-like form lit from within by warm orange light.';
