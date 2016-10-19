import WallSprite from './WallSprite';

class Wall {
  constructor(opts) {
    const { pos, size } = opts;
    this.type = 'wall';
    this.size = size;
    this.pos = pos;
    this.sprite = new WallSprite(size);

    this.hitbox = this.hitbox.bind(this);
  }

  hitbox() {
    const { pos, size } = this;
    return [].concat(pos).concat(size);
  }
}

export default Wall;
