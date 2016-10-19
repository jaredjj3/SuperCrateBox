import Resources from './Resources';
import Player from './Player';
import Sprite from './Sprite';
import Input from './Input';
import * as SPRITES from './util/SPRITES';
import * as STAGES from './util/STAGES';
import * as CONSTANTS from './util/CONSTANTS';

class SuperCrateBox {
  constructor() {
    this.play = this.play.bind(this);
    this.main = this.main.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this._getRect = this._getRect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.renderEntity = this.renderEntity.bind(this);
    this.updateEntities = this.updateEntities.bind(this);
    this.renderEntities = this.renderEntities.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
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
    this.checkCollisions([ this.player ]);
    this.updateEntities(dt);
  }

  handleInput(dt) {
    const input = window.input;

    if (input.isDown('UP') || input.isDown('SPACE')) {
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

  checkCollision(entity) {
    const walls = this.stage;
    const { enemies } = this;
    const collisionMap = [ ...walls, ...enemies ];

    const rect1 = this._getRect(entity);
    for (let i = 0; i < collisionMap.length; i++) {
      const otherEntity = collisionMap[i];
      const rect2 = this._getRect(otherEntity);

      if (this._collisionDetected(rect1, rect2)) {
        if (entity.type === 'player' && otherEntity.type === 'wall') {
          this._playerHitWall();
        }
      }
    }
    return null;
  }

  checkCollisions(list) {
    for (let i = 0; i < list.length; i++) {
      this.checkCollision(list[i]);
    }
  }

  updateEntities(dt) {
    this.player.sprite.update(dt);
  }

  render() {
    const { renderEntity, renderEntities, player, stage, ctx } = this;
    ctx.clearRect(0, 0, 900, 600);
    renderEntity(player);
    renderEntities(stage);
  }

  renderEntity(entity) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
  }

  renderEntities(list) {
    for (let i = 0; i < list.length; i++) {
      this.renderEntity(list[i]);
    }
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
    this.player = new Player({
      type: 'player',
      pos: [450, 300],
      vel: [0, 0],
      sprite: SPRITES.PLAYER_IDLE,
    });

    this.enemies = [];
    this.crate = { };
    this.stage = STAGES.STAGE_1;

    this.score = 0;
    this.scoreEl = document.getElementById('score');
  }

  _getRect(entity) {
    const hitbox = entity.hitbox();
    return {
      x: hitbox[0], y: hitbox[1], width: hitbox[2], height: hitbox[3]
    };
  }

  _collisionDetected(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
          return true;
    } else {
      return false;
    }
  }

  _playerHitWall() {
    this.player.pos[0] -= this.player.vel[0];
    this.player.pos[1] -= this.player.vel[1];
  }

}

const scb = new SuperCrateBox();
document.addEventListener('DOMContentLoaded', () => scb.play());
