import Moveable from './Moveable';
import * as CONSTANTS from './util/CONSTANTS';
import * as SPRITES from './util/SPRITES';

class Player extends Moveable {
  constructor(opts) {
    super(opts);
    this.type = 'player';
    this.jumpNumber = 0;
    this.isInAir = false;
    this.lastJumpTime = 0;

    this.hitbox = () => ({
      x: this.pos[0] + 20,
      y: this.pos[1] + 15,
      w: 27,
      h: 49
    });

    this.handleInput = this.handleInput.bind(this);
    this.handleJumpKeyPress = this.handleJumpKeyPress.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
  }

  handleCollision(collisionType) {
    if (!collisionType) {

    }
  }

  handleJumpKeyPress() {
    this.jumpNumber++;
    this.vel[1] = CONSTANTS.PLAYER_VERTICAL_INIT_VEL;
  }

  handleJumpKeyRelease() {

  }

  handleInput(dt) {
    const input = window.input;
    const {
      pos,
      vel,
      sprites,
      jumpNumber,
      handleJumpKeyPress,
      handleJumpKeyRelease
     } = this;
    const {
      PLAYER_HORIZONTAL_VEL,
      PLAYER_HORIZONTAL_ACC
    } = CONSTANTS;

    if (input.isDown('UP') || input.isDown('SPACE')) {
      handleJumpKeyPress();
    } else {
      handleJumpKeyRelease();
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
      this.sprite = sprites.runRight;
    } else if (vel[0] < 0) {
      this.sprite = sprites.runLeft;
    } else {
      this.sprite = sprites.idle;
    }
  }



}

export default Player;
