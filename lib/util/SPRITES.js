import Sprite from '../Sprite';

export const ELECTRIC_SHIELD = () => (
  new Sprite({
    url: './lib/img/electricShield.png',
    pos: [0, 0],
    frames: [0, 1, 2, 3, 2, 1, 0],
    size: [64, 64],
    speed: 10,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const ELECTRIC_SHIELD_FLASHING = () => (
  new Sprite({
    url: './lib/img/electricShield.png',
    pos: [0, 0],
    frames: [0, 5, 1, 5, 2, 5, 3, 5, 2, 5, 1, 5, 0],
    size: [64, 64],
    speed: 20,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const SHIELD = () => (
  new Sprite({
    url: './lib/img/shield.png',
    pos: [0, 0],
    frames: [0, 1, 2, 3, 2, 1, 0],
    size: [64, 64],
    speed: 10,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const SHIELD_FLASHING = () => (
  new Sprite({
    url:'./lib/img/shield.png',
    pos: [0, 0],
    frames: [0, 5, 1, 5, 2, 5, 3, 5, 2, 5, 1, 5, 0],
    size: [64, 64],
    speed: 20,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const SHIELD_PICKUP = () => (
  new Sprite({
    url: './lib/img/shieldPickup.png',
    pos: [0, 0],
    frames: [0, 1, 2, 1, 0],
    size: [64, 64],
    speed: 5,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const ELECTRIC_SHIELD_PICKUP = () => (
  new Sprite({
    url: './lib/img/electricShieldPickup.png',
    pos: [0, 0],
    frames: [0, 1, 2, 1, 0],
    size: [64, 64],
    speed: 5,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const NUKE_PICKUP = () => (
  new Sprite({
    url: './lib/img/nukePickup.png',
    pos: [0, 0],
    frames: [0, 1, 2, 1, 0],
    size: [64, 64],
    speed: 5,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const PLAYER_IDLE_RIGHT = () => (
  new Sprite({
    url: './lib/img/jay.png',
    pos: [0, 0],
    frames: [
      0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0
    ],
    size: [64, 64],
    speed: 24,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const PLAYER_IDLE_LEFT = () => (
  new Sprite({
    url: './lib/img/jay.png',
    pos: [0, 0],
    frames: [
      0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0
    ],
    size: [64, 64],
    speed: 24,
    dir: 'horizontal',
    once: false,
    facing: 'left'
  })
);


export const PLAYER_RUN_RIGHT = () => (
  new Sprite({
    url: './lib/img/jay.png',
    pos: [0, 0],
    frames: [5, 6, 7, 8, 9, 8, 7, 6],
    size: [64, 64],
    speed: 18,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);


export const PLAYER_RUN_LEFT = () => (
  new Sprite({
    url: './lib/img/jay.png',
    pos: [0, 0],
    frames: [6, 7, 8, 9, 8, 7, 6, 5],
    size: [64, 64],
    speed: 18,
    dir: 'horizontal',
    once: false,
    facing: 'left'
  })
);

export const PLAYER_FLOAT_RIGHT = () => (
  new Sprite({
    url: './lib/img/jay.png',
    pos: [0, 0],
    frames: [12],
    size: [64, 64],
    speed: 1,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const PLAYER_FLOAT_LEFT = () => (
  new Sprite({
    url: './lib/img/jay.png',
    pos: [0, 0],
    frames: [12],
    size: [64, 64],
    speed: 1,
    dir: 'horizontal',
    once: false,
    facing: 'left'
  })
);


export const PLAYER_JUMP_RIGHT = () => (
  new Sprite({
    url: './lib/img/jay.png',
    pos: [0, 0],
    frames: [10, 11, 11, 12, 12, 12, 12, 12, 12, 12],
    size: [64, 64],
    speed: 24,
    dir: 'horizontal',
    once: true,
    facing: 'right'
  })
);

export const PLAYER_JUMP_LEFT = () => (
  new Sprite({
    url: './lib/img/jay.png',
    pos: [0, 0],
    frames: [10, 11, 11, 12, 12, 12, 12, 12, 12, 12],
    size: [64, 64],
    speed: 24,
    dir: 'horizontal',
    once: true,
    facing: 'left'
  })
);

export const CRATE = () => (
  new Sprite({
    url: './lib/img/crate.png',
    pos: [0, 0],
    frames: [0],
    size: [20, 20],
    speed: 1,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const HAMMER_RUN_RIGHT = () => (
  new Sprite({
    url: './lib/img/hammer.png',
    pos: [0, 0],
    frames: [0, 1, 2, 3, 4, 3, 2, 1],
    size: [64, 64],
    speed: 20,
    dir: 'horizontal',
    once: false,
    facing: 'right'
  })
);

export const HAMMER_RUN_LEFT = () => (
  new Sprite({
    url: './lib/img/hammer.png',
    pos: [0, 0],
    frames: [0, 1, 2, 3, 4, 3, 2, 1],
    size: [64, 64],
    speed: 20,
    dir: 'horizontal',
    once: false,
    facing: 'left'
  })
);
