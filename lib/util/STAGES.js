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
  {
    type: 'wall',
    pos: [WT, 0],
    sprite: new Wall({ size: [450 - (OW1 / 2) - WT, WT] })
  },
  {
    type: 'wall',
    pos: [450 + (OW1 / 2), 0],
    sprite: new Wall({ size: [450 - (OW1 / 2) - WT, WT] })
  },

  // bottom walls
  {
    type: 'wall',
    pos: [WT, 600 - WT],
    sprite: new Wall({ size: [450 - (OW1 / 2) - WT, WT] })
  },
  {
    type: 'wall',
    pos: [450 + (OW1 / 2), 600 - WT],
    sprite: new Wall({ size: [450 - (OW1 / 2) - WT, WT] })
  },

  // left wall
  {
    type: 'wall',
    pos: [0, 0],
    sprite: new Wall({ size: [WT, 600] })
  },

  // right wall
  {
    type: 'wall',
    pos: [900 - WT, 0],
    sprite: new Wall({ size: [WT, 600] })
  },

  // left ledge
  {
    type: 'wall',
    pos: [WT, 300 - HO1],
    sprite: new Wall({ size: [SLW1, WT] })
  },

  // right ledge
  {
    type: 'wall',
    pos: [900 - WT - SLW1, 300 - HO1],
    sprite: new Wall({ size: [SLW1, WT] })
  },

  // bottom-middle ledge
  {
    type: 'wall',
    pos: [SLW1 + WT + 100, 400 - HO1],
    sprite: new Wall({ size: [MLW1, WT] })
  },

  // upper-middle ledge
  {
    type: 'wall',
    pos: [SLW1 + WT + 100, 170 - HO1],
    sprite: new Wall({ size: [MLW1, WT] })
  },
];
