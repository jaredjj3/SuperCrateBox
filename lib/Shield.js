import Moveable from './Moveable';

class Shield extends Moveable {
  constructor(opts) {
    super(opts);
    this.id = opts.id;
    this.type = opts.type;
  }

  update(dt) {
    this.sprite.update(dt);
  }

}

export default Shield;
