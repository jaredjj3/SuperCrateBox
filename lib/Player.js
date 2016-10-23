import Moveable from './Moveable';
import * as CONSTANTS from './util/CONSTANTS';
import * as SPRITES from './util/SPRITES';

class Player extends Moveable {
  constructor(opts) {
    super(opts);
    this.type = 'player';
    this.jumpNumber = 0;
    this.jumpKeyPressed = false;
    this.lastJumpTime = Date.now();
    this.lastRunDirection = 'right';

    this.hitbox = () => ({
      x: this.pos[0] + 20,
      y: this.pos[1] + 15,
      w: 27,
      h: 49
    });

    this.setSprite = this.setSprite.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSurfaceCollison = this.handleSurfaceCollison.bind(this);
    this.handleEnemyCollision = this.handleEnemyCollision.bind(this);
    this.handleJumpKeyPress = this.handleJumpKeyPress.bind(this);
    this.handleJumpKeyRelease = this.handleJumpKeyRelease.bind(this);
  }

  setSprite() {
    const { vel, sprites, isFloating } = this;
    const vx = vel[0];
    const vy = vel[1];

    if (vx > 0) {
      this.sprite = sprites.runRight;
    } else if (vx < 0) {
      this.sprite = sprites.runLeft;
    } else {
      if (this.lastRunDirection === 'right') {
        this.sprite = sprites.idleRight;
      } else if (this.lastRunDirection === 'left') {
        this.sprite = sprites.idleLeft;
      }
    }
  }

  handleEnemyCollision(collisionType, enemy, game) {
    switch(collisionType) {
      default:
        game.reset();
        break;
    }
  }

  handleSurfaceCollison(collisionType) {
    if (collisionType === 'bottom') {
      this.jumpNumber = 0;
    }
  }

  handleJumpKeyPress() {
    if (this.jumpNumber < 2 && !this.jumpKeyPressed) {
      this.jumpNumber++;
      this.vel[1] = CONSTANTS.PLAYER_VERTICAL_INIT_VEL;
    }
    this.jumpKeyPressed = true;
  }

  handleJumpKeyRelease() {
    this.jumpKeyPressed = false;
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
      this.lastRunDirection = 'left';
      if (vel[0] > -PLAYER_HORIZONTAL_VEL) {
        this.vel[0] -= (PLAYER_HORIZONTAL_ACC * dt);
      } else {
        this.vel[0] = -PLAYER_HORIZONTAL_VEL;
      }
    } else if (input.isDown('RIGHT')) {
      this.lastRunDirection = 'right';
      if (this.vel[0] < PLAYER_HORIZONTAL_VEL) {
        this.vel[0] += (PLAYER_HORIZONTAL_ACC * dt);
      } else {
        this.vel[0] = PLAYER_HORIZONTAL_VEL;
      }
    } else {
      this.vel[0] = 0;
    }

    this.setSprite();
  }



}

export default Player;
