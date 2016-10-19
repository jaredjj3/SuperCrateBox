import Resources from './Resources';
import Sprite from './Sprite';
import Input from './Input';
import * as FRAMES from './util/FRAMES';

class SuperCrateBox {
  constructor() {
    this.play = this.play.bind(this);
    this.main = this.main.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateEntities = this.updateEntities.bind(this);
    this.renderEntities = this.renderEntities.bind(this);
    this.renderEntity = this.renderEntity.bind(this);
  }

  play() {
    console.log("play");
    this.lastTime = Date.now();
    this._setup();
  }

  main() {
    console.log('main');
    const { update, render } = this;
    const now = Date.now();
    const dt = (now - this.lastTime) / 1000.0;

    update(dt);
    render();

    this.lastTime = now;
    requestAnimationFrame(this.main);
  }

  update(dt) {
    this.handleInput(dt);
    this.updateEntities(dt);
  }

  handleInput(dt) {
    const input = window.input;
  }

  updateEntities(dt) {
    this.player.sprite.update(dt);
  }

  render() {
    const { renderEntity, player } = this;
    renderEntity(player);
  }

  renderEntities(list) {
    for (let i = 0; i < list.length; i++) {
      this.renderEntity(list[i]);
    }
  }

  renderEntity(entity) {
    const { ctx } = this;
    ctx.clearRect(0, 0, 900, 600);
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
  }

  // private

  _setup() {
    // makes reference to canvas
    const canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

    // loads resources
    Resources.load([
      './lib/img/jay_idle.png'
    ]);
    const init = () => {
      this.main();
    };
    Resources.onReady(init);

    // Sets event listeners

    // sets game state
    const url = './lib/img/jay_idle.png';
    const pos = [0, 0];
    const size = [64, 64];
    const speed = 13;
    const frames = FRAMES.PLAYER_BREATH_FRAMES;
    const dir = 'horizontal';
    const once = false;
    this.player = {
      pos: [0, 0],
      sprite: new Sprite(url, pos, size, speed, frames, dir, once)
    };

    this.enemies = [];
    this.crate = { };

    this.score = 0;
    this.scoreEl = document.getElementById('score');
  }

}

const scb = new SuperCrateBox();
document.addEventListener('DOMContentLoaded', () => scb.play());
