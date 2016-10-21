import Wall from '../Wall';

// WALL_THICKNESS
const WT = 30;

// constants related to stage 1
const SLW1 = 170;   // SIDE_LEDGE_WIDTH_1
const MLW1 = 300;   // MID_LEDGE_WIDTH_1
const HO1 = 20;     // HEIGHT_OFFSET_1
const OW1 = 150;    // OPENING_WIDTH_1

export const STAGE_1 = [
  // top walls
  new Wall({
    pos: [WT, 0],
    size: [450 - (OW1 / 2) - WT, WT]
  }),
  new Wall({
    pos: [450 + (OW1 / 2), 0],
    size: [450 - (OW1 / 2) - WT, WT]
  }),

  // bottom walls
  new Wall({
    pos: [WT, 600 - WT],
    size: [450 - (OW1 / 2) - WT, WT]
  }),
  new Wall({
    pos: [450 + (OW1 / 2), 600 - WT],
    size: [450 - (OW1 / 2) - WT, WT]
  }),

  // left wall
  new Wall({
    pos: [0, 0],
    size: [WT, 600]
  }),

  // right wall
  new Wall({
    pos: [900 - WT, 0],
    size: [WT, 600]
  }),

  // left ledge
  new Wall({
    pos: [WT, 300 - HO1],
    size: [SLW1, WT]
  }),

  // right ledge
  new Wall({
    pos: [900 - WT - SLW1, 300 - HO1],
    size: [SLW1, WT]
  }),

  // bottom-middle ledge
  new Wall({
    pos: [SLW1 + WT + 100, 400 - HO1],
    size: [MLW1, WT]
  }),

  // upper-middle ledge
  new Wall({
    pos: [SLW1 + WT + 100, 170 - HO1],
    size: [MLW1, WT]
  }),

  new Wall({
    pos: [0, -WT - 25],
    size: [900, WT]
  })
];

export const STAGE_1_CRATE_SPAWN = () => {
  const sample = max => Math.floor(Math.random() * max);
  const seed = [
    [110, 230],
    [120, 230],
    [100, 230],
    [90, 230],
    [440, 330],
    [450, 330],
    [430, 330],
    [420, 330],
    [180, 520],
    [190, 520],
    [170, 520],
    [160, 520],
    [690, 520],
    [780, 230],
    [790, 230],
    [770, 230],
    [760, 230]
  ][sample(17)];
  let multiplier = 1;
  if (Math.random() > 0.5) {
    multiplier = -1;
  }
  return [ (seed[0] + (multiplier * sample(10))), seed[1] ];
};
