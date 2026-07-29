// ---------------------------------------------------------------------------
// DONE EVENTS & ENTERTAINMENT — single source of truth for copy, facts, media.
//
// Nothing in this file is invented. There are no client names, no project
// names, no attendance figures, no awards, no partnerships and no statistics.
// Where a capability depends on circumstance, the wording says so.
//
// Animation components import from here. They never carry company facts.
// ---------------------------------------------------------------------------

export const brand = {
  name: 'DONE EVENTS & ENTERTAINMENT',
  shortName: 'DONE EVENTS',
  tagline: 'Day to Night. Done Right.',
  city: 'DUBAI, UNITED ARAB EMIRATES',
  cityShort: 'DUBAI, UAE',
  edition: 'EVENTS, PRODUCTION & HOSPITALITY',
  // The one-line answer to "what is this company", used in the opening.
  what: 'Event planning, creative direction, production, entertainment and hospitality.',
}

export const contact = {
  location: 'Dubai, United Arab Emirates',
  phoneDisplay: '+971 58 555 4446',
  phoneHref: '+971585554446',
  email: 'info@doneevents.ae',
  whatsapp: 'https://wa.me/971585554446',
}

// ---------------------------------------------------------------------------
// MEDIA PROVENANCE
//
// Every photograph is classified before it may appear. Only images marked
// `done` or `supplied` are eligible; `synthetic` never renders, in any build.
//
//   done      — verified DONE photography, cleared for publication
//   supplied  — delivered with the project, provenance NOT established
//   synthetic — confirmed machine-generated, permanently withheld
//
// `hero-runway.png` carries a C2PA manifest declaring digitalSourceType
// `trainedAlgorithmicMedia` alongside an unbound watermark assertion — it is
// generated imagery and is withheld on that evidence. `beach-skyline.jpg`
// fails visual inspection (impossible drape symmetry, no capture metadata)
// and is withheld with it.
//
// Set PUBLISH_UNVERIFIED to false to fall back to graphic colour fields
// everywhere until verified DONE photography is supplied.
// ---------------------------------------------------------------------------

export const PUBLISH_UNVERIFIED = true

const eligible = (provenance) =>
  provenance === 'done' || (provenance === 'supplied' && PUBLISH_UNVERIFIED)

export const img = (name, width) => `${import.meta.env.BASE_URL}media/img/${name}-${width}`

const library = {
  corporate: {
    base: 'corporate',
    widths: [640, 1200],
    provenance: 'supplied',
    role: 'hero',
    alt: 'Guests seated at a candlelit gala dinner with the Dubai skyline behind the windows',
  },
  weddings: {
    base: 'weddings',
    widths: [640, 1200],
    provenance: 'supplied',
    role: 'chapter-cover',
    alt: 'Guests greeting a bride and groom at a wedding reception in a Dubai ballroom',
  },
  concerts: {
    base: 'concerts',
    widths: [640, 1200],
    provenance: 'supplied',
    role: 'stage',
    alt: 'A band performing on a lit stage in front of a seated audience',
  },
  production: {
    base: 'production',
    widths: [640, 1200],
    provenance: 'supplied',
    role: 'production',
    alt: 'A technician working at the lighting and audio control desk during an event',
  },
  catering: {
    base: 'catering',
    widths: [640, 1200],
    provenance: 'supplied',
    role: 'detail',
    alt: 'A dinner table laid with glassware and candles at an evening event',
  },
  club: {
    base: 'club',
    widths: [640, 1200],
    provenance: 'supplied',
    role: 'crowd',
    alt: 'Guests in a rooftop lounge at night with the city lit behind them',
  },
  candlelit: {
    base: 'candlelit',
    widths: [640, 1200],
    provenance: 'supplied',
    role: 'detail',
    alt: 'A candlelit dinner table arranged for a private occasion',
  },
  beach: {
    base: 'beach',
    widths: [640, 1200],
    provenance: 'supplied',
    role: 'outdoor',
    alt: 'An open-air beachside dining setup with the Dubai Marina skyline across the water',
  },

  // ---- withheld -----------------------------------------------------------
  runway: {
    base: 'runway',
    widths: [640, 1200, 1774],
    provenance: 'synthetic',
    note: 'C2PA: trainedAlgorithmicMedia, watermarked. Machine-generated.',
    alt: '',
  },
  beachSkyline: {
    base: 'beach-skyline',
    widths: [640, 1200],
    provenance: 'synthetic',
    note: 'No capture metadata; drape and reflection geometry fail inspection.',
    alt: '',
  },
}

// Only publishable photographs are exported to the components.
export const photos = Object.fromEntries(
  Object.entries(library).filter(([, photo]) => eligible(photo.provenance)),
)

export const withheldPhotos = Object.entries(library)
  .filter(([, photo]) => !eligible(photo.provenance))
  .map(([key, photo]) => ({ key, ...photo }))

// ---------------------------------------------------------------------------
// CHAPTERS. One continuous page; the rail moves between them.
//
// `character` names the member of the DONE crew that lives in the chapter.
// `cover` is the chapter cover's art direction — each one is composed
// differently on purpose, within a single editorial system.
// ---------------------------------------------------------------------------

export const chapters = [
  {
    id: 'ch00',
    nav: 'CH.00',
    number: '00',
    title: 'INTRO',
    field: 'var(--grey)',
    ink: 'var(--ink)',
    character: 'beacon',
    cover: { layout: 'stand', scale: 0.9, x: 62, numberPlace: 'right' },
    footLeft: 'DONE EVENTS & ENTERTAINMENT',
    footRight: 'DUBAI, UNITED ARAB EMIRATES',
    divisions: true,
    heading: 'ONE TEAM,\nEND TO END',
    lede: 'DONE Events & Entertainment is a Dubai events company. Planning, creative direction, production, entertainment and hospitality sit under one line of responsibility, so the idea and the plan that delivers it are made in the same room.',
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
    field: 'var(--yellow)',
    ink: 'var(--ink)',
    character: 'plinth',
    cover: { layout: 'behind', scale: 1.05, x: 74, numberPlace: 'below' },
    footLeft: 'CORPORATE & BRAND',
    footRight: 'CONFERENCES / LAUNCHES / AWARDS',
    heading: 'A BUSINESS\nMESSAGE,\nMADE INTO\nA ROOM',
    lede: 'Conferences, summits, launches, brand activations, awards and gala dinners built around a business result.',
    body: [
      'The format, identity, content and guest journey are set first, so every later decision has something to answer to. It keeps a large event coherent and a small one considered.',
    ],
    poster: {
      photo: 'corporate',
      caption: 'CORPORATE & BRAND',
      word: 'CORPORATE',
      direction: 'rtl',
      line: 'Conferences, summits, launches and awards.',
    },
    services: [
      { title: 'Conferences & summits', summary: 'Plenary and breakout formats, content run-through, speaker handling and delegate flow.' },
      { title: 'Launches & activations', summary: 'A campaign idea turned into a physical encounter people can walk into, use and remember.' },
      { title: 'Awards & gala dinners', summary: 'Ceremony structure, show calling, hosting and dinner service planned as one run of show.' },
      { title: 'Venue transformation', summary: 'Spatial direction that changes how a room reads and moves while keeping the operation workable.' },
    ],
    scope: ['Concept & format', 'Event identity', 'Guest journey', 'Spatial direction'],
  },
  {
    id: 'ch02',
    nav: 'CH.02',
    number: '02',
    title: 'PRIVATE',
    field: 'var(--pink)',
    ink: 'var(--ink)',
    character: 'veil',
    cover: { layout: 'peek', scale: 1.15, x: 50, numberPlace: 'right' },
    footLeft: 'PRIVATE & VIP',
    footRight: 'MILESTONES / MAJLIS / LOUNGES',
    heading: 'PERSONAL\nBY NATURE,\nPRECISE\nBY DESIGN',
    lede: 'Milestone occasions, family celebrations and social gatherings, planned with discretion and a close read of the host.',
    body: [
      'Hosting environments are tuned for conversation, arrivals and an unhurried flow of service. The room is built around how the evening is meant to feel, not around a floor plan.',
    ],
    note: {
      title: 'Privacy and confidentiality',
      text: 'Private and VIP events can be managed with restricted supplier access, controlled information sharing and NDA arrangements where required. What that looks like in practice is agreed with the host before anyone is briefed.',
    },
    duo: [
      { photo: 'candlelit', label: 'MILESTONE OCCASIONS' },
      { photo: 'club', label: 'LOUNGES & SOCIAL' },
    ],
    services: [
      { title: 'Private events', summary: 'Milestone occasions and family celebrations, planned with discretion and a close read of the host.' },
      { title: 'VIP & confidential', summary: 'Restricted supplier access, controlled information sharing and NDA arrangements where required.' },
      { title: 'Lounges & social', summary: 'Hosting environments tuned for conversation, arrivals and an unhurried flow of service.' },
    ],
  },
  {
    id: 'ch03',
    nav: 'CH.03',
    number: '03',
    title: 'WEDDINGS',
    field: 'var(--green)',
    ink: 'var(--ink)',
    character: 'knot',
    cover: { layout: 'stand', scale: 1.2, x: 82, numberPlace: 'right' },
    footLeft: 'WEDDINGS & CELEBRATIONS',
    footRight: 'CULTURAL / CONTEMPORARY',
    heading: 'EXACT\nATTENTION\nTO TIMING',
    lede: 'Cultural and contemporary weddings coordinated with warmth and exact attention to timing.',
    body: [
      'Venue, design, catering, front of house, suppliers and on-site operations are coordinated around the guest — from the first car at the door to the last one leaving.',
    ],
    poster: {
      photo: 'weddings',
      caption: 'WEDDINGS & CELEBRATIONS',
      word: 'CELEBRATION',
      direction: 'ltr',
      line: 'Design coordination, production, hospitality and entertainment.',
    },
    services: [
      { title: 'Weddings & celebrations', summary: 'Cultural and contemporary weddings coordinated with warmth and exact attention to timing.' },
      { title: 'Design coordination', summary: 'Styling, floral, scenic and lighting held to one design intent across every supplier.' },
      { title: 'Catering & hospitality', summary: 'Menus, service and front of house planned as part of the evening, not bolted on to it.' },
    ],
  },
  {
    id: 'ch04',
    nav: 'CH.04',
    number: '04',
    title: 'LIVE',
    field: 'var(--orange)',
    ink: 'var(--ink)',
    character: 'pulse',
    cover: { layout: 'split', scale: 1.1, x: 50, numberPlace: 'below' },
    footLeft: 'LIVE ENTERTAINMENT',
    footRight: 'ARTISTS / HOSTS / PERFORMERS',
    heading: 'ARTIST,\nAUDIENCE,\nAND THE\nTECHNICAL\nPLAN',
    lede: 'Concerts, live shows and performance programmes where the artist, the audience and the technical plan move together.',
    body: [
      'Artists, hosts and performers are cast to the room and folded into the run of show, so the entertainment belongs to the evening rather than interrupting it.',
    ],
    note: {
      title: 'Booking artists',
      text: 'DONE can coordinate local and international artists, performers and entertainment suppliers, subject to availability, approvals, technical requirements and budget. Bookings are made through the relevant representatives rather than on any claim of exclusive representation.',
    },
    reel: { caption: 'LIVE SHOWS / STAGE / AUDIENCE' },
    poster: {
      photo: 'concerts',
      caption: 'CONCERTS & LIVE SHOWS',
      word: 'LIVE',
      direction: 'rtl',
      line: 'Local and international artists, subject to availability and approvals.',
    },
    services: [
      { title: 'Concerts & live shows', summary: 'Ticketed and private performances where artist riders, audience and technical plan move together.' },
      { title: 'Entertainment & talent', summary: 'Local and international artists, hosts and performers, coordinated through their representatives.' },
      { title: 'Show programming', summary: 'Running order, set times, changeovers and the transitions between them.' },
    ],
  },
  {
    id: 'ch05',
    nav: 'CH.05',
    number: '05',
    title: 'PRODUCTION',
    field: 'var(--cyan)',
    ink: 'var(--ink)',
    character: 'rig',
    cover: { layout: 'behind', scale: 1.0, x: 26, numberPlace: 'right' },
    footLeft: 'EVENT PRODUCTION',
    footRight: 'STAGE / LIGHT / AUDIO / SHOW CONTROL',
    heading: 'THE SYSTEM\nBEHIND A\nCONFIDENT\nLIVE SHOW',
    lede: 'Stage, set, sound, light, video, talent and show control planned as one build, then run from the desk on the night.',
    body: [
      'Technical drawings, load-in, rehearsal and the live call belong to the same document. Rehearsed enough that the live event has room to breathe.',
    ],
    note: {
      title: 'Venue and authority coordination',
      text: 'DONE coordinates venue requirements, event documentation and relevant UAE authority approvals where required. Exact requirements depend on the event type, venue, entertainment programme and technical scope, and the approval itself remains the decision of the relevant authority.',
    },
    scopeGrid: [
      { number: '01', title: 'Technical planning', note: 'Drawings, load-in sequencing and the production schedule.' },
      { number: '02', title: 'Stage & set', note: 'Structures, scenic build and the install that puts them up.' },
      { number: '03', title: 'Lighting & audio', note: 'Rig design, coverage, control and sound for the room.' },
      { number: '04', title: 'Video & content', note: 'Screens, playback, camera and content delivery.' },
      { number: '05', title: 'Venue & suppliers', note: 'Venue liaison, documentation and supplier coordination.' },
      { number: '06', title: 'Rehearsal & show control', note: 'Run of show, cues and the live call from the desk.' },
    ],
    image: 'production',
    services: [
      { title: 'Event production', summary: 'Stage, set, lighting, audio, video and show control, from technical drawings to the live call.' },
      { title: 'Venue coordination', summary: 'Venue requirements, documentation and relevant UAE authority approvals where required.' },
      { title: 'On-site management', summary: 'Build, rehearsal, live delivery, breakdown and supplier closeout.' },
    ],
  },
  {
    id: 'ch06',
    nav: 'CH.06',
    number: '06',
    title: 'HOSPITALITY',
    field: 'var(--lilac)',
    ink: 'var(--ink)',
    character: 'carafe',
    cover: { layout: 'peek', scale: 1.25, x: 68, numberPlace: 'below' },
    footLeft: 'CATERING & GUEST EXPERIENCE',
    footRight: 'WATERFRONT / RESORT / OPEN-AIR',
    heading: 'EVERY\nARRIVAL AND\nHANDOVER,\nACCOUNTED\nFOR',
    lede: 'Catering, service and guest experience planned as part of the evening, not bolted on to it.',
    body: [
      'Beach, waterfront, resort and open-air formats are planned around weather, power and the setting — so the place stays the reason for the event rather than the obstacle to it.',
    ],
    pinned: {
      photo: 'beach',
      word: 'BEACH & OUTDOOR',
      caption: 'OPEN-AIR HOSPITALITY',
    },
    duo: [
      { photo: 'catering', label: 'CATERING & SERVICE' },
      { photo: 'corporate', label: 'GUEST EXPERIENCE' },
    ],
    services: [
      { title: 'Catering & hospitality', summary: 'Menus, service and front of house planned as part of the evening, not bolted on to it.' },
      { title: 'Beach & outdoor', summary: 'Waterfront, resort and open-air formats planned around weather, power and the setting.' },
      { title: 'Guest operations', summary: 'Arrivals, registration, seating, transport and the handovers between them.' },
    ],
  },
  {
    id: 'ch07',
    nav: 'CH.07',
    number: '07',
    title: 'DONE',
    field: 'var(--blue)',
    ink: 'var(--cream)',
    character: 'composite',
    cover: { layout: 'split', scale: 1.3, x: 50, numberPlace: 'right' },
    footLeft: 'HOW THE WORK RUNS',
    footRight: brand.tagline.toUpperCase(),
    heading: 'HOW\nTHE WORK\nRUNS',
    lede: 'Seven stages, kept deliberately plain. The client can see the whole plan at any point in it.',
    body: [
      'The same sequence runs whether the event is a two-hundred-guest dinner or a multi-day programme. The detail changes; the order does not.',
    ],
    process: [
      { number: '01', title: 'Brief', description: 'Understand the objectives, audience, date, location, budget and priorities.' },
      { number: '02', title: 'Concept', description: 'Develop the event direction, the experience, the format, the mood and the initial scope.' },
      { number: '03', title: 'Scope & proposal', description: 'Confirm services, suppliers, commercial scope, responsibilities and schedule.' },
      { number: '04', title: 'Venue, approvals & production planning', description: 'Coordinate venue requirements, relevant documentation, approvals, supplier plans, technical schedules and logistics.' },
      { number: '05', title: 'Build & rehearsal', description: 'Install, test, coordinate and rehearse before the doors open.' },
      { number: '06', title: 'Live delivery', description: 'Manage the event on site from opening through close.' },
      { number: '07', title: 'Breakdown & closeout', description: 'Complete dismantling, supplier coordination and handover.' },
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
// WORK — an index of event formats. Formats, not clients: no project has been
// named because no project name has been verified.
// ---------------------------------------------------------------------------

export const work = {
  id: 'work',
  nav: 'WORK',
  title: 'WORK',
  intro:
    'The work is indexed by format rather than by client. Every category below is something DONE plans, produces and runs in Dubai and across the UAE.',
  note: 'Client and project names are not published without permission.',
  rows: [
    {
      number: '01',
      title: 'CORPORATE',
      character: 'plinth',
      label: 'A business message, made into a room',
      description: 'Conferences, summits, launches and awards, aligned to a single objective.',
      photo: 'corporate',
      field: 'var(--yellow)',
      chapter: 'ch01',
    },
    {
      number: '02',
      title: 'PRIVATE & VIP',
      character: 'veil',
      label: 'Personal by nature, precise by design',
      description: 'Milestones, majlis and social occasions, with confidentiality where it is needed.',
      photo: 'candlelit',
      field: 'var(--pink)',
      chapter: 'ch02',
    },
    {
      number: '03',
      title: 'WEDDINGS',
      character: 'knot',
      label: 'Exact attention to timing',
      description: 'Cultural and contemporary celebrations, coordinated end to end.',
      photo: 'weddings',
      field: 'var(--green)',
      chapter: 'ch03',
    },
    {
      number: '04',
      title: 'LIVE',
      character: 'pulse',
      label: 'Artist, audience and the technical plan',
      description: 'Concerts and live shows with local and international artists.',
      photo: 'concerts',
      field: 'var(--orange)',
      chapter: 'ch04',
    },
    {
      number: '05',
      title: 'PRODUCTION',
      character: 'rig',
      label: 'The system behind a confident show',
      description: 'Stage, lighting, audio, video and show control, planned as one build.',
      photo: 'production',
      field: 'var(--cyan)',
      chapter: 'ch05',
    },
    {
      number: '06',
      title: 'HOSPITALITY',
      character: 'carafe',
      label: 'Catering and service as one experience',
      description: 'Menus, front of house and guest operations planned into the evening.',
      photo: 'catering',
      field: 'var(--lilac)',
      chapter: 'ch06',
    },
    {
      number: '07',
      title: 'BEACH & OUTDOOR',
      character: 'beacon',
      label: 'The setting becomes the event',
      description: 'Waterfront, resort and open-air formats planned around weather and power.',
      photo: 'beach',
      field: 'var(--cyan)',
      chapter: 'ch06',
    },
    {
      number: '08',
      title: 'ACTIVATIONS',
      character: 'spark',
      label: 'A campaign you can walk into',
      description: 'Physical encounters built from a campaign idea, staffed and run on site.',
      photo: 'club',
      field: 'var(--orange)',
      chapter: 'ch01',
    },
  ],
}

// ---------------------------------------------------------------------------
// THE DIVISIONS — the plain answer to "what does this company actually do".
//
// This is the one place a visitor can see the whole offer at once, early,
// without reading eight chapters first. Each division points at the chapter
// that covers it, so the index is also navigation. One factual line each; no
// adjectives doing work that a noun should do.
// ---------------------------------------------------------------------------

export const divisions = [
  {
    number: '01',
    title: 'Corporate',
    line: 'Conferences, summits, launches, awards and gala dinners.',
    chapter: 'ch01',
    character: 'plinth',
  },
  {
    number: '02',
    title: 'Private & VIP',
    line: 'Milestones, majlis and social occasions, with confidentiality where needed.',
    chapter: 'ch02',
    character: 'veil',
  },
  {
    number: '03',
    title: 'Weddings',
    line: 'Cultural and contemporary celebrations, coordinated end to end.',
    chapter: 'ch03',
    character: 'knot',
  },
  {
    number: '04',
    title: 'Live entertainment',
    line: 'Concerts and live shows; local and international artists.',
    chapter: 'ch04',
    character: 'pulse',
  },
  {
    number: '05',
    title: 'Production',
    line: 'Stage, set, lighting, audio, video and show control.',
    chapter: 'ch05',
    character: 'rig',
  },
  {
    number: '06',
    title: 'Hospitality',
    line: 'Guest experience, front of house and service operations.',
    chapter: 'ch06',
    character: 'carafe',
  },
  {
    number: '07',
    title: 'Catering',
    line: 'Menus and service, through the venue or through catering partners.',
    chapter: 'ch06',
    character: 'carafe',
  },
  {
    number: '08',
    title: 'Outdoor & beach',
    line: 'Waterfront, resort and open-air formats, planned around weather and power.',
    chapter: 'ch06',
    character: 'beacon',
  },
  {
    number: '09',
    title: 'Brand activations',
    line: 'A campaign idea built as a physical encounter, staffed and run on site.',
    chapter: 'ch01',
    character: 'spark',
  },
  {
    number: '10',
    title: 'Turnkey delivery',
    line: 'One team holding brief, budget, suppliers, schedule and the live event.',
    chapter: 'ch07',
    character: 'composite',
  },
]

// A moving capability line — breadth without claims or logos.
export const capabilities = [
  'EVENT PLANNING',
  'CREATIVE DIRECTION',
  'EVENT PRODUCTION',
  'STAGE & SET',
  'LIGHTING & AUDIO',
  'SHOW CONTROL',
  'CATERING & HOSPITALITY',
  'GUEST OPERATIONS',
  'ENTERTAINMENT & TALENT',
  'BRAND ACTIVATIONS',
  'VENUE COORDINATION',
  'TURNKEY DELIVERY',
]

// ---------------------------------------------------------------------------
// FAQ — operational answers. Where an answer depends on the event, it says so
// rather than promising an outcome the company cannot control.
// ---------------------------------------------------------------------------

export const faq = {
  id: 'faq',
  nav: 'FAQ',
  title: 'FAQ',
  field: 'var(--cream)',
  lede: 'The questions that come up before a first meeting.',
  items: [
    {
      q: 'How early should we contact DONE?',
      a: 'As early as you have a date and a rough idea of scale. Large productions, popular venues and artist bookings benefit from several months; smaller events can be delivered on much shorter notice. If the date is close, tell us — we will say honestly whether it is workable.',
    },
    {
      q: 'Do you manage venue and government approvals?',
      a: 'DONE coordinates venue requirements, event documentation and relevant UAE authority approvals where required. What is needed depends on the event type, venue, entertainment programme and technical scope. We prepare and submit what the process asks for, but the approval itself remains the decision of the relevant authority.',
    },
    {
      q: 'Can DONE help us find a venue?',
      a: 'Yes. We shortlist venues against your guest count, format, budget and technical needs, arrange site visits, and handle the liaison from enquiry through to contract.',
    },
    {
      q: 'Can DONE provide full turnkey delivery?',
      a: 'Yes. One team can hold the brief, budget, suppliers, schedule and the live event from the first conversation to breakdown, so you have a single line of responsibility rather than several.',
    },
    {
      q: 'Can we hire DONE for selected services only?',
      a: 'Yes. Clients regularly bring us in for production only, entertainment only, or to run the event on the day when the planning is already done. Tell us where the gap is.',
    },
    {
      q: 'Can you arrange local and international artists?',
      a: 'DONE can coordinate local and international artists, performers and entertainment suppliers, subject to availability, approvals, technical requirements and budget. Bookings go through each artist’s representatives, and we will tell you early if a request is unlikely to be workable.',
    },
    {
      q: 'Can you manage private, VIP and confidential events?',
      a: 'Yes. Private and VIP events can be managed with restricted supplier access, controlled information sharing and NDA arrangements where required. The specific arrangements are agreed with the host before suppliers are briefed.',
    },
    {
      q: 'Do you handle outdoor and beach events?',
      a: 'Yes. Waterfront, resort, desert and open-air formats are part of the regular work. They are planned around weather, power, access and permissions, normally with a contingency agreed in advance.',
    },
    {
      q: 'Do you provide catering and hospitality?',
      a: 'Yes — menus, service, front of house and guest operations, either through the venue or through catering partners, depending on the site and the format.',
    },
    {
      q: 'Do you work outside Dubai?',
      a: 'Yes. DONE is based in Dubai and works across the UAE. Events elsewhere are considered case by case, depending on scope, timing and local requirements.',
    },
    {
      q: 'What information is needed for a proposal?',
      a: 'Event type, approximate date, emirate, guest count, whether the venue is confirmed, and which services you need. A budget range helps us propose something realistic first time. If you do not have all of it yet, send what you have.',
    },
    {
      q: 'What happens if weather or venue conditions change?',
      a: 'Outdoor events are planned with a contingency — a wet-weather option, a revised layout or a change of schedule — agreed with you before the build. The decision points, and who makes the call, are set in advance rather than on the day.',
    },
  ],
}

// ---------------------------------------------------------------------------
// EVENT BRIEF — the enquiry. Every option here is a plain business choice;
// nothing is calculated, estimated or inferred on the visitor's behalf.
// ---------------------------------------------------------------------------

export const mail = {
  id: 'mail',
  nav: 'MAIL',
  title: 'MAIL',
  lede: 'Send the brief. As much or as little as you have — we will come back with questions rather than a template.',
  eventTypes: [
    'Corporate event',
    'Conference or summit',
    'Brand activation or launch',
    'Awards or gala dinner',
    'Wedding or celebration',
    'Private or VIP event',
    'Concert or live show',
    'Beach or outdoor event',
    'Catering & hospitality',
    'Something else',
  ],
  emirates: [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain',
    'Outside the UAE',
  ],
  venueStates: [
    { value: 'confirmed', label: 'Venue confirmed' },
    { value: 'required', label: 'Venue required' },
    { value: 'undecided', label: 'Undecided' },
  ],
  settings: [
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'mixed', label: 'Mixed' },
  ],
  services: [
    'Planning',
    'Creative direction',
    'Production',
    'Entertainment',
    'Catering',
    'Hospitality',
    'Venue support',
    'Full turnkey delivery',
  ],
  budgets: [
    'Prefer not to say',
    'Under AED 100,000',
    'AED 100,000 – 250,000',
    'AED 250,000 – 500,000',
    'AED 500,000 – 1,000,000',
    'Above AED 1,000,000',
  ],
}

export const navItems = [
  { id: 'home', label: 'HOME' },
  ...chapters.map((c) => ({ id: c.id, label: c.nav })),
  { id: 'work', label: 'WORK' },
  { id: 'faq', label: 'FAQ' },
  { id: 'mail', label: 'MAIL' },
]
