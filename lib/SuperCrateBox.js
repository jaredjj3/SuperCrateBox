import Resources from './Resources';
import Sprite from './Sprite';
import Input from './Input';
import * as SPRITES from './util/SPRITES';
import * as CONSTANTS from './util/CONSTANTS';

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

    if (input.isDown('UP')) {
      this.player.vel[1] = -CONSTANTS.PLAYER_HORIZONTAL_VEL;
    } else if (input.isDown('DOWN')) {
      this.player.vel[1] = CONSTANTS.PLAYER_HORIZONTAL_VEL;
    } else {
      this.player.vel[1] = 0;
    }

    if (input.isDown('LEFT')) {
      this.player.vel[0] = -CONSTANTS.PLAYER_HORIZONTAL_VEL;
    } else if (input.isDown('RIGHT')) {
      this.player.vel[0] = CONSTANTS.PLAYER_HORIZONTAL_VEL;
    } else {
      this.player.vel[0] = 0;
    }

    const { vel } = this.player;
    if (vel[0] > 0) {
      this.player.sprite = SPRITES.PLAYER_RUN_RIGHT;
    } else if (vel[0] < 0) {
      this.player.sprite = SPRITES.PLAYER_RUN_LEFT;
    } else {
      this.player.sprite = SPRITES.PLAYER_IDLE;
    }

    this.player.pos[0] += this.player.vel[0];
    this.player.pos[1] += this.player.vel[1];
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
      './lib/img/jay_idle.png',
      './lib/img/jay_running.png'
    ]);
    const init = () => {
      this.main();
    };
    Resources.onReady(init);

    // Sets event listeners
    Input.setup();

    // sets game state
    this.player = {
      pos: [450, 500],
      vel: [0, 0],
      sprite: SPRITES.PLAYER_IDLE,
    };

    this.enemies = [];
    this.crate = { };

    this.score = 0;
    this.scoreEl = document.getElementById('score');
  }

}

const scb = new SuperCrateBox();
document.addEventListener('DOMContentLoaded', () => scb.play());
