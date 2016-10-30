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
    this.setup = this.setup.bind(this);
    this.reset = this.reset.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.addEnemy = this.addEnemy.bind(this);
    this.addShield = this.addShield.bind(this);
    this.resetCrate = this.resetCrate.bind(this);
    this.renderHtml = this.renderHtml.bind(this);
    this.allObjects = this.allObjects.bind(this);
    this.addPowerup = this.addPowerup.bind(this);
    this.removeEnemy = this.removeEnemy.bind(this);
    this.checkIfReset = this.checkIfReset.bind(this);
    this.checkIfPaused = this.checkIfPaused.bind(this);
    this.removeShield = this.removeShield.bind(this);
    this.renderEntity = this.renderEntity.bind(this);
    this.checkIfMuted = this.checkIfMuted.bind(this);
    this.renderEntities = this.renderEntities.bind(this);
    this.updateEntities = this.updateEntities.bind(this);
    this.killAllEnemies = this.killAllEnemies.bind(this);
    this.checkPlayerBounds = this.checkPlayerBounds.bind(this);
    this.removeElectricShield = this.removeElectricShield.bind(this);
  }

  play() {
    this.lastTime = Date.now();
    this.lastEnemySpawnTime = Date.now();
    this.lastPowerupSpawnTime = Date.now();
    this.setup();
  }

  main() {
    const {
      reset,
      update,
      render,
      checkIfMuted,
      checkIfReset,
      checkIfPaused,
      addEnemy,
      addPowerup,
      isPaused
    } = this;

    const {
      ENEMY_SPAWN_RATE,
      ENEMY_SPAWN_DIFF,
      ENEMY_SPAWN_FLOOR
    } = CONSTANTS;

    checkIfMuted();
    checkIfPaused();
    checkIfReset();

    const now = Date.now();
    const dt = (now - this.lastTime) / 1000.0;
    this.lastTime = now;

    if (isPaused) {
      window.mainLoop = requestAnimationFrame(this.main);
      return;
    }
    const timeSinceLastEnemySpawn = now - this.lastEnemySpawnTime;
    const timeSinceLastPowerupSpawn = now - this.lastPowerupSpawnTime;
    let nextSpawnTime = ENEMY_SPAWN_RATE - (this.score * ENEMY_SPAWN_DIFF);
    nextSpawnTime = nextSpawnTime <= ENEMY_SPAWN_FLOOR ?
      ENEMY_SPAWN_FLOOR : nextSpawnTime;

    if (timeSinceLastEnemySpawn >= nextSpawnTime) {
      addEnemy();
    }

    if (timeSinceLastPowerupSpawn >= CONSTANTS.POWERUP_SPAWN_RATE) {
      addPowerup();
    }

    update(dt);
    render();

    window.mainLoop = requestAnimationFrame(this.main);
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
      shields,
      powerups,
      electricShields,
      renderEntity,
      renderEntities,
      renderHtml,
    } = this;

    renderHtml();
    ctx.clearRect(0, 0, 900, 600);
    renderEntities(stage);
    renderEntities(enemies);
    renderEntity(player);
    renderEntity(crate);
    renderEntities(powerups);
    renderEntities(shields);
    renderEntities(electricShields);
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
    this.isResetting = true;
    this.shields = [];
    this.electricShields = [];
    this.lastEnemySpawnTime = Date.now();
    this.lastPowerupSpawnTime = Date.now();
    this.isPaused = false;

    setTimeout(() => {
      this.score = 0;
      this.scoreEl.className = 'single_digits';
      this.killAllEnemies();
      this.player = PLAYER();
      this.resetCrate();
      this.powerups = [];
      this.lastEnemySpawnTime = Date.now();
      this.lastPowerupSpawnTime = Date.now();
      this.isResetting = false;
      this.gameOver = false;
    }, 2000);

    this.main();
  }

  setup() {
    this.gameOver = false;
    this.isResetting = false;
    this.muteHeldDown = false;
    this.pauseHeldDown = false;
    this.audioIsPlaying = false;
    // loads resources
    Resources.load([
      './lib/img/jay.png',
      './lib/img/crate.png',
      './lib/img/hammer.png',
      './lib/img/metal.png',
      './lib/img/shieldPickup.png',
      './lib/img/electricShieldPickup.png',
      './lib/img/nukePickup.png',
      './lib/img/electricShield.png',
      './lib/img/shield.png'
    ]);
    const init = () => {
      this.audio = new Audio('./lib/img/bonetrousle.mp3');
      const audio = this.audio;
      this.audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
      }, false);
      this.main();
    };
    Resources.onReady(init);
    Input.setup();

    // HTML Elements
    const canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.score = 0;
    this.volumeEl = document.getElementById('volume');
    this.volumeEl.addEventListener('click', () => {
      this.volumeClicked = true;
    });
    this.scoreEl = document.getElementById('score');
    this.scoreEl.className = 'single_digits';
    // this.velocityEl = document.getElementById('velocity');
    // this.positionEl = document.getElementById('position');
    this.collisionManager = new CollisionManager(this);

    this.player = PLAYER();
    this.currentObjectId = 0;
    this.enemies = [];
    this.shields = [];
    this.electricShields = [];
    this.crate = CRATE();
    this.powerups = [];
    this.stage = STAGES.STAGE_1;

    this.isPaused = false;
  }

  updateEntities(dt) {
    this.player.update(dt);
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.update(dt, this);
      if (enemy.isDead && (enemy.pos[1] > 600 || enemy.pos[1] < -10)
    ) {
        enemy.update(dt, this);
        this.removeEnemy(enemy.id);
      }
    }

    for (let i = 0; i < this.powerups.length; i++) {
      const powerup = this.powerups[i];
      if (Date.now() - powerup.createdAt >= CONSTANTS.POWERUP_DESPAWN_RATE) {
        this.removePowerup(powerup.id);
      } else {
        powerup.update(dt);
      }
    }

    for (let i = 0; i < this.electricShields.length; i++) {
      this.electricShields[i].update(dt);
    }

    for (let i = 0; i < this.shields.length; i++) {
      this.shields[i].update(dt);
    }
    this.crate.update(dt);
  }

  checkPlayerBounds() {
    if (this.player.pos[1] > 700 && this.gameOver === false) {
      this.gameOver = true;
      this.player.kill();
    }
  }

  renderHtml() {
    const { score, player } = this;
    this.scoreEl.innerHTML = score;
    if (this.score > 19) {
      this.scoreEl.className = "high_digits";
    } else if (this.score > 9) {
      this.scoreEl.className = "double_digits";
    }
    const vx = this.player.vel[0].toFixed(0);
    const vy = this.player.vel[1].toFixed(0);
    const x = this.player.hitbox().x.toFixed(0);
    const y = this.player.hitbox().y.toFixed(0);
    // this.velocityEl.innerHTML = `V: ${vx}, ${vy}`;
    // this.positionEl.innerHTML = `P: ${x}, ${y}`;
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
    const { player, enemies, crate, stage, powerups, shields } = this;
    return { player, enemies, crate, stage, powerups, shields };
  }

  addEnemy() {
    this.lastEnemySpawnTime = Date.now();
    this.currentObjectId++;
    this.enemies.push(HAMMER(this.currentObjectId));
  }

  addPowerup() {
    this.lastPowerupSpawnTime = Date.now();
    this.currentObjectId++;
    const seed = Math.random();
    let powerup;
    if (seed <= 0.4) {
      powerup = UNITS.SHIELD_PICKUP(this.currentObjectId);
    } else if (seed > 0.4 && seed < 0.8) {
      powerup = UNITS.ELECTRIC_SHIELD_PICKUP(this.currentObjectId);
    } else {
      powerup = UNITS.NUKE_PICKUP(this.currentObjectId);
    }
    this.powerups.push(powerup);
  }

  addShield() {
    this.currentObjectId++;
    this.shields.push(UNITS.SHIELD(this.currentObjectId, this.player));
  }

  addElectricShield() {
    this.currentObjectId++;
    this.electricShields.push(
      UNITS.ELECTRIC_SHIELD(this.currentObjectId, this.player)
    );
  }

  removeShield(targetId) {
    for (let i = 0; i < this.shields.length; i++) {
      const shield = this.shields[i];
      if (shield.id === targetId) {
        this.shields.splice(i, 1);
        return;
      }
    }
  }

  removeElectricShield(targetId) {
    for (let i = 0; i < this.electricShields.length; i++) {
      const electricShield = this.electricShields[i];
      if (electricShield.id === targetId) {
        this.electricShields.splice(i, 1);
        return;
      }
    }
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

  killAllEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].kill();
    }
  }

  removePowerup(targetId) {
    for (let i = 0; i < this.powerups.length; i++) {
      const powerup = this.powerups[i];
      if (powerup.id === targetId) {
        this.powerups.splice(i, 1);
        return;
      }
    }
  }

  checkIfMuted() {
    const input = window.input;
    if (input.isDown('M') || this.volumeClicked) {
      if (!this.muteHeldDown) {
        this.audioIsPlaying = !this.audioIsPlaying;
        if (this.audioIsPlaying) {
          this.volumeEl.innerHTML = 'volume_up';
          this.audio.play();
          this.volumeClicked = false;
        } else {
          this.volumeEl.innerHTML = 'volume_off';
          this.audio.pause();
          this.volumeClicked = false;
        }
      }
      this.muteHeldDown = true;
    } else {
      this.muteHeldDown = false;
    }
  }

  checkIfReset() {
    const input = window.input;
    if ((this.gameOver || input.isDown('R')) && !this.isResetting) {
      this.player.kill();
      this.reset();
      return;
    }
  }

  checkIfPaused() {
    const input = window.input;
    if (input.isDown('P')) {
      if (!this.pauseHeldDown) {
        this.isPaused = !this.isPaused;
      }
      this.pauseHeldDown = true;
    } else {
      this.pauseHeldDown = false;
    }
  }
}

const scb = new SuperCrateBox();
document.addEventListener('DOMContentLoaded', () => scb.play());
