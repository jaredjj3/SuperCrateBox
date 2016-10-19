import Resources from './Resources.js';

class Sprite {
  constructor(url, pos, size, speed, frames, dir, once) {
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this.url = url;
    this.dir = dir;
    this.once = once;
    this._index = 0;

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  update(dt) {
    const { speed } = this;
    this._index += speed * dt;
  }

  render(ctx) {
    const { speed, frames, pos, size, once, _index, dir, url } = this;
    let frame;

    if (speed > 0) {
      const max = this.frames.length;
      const idx = Math.floor(_index);
      frame = frames[idx % max];

      if (once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    let x = pos[0];
    let y = pos[1];

    if (dir === 'vertical') {
      y += frame * size[1];
    } else {
      x += frame * size[0];
    }
    ctx.drawImage(
      Resources.get(url),
      x, y,
      size[0], size[1],
      0, 0,
      size[0], size[1]
    );
  }
}

export default Sprite;
