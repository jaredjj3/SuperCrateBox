import WallSprite from './WallSprite';

class Wall {
  constructor(opts) {
    const { pos, size } = opts;
    this.type = 'wall';
    this.size = size;
    this.pos = pos;
    this.sprite = new WallSprite(size);

    this.hitbox = () => ({
      x: this.pos[0],
      y: this.pos[1],
      w: size[0],
      h: size[1]
    });
  }
}

export default Wall;
