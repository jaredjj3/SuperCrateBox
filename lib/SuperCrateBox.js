 import Resources from './Resources';
import Player from './Player';
import Crate from './Crate';
import Sprite from './Sprite';
import Input from './Input';
import Enemy from './Enemy';
import * as UNITS from './util/UNITS';
import { CRATE, PLAYER, HAMMER } from './util/UNITS';
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
    this.lastPowerupSpawnTime = Date.now();
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
    const timeSinceLastPowerupSpawn = now - this.lastPowerupSpawnTime;
    if (timeSinceLastEnemySpawn >= CONSTANTS.ENEMY_SPAWN_RATE) {
      this.addEnemy();
    }

    if (timeSinceLastPowerupSpawn >= CONSTANTS.POWERUP_SPAWN_RATE) {
      // this.addPowerup();
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
      powerups,
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
    // renderEntities(powerups);
  }

  // private

  resetCrate() {
    this.crate.pos[0] = -100;
    this.crate.pos[1] = 100;
    setTimeout(() => {
      this.crate = CRATE();
    }, 500);
  }

  reset() {
    this.gameOver = false;
    this.score = 0;
    this.scoreEl.className = 'single_digits';

    this.player = PLAYER();

    this.enemies = [];
    this.powerups = [];

    this.crate = CRATE();
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

    this.player = PLAYER();

    this.enemies = [];
    this.currentEnemyId = 0;

    this.crate = CRATE();
    this.powerups = [];
    this.stage = STAGES.STAGE_1;
  }

  updateEntities(dt) {
    this.player.update(dt);
    this.crate.update(dt);
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update(dt);
      // this.powerups[i].update(dt);
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
    this.enemies.push(HAMMER(this.currentEnemyId));
  }

  addPowerup() {
    this.lastPowerupSpawnTime = Date.now();
    this.currentPowerupId++;
    const seed = Math.random();
    let powerup;
    if (seed <= 0.5) {
      powerup = UNITS.FREEZE();
    } else if (seed > 0.5 && seed < 0.85) {
      powerup = UNITS.SHIELD();
    } else {
      powerup = UNITS.INVINCIBILITY();
    }
    this.powerups.push(powerup);
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
