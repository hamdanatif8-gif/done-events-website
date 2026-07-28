// ---------------------------------------------------------------------------
// THE DONE CREW — the original character family.
//
// Nine sculptural forms drawn from the apparatus of live events: a lit taper,
// a lamp, a plinth, a drape, two ribbons, a speaker cone, a hoist, a serving
// vessel, and the composite that assembles out of all of them. They are not
// mascots and not icons. They have posture, weight and a contact shadow, and
// every part they can move with is named so a timeline can drive it.
//
// Geometry lives on a 200 x 260 stage with the ground line at y = 248, so any
// two characters standing side by side share a floor.
//
// `parts` are drawn behind the body, `front` on top of it. Both accept either
// a filled path (`fill`, the default) or a stroked one (`stroke` + `w`).
// ---------------------------------------------------------------------------

export const STAGE = { w: 200, h: 260, ground: 248 }

export const family = {
  // 01 — OVERTURE. A lit taper that stood up. Rises, flickers, leans.
  spark: {
    name: 'Spark',
    role: 'The opening light',
    motion: 'rise',
    palette: ['#ffe500', '#ff7a28', '#ff2f8e'],
    body: 'M100 10c4 52 30 84 46 116 16 32 10 74-18 96-14 12-42 12-56 0-28-22-34-64-18-96 16-32 42-64 46-116Z',
    parts: [
      { id: 'armL', d: 'M52 190c-20-10-42-4-47 12-4 13 7 22 19 17 12-5 24-17 28-29Z' },
      { id: 'armR', d: 'M148 190c20-10 42-4 47 12 4 13-7 22-19 17-12-5-24-17-28-29Z' },
    ],
    eyes: [[86, 172, 7.5], [116, 172, 7.5]],
    light: { cx: 78, cy: 116, rx: 15, ry: 42, rotate: -16 },
    footprint: 0.44,
  },

  // 02 — CH.00 INTRO. A lamp that sat down and started explaining.
  beacon: {
    name: 'Beacon',
    role: 'The introduction',
    motion: 'sweep',
    palette: ['#83d9f2', '#bfa9ff', '#2318f0'],
    body: 'M16 248c0-52 38-84 84-84s84 32 84 84Z',
    parts: [
      { id: 'beam', d: 'M136 30 200 2v76l-64-26Z', opacity: 0.34 },
      { id: 'stalk', d: 'M88 88h24v82H88Z' },
      { id: 'head', d: 'M62 42c0-22 16-36 38-36s38 14 38 36v30c0 14-16 22-38 22s-38-8-38-22Z' },
    ],
    eyes: [[80, 206, 7], [120, 206, 7]],
    light: { cx: 62, cy: 196, rx: 26, ry: 12, rotate: -8 },
    footprint: 0.84,
  },

  // 03 — CH.01 CORPORATE. Architectural. Holds a level out in front of it.
  plinth: {
    name: 'Plinth',
    role: 'Structure and format',
    motion: 'step',
    palette: ['#ffe500', '#ffb020', '#232323'],
    body: 'M56 248V86h40V50h50v198Z',
    parts: [{ id: 'armL', d: 'M6 118h50v26H6a13 13 0 0 1 0-26Z' }],
    front: [{ id: 'head', d: 'M98 6h48a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H98a8 8 0 0 1-8-8V14a8 8 0 0 1 8-8Z' }],
    eyes: [[114, 27, 5.5], [136, 27, 5.5]],
    light: { cx: 70, cy: 150, rx: 8, ry: 60, rotate: 0 },
    footprint: 0.45,
  },

  // 04 — CH.02 PRIVATE. Folded around what it is holding. One eye in the gap.
  veil: {
    name: 'Veil',
    role: 'Discretion',
    motion: 'fold',
    palette: ['#ff63c9', '#bfa9ff', '#6a1f8f'],
    body: 'M100 246c-42 0-68-32-68-80 0-56 26-100 68-100s68 44 68 100c0 48-26 80-68 80Z',
    front: [
      {
        id: 'drape',
        d: 'M100 58c-40 0-67 44-68 102 14-20 30-40 50-45 21-5 38 8 47 27 11-20 26-33 39-35-6-31-33-49-68-49Z',
        tone: 'deep',
      },
    ],
    eyes: [[86, 182, 7], [118, 182, 8.5]],
    light: { cx: 72, cy: 158, rx: 13, ry: 30, rotate: -12 },
    footprint: 0.68,
  },

  // 05 — CH.03 WEDDINGS. Two ribbons that pass through each other and hold.
  knot: {
    name: 'Knot',
    role: 'Two into one',
    motion: 'orbit',
    palette: ['#6dee00', '#83d9f2', '#0f7a4a'],
    parts: [
      {
        id: 'strandA',
        d: 'M64 246c0-60-36-78-34-124 2-40 36-64 68-48 24 12 30 44 8 62',
        kind: 'stroke',
        w: 32,
      },
    ],
    front: [
      {
        id: 'strandB',
        d: 'M136 246c0-60 36-78 34-124-2-40-36-64-68-48-24 12-30 44-8 62',
        kind: 'stroke',
        w: 32,
        tone: 'deep',
      },
    ],
    eyes: [[70, 132, 6.5], [130, 132, 6.5]],
    light: { cx: 58, cy: 170, rx: 9, ry: 30, rotate: 14 },
    footprint: 0.5,
  },

  // 06 — CH.04 LIVE. A cone throwing rings. The loudest thing in the family.
  pulse: {
    name: 'Pulse',
    role: 'Sound and audience',
    motion: 'beat',
    palette: ['#ff7a28', '#ff2f8e', '#ffe500'],
    body: 'M68 246c-18 0-28-14-24-32L74 96c4-18 14-26 26-26s22 8 26 26l30 118c4 18-6 32-24 32Z',
    parts: [
      { id: 'ring3', d: 'M24 30C50-14 150-14 176 30', kind: 'stroke', w: 10, opacity: 0.55 },
      { id: 'ring2', d: 'M44 46C64 8 136 8 156 46', kind: 'stroke', w: 12, opacity: 0.75 },
      { id: 'ring1', d: 'M62 62c14-24 62-24 76 0', kind: 'stroke', w: 14 },
      { id: 'armL', d: 'M50 148c-18-10-38-4-42 12-3 12 8 20 19 15 11-5 20-16 23-27Z' },
      { id: 'armR', d: 'M150 148c18-10 38-4 42 12 3 12-8 20-19 15-11-5-20-16-23-27Z' },
    ],
    eyes: [[86, 152, 7], [114, 152, 7]],
    light: { cx: 82, cy: 130, rx: 8, ry: 40, rotate: 6 },
    footprint: 0.5,
  },

  // 07 — CH.05 PRODUCTION. Modular, segmented, carries a boom.
  rig: {
    name: 'Rig',
    role: 'The build',
    motion: 'travel',
    palette: ['#83d9f2', '#2318f0', '#0b1030'],
    body: 'M70 26h60v52H70Z',
    parts: [
      { id: 'boom', d: 'M128 40h58v18h-58Z' },
      { id: 'hook', d: 'M177 58v20a10 10 0 0 0 20 0', kind: 'stroke', w: 9 },
      { id: 'spine', d: 'M90 70h20v170H90Z', tone: 'deep' },
      { id: 'seg3', d: 'M74 82h52v44H74Z' },
      { id: 'seg2', d: 'M68 132h64v46H68Z' },
      { id: 'seg1', d: 'M62 184h76v44H62Z' },
      { id: 'base', d: 'M32 228h136v20a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6Z' },
    ],
    eyes: [[86, 50, 5.5], [114, 50, 5.5]],
    light: { cx: 80, cy: 46, rx: 7, ry: 16, rotate: 0 },
    footprint: 0.7,
  },

  // 08 — CH.06 HOSPITALITY. Wide-hipped, open-topped, pours.
  carafe: {
    name: 'Carafe',
    role: 'Welcome',
    motion: 'pour',
    palette: ['#bfa9ff', '#ff9d2f', '#ff63c9'],
    body: 'M100 248c-38 0-64-24-64-60 0-36 18-60 30-82l6-18h56l6 18c12 22 30 46 30 82 0 36-26 60-64 60Z',
    parts: [
      { id: 'arm', d: 'M162 148c22 0 34 18 28 38-4 14-18 18-28 12', kind: 'stroke', w: 15 },
      { id: 'neck', d: 'M72 88V46c0-12 10-18 28-18s28 6 28 18v42Z' },
      { id: 'lip', d: 'M62 26h76a8 8 0 0 1 0 16H62a8 8 0 0 1 0-16Z' },
    ],
    eyes: [[84, 192, 8], [116, 192, 8]],
    light: { cx: 70, cy: 170, rx: 12, ry: 30, rotate: -14 },
    footprint: 0.64,
  },

  // 09 — CH.07 + FINALE. Assembles out of the parts of all the others.
  composite: {
    name: 'Composite',
    role: 'The whole system',
    motion: 'assemble',
    palette: ['#2318f0', '#ff2f8e', '#ffe500'],
    body: 'M100 194c-32 0-52-22-52-50 0-26 14-44 26-60h52c12 16 26 34 26 60 0 28-20 50-52 50Z',
    parts: [
      { id: 'rings', d: 'M52 8c18-28 78-28 96 0', kind: 'stroke', w: 12, opacity: 0.6 },
      { id: "armL", d: "M44 126c-22-10-44-2-47 16-2 13 11 21 23 15 12-6 21-19 24-31Z" },
      { id: "armR", d: "M156 126c22-10 44-2 47 16 2 13-11 21-23 15-12-6-21-19-24-31Z" },
      { id: 'base', d: 'M52 190h96v58H52Z' },
    ],
    front: [
      { id: 'head', d: 'M70 22c0-14 12-24 30-24s30 10 30 24v40c0 12-12 20-30 20s-30-8-30-20Z' },
    ],
    eyes: [[86, 42, 6], [114, 42, 6]],
    light: { cx: 74, cy: 130, rx: 11, ry: 26, rotate: -10 },
    footprint: 0.5,
  },
}

export const familyOrder = [
  'spark',
  'beacon',
  'plinth',
  'veil',
  'knot',
  'pulse',
  'rig',
  'carafe',
  'composite',
]
