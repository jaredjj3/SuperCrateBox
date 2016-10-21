import * as CONSTANTS from './util/CONSTANTS';

class Moveable {
  constructor(opts) {
    const { pos, lastPos, vel, lastVel, sprites, sprite } = opts;
    this.pos = pos;
    this.lastPos = [0, 0];
    this.vel = vel;
    this.lastVel = [0, 0];
    this.sprites = sprites;
    this.sprite = sprite;

    this.update = this.update.bind(this);
  }

  update(dt) {
    this.lastPos[0] = this.pos[0];
    this.lastPos[1] = this.pos[1];
    this.lastVel[0] = this.vel[0];
    this.lastVel[1] = this.vel[1];
    this.vel[1] += CONSTANTS.GRAVITY * dt;
    this.pos[0] += this.vel[0] * dt;
    this.pos[1] += this.vel[1] * dt;
    this.sprite.update(dt);
  }

}

export default Moveable;
