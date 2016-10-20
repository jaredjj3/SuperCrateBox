import * as CONSTANTS from './util/CONSTANTS';

class Enemy {
  constructor(opts) {
    const { type, pos, vel, sprite, lastPos } = opts;
    this.type = type;
    this.pos = pos;
    this.lastPos = lastPos;
    this.vel = vel;
    this.sprite = sprite;

    this.hitbox = this.hitbox.bind(this);
    this.update = this.update.bind(this);
  }

  hitbox() {
    const { pos, sprite } = this;
    return [
      pos[0] + 20,
      pos[1] + 15,
      27,
      49
    ];
  }

  update(dt) {
    this.lastPos[0] = this.pos[0];
    this.lastPos[1] = this.pos[1];
    this.vel[1] += CONSTANTS.GRAVITY * dt;
    this.pos[0] += this.vel[0] * dt;
    this.pos[1] += this.vel[1] * dt;
  }


}

export default Enemy;
