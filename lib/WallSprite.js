import Resources from './Resources';

class WallSprite {
  constructor(size) {
    this.size = size;
  }

  render(ctx) {
    const { size } = this;
    const pattern = ctx.createPattern(
      Resources.get('./lib/img/metal.png'),
      'repeat'
    );
    ctx.fillStyle = pattern;
    // ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size[0], size[1]);
    // ctx.strokeStyle = 'red';
    // ctx.strokeRect(0, 0, size[0], size[1]);
  }
}

export default WallSprite;
