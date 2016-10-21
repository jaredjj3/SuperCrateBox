import Moveable from './Moveable';
import * as CONSTANTS from './util/CONSTANTS';
import * as SPRITES from './util/SPRITES';

class Player extends Moveable {
  constructor(opts) {
    super(opts);
    this.type = 'player';
    this.jumpNumber = 0;

    this.hitbox = () => ({
      x: this.pos[0] + 20,
      y: this.pos[1] + 15,
      w: 27,
      h: 49
    });

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(dt) {
    const input = window.input;
    const { pos, vel, jumpNumber } = this;
    const {
      PLAYER_VERTICAL_INIT_VEL,
      PLAYER_HORIZONTAL_VEL,
      PLAYER_HORIZONTAL_ACC
    } = CONSTANTS;
    const {
      PLAYER_RUN_RIGHT,
      PLAYER_RUN_LEFT,
      PLAYER_IDLE
    } = SPRITES;

    if (input.isDown('UP') || input.isDown('SPACE')) {
      if (true) {
        this.jumpNumber++;
        this.vel[1] = PLAYER_VERTICAL_INIT_VEL;
      }
    }

    if (input.isDown('LEFT')) {
      if (vel[0] > -PLAYER_HORIZONTAL_VEL) {
        this.vel[0] -= (PLAYER_HORIZONTAL_ACC * dt);
      } else {
        this.vel[0] = -PLAYER_HORIZONTAL_VEL;
      }
    } else if (input.isDown('RIGHT')) {
      if (this.vel[0] < PLAYER_HORIZONTAL_VEL) {
        this.vel[0] += (PLAYER_HORIZONTAL_ACC * dt);
      } else {
        this.vel[0] = PLAYER_HORIZONTAL_VEL;
      }
    } else {
      this.vel[0] = 0;
    }

    if (vel[0] > 0) {
      this.sprite = PLAYER_RUN_RIGHT;
    } else if (vel[0] < 0) {
      this.sprite = PLAYER_RUN_LEFT;
    } else {
      this.sprite = PLAYER_IDLE;
    }
  }


}

export default Player;
