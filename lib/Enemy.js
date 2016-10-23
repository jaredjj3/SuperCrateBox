import Moveable from './Moveable';
import * as CONSTANTS from './util/CONSTANTS';
import * as SPRITES from './util/SPRITES';

class Enemy extends Moveable {
  constructor(opts) {
    super(opts);
    this.type = 'enemy';
    this.speed = this.randomSpeed();
    this.direction = Math.random() > 0.5 ? 'left' : 'right';
    this.id = opts.id;
    this.isDead = false;

    this.hitbox = () => ({
      x: this.pos[0] + 20,
      y: this.pos[1] + 15,
      w: 27,
      h: 49
    });

    this.handleCollision = this.handleCollision.bind(this);
    this.update = this.update.bind(this);
  }

  randomSpeed() {
    return CONSTANTS.ENEMY_ONE_VEL * (0.8 + (Math.random() * 0.3));
  }

  handleCollision(collisionType) {
    if (collisionType === 'right') {
      this.direction = 'left';
    } else if (collisionType === 'left') {
      this.direction = 'right';
    }
  }

  update(dt) {
    const { sprites, direction, speed } = this;
    if (direction === 'left') {
      this.vel[0] = -speed;
      this.sprite = sprites.runRight; // facing wrong way in sprite sheet
    } else if (direction === 'right') {
      this.vel[0] = speed;
      this.sprite = sprites.runLeft; // facing wrong way in sprite sheet
    }
    if (this.pos[0] > 900 || this.pos[1] > 600) {
      this.pos[0] = 400;
      this.pos[1] = 0;
      this.speed = this.randomSpeed();
    }

    this.lastPos[0] = this.pos[0];
    this.lastPos[1] = this.pos[1];
    this.lastVel[0] = this.vel[0];
    this.lastVel[1] = this.vel[1];

    this.vel[1] += Math.random() > 0.9999 ? CONSTANTS.ENEMY_ONE_INIT_VEL : 0;
    this.vel[1] += CONSTANTS.GRAVITY * dt;
    this.pos[0] += this.vel[0] * dt;
    this.pos[1] += this.vel[1] * dt;
    this.sprite.update(dt);
  }

}

export default Enemy;
