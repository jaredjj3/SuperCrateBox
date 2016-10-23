import Moveable from './Moveable';

class Powerup extends Moveable {
  constructor(opts) {
    super(opts);
    this.type = opts.type;
  }
}

export default Powerup;
