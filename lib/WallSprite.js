class WallSprite {
  constructor(size) {
    this.size = size;
  }

  render(ctx) {
    const { size } = this;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size[0], size[1]);
  }
}

export default WallSprite;
