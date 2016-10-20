import Resources from './Resources';
import Player from './Player';
import Crate from './Crate';
import Sprite from './Sprite';
import Input from './Input';
import * as ENEMIES from './util/ENEMIES';
import * as SPRITES from './util/SPRITES';
import * as STAGES from './util/STAGES';
import * as CONSTANTS from './util/CONSTANTS';

class SuperCrateBox {
  constructor() {
    this.play = this.play.bind(this);
    this.main = this.main.bind(this);
    this._reset = this._reset.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this._getRect = this._getRect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.renderEntity = this.renderEntity.bind(this);
    this._isReadyToJump = this._isReadyToJump.bind(this);
    this.updateEntities = this.updateEntities.bind(this);
    this.renderEntities = this.renderEntities.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.checkPlayerBounds = this.checkPlayerBounds.bind(this);
  }

  play() {
    this.lastTime = Date.now();
    this._setup();
  }

  main() {
    if (this.gameOver) {
      this._reset();
      return;
    }
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
    this.checkCollisions([ this.player, this.crate, this.enemies[0] ]);
    this.checkPlayerBounds();
  }

  checkPlayerBounds() {
    if (this.player.pos[1] > 570) {
      this.gameOver = true;
    }
  }

  handleInput(dt) {
    const input = window.input;

    if (input.isDown('UP') || input.isDown('SPACE')) {
      if (this._isReadyToJump()) {
        this.player.isJumping = true;
        this.player.vel[1] = CONSTANTS.PLAYER_VERTICAL_INIT_VEL;
      }
    }

    if (input.isDown('LEFT')) {
      if (this.player.vel[0] > -CONSTANTS.PLAYER_HORIZONTAL_VEL) {
        this.player.vel[0] -= (CONSTANTS.PLAYER_HORIZONTAL_ACC * dt);
      } else {
        this.player.vel[0] = -CONSTANTS.PLAYER_HORIZONTAL_VEL;
      }
    } else if (input.isDown('RIGHT')) {
      if (this.player.vel[0] < CONSTANTS.PLAYER_HORIZONTAL_VEL) {
        this.player.vel[0] += (CONSTANTS.PLAYER_HORIZONTAL_ACC * dt);
      } else {
        this.player.vel[0] = CONSTANTS.PLAYER_HORIZONTAL_VEL;
      }
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

    this.player.lastPos[0] = this.player.pos[0];
    this.player.lastPos[1] = this.player.pos[1];
    this.player.vel[1] += CONSTANTS.GRAVITY * dt;
    this.player.pos[0] += this.player.vel[0] * dt;
    this.player.pos[1] += this.player.vel[1] * dt;
  }

  checkCollision(entity) {
    const walls = this.stage;
    const { enemies, crate } = this;
    const collisionMap = [ ...walls, ...enemies, crate ];

    const rect1 = this._getRect(entity);
    for (let i = 0; i < collisionMap.length; i++) {
      const otherEntity = collisionMap[i];
      const rect2 = this._getRect(otherEntity);

      const collisionType = this._collisionDetected(rect1, rect2);
      if (collisionType) {
        if (entity.type === 'enemy') {
          entity.vel[0] = Math.random() > 0.3 ? -100 : 0;
          entity.vel[1] = Math.random() > 0.4 ? -450 : 0;
        }

        if (otherEntity.type === 'wall') {
          this._entityHitWall(entity, collisionType);
        }

        if (entity.type === 'player' && otherEntity.type === 'crate') {
          this.score++;
          if (this.score > 9) {
            this.scoreEl.className = 'double_digits';
          }
          this.crate = new Crate({
            pos: [-100, -100],
            vel: [0, 0],
            sprite: SPRITES.CRATE
          });
          setTimeout(() => {
              this.crate = new Crate({
              pos: STAGES.STAGE_1_CRATE_SPAWN(),
              vel: [0, 10],
              sprite: SPRITES.CRATE
            });
          }, 500);
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
    this.crate.update(dt);
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update(dt);
    }
  }

  render() {
    const {
      renderEntity,
      renderEntities,
      player,
      enemies,
      stage,
      crate,
      ctx,
      score
    } = this;
    this.scoreEl.innerHTML = this.score;
    this.velocityEl.innerHTML = `V: ${this.player.vel[0].toFixed(0)}, ${this.player.vel[1].toFixed(0)}`;
    this.positionEl.innerHTML = `P: ${this.player.hitbox()[0].toFixed(0)}, ${this.player.hitbox()[1].toFixed(0)}`;
    ctx.clearRect(0, 0, 900, 600);
    renderEntity(player);
    renderEntities(enemies);
    renderEntity(crate);
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
  _reset() {
    this.gameOver = false;
    this.score = 0;
    this.scoreEl.className = 'single_digits';

    this.player = new Player({
      type: 'player',
      pos: [450, 300],
      lastPos: [450, 300],
      vel: [0, 0],
      sprite: SPRITES.PLAYER_IDLE
    });

    this.enemies = [];
    this.crate = new Crate({
      pos: STAGES.STAGE_1_CRATE_SPAWN(),
      vel: [0, 10],
      sprite: SPRITES.CRATE
    });
    this.stage = STAGES.STAGE_1;

    this.main();
  }

  _setup() {
    // set game state;
    this.gameOver = false;

    // makes reference to canvas
    const canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

    // loads resources
    Resources.load([
      './lib/img/jay.png',
      './lib/img/crate.png'
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
      lastPos: [450, 300],
      vel: [0, 0],
      sprite: SPRITES.PLAYER_IDLE
    });

    this.enemies = [ ENEMIES.ENEMY_1() ];
    this.crate = new Crate({
      pos: STAGES.STAGE_1_CRATE_SPAWN(),
      vel: [0, 10],
      sprite: SPRITES.CRATE
    });
    this.stage = STAGES.STAGE_1;

    this.score = 0;
    this.scoreEl = document.getElementById('score');
    this.scoreEl.className = 'single_digits';
    this.velocityEl = document.getElementById('velocity');
    this.positionEl = document.getElementById('position');
    this.collisionEl = document.getElementById('collision');
  }

  _getRect(entity) {
    const hitbox = entity.hitbox(this.ctx);

    return {
      x: hitbox[0], y: hitbox[1], width: hitbox[2], height: hitbox[3]
    };
  }

  _isReadyToJump() {
    const jumpTiming = Date.now() - this.player.lastJumpTime;
    return jumpTiming >= CONSTANTS.JUMP_TIME;
  }

  _collisionDetected(rect1, rect2) {
    const {
      _collisionRight,
      _collisionLeft,
      _collisionTop,
      _collisionBottom
    } = this;

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
          const l = _collisionLeft(rect1, rect2);
          const r = _collisionRight(rect1, rect2);
          const t = _collisionTop(rect1, rect2);
          const b = _collisionBottom(rect1, rect2);

          if ( t && b ) {
            return 'top-bottom';
          } else if (l && t) {
            return 'left-top';
          } else if (l && b ) {
            return 'left-bottom';
          } else if (r && t) {
            return 'right-top';
          } else if (r && b) {
            return 'right-bottom';
          } else if (l) {
            return 'left';
          } else if (r) {
            return 'right';
          } else if (t) {
            return 'top';
          } else if (b) {
            return 'bottom';
          }

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

  _entityHitWall(entity, collisionType) {
    if (entity.type === 'enemy') {
      this.collisionEl.innerHTML = `C: ${collisionType}`;
    }
    switch(collisionType) {
      case 'right':
        entity.vel[0] = 0;
        entity.pos[0] = entity.lastPos[0];
        break;
      case 'left':
        entity.vel[0] = 0;
        entity.pos[0] = entity.lastPos[0];
        break;
      case 'top':
        entity.vel[1] = -entity.vel[1] * 0.25;
        entity.pos[1] = entity.lastPos[1];
        break;
      case 'bottom':
        entity.vel[1] = 0;
        entity.pos[1] = entity.lastPos[1];
        break;
      case 'right-bottom':
        if (entity.pos[0] > entity.lastPos[0]) {
          entity.pos[0] = entity.lastPos[0];
        }
        if (entity.vel[0] === 0 && entity.vel[1] > 0) {
          entity.pos[0] = entity.lastPos[0];
        }
        if (entity.pos[1] > entity.lastPos[1] &&
           entity.vel[0] === 0) {
          entity.pos[1] = entity.lastPos[1];
          entity.vel[1] = 0;
        }
        if (entity.pos[1] > entity.lastPos[1] &&
           entity.vel[1] > 0) {
          entity.pos[1] = entity.lastPos[1] + 3;
          entity.vel[1] = -entity.vel[1] * 0.25;
        }
        break;
      case 'left-bottom':
        if (entity.pos[0] < entity.lastPos[0]) {
          entity.pos[0] = entity.lastPos[0];
        }
        if (entity.vel[0] === 0 && entity.vel[1] > 0) {
          entity.pos[0] = entity.lastPos[0];
        }
        if (entity.pos[1] > entity.lastPos[1] &&
           entity.vel[0] === 0) {
          entity.pos[1] = entity.lastPos[1];
          entity.vel[1] = 0;
        }
        if (entity.pos[1] > entity.lastPos[1] &&
           entity.vel[1] < 0) {
          entity.pos[1] = entity.lastPos[1] + 3;
          entity.vel[1] = -entity.vel[1] * 0.25;
        }
        break;
      case 'right-top':
        if (entity.vel[0] > 0) {
          entity.vel[0] = 0;
        }
        if (entity.pos[0] > entity.lastPos[0]) {
          entity.pos[0] = entity.lastPos[0];
        }
        if (entity.vel[1] < 0) {
          entity.pos[1] = entity.lastPos[1];
          entity.vel[1] = -entity.vel[1] * 0.25;
        }
        break;
      case 'left-top':
        if (entity.vel[0] < 0) {
          entity.vel[0] = 0;
        }
        if (entity.pos[0] < entity.lastPos[0]) {
          entity.pos[0] = entity.lastPos[0];
        }
        if (entity.vel[1] < 0) {
          entity.pos[1] = entity.lastPos[1];
          entity.vel[1] = -entity.vel[1] * 0.25;
        }
        break;
      case 'top-bottom':
        entity.pos[0] = entity.lastPos[0];
        break;
    }
  }

}

const scb = new SuperCrateBox();
document.addEventListener('DOMContentLoaded', () => scb.play());
