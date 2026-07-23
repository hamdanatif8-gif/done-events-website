/* -----------------------------------------------------------------------------
   DONE Events & Entertainment — single source of content truth.

   RULE: nothing in this file may be invented. Client names, project names,
   venues, guest counts, founding dates, awards and statistics are deliberately
   absent until verified information is supplied. Descriptive, honest labels are
   used in their place.
----------------------------------------------------------------------------- */

/* Three strategic disciplines. These support the service catalogue below —
   they are not the client-facing entry point. */
export const capabilities = [
  {
    id: 'creative-direction',
    number: '01',
    title: 'Creative direction',
    statement: 'A clear idea, made useful across every guest touchpoint.',
    description:
      'We define the purpose, format, identity, content and guest journey before production begins. That shared direction keeps the experience coherent and the decisions practical.',
    scope: ['Concept & format', 'Event identity & content', 'Guest journey', 'Spatial direction'],
  },
  {
    id: 'production',
    number: '02',
    title: 'Production & technical',
    statement: 'The technical system behind a confident live experience.',
    description:
      'Stage, set, sound, light, video, performance and show control are planned as one delivery, then managed through the build and the live cues on site.',
    scope: ['Stage & set', 'Lighting & audio', 'Video & content systems', 'Live show control'],
  },
  {
    id: 'hospitality',
    number: '03',
    title: 'Hospitality & operations',
    statement: 'Every arrival, service moment and handover accounted for.',
    description:
      'Venue, catering, front of house, suppliers and on-site operations are coordinated around the guest experience, from first arrival to final departure.',
    scope: ['Venue & guest flow', 'Catering & service', 'Front of house', 'On-site operations'],
  },
]

/* The client-facing catalogue. This is what people search for and hire for. */
export const serviceCategories = [
  {
    id: 'service-corporate-events',
    number: '01',
    title: 'Corporate events',
    pillar: 'Creative direction',
    summary: 'Conferences, leadership gatherings, launches, awards and gala dinners built around a business objective.',
    includes: ['Conferences & summits', 'Product launches', 'Awards & gala dinners', 'Leadership offsites'],
    image: 'corporate.jpg',
    imageAlt: 'A gala dinner with a seated audience facing a stage and screen',
    imageFocus: '50% 45%',
    featured: true,
  },
  {
    id: 'service-event-production',
    number: '02',
    title: 'Event production',
    pillar: 'Production & technical',
    summary: 'Technical planning and on-site delivery across staging, set, lighting, audio, video and show control.',
    includes: ['Stage & set build', 'Lighting & audio design', 'Video & content playback', 'Show calling'],
    image: 'production.jpg',
    imageAlt: 'Hands operating faders on a live sound console',
    imageFocus: '52% 55%',
    featured: true,
  },
  {
    id: 'service-weddings-celebrations',
    number: '03',
    title: 'Weddings & celebrations',
    pillar: 'Hospitality & operations',
    summary: 'Personal occasions coordinated with discretion, warmth and close attention to timing and detail.',
    includes: ['Ceremony & reception', 'Styling & florals direction', 'Guest hosting', 'Run of day'],
    image: 'weddings.jpg',
    imageAlt: 'An outdoor wedding ceremony setting at dusk with florals and seated guests',
    imageFocus: '50% 50%',
    featured: true,
  },
  {
    id: 'service-concerts-live-shows',
    number: '04',
    title: 'Concerts & live shows',
    pillar: 'Production & technical',
    summary: 'Performance-led formats where artist requirements, audience experience and technical execution move together.',
    includes: ['Artist advancing', 'Stage & rigging', 'Audience & crowd flow', 'Backline & crew'],
    image: 'concerts.jpg',
    imageAlt: 'A large audience facing a lit stage during a live performance',
    imageFocus: '50% 50%',
  },
  {
    id: 'service-catering-hospitality',
    number: '05',
    title: 'Catering & hospitality',
    pillar: 'Hospitality & operations',
    summary: 'Food, beverage and service planned as part of the event rhythm rather than as a separate layer.',
    includes: ['Menu direction', 'Service timing', 'Bar & beverage', 'Front of house teams'],
    image: 'catering.jpg',
    imageAlt: 'A candlelit banquet table prepared for evening service',
    imageFocus: '50% 60%',
    featured: true,
  },
  {
    id: 'service-beach-outdoor-events',
    number: '06',
    title: 'Beach & outdoor events',
    pillar: 'Production & technical',
    summary: 'Weather-aware, site-sensitive production for waterfront, resort and open-air settings.',
    includes: ['Site survey & build', 'Power & rigging', 'Shade, cooling & comfort', 'Weather contingency'],
    image: 'beach.jpg',
    imageAlt: 'A daytime beach club setting with sun loungers and palms',
    imageFocus: '50% 50%',
  },
  {
    id: 'service-private-events',
    number: '07',
    title: 'Private events',
    pillar: 'Creative direction',
    summary: 'Discreet, personal occasions shaped around the host, the guests and the setting.',
    includes: ['Guest list & hosting', 'Venue sourcing', 'Entertainment', 'Discretion & security liaison'],
  },
  {
    id: 'service-brand-activations',
    number: '08',
    title: 'Brand activations',
    pillar: 'Creative direction',
    summary: 'Live brand experiences that turn a campaign idea into a clear physical encounter.',
    includes: ['Concept & spatial design', 'Fabrication management', 'Staffing & hosting', 'Content capture'],
  },
  {
    id: 'service-entertainment',
    number: '09',
    title: 'Entertainment',
    pillar: 'Production & technical',
    summary: 'Talent and performance integrated into the concept, the schedule and the production plan.',
    includes: ['Talent sourcing', 'Performance direction', 'Rehearsal & advancing', 'Rider management'],
  },
  {
    id: 'service-venue-transformation',
    number: '10',
    title: 'Venue transformation',
    pillar: 'Creative direction',
    summary: 'Creative and spatial direction that changes how a venue looks, flows and feels while keeping the operation practical.',
    includes: ['Spatial planning', 'Scenic & dressing', 'Architectural lighting', 'Build & strike'],
  },
  {
    id: 'service-lounges',
    number: '11',
    title: 'Lounges & social events',
    pillar: 'Hospitality & operations',
    summary: 'Comfortable social settings designed for conversation, hosting and a measured flow of service.',
    includes: ['Layout & seating', 'Ambient lighting & sound', 'Service model', 'Host presence'],
  },
  {
    id: 'service-turnkey-event-management',
    number: '12',
    title: 'Turnkey event management',
    pillar: 'Hospitality & operations',
    summary: 'One accountable team coordinating the brief, partners, schedule, delivery and live operation.',
    includes: ['Budget & schedule', 'Supplier contracting', 'Permits & venue liaison', 'On-site management'],
  },
]

/* How a client can engage DONE. Derived directly from the service catalogue. */
export const engagementModels = [
  {
    id: 'turnkey',
    title: 'Turnkey delivery',
    description: 'DONE holds the brief end to end — creative, production, hospitality, suppliers and the live operation.',
    bestFor: 'Clients who want one accountable partner',
  },
  {
    id: 'production-partner',
    title: 'Production partner',
    description: 'A creative or venue team is already in place and DONE delivers the technical build and live show control.',
    bestFor: 'Agencies, venues and in-house marketing teams',
  },
  {
    id: 'creative-partner',
    title: 'Creative & content partner',
    description: 'DONE sets the concept, format, guest journey and content, then hands a clear plan to the delivery teams.',
    bestFor: 'Brands with existing production suppliers',
  },
]

/* Portfolio. Descriptive, verifiable presentation only.
   CONTENT PLACEHOLDER: swap title/meta for cleared project credits when supplied. */
export const portfolioProjects = [
  {
    id: 'corporate-gala',
    number: '01',
    title: 'Corporate gala & awards',
    location: 'Dubai',
    format: 'Corporate event',
    scope: ['Creative direction', 'Staging & set', 'Show control', 'Guest hospitality'],
    note: 'Room, content, run of show and guest flow held to a single plan so the message stays legible from the back of the ballroom.',
    image: 'corporate.jpg',
    imageAlt: 'A gala dinner room with round tables facing a lit stage and screen',
    imageFocus: '50% 45%',
    size: 'wide',
  },
  {
    id: 'technical-production',
    number: '02',
    title: 'Live technical production',
    location: 'Dubai',
    format: 'Production',
    scope: ['Audio system design', 'Lighting', 'Video playback', 'Show calling'],
    note: 'Back-of-house systems prepared and rehearsed so the live cues stay invisible to the room.',
    image: 'production.jpg',
    imageAlt: 'An engineer operating a lighting and sound desk during a live event',
    imageFocus: '55% 50%',
    size: 'tall',
  },
  {
    id: 'wedding-celebration',
    number: '03',
    title: 'Wedding celebration',
    location: 'Dubai',
    format: 'Private celebration',
    scope: ['Venue transformation', 'Styling direction', 'Entertainment', 'Guest experience'],
    note: 'Ceremony, reception and service rhythm coordinated as one day rather than a sequence of supplier handovers.',
    image: 'weddings.jpg',
    imageAlt: 'An outdoor wedding ceremony at dusk with floral styling and seated guests',
    imageFocus: '50% 48%',
    size: 'tall',
  },
  {
    id: 'live-show',
    number: '04',
    title: 'Concert & live show',
    location: 'Dubai',
    format: 'Live entertainment',
    scope: ['Artist advancing', 'Stage & rigging', 'Audience flow', 'Crew management'],
    note: 'Performance requirements, audience comfort and technical delivery advanced together ahead of doors.',
    image: 'concerts.jpg',
    imageAlt: 'A concert audience with raised hands facing a brightly lit stage',
    imageFocus: '50% 45%',
    size: 'wide',
  },
  {
    id: 'private-dining',
    number: '05',
    title: 'Private dining & hospitality',
    location: 'Dubai',
    format: 'Hospitality',
    scope: ['Table & service design', 'Menu direction', 'Front of house', 'Ambient lighting'],
    note: 'Service timing, table design and lighting set to the same pace so the room settles as the evening moves.',
    image: 'candlelit.jpg',
    imageAlt: 'A candlelit outdoor table setting with florals and prepared place settings',
    imageFocus: '50% 55%',
    size: 'standard',
  },
  {
    id: 'waterfront-event',
    number: '06',
    title: 'Waterfront & outdoor event',
    location: 'Dubai',
    format: 'Destination format',
    scope: ['Site build', 'Power & rigging', 'Guest comfort', 'Weather contingency'],
    note: 'Open-air delivery planned around the site, the light and the conditions of the day.',
    image: 'beach-skyline.jpg',
    imageAlt: 'A waterfront setting at golden hour with the Dubai skyline beyond',
    imageFocus: '50% 50%',
    size: 'standard',
  },
]

/* Category rail used on Home. */
export const eventFormats = [
  {
    id: 'corporate-brand',
    title: 'Corporate & brand',
    description: 'Conferences, launches, awards and gala dinners.',
    href: '/services#service-corporate-events',
  },
  {
    id: 'concerts',
    title: 'Concerts & live shows',
    description: 'Artist-led events with performance and operations aligned.',
    href: '/services#service-concerts-live-shows',
  },
  {
    id: 'private-weddings',
    title: 'Weddings & private events',
    description: 'Personal celebrations delivered with discretion.',
    href: '/services#service-weddings-celebrations',
  },
  {
    id: 'hospitality-lounges',
    title: 'Hospitality & lounges',
    description: 'Catering, service and guest environments as one experience.',
    href: '/services#service-catering-hospitality',
  },
  {
    id: 'outdoor',
    title: 'Beach & outdoor',
    description: 'Waterfront, resort and open-air formats.',
    href: '/services#service-beach-outdoor-events',
  },
  {
    id: 'activations',
    title: 'Brand activations',
    description: 'Campaign ideas turned into physical encounters.',
    href: '/services#service-brand-activations',
  },
]

/* Credibility without invented clients: verified capability, not fake logos.
   CONTENT PLACEHOLDER: replace with a client logo strip once written approval
   to display client marks is confirmed. */
export const capabilityProof = [
  { id: 'scope', label: 'Single point of accountability', value: 'Brief to strike' },
  { id: 'discipline', label: 'In-house disciplines', value: 'Creative · Production · Hospitality' },
  { id: 'formats', label: 'Formats delivered', value: 'Corporate · Live · Private · Outdoor' },
  { id: 'base', label: 'Operating base', value: 'Dubai, United Arab Emirates' },
  { id: 'coverage', label: 'Coverage', value: 'All seven emirates' },
]

export const deliverables = [
  { number: '01', title: 'Concept & format', description: 'The idea, the shape of the day and what the event has to achieve.' },
  { number: '02', title: 'Budget & schedule', description: 'A costed plan with clear decision points and no hidden dependencies.' },
  { number: '03', title: 'Venue & permits', description: 'Sourcing, site survey, venue liaison and the approvals the format requires.' },
  { number: '04', title: 'Technical design', description: 'Staging, audio, lighting, video and power drawn to the room, not to a template.' },
  { number: '05', title: 'Suppliers & crew', description: 'Contracted partners, crew calls and a build schedule everyone works from.' },
  { number: '06', title: 'Live delivery', description: 'On-site management, show control and one team responsible until strike.' },
]

export const operatingStandards = [
  { number: '01', title: 'One direction', description: 'Creative and operational decisions are made in the same room.' },
  { number: '02', title: 'Full responsibility', description: 'Every partner, handover and live cue sits against one plan.' },
  { number: '03', title: 'Calm delivery', description: 'Rigorous preparation keeps the live event composed.' },
  { number: '04', title: 'Honest partnership', description: 'Clear recommendations, transparent costs and no unnecessary complexity.' },
]

export const processSteps = [
  { number: '01', title: 'Brief', description: 'Define the audience, purpose, parameters and measure of success.' },
  { number: '02', title: 'Direction', description: 'Establish the creative idea and the operating plan behind it.' },
  { number: '03', title: 'Build', description: 'Coordinate venue, partners, hospitality, entertainment and production.' },
  { number: '04', title: 'Live', description: 'Lead the event from first arrival to final cue.' },
]

export const contactDetails = {
  phone: '+971 58 555 4446',
  phoneHref: 'tel:+971585554446',
  email: 'info@doneevents.ae',
  emailHref: 'mailto:info@doneevents.ae',
  whatsapp: 'https://wa.me/971585554446',
  location: 'Dubai, United Arab Emirates',
}

export const routeMeta = {
  '/': {
    title: 'DONE Events & Entertainment | Dubai Event Production',
    description:
      'Creative direction, production and hospitality for corporate, live, outdoor and private events in Dubai.',
  },
  '/services': {
    title: 'Event Services | DONE Events & Entertainment Dubai',
    description:
      'Corporate and private events, live shows, technical production, hospitality, activations and turnkey event management in Dubai.',
  },
  '/portfolio': {
    title: 'Selected Work | DONE Events & Entertainment',
    description: 'Selected event environments across corporate, live, destination and private formats.',
  },
  '/about': {
    title: 'About DONE | One Accountable Event Team',
    description: 'A Dubai-based event team uniting creative, operational and technical delivery.',
  },
  '/contact': {
    title: 'Discuss an Event | DONE Events & Entertainment',
    description: 'Share your event brief with the DONE Events team in Dubai.',
  },
}
