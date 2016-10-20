import Sprite from '../Sprite';

export const PLAYER_IDLE = new Sprite({
  url: './lib/img/jay.png',
  pos: [0, 0],
  frames: [
    0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0
  ],
  size: [64, 64],
  speed: 13,
  dir: 'horizontal',
  once: false,
  facing: 'right'
});


export const PLAYER_RUN_RIGHT = new Sprite({
  url: './lib/img/jay.png',
  pos: [0, 0],
  frames: [5, 6, 7, 8, 9, 8, 7, 6],
  size: [64, 64],
  speed: 13,
  dir: 'horizontal',
  once: false,
  facing: 'right'
});


export const PLAYER_RUN_LEFT = new Sprite({
  url: './lib/img/jay.png',
  pos: [0, 0],
  frames: [6, 7, 8, 9, 8, 7, 6, 5],
  size: [64, 64],
  speed: 13,
  dir: 'horizontal',
  once: false,
  facing: 'left'
});
