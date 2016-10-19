import Wall from '../Wall';

// WALL_THICKNESS
const WT = 30;

// constants related to stage 1
const SLW1 = 150;   // SIDE_LEDGE_WIDTH_1
const MLW1 = 340;   // MID_LEDGE_WIDTH_1
const HO1 = 20;     // HEIGHT_OFFSET_1
const OW1 = 150;    // OPENING_WIDTH_1

export const STAGE_1 = [
  // top walls
  {
    pos: [WT, 0],
    sprite: new Wall({ width: 450 - (OW1 / 2) - WT, height: WT })
  },
  {
    pos: [450 + (OW1 / 2), 0],
    sprite: new Wall({ width: 450 - (OW1 / 2) - WT, height: WT })
  },

  // bottom walls
  {
    pos: [WT, 600 - WT],
    sprite: new Wall({ width: 450 - (OW1 / 2) - WT, height: WT })
  },
  {
    pos: [450 + (OW1 / 2), 600 - WT],
    sprite: new Wall({ width: 450 - (OW1 / 2) - WT, height: WT })
  },

  // left wall
  {
    pos: [0, 0],
    sprite: new Wall({ width: WT, height: 600 })
  },

  // right wall
  {
    pos: [900 - WT, 0],
    sprite: new Wall({ width: WT, height: 600 })
  },

  // left ledge
  {
    pos: [WT, 300 - HO1],
    sprite: new Wall({ width: SLW1, height: WT })
  },

  // right ledge
  {
    pos: [900 - WT - SLW1, 300 - HO1],
    sprite: new Wall({ width: SLW1, height: WT })
  },

  // bottom-middle ledge
  {
    pos: [SLW1 + WT + 100, 400 - HO1],
    sprite: new Wall({ width: MLW1, height: WT })
  },

  // upper-middle ledge
  {
    pos: [SLW1 + WT + 100, 200 - HO1],
    sprite: new Wall({ width: MLW1, height: WT })
  },
];
