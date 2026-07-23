// Single source of truth for site copy and structure.
// Facts kept deliberately honest: no invented clients, founders, dates or figures.

// ---------------------------------------------------------------------------
// Client-facing service categories — the language people actually hire against.
// Each maps to one of the three delivery disciplines below.
// ---------------------------------------------------------------------------
export const serviceCategories = [
  {
    id: 'service-corporate-events',
    title: 'Corporate events',
    discipline: 'creative',
    summary: 'Conferences, launches, leadership summits, awards and gala dinners built around a business result.',
  },
  {
    id: 'service-private-events',
    title: 'Private events',
    discipline: 'hospitality',
    summary: 'Milestone occasions and family celebrations, planned with discretion and a close read of the host.',
  },
  {
    id: 'service-weddings-celebrations',
    title: 'Weddings & celebrations',
    discipline: 'hospitality',
    summary: 'Cultural and contemporary weddings coordinated with warmth and exact attention to timing.',
  },
  {
    id: 'service-entertainment',
    title: 'Entertainment & talent',
    discipline: 'production',
    summary: 'Artists, hosts and performers cast to the room and folded into the run of show.',
  },
  {
    id: 'service-concerts-live-shows',
    title: 'Concerts & live shows',
    discipline: 'production',
    summary: 'Ticketed and private performances where artist riders, audience and technical plan move together.',
  },
  {
    id: 'service-catering-hospitality',
    title: 'Catering & hospitality',
    discipline: 'hospitality',
    summary: 'Menus, service and front of house planned as part of the evening, not bolted on to it.',
  },
  {
    id: 'service-event-production',
    title: 'Event production',
    discipline: 'production',
    summary: 'Stage, set, lighting, audio, video and show control, from technical drawings to the live call.',
  },
  {
    id: 'service-beach-outdoor',
    title: 'Beach & outdoor',
    discipline: 'production',
    summary: 'Waterfront, resort and open-air formats engineered around weather, power and the setting.',
  },
  {
    id: 'service-brand-activations',
    title: 'Brand activations',
    discipline: 'creative',
    summary: 'Campaign ideas turned into a physical encounter people can walk into, use and remember.',
  },
  {
    id: 'service-lounges',
    title: 'Lounges & social',
    discipline: 'hospitality',
    summary: 'Hosting environments tuned for conversation, arrivals and an unhurried flow of service.',
  },
  {
    id: 'service-venue-transformation',
    title: 'Venue transformation',
    discipline: 'creative',
    summary: 'Spatial direction that changes how a room reads and moves while keeping the operation workable.',
  },
  {
    id: 'service-turnkey',
    title: 'Turnkey management',
    discipline: 'hospitality',
    summary: 'One team holding the brief, budget, suppliers, schedule and the live event end to end.',
  },
]

// ---------------------------------------------------------------------------
// The three disciplines the categories are organised under.
// ---------------------------------------------------------------------------
export const disciplines = [
  {
    id: 'creative-direction',
    number: '01',
    title: 'Creative direction',
    statement: 'The idea, before the production.',
    description:
      'We set the format, identity, content and guest journey first, so every later decision has something to answer to. It keeps a large event coherent and a small one considered.',
    scope: ['Concept & format', 'Event identity', 'Guest journey', 'Spatial direction'],
    image: 'corporate.jpg',
    imageAlt: 'Guests seated at a candlelit corporate gala dinner in Dubai',
    imageLabel: 'Purpose, audience and place resolved into one direction.',
    categoryIds: ['service-corporate-events', 'service-brand-activations', 'service-venue-transformation'],
  },
  {
    id: 'production',
    number: '02',
    title: 'Production & technical',
    statement: 'The system behind a confident live show.',
    description:
      'Stage, set, sound, light, video, talent and show control planned as one build, then run from the desk on the night. Rehearsed enough that the live event has room to breathe.',
    scope: ['Stage & set', 'Lighting & audio', 'Video & content', 'Show control'],
    image: 'production.jpg',
    imageAlt: 'Technicians operating a live event from the production control desk',
    imageLabel: 'Rehearsed preparation behind every visible cue.',
    categoryIds: [
      'service-event-production',
      'service-concerts-live-shows',
      'service-entertainment',
      'service-beach-outdoor',
    ],
  },
  {
    id: 'hospitality',
    number: '03',
    title: 'Hospitality & operations',
    statement: 'Every arrival and handover, accounted for.',
    description:
      'Venue, catering, front of house, suppliers and on-site operations coordinated around the guest — from the first car at the door to the last one leaving.',
    scope: ['Venue & guest flow', 'Catering & service', 'Front of house', 'On-site operations'],
    image: 'catering.jpg',
    imageAlt: 'A candlelit waterfront dinner table set for evening guests in Dubai',
    imageLabel: 'Service read as part of the whole evening.',
    categoryIds: [
      'service-catering-hospitality',
      'service-private-events',
      'service-weddings-celebrations',
      'service-lounges',
      'service-turnkey',
    ],
  },
]

// Convenience: attach resolved categories to each discipline.
export const disciplinesWithCategories = disciplines.map((discipline) => ({
  ...discipline,
  categories: discipline.categoryIds
    .map((id) => serviceCategories.find((category) => category.id === id))
    .filter(Boolean),
}))

// ---------------------------------------------------------------------------
// Event formats — a lighter, occasion-led cut used for strips and asides.
// ---------------------------------------------------------------------------
export const eventFormats = [
  {
    id: 'corporate-brand',
    title: 'Corporate & brand',
    description: 'Conferences, launches, awards and executive gatherings.',
  },
  {
    id: 'concerts',
    title: 'Concerts & live shows',
    description: 'Artist-led events with performance and operations in step.',
  },
  {
    id: 'private-weddings',
    title: 'Private & weddings',
    description: 'Personal occasions handled with discretion and detail.',
  },
  {
    id: 'hospitality-lounges',
    title: 'Hospitality & lounges',
    description: 'Catering, service and social settings as one experience.',
  },
  {
    id: 'outdoor',
    title: 'Beach & outdoor',
    description: 'Waterfront and open-air formats built around the place.',
  },
]

// ---------------------------------------------------------------------------
// Selected work — descriptive, format-led. No invented project names or numbers.
// ---------------------------------------------------------------------------
export const homeWork = [
  {
    number: '01',
    title: 'Corporate & brand',
    label: 'A business message, made into a room',
    description: 'Direction, content, guest flow and production aligned to a single objective.',
    photo: 'corporate.jpg',
    alt: 'Guests at a corporate gala dinner and panel in Dubai',
  },
  {
    number: '02',
    title: 'Weddings & private',
    label: 'Personal by nature, precise by design',
    description: 'Cultural and contemporary celebrations held with warmth and exact timing.',
    photo: 'weddings.jpg',
    alt: 'Guests gathered at an elegant wedding celebration in Dubai',
  },
  {
    number: '03',
    title: 'Destination & outdoor',
    label: 'The setting becomes the event',
    description: 'Waterfront hospitality shaped around the skyline, service and the hour.',
    photo: 'beach-skyline.jpg',
    alt: 'An outdoor waterfront event beside the Dubai skyline',
  },
]

// A moving capability line — communicates breadth without claims or logos.
export const capabilityTicker = [
  'Creative direction',
  'Event production',
  'Stage & set',
  'Lighting design',
  'Show control',
  'Catering & hospitality',
  'Guest operations',
  'Entertainment & talent',
  'Brand activations',
  'Venue transformation',
  'Concerts & live shows',
  'Turnkey management',
]

// Sectors served — a credibility device framed as capability, not client claims.
export const sectors = [
  { title: 'Corporate & enterprise', note: 'Conferences, launches, town halls and awards.' },
  { title: 'Luxury & lifestyle brands', note: 'Activations, openings and press moments.' },
  { title: 'Private & family', note: 'Weddings, milestones and personal occasions.' },
  { title: 'Hospitality & venues', note: 'Restaurants, resorts and rooftop programmes.' },
  { title: 'Arts & entertainment', note: 'Concerts, live shows and cultural events.' },
  { title: 'Real estate & retail', note: 'Sales events, previews and in-mall activations.' },
]

export const operatingStandards = [
  { number: '01', title: 'One direction', description: 'Creative and operational calls are made in the same room, not traded between teams.' },
  { number: '02', title: 'Full ownership', description: 'Every supplier, handover and cue answers to a single plan the client can see.' },
  { number: '03', title: 'Calm on the night', description: 'The preparation is thorough so the live event stays composed and unhurried.' },
  { number: '04', title: 'Straight answers', description: 'Honest recommendations, transparent budgets and no complexity for its own sake.' },
]

export const processSteps = [
  { number: '01', title: 'Brief', description: 'We agree the audience, purpose, budget and what success looks like.' },
  { number: '02', title: 'Direction', description: 'The idea takes shape alongside the plan that will make it real.' },
  { number: '03', title: 'Build', description: 'Venue, suppliers, hospitality, talent and production come together.' },
  { number: '04', title: 'Live', description: 'We run the event from the first arrival to the final cue.' },
]

export const routeMeta = {
  '/': {
    title: 'DONE Events & Entertainment | Dubai Event Production',
    description:
      'A Dubai events company delivering creative direction, production and hospitality for corporate, live, outdoor and private events.',
  },
  '/services': {
    title: 'Event Services | DONE Events & Entertainment Dubai',
    description:
      'Corporate and private events, weddings, concerts, entertainment, catering, production, activations and turnkey management in Dubai.',
  },
  '/portfolio': {
    title: 'Selected Work | DONE Events & Entertainment',
    description: 'Selected event environments across corporate, live, destination and private formats in Dubai.',
  },
  '/about': {
    title: 'About DONE | One Accountable Event Team in Dubai',
    description: 'A Dubai events company uniting creative, production and hospitality under one line of responsibility.',
  },
  '/contact': {
    title: 'Start an Event Brief | DONE Events & Entertainment',
    description: 'Share your event brief with the DONE Events & Entertainment team in Dubai.',
  },
  '/privacy': {
    title: 'Privacy Notice | DONE Events & Entertainment',
    description: 'How DONE Events & Entertainment handles the information you share through this website.',
  },
  '/terms': {
    title: 'Terms of Use | DONE Events & Entertainment',
    description: 'The terms that cover use of the DONE Events & Entertainment website.',
  },
}

// Shared contact facts (kept in one place so nothing drifts).
export const contactDetails = {
  location: 'Dubai, United Arab Emirates',
  phoneDisplay: '+971 58 555 4446',
  phoneHref: '+971585554446',
  email: 'info@doneevents.ae',
  whatsapp: 'https://wa.me/971585554446',
}
