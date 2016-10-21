import Moveable from './Moveable';
import * as CONSTANTS from './util/CONSTANTS';

class Enemy extends Moveable {
  constructor(opts) {
    super(opts);
    this.type = 'enemy';
    this.speed = CONSTANTS.ENEMY_ONE_VEL * (0.8 + (Math.random() * 0.3));
    this.direction = Math.random() > 0.5 ? 'left' : 'right';

    this.hitbox = () => ({
      x: this.pos[0] + 20,
      y: this.pos[1] + 15,
      w: 27,
      h: 49
    });

    this.handleCollision = this.handleCollision.bind(this);
    this.update = this.update.bind(this);
  }

  handleCollision(collisionType) {
    if (collisionType === 'right') {
      this.direction = 'left';
    } else if (collisionType === 'left') {
      this.direction = 'right';
    }
  }

  update(dt) {
    if (this.direction === 'left') {
      this.vel[0] = -this.speed;
    } else if (this.direction === 'right') {
      this.vel[0] = this.speed;
    }
    if (this.pos[0] > 900 || this.pos[1] > 600) {
      this.pos[0] = 400;
      this.pos[1] = 0;
    }

    this.lastPos[0] = this.pos[0];
    this.lastPos[1] = this.pos[1];
    this.lastVel[0] = this.vel[0];
    this.lastVel[1] = this.vel[1];

    this.vel[1] += Math.random() > 0.99 ? CONSTANTS.ENEMY_ONE_INIT_VEL : 0;
    this.vel[1] += CONSTANTS.GRAVITY * dt;
    this.pos[0] += this.vel[0] * dt;
    this.pos[1] += this.vel[1] * dt;
    this.sprite.update(dt);
  }

}

export default Enemy;
