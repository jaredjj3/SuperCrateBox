import Moveable from './Moveable';

class Shield extends Moveable {
  constructor(opts) {
    super(opts);

    this.type = opts.type;
  }

  update(dt) {
    this.sprite.update(dt);
  }

}

export default Shield;
