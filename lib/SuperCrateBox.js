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
    this.checkCollisions([ this.player ], dt);
  }

  handleInput(dt) {
    const input = window.input;

    if (input.isDown('UP') || input.isDown('SPACE')) {
      if (true) {
        this.player.isJumping = true;
        this.player.lastJumpTime = Date.now();
        this.player.vel[1] = CONSTANTS.PLAYER_VERTICAL_INIT_VEL;
      }
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

    this.player.vel[1] += CONSTANTS.GRAVITY * dt;
    this.player.pos[0] += this.player.vel[0] * dt;
    this.player.pos[1] += this.player.vel[1] * dt;
  }

  checkCollision(entity, dt) {
    const walls = this.stage;
    const { enemies } = this;
    const collisionMap = [ ...walls, ...enemies ];

    const rect1 = this._getRect(entity);
    for (let i = 0; i < collisionMap.length; i++) {
      const otherEntity = collisionMap[i];
      const rect2 = this._getRect(otherEntity);

      const collisionType = this._collisionDetected(rect1, rect2);
      if (collisionType) {
        if (entity.type === 'player' && otherEntity.type === 'wall') {
          this._playerHitWall(collisionType);
        }
      }
    }
    return null;
  }

  checkCollisions(list, dt) {
    for (let i = 0; i < list.length; i++) {
      this.checkCollision(list[i], dt);
    }
  }

  updateEntities(dt) {
    this.player.sprite.update(dt);
  }

  render() {
    const { renderEntity, renderEntities, player, stage, ctx } = this;
    this.velocityEl.innerHTML = `${this.player.vel[0]}, ${this.player.vel[1]}`;
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
    this.velocityEl = document.getElementById('velocity');
  }

  _getRect(entity) {
    const hitbox = entity.hitbox();
    return {
      x: hitbox[0], y: hitbox[1], width: hitbox[2], height: hitbox[3]
    };
  }

  _collisionDetected(rect1, rect2) {
    const {
      _collisionRight,
      _collisionLeft,
      _collisionTop,
      _collisionBottom
    } = this;
    const l = _collisionLeft(rect1, rect2);
    const r = _collisionRight(rect1, rect2);
    const t = _collisionTop(rect1, rect2);
    const b = _collisionBottom(rect1, rect2);

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {

          if ( (l && t) || (l && b) || (r && t) || (r && b) ) {
            return 'both';
          }

          if (l || r) {
            return 'horizontal';
          }

          if (t || b) {
            return 'vertical';
          }


    } else {
      return null;
    }
  }

  _collisionRight(rect1, rect2) {
    const leftSideOf1 = rect1.x;
    const rightSideOf1 = rect1.x + rect1.width;
    const leftSideOf2 = rect2.x;
    const rightSideOf2 = rect2.x + rect2.width;
    return rightSideOf1 > leftSideOf2 && leftSideOf1 < leftSideOf2;
  }

  _collisionLeft(rect1, rect2) {
    const leftSideOf1 = rect1.x;
    const rightSideOf1 = rect1.x + rect1.width;
    const leftSideOf2 = rect2.x;
    const rightSideOf2 = rect2.x + rect2.width;
    return leftSideOf1 < rightSideOf2 && rightSideOf1 > rightSideOf2;
  }

  _collisionTop(rect1, rect2) {
    const topSideOf1 = rect1.y;
    const bottomSideOf1 = rect1.y + rect1.height;
    const topSideOf2 = rect2.y;
    const bottomSideOf2 = rect2.y + rect2.height;
    return topSideOf1 < bottomSideOf2 && bottomSideOf1 > bottomSideOf2;
  }

  _collisionBottom(rect1, rect2) {
    const topSideOf1 = rect1.y;
    const bottomSideOf1 = rect1.y + rect1.height;
    const topSideOf2 = rect2.y;
    const bottomSideOf2 = rect2.y + rect2.height;
    return bottomSideOf1 > topSideOf2 && topSideOf1 < topSideOf2;
  }

  _playerHitWall(collisionType) {
    if (collisionType === 'horizontal') {
      this.player.vel[0] = 0;
      this.player.pos[0] -= this.player.vel[0];
    } else if (collisionType === 'vertical') {
      this.player.vel[1] = 0;
      this.player.pos[1] -= this.player.vel[1];
    } else if (collisionType === 'both') {
      this.player.vel[0] = 0;
      this.player.vel[1] = 0;
      this.player.pos[0] -= this.player.vel[0];
      this.player.pos[1] -= this.player.vel[1];
    }
  }

}

const scb = new SuperCrateBox();
document.addEventListener('DOMContentLoaded', () => scb.play());
