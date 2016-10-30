import Moveable from './Moveable';

class Powerup extends Moveable {
  constructor(opts) {
    super(opts);
    this.type = opts.type;
    this.id = opts.id;
    this.createdAt = Date.now();

    this.hitbox = () => ({
      x: this.pos[0],
      y: this.pos[1],
      w: this.sprite.size[0],
      h: this.sprite.size[1]
    });
  }

  update(dt) {
    this.sprite.update(dt);
  }
}

export default Powerup;
