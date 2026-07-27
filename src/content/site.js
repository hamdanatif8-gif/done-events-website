// ---------------------------------------------------------------------------
// DONE EVENTS & ENTERTAINMENT — single source of truth for copy, facts, media.
// Facts are deliberately honest: no invented clients, project names or figures.
// ---------------------------------------------------------------------------

export const brand = {
  name: 'DONE EVENTS & ENTERTAINMENT',
  shortName: 'DONE EVENTS',
  tagline: 'Day to Night. Done Right.',
  city: 'DUBAI, UNITED ARAB EMIRATES',
  cityShort: 'DUBAI, UAE',
  edition: 'EVENTS, PRODUCTION & HOSPITALITY',
}

export const contact = {
  location: 'Dubai, United Arab Emirates',
  phoneDisplay: '+971 58 555 4446',
  phoneHref: '+971585554446',
  email: 'info@doneevents.ae',
  whatsapp: 'https://wa.me/971585554446',
}

export const img = (name, width) => `${import.meta.env.BASE_URL}media/img/${name}-${width}`

// Every photograph used on the site, with honest alt text.
export const photos = {
  runway: {
    base: 'runway',
    widths: [640, 1200, 1774],
    fallback: 'runway-1400.jpg',
    alt: 'An evening event walkway lined with lit tables and greenery leading to an illuminated stage set',
  },
  corporate: {
    base: 'corporate',
    widths: [640, 1200],
    alt: 'Guests seated at a candlelit corporate gala dinner in Dubai',
  },
  weddings: {
    base: 'weddings',
    widths: [640, 1200],
    alt: 'Guests gathered at an elegant wedding celebration in Dubai',
  },
  beachSkyline: {
    base: 'beach-skyline',
    widths: [640, 1200],
    alt: 'An outdoor waterfront event beside the Dubai skyline',
  },
  concerts: {
    base: 'concerts',
    widths: [640, 1200],
    alt: 'A live concert stage lit for a performance in front of an audience',
  },
  production: {
    base: 'production',
    widths: [640, 1200],
    alt: 'Technicians operating a live event from the production control desk',
  },
  catering: {
    base: 'catering',
    widths: [640, 1200],
    alt: 'A candlelit waterfront dinner table set for evening guests in Dubai',
  },
  club: {
    base: 'club',
    widths: [640, 1200],
    alt: 'A late-night lounge environment lit for a private social event',
  },
  candlelit: {
    base: 'candlelit',
    widths: [640, 1200],
    alt: 'A candlelit private dinner setting arranged for a milestone occasion',
  },
  beach: {
    base: 'beach',
    widths: [640, 1200],
    alt: 'An open-air beachside event set up for evening hospitality',
  },
}

// ---------------------------------------------------------------------------
// The chapters. One continuous page; the rail scrolls between them.
// `field` is the chapter-cover colour field, `stage` the page ground it sets.
// ---------------------------------------------------------------------------
export const chapters = [
  {
    id: 'ch00',
    nav: 'CH.00',
    number: '00',
    title: 'INTRO',
    coverTitle: 'INTRO',
    field: 'var(--grey)',
    ink: 'var(--ink)',
    glyph: 'flare',
    glyphTint: 'warm',
    footLeft: 'DONE EVENTS & ENTERTAINMENT',
    footRight: 'DUBAI, UNITED ARAB EMIRATES',
    heading: 'ONE TEAM,\nEND TO END',
    lede: 'DONE Events & Entertainment is a Dubai events company. Creative direction, production and hospitality sit under one line of responsibility, so the idea and the plan that delivers it are made in the same room.',
    body: [
      'One team holds the brief, budget, suppliers, schedule and the live event end to end. Nothing is traded between agencies, and nothing falls between them.',
      'The work runs from conferences, launches and awards to weddings, concerts, waterfront hospitality and private occasions — the same standard applied at every scale.',
    ],
    standards: [
      { number: '01', title: 'One direction', description: 'Creative and operational calls are made in the same room, not traded between teams.' },
      { number: '02', title: 'Full ownership', description: 'Every supplier, handover and cue answers to a single plan the client can see.' },
      { number: '03', title: 'Calm on the night', description: 'The preparation is thorough so the live event stays composed and unhurried.' },
      { number: '04', title: 'Straight answers', description: 'Honest recommendations, transparent budgets and no complexity for its own sake.' },
    ],
  },
  {
    id: 'ch01',
    nav: 'CH.01',
    number: '01',
    title: 'CORPORATE',
    coverTitle: 'CORPORATE',
    field: 'var(--yellow)',
    ink: 'var(--ink)',
    glyph: 'ring',
    glyphTint: 'cool',
    footLeft: 'CORPORATE & BRAND',
    footRight: 'CONFERENCES / LAUNCHES / AWARDS',
    heading: 'A BUSINESS\nMESSAGE,\nMADE INTO\nA ROOM',
    lede: 'Conferences, launches, leadership summits, awards and gala dinners built around a business result.',
    body: [
      'The format, identity, content and guest journey are set first, so every later decision has something to answer to. It keeps a large event coherent and a small one considered.',
    ],
    poster: {
      photo: 'corporate',
      caption: 'CORPORATE & BRAND — DUBAI, UAE',
      word: 'CORPORATE',
      direction: 'rtl',
      ghost: 'candlelit',
    },
    services: [
      { title: 'Corporate events', summary: 'Conferences, launches, leadership summits, awards and gala dinners built around a business result.' },
      { title: 'Brand activations', summary: 'Campaign ideas turned into a physical encounter people can walk into, use and remember.' },
      { title: 'Venue transformation', summary: 'Spatial direction that changes how a room reads and moves while keeping the operation workable.' },
    ],
    scope: ['Concept & format', 'Event identity', 'Guest journey', 'Spatial direction'],
  },
  {
    id: 'ch02',
    nav: 'CH.02',
    number: '02',
    title: 'PRIVATE',
    coverTitle: 'PRIVATE',
    field: 'var(--pink)',
    ink: 'var(--ink)',
    glyph: 'ribbon',
    glyphTint: 'cool',
    footLeft: 'PRIVATE & SOCIAL',
    footRight: 'MILESTONES / LOUNGES / HOSTING',
    heading: 'PERSONAL\nBY NATURE,\nPRECISE\nBY DESIGN',
    lede: 'Milestone occasions and family celebrations, planned with discretion and a close read of the host.',
    body: [
      'Hosting environments are tuned for conversation, arrivals and an unhurried flow of service. The room is built around how the evening is meant to feel, not around a floor plan.',
    ],
    duo: [
      { photo: 'candlelit', label: 'MILESTONE OCCASIONS' },
      { photo: 'club', label: 'LOUNGES & SOCIAL' },
    ],
    services: [
      { title: 'Private events', summary: 'Milestone occasions and family celebrations, planned with discretion and a close read of the host.' },
      { title: 'Lounges & social', summary: 'Hosting environments tuned for conversation, arrivals and an unhurried flow of service.' },
    ],
  },
  {
    id: 'ch03',
    nav: 'CH.03',
    number: '03',
    title: 'WEDDINGS',
    coverTitle: 'WEDDINGS',
    field: 'var(--green)',
    ink: 'var(--ink)',
    glyph: 'flare',
    glyphTint: 'cool',
    footLeft: 'WEDDINGS & CELEBRATIONS',
    footRight: 'CULTURAL / CONTEMPORARY',
    heading: 'EXACT\nATTENTION\nTO TIMING',
    lede: 'Cultural and contemporary weddings coordinated with warmth and exact attention to timing.',
    body: [
      'Venue, catering, front of house, suppliers and on-site operations are coordinated around the guest — from the first car at the door to the last one leaving.',
    ],
    poster: {
      photo: 'weddings',
      caption: 'WEDDINGS & CELEBRATIONS — DUBAI, UAE',
      word: 'CELEBRATION',
      direction: 'ltr',
      ghost: 'catering',
    },
    services: [
      { title: 'Weddings & celebrations', summary: 'Cultural and contemporary weddings coordinated with warmth and exact attention to timing.' },
      { title: 'Catering & hospitality', summary: 'Menus, service and front of house planned as part of the evening, not bolted on to it.' },
      { title: 'Turnkey management', summary: 'One team holding the brief, budget, suppliers, schedule and the live event end to end.' },
    ],
  },
  {
    id: 'ch04',
    nav: 'CH.04',
    number: '04',
    title: 'LIVE',
    coverTitle: 'LIVE',
    field: 'var(--orange)',
    ink: 'var(--ink)',
    glyph: 'ring',
    glyphTint: 'warm',
    footLeft: 'CONCERTS & LIVE SHOWS',
    footRight: 'ARTISTS / HOSTS / PERFORMERS',
    heading: 'ARTIST,\nAUDIENCE,\nAND THE\nTECHNICAL\nPLAN',
    lede: 'Ticketed and private performances where artist riders, audience and the technical plan move together.',
    body: [
      'Artists, hosts and performers are cast to the room and folded into the run of show, so the entertainment belongs to the evening rather than interrupting it.',
    ],
    reel: {
      caption: 'LIVE SHOWS / STAGE / AUDIENCE',
    },
    poster: {
      photo: 'concerts',
      caption: 'CONCERTS & LIVE SHOWS — DUBAI, UAE',
      word: 'LIVE SHOWS',
      direction: 'rtl',
      ghost: 'club',
    },
    services: [
      { title: 'Concerts & live shows', summary: 'Ticketed and private performances where artist riders, audience and technical plan move together.' },
      { title: 'Entertainment & talent', summary: 'Artists, hosts and performers cast to the room and folded into the run of show.' },
    ],
  },
  {
    id: 'ch05',
    nav: 'CH.05',
    number: '05',
    title: 'PRODUCTION',
    coverTitle: 'PRODUCTION',
    field: 'var(--cyan)',
    ink: 'var(--ink)',
    glyph: 'ribbon',
    glyphTint: 'warm',
    footLeft: 'EVENT PRODUCTION',
    footRight: 'STAGE / LIGHT / AUDIO / SHOW CONTROL',
    heading: 'THE SYSTEM\nBEHIND A\nCONFIDENT\nLIVE SHOW',
    lede: 'Stage, set, sound, light, video, talent and show control planned as one build, then run from the desk on the night.',
    body: [
      'Technical drawings, load-in, rehearsal and the live call belong to the same document. Rehearsed enough that the live event has room to breathe.',
    ],
    scopeGrid: [
      { number: '01', title: 'Stage & set', note: 'Structures, scenic build and load-in sequencing.' },
      { number: '02', title: 'Lighting & audio', note: 'Rig design, coverage, control and sound for the room.' },
      { number: '03', title: 'Video & content', note: 'Screens, playback, camera and content delivery.' },
      { number: '04', title: 'Show control', note: 'Run of show, cues and the live call from the desk.' },
    ],
    image: 'production',
    services: [
      { title: 'Event production', summary: 'Stage, set, lighting, audio, video and show control, from technical drawings to the live call.' },
      { title: 'Beach & outdoor', summary: 'Waterfront, resort and open-air formats engineered around weather, power and the setting.' },
    ],
  },
  {
    id: 'ch06',
    nav: 'CH.06',
    number: '06',
    title: 'HOSPITALITY',
    coverTitle: 'HOSPITALITY',
    field: 'var(--lilac)',
    ink: 'var(--ink)',
    glyph: 'flare',
    glyphTint: 'warm',
    footLeft: 'CATERING & GUEST EXPERIENCE',
    footRight: 'WATERFRONT / RESORT / OPEN-AIR',
    heading: 'EVERY\nARRIVAL AND\nHANDOVER,\nACCOUNTED\nFOR',
    lede: 'Menus, service and front of house planned as part of the evening, not bolted on to it.',
    body: [
      'Waterfront, resort and open-air formats are engineered around weather, power and the setting — so the place stays the reason for the event rather than the obstacle to it.',
    ],
    pinned: {
      photo: 'beachSkyline',
      word: 'WATERFRONT HOSPITALITY',
      caption: 'BEACH & OUTDOOR — DUBAI, UAE',
    },
    duo: [
      { photo: 'catering', label: 'CATERING & SERVICE' },
      { photo: 'beach', label: 'BEACH & OUTDOOR' },
    ],
    services: [
      { title: 'Catering & hospitality', summary: 'Menus, service and front of house planned as part of the evening, not bolted on to it.' },
      { title: 'Beach & outdoor', summary: 'Waterfront, resort and open-air formats engineered around weather, power and the setting.' },
      { title: 'Lounges & social', summary: 'Hosting environments tuned for conversation, arrivals and an unhurried flow of service.' },
    ],
  },
  {
    id: 'ch07',
    nav: 'CH.07',
    number: '07',
    title: 'DONE',
    coverTitle: 'DONE',
    field: 'var(--blue)',
    ink: 'var(--cream)',
    glyph: 'ring',
    glyphTint: 'cool',
    footLeft: 'TURNKEY MANAGEMENT',
    footRight: brand.tagline.toUpperCase(),
    heading: 'HOW\nTHE WORK\nRUNS',
    lede: 'One team holding the brief, budget, suppliers, schedule and the live event end to end.',
    body: [
      'Four stages, kept deliberately plain. The client can see the whole plan at any point in it.',
    ],
    process: [
      { number: '01', title: 'Brief', description: 'We agree the audience, purpose, budget and what success looks like.' },
      { number: '02', title: 'Direction', description: 'The idea takes shape alongside the plan that will make it real.' },
      { number: '03', title: 'Build', description: 'Venue, suppliers, hospitality, talent and production come together.' },
      { number: '04', title: 'Live', description: 'We run the event from the first arrival to the final cue.' },
    ],
    sectors: [
      { title: 'Corporate & enterprise', note: 'Conferences, launches, town halls and awards.' },
      { title: 'Luxury & lifestyle brands', note: 'Activations, openings and press moments.' },
      { title: 'Private & family', note: 'Weddings, milestones and personal occasions.' },
      { title: 'Hospitality & venues', note: 'Restaurants, resorts and rooftop programmes.' },
      { title: 'Arts & entertainment', note: 'Concerts, live shows and cultural events.' },
      { title: 'Real estate & retail', note: 'Sales events, previews and in-mall activations.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// WORK — an index of event formats, not a portfolio grid. Formats, not clients.
// ---------------------------------------------------------------------------
export const work = {
  id: 'work',
  nav: 'WORK',
  title: 'WORK',
  field: 'var(--cream)',
  intro: 'Selected event environments, described by format. No client names, no numbers — the work speaks as categories we build in Dubai and beyond.',
  rows: [
    {
      number: '01',
      title: 'CORPORATE & BRAND',
      label: 'A business message, made into a room',
      description: 'Direction, content, guest flow and production aligned to a single objective.',
      photo: 'corporate',
    },
    {
      number: '02',
      title: 'WEDDINGS & PRIVATE',
      label: 'Personal by nature, precise by design',
      description: 'Cultural and contemporary celebrations held with warmth and exact timing.',
      photo: 'weddings',
    },
    {
      number: '03',
      title: 'DESTINATION & OUTDOOR',
      label: 'The setting becomes the event',
      description: 'Waterfront hospitality shaped around the skyline, service and the hour.',
      photo: 'beachSkyline',
    },
    {
      number: '04',
      title: 'CONCERTS & LIVE SHOWS',
      label: 'Artist-led events with operations in step',
      description: 'Performance, technical plan and audience movement rehearsed as one.',
      photo: 'concerts',
    },
    {
      number: '05',
      title: 'HOSPITALITY & LOUNGES',
      label: 'Catering and service as one experience',
      description: 'Menus, front of house and social settings planned into the evening.',
      photo: 'catering',
    },
  ],
}

// A moving capability line — breadth without claims or logos.
export const capabilities = [
  'CREATIVE DIRECTION',
  'EVENT PRODUCTION',
  'STAGE & SET',
  'LIGHTING DESIGN',
  'SHOW CONTROL',
  'CATERING & HOSPITALITY',
  'GUEST OPERATIONS',
  'ENTERTAINMENT & TALENT',
  'BRAND ACTIVATIONS',
  'VENUE TRANSFORMATION',
  'CONCERTS & LIVE SHOWS',
  'TURNKEY MANAGEMENT',
]

export const mail = {
  id: 'mail',
  nav: 'MAIL',
  title: 'MAIL',
  lede: 'Send the brief. Audience, purpose, date, budget — as much or as little as you have.',
  eventTypes: [
    'Corporate event',
    'Brand activation',
    'Wedding or celebration',
    'Private event',
    'Concert or live show',
    'Catering & hospitality',
    'Beach or outdoor event',
    'Something else',
  ],
}

export const navItems = [
  { id: 'home', label: 'HOME' },
  ...chapters.map((c) => ({ id: c.id, label: c.nav })),
  { id: 'work', label: 'WORK' },
  { id: 'mail', label: 'MAIL' },
]
