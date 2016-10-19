class Wall {
  constructor(opts) {
    const { width, height } = opts;
    this.width = width;
    this.height = height;
  }

  render(ctx) {
    const { width, height } = this;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
  }
}

export default Wall;
