import * as SPRITES from './SPRITES';
import * as STAGES from './STAGES';
import * as CONSTANTS from './CONSTANTS';
import WallSprite from '../WallSprite';
import Powerup from '../Powerup';
import Crate from '../Crate';
import Player from '../Player';
import Enemy from '../Enemy';
import Shield from '../Shield';

export const CRATE = () => (
  new Crate({
    pos: STAGES.CRATE_SPAWN(),
    vel: [0, 10],
    sprite: SPRITES.CRATE()
  })
);

export const ELECTRIC_SHIELD = (id, player) => (
  new Shield({
    id,
    pos: player.pos,
    type: 'electricShield',
    sprites: {
      normal: SPRITES.ELECTRIC_SHIELD(),
      flashing: SPRITES.ELECTRIC_SHIELD_FLASHING()
    },
    sprite: SPRITES.ELECTRIC_SHIELD()
  })
);

export const SHIELD = (id, player) => (
  new Shield({
    id,
    pos: player.pos,
    type: 'shield',
    sprites: {
      normal: SPRITES.SHIELD(),
      flashing: SPRITES.SHIELD_FLASHING(),
    },
    sprite: SPRITES.SHIELD()
  })
);

export const SHIELD_PICKUP = (id) => (
  new Powerup({
    id,
    pos: STAGES.POWERUP_SPAWN(),
    vel: [0, 0],
    type: 'shield',
    sprite: SPRITES.SHIELD_PICKUP()
  })
);

export const ELECTRIC_SHIELD_PICKUP = (id) => (
  new Powerup({
    id,
    pos: STAGES.POWERUP_SPAWN(),
    vel: [0, 0],
    type: 'electricShield',
    sprite: SPRITES.ELECTRIC_SHIELD_PICKUP()
  })
);

export const NUKE_PICKUP = (id) => (
  new Powerup({
    id,
    pos: STAGES.POWERUP_SPAWN(),
    vel: [0, 0],
    type: 'nuke',
    sprite: SPRITES.NUKE_PICKUP()
  })
);

export const PLAYER = () => (
  new Player({
    type: 'player',
    pos: [450, 250],
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
