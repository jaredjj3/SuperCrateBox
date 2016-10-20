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
  })
];