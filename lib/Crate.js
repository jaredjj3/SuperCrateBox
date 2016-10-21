import { GRAVITY } from './util/CONSTANTS';
import Moveable from './Moveable';

class Crate extends Moveable {
  constructor(opts) {
    super(opts);
    this.type = 'crate';

    this.hitbox = () => ({
      x: this.pos[0],
      y: this.pos[1],
      w: this.sprite.size[0],
      h: this.sprite.size[1]
    });
  }

}

export default Crate;
