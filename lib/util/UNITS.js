import * as SPRITES from './SPRITES';
import * as STAGES from './STAGES';
import * as CONSTANTS from './CONSTANTS';
import WallSprite from '../WallSprite';
import Powerup from '../Powerup';
import Crate from '../Crate';
import Player from '../Player';
import Enemy from '../Enemy';

export const CRATE = () => (
  new Crate({
    pos: STAGES.PICKUP_SPAWN(),
    vel: [0, 10],
    sprite: SPRITES.CRATE()
  })
);

export const SHIELD = () => (
  new Powerup({
    pos: STAGES.PICKUP_SPAWN(),
    vel: [0, 10],
    type: 'shield',
    sprite: new WallSprite([20, 20])
  })
);

export const INVINCIBILITY = () => (
  new Powerup({
    pos: STAGES.PICKUP_SPAWN(),
    vel: [0, 10],
    type: 'invincibility',
    sprite: new WallSprite([20, 20])
  })
);

export const FREEZE = () => (
  new Powerup({
    pos: STAGES.PICKUP_SPAWN(),
    vel: [0, 10],
    type: 'FREEZE',
    sprite: new WallSprite([20, 20])
  })
);

export const PLAYER = () => (
  new Player({
    type: 'player',
    pos: [450, 300],
    lastPos: [450, 300],
    vel: [0, 0],
    sprites: {
      idleRight: SPRITES.PLAYER_IDLE_RIGHT(),
      idleLeft: SPRITES.PLAYER_IDLE_LEFT(),
      runRight: SPRITES.PLAYER_RUN_RIGHT(),
      runLeft: SPRITES.PLAYER_RUN_LEFT(),
    },
    sprite: SPRITES.PLAYER_IDLE_RIGHT()
  })
);

export const HAMMER = (id) => (
  new Enemy({
    id,
    pos: [400, 0],
    vel: [CONSTANTS.ENEMY_ONE_VEL, 0],
    sprites: {
      runLeft: SPRITES.HAMMER_RUN_LEFT(),
      runRight: SPRITES.HAMMER_RUN_RIGHT()
    },
    sprite: SPRITES.HAMMER_RUN_LEFT()
  })
);
