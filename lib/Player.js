import Moveable from './Moveable';
import * as CONSTANTS from './util/CONSTANTS';
import * as SPRITES from './util/SPRITES';
import * as UNITS from './util/UNITS';

class Player extends Moveable {
  constructor(opts) {
    super(opts);
    this.type = 'player';
    this.jumpNumber = 0;
    this.jumpKeyPressed = false;
    this.lastJumpTime = Date.now();
    this.lastRunDirection = 'right';
    this.shieldHitPoints = 0;
    this.electricShieldHitPoints = 0;
    this.lastHit = Date.now();
    this.isDead = false;

    this.hitbox = () => ({
      x: this.pos[0] + 20,
      y: this.pos[1] + 15,
      w: 27,
      h: 49
    });

    this.setSprite = this.setSprite.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSurfaceCollison = this.handleSurfaceCollison.bind(this);
    this.handleEnemyCollision = this.handleEnemyCollision.bind(this);
    this.handleJumpKeyPress = this.handleJumpKeyPress.bind(this);
    this.handleJumpKeyRelease = this.handleJumpKeyRelease.bind(this);
  }

  kill() {
    this.isDead = true;
    this.vel[1] += -200;
    this.sprites.idleRight.facing = 'rightFlipped';
    this.sprites.idleLeft.facing = 'leftFlipped';
    this.sprites.runRight.facing = 'rightFlipped';
    this.sprites.runLeft.facing = 'leftFlipped';
  }

  setSprite() {
    const { vel, sprites, isFloating } = this;
    const vx = vel[0];
    const vy = vel[1];

    if (vx > 0) {
      this.sprite = sprites.runRight;
    } else if (vx < 0) {
      this.sprite = sprites.runLeft;
    } else {
      if (this.lastRunDirection === 'right') {
        this.sprite = sprites.idleRight;
      } else if (this.lastRunDirection === 'left') {
        this.sprite = sprites.idleLeft;
      }
    }
  }

  handlePowerupCollision(powerupType, game) {
    switch(powerupType) {
      case 'shield':
        this.shieldHitPoints++;
        game.addShield();
        break;
      case 'electricShield':
        this.electricShieldHitPoints += 1;
        game.addElectricShield();
        break;
      case 'nuke':
        const numEnemies = game.enemies.length;
        const numberToRemove = numEnemies;
        // if (numEnemies === 0) {
        //   numberToRemove = 0;
        // } else if (numEnemies === 1) {
        //   numberToRemove = 1;
        // } else {
        //   numberToRemove = Math.floor(numEnemies * 0.8);
        // }

        for (let i = 0; i < numberToRemove; i++) {
          game.enemies[i].kill();
        }
        break;
      default:
        break;
    }
  }

  handleEnemyCollision(enemy, game) {
    const {
      SHIELD_RECOVERY_TIME,
      ELECTRIC_SHIELD_RECOVERY_TIME
    } = CONSTANTS;

    const timeSinceLastHit = Date.now() - this.lastHit;

    // if player has electric shield
    let isNotRecovering = timeSinceLastHit > ELECTRIC_SHIELD_RECOVERY_TIME;
    if (isNotRecovering && this.electricShieldHitPoints > 0) {
      this.electricShieldHitPoints--;
      enemy.kill();
      const outerElectricShield = game.electricShields[game.electricShields.length - 1];
      outerElectricShield.sprite = outerElectricShield.sprites.flashing;
      setTimeout(() => game.removeElectricShield(outerElectricShield.id), ELECTRIC_SHIELD_RECOVERY_TIME);
      this.lastHit = Date.now();
      return;
    }

    // if player has shield
    isNotRecovering = timeSinceLastHit > SHIELD_RECOVERY_TIME;
    if (isNotRecovering && this.shieldHitPoints === 0) {
      this.kill();
      game.gameOver = true;
    } else if (isNotRecovering) {
      this.shieldHitPoints--;
      const outerShield = game.shields[game.shields.length - 1];
      outerShield.sprite = outerShield.sprites.flashing;
      setTimeout(() => game.removeShield(outerShield.id), SHIELD_RECOVERY_TIME);
      this.lastHit = Date.now();
    }
  }

  handleSurfaceCollison(collisionType) {
    if (collisionType === 'bottom') {
      this.jumpNumber = 0;
    }
  }

  handleJumpKeyPress() {
    if (this.jumpNumber < 2 && !this.jumpKeyPressed) {
      this.jumpNumber++;
      this.vel[1] = CONSTANTS.PLAYER_VERTICAL_INIT_VEL;
    }
    this.jumpKeyPressed = true;
  }

  handleJumpKeyRelease() {
    this.jumpKeyPressed = false;
  }

  handleInput(dt) {
    const input = window.input;
    const {
      pos,
      vel,
      isDead,
      sprites,
      jumpNumber,
      handleJumpKeyPress,
      handleJumpKeyRelease
     } = this;
    const {
      PLAYER_HORIZONTAL_VEL,
      PLAYER_HORIZONTAL_ACC
    } = CONSTANTS;

    if (isDead) {
      return;
    }

    if (input.isDown('UP') || input.isDown('SPACE')) {
      handleJumpKeyPress();
    } else {
      handleJumpKeyRelease();
    }

    if (input.isDown('LEFT')) {
      this.lastRunDirection = 'left';
      if (vel[0] > -PLAYER_HORIZONTAL_VEL) {
        this.vel[0] -= (PLAYER_HORIZONTAL_ACC * dt);
      } else {
        this.vel[0] = -PLAYER_HORIZONTAL_VEL;
      }
    } else if (input.isDown('RIGHT')) {
      this.lastRunDirection = 'right';
      if (this.vel[0] < PLAYER_HORIZONTAL_VEL) {
        this.vel[0] += (PLAYER_HORIZONTAL_ACC * dt);
      } else {
        this.vel[0] = PLAYER_HORIZONTAL_VEL;
      }
    } else {
      this.vel[0] = 0;
    }

    this.setSprite();
  }



}

export default Player;
