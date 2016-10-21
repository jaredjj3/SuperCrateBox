 import Resources from './Resources';
import Player from './Player';
import Crate from './Crate';
import Sprite from './Sprite';
import Input from './Input';
import Enemy from './Enemy';
import * as SPRITES from './util/SPRITES';
import * as STAGES from './util/STAGES';
import * as CONSTANTS from './util/CONSTANTS';
import CollisionManager from './util/CollisionManager';

class SuperCrateBox {
  constructor() {
    this.play = this.play.bind(this);
    this.main = this.main.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.setup = this.setup.bind(this);
    this.reset = this.reset.bind(this);
    this.addEnemy = this.addEnemy.bind(this);
    this.removeEnemy = this.removeEnemy.bind(this);
    this.resetCrate = this.resetCrate.bind(this);
    this.renderHtml = this.renderHtml.bind(this);
    this.renderEntity = this.renderEntity.bind(this);
    this.renderEntities = this.renderEntities.bind(this);
    this.checkPlayerBounds = this.checkPlayerBounds.bind(this);
    this.allObjects = this.allObjects.bind(this);
    this.updateEntities = this.updateEntities.bind(this);
  }

  play() {
    this.lastTime = Date.now();
    this.lastEnemySpawnTime = Date.now();
    this.setup();
  }

  main() {
    if (this.gameOver) {
      this.reset();
      return;
    }

    const { update, render } = this;
    const now = Date.now();
    const dt = (now - this.lastTime) / 1000.0;
    const timeSinceLastEnemySpawn = now - this.lastEnemySpawnTime;
    if (timeSinceLastEnemySpawn >= CONSTANTS.ENEMY_SPAWN_RATE) {
      this.addEnemy();
    }

    update(dt);
    render();

    this.lastTime = now;
    requestAnimationFrame(this.main);
  }

  update(dt) {
    const {
      player,
      crate,
      enemies,
      handleInput,
      allObjects,
      updateEntities,
      checkCollisions,
      checkPlayerBounds,
      collisionManager
    } = this;

    player.handleInput(dt);
    updateEntities(dt);
    collisionManager.handleCollisions(allObjects());
    checkPlayerBounds();
  }

  render() {
    const {
      ctx,
      player,
      enemies,
      crate,
      stage,
      renderEntity,
      renderEntities,
      renderHtml,
    } = this;

    renderHtml();
    ctx.clearRect(0, 0, 900, 600);
    renderEntities(enemies);
    renderEntity(player);
    renderEntity(crate);
    renderEntities(stage);
  }

  // private

  resetCrate() {
    this.crate.pos[0] = -100;
    this.crate.pos[1] = 100;
    setTimeout(() => {
      this.crate = new Crate({
        pos: STAGES.STAGE_1_CRATE_SPAWN(),
        vel: [0, 10],
        sprite: SPRITES.CRATE()
      });
    }, 500);
  }

  reset() {
    this.gameOver = false;
    this.score = 0;
    this.scoreEl.className = 'single_digits';

    this.player = new Player({
      type: 'player',
      pos: [450, 300],
      lastPos: [450, 300],
      vel: [0, 0],
      sprites: {
        idle: SPRITES.PLAYER_IDLE(),
        runRight: SPRITES.PLAYER_RUN_RIGHT(),
        runLeft: SPRITES.PLAYER_RUN_LEFT(),
      },
      sprite: SPRITES.PLAYER_IDLE()
    });

    this.enemies = [];

    this.crate = new Crate({
      pos: STAGES.STAGE_1_CRATE_SPAWN(),
      vel: [0, 10],
      sprite: SPRITES.CRATE()
    });
    this.stage = STAGES.STAGE_1;

    this.main();
  }

  setup() {
    this.gameOver = false;

    // loads resources
    Resources.load([
      './lib/img/jay.png',
      './lib/img/crate.png',
      './lib/img/hammer.png',
      './lib/img/metal.png'
    ]);
    const init = () => {
      this.main();
    };
    Resources.onReady(init);
    Input.setup();

    // HTML Elements
    const canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.score = 0;
    this.scoreEl = document.getElementById('score');
    this.scoreEl.className = 'single_digits';
    this.velocityEl = document.getElementById('velocity');
    this.positionEl = document.getElementById('position');
    this.collisionManager = new CollisionManager(this);

    this.player = new Player({
      type: 'player',
      pos: [450, 300],
      lastPos: [450, 300],
      vel: [0, 0],
      sprites: {
        idle: SPRITES.PLAYER_IDLE(),
        runRight: SPRITES.PLAYER_RUN_RIGHT(),
        runLeft: SPRITES.PLAYER_RUN_LEFT(),
      },
      sprite: SPRITES.PLAYER_IDLE()
    });

    this.enemies = [];
    this.currentEnemyId = 0;

    this.crate = new Crate({
      pos: STAGES.STAGE_1_CRATE_SPAWN(),
      vel: [0, 10],
      sprite: SPRITES.CRATE()
    });
    this.stage = STAGES.STAGE_1;
  }

  updateEntities(dt) {
    this.player.update(dt);
    this.crate.update(dt);
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update(dt);
    }
  }

  checkPlayerBounds() {
    if (this.player.pos[1] > 570) {
      this.gameOver = true;
    }
  }

  renderHtml() {
    const { score, player } = this;
    this.scoreEl.innerHTML = score;
    if (this.score > 9) {
      this.scoreEl.className = "double_digits";
    }
    const vx = this.player.vel[0].toFixed(0);
    const vy = this.player.vel[1].toFixed(0);
    const x = this.player.hitbox().x.toFixed(0);
    const y = this.player.hitbox().y.toFixed(0);
    this.velocityEl.innerHTML = `Enemies: ${this.enemies.length}`;
    // this.velocityEl.innerHTML = `V: ${vx}, ${vy}`;
    this.positionEl.innerHTML = `P: ${x}, ${y}`;
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

  allObjects() {
    const { player, enemies, crate, stage } = this;
    return { player, enemies, crate, stage };
  }

  addEnemy() {
    this.lastEnemySpawnTime = Date.now();
    this.currentEnemyId++;
    this.enemies.push(new Enemy({
        id: this.currentEnemyId,
        pos: [400, 0],
        vel: [CONSTANTS.ENEMY_ONE_VEL, 0],
        sprites: {
          runLeft: SPRITES.HAMMER_RUN_LEFT(),
          runRight: SPRITES.HAMMER_RUN_RIGHT()
        },
        sprite: SPRITES.HAMMER_RUN_LEFT()
      })
    );
  }

  removeEnemy(targetId) {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (enemy.id === targetId) {
        this.enemies.splice(i, 1);
        return;
      }
    }
  }
}

const scb = new SuperCrateBox();
document.addEventListener('DOMContentLoaded', () => scb.play());
