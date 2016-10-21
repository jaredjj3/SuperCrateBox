import Enemy from '../Enemy';
import * as CONSTANTS from './CONSTANTS';
import * as SPRITES from './SPRITES';

const multiplier = () => {
  if (Math.random() > 0.5) {
    return -1;
  }
  return 1;
};

export const ENEMY_1 = () => ( new Enemy({
    type: 'enemy',
    pos: [400, 0],
    lastPos: [450, 0],
    vel: [CONSTANTS.ENEMY_ONE_VEL, 0],
    sprite: SPRITES.PLAYER_IDLE
  })
);
