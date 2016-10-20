import { GRAVITY } from './util/CONSTANTS';

class Crate {
  constructor(opts) {
    const { pos, vel, sprite } = opts;
    this.type = 'crate';
    this.pos = pos;
    this.vel = vel;
    this.sprite = sprite;

    this.update = this.update.bind(this);
    this.hitbox = this.hitbox.bind(this);
  }

  hitbox() {
    const { pos, sprite } = this;
    return [].concat(pos).concat(sprite.size);
  }

  update(dt) {
    this.vel[1] += GRAVITY * dt;
    this.pos[1] += this.vel[1] * dt;
  }

}

export default Crate;
