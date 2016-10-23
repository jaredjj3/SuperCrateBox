import Crate from '../Crate';
import * as CONSTANTS from './CONSTANTS';

class CollisionManager {
  constructor(game) {
    this.game = game;
    this.collisionEl = document.getElementById('collision');
    this.entityHitWall = this.entityHitWall.bind(this);
    this.typeOfCollision = this.typeOfCollision.bind(this);
    this.handleCollisions = this.handleCollisions.bind(this);
    this.handleEnemyCollisions = this.handleEnemyCollisions.bind(this);
    this.handleCrateCollisions = this.handleCrateCollisions.bind(this);
    this.handlePlayerCollisions = this.handlePlayerCollisions.bind(this);
  }

  handleCollisions(objects) {
    const { player, enemies, crate, powerups } = objects;
    const walls = objects.stage;
    const {
      handlePlayerCollisions,
      handleEnemyCollisions,
      handleCrateCollisions
    } = this;

    handlePlayerCollisions(player, [...walls, ...enemies, crate, ...powerups]);
    handleEnemyCollisions(enemies, walls);
    handleCrateCollisions(crate, walls);
  }

  handlePlayerCollisions(player, otherObjects) {
    const {
      game,
      typeOfCollision,
      entityHitWall,
      isPlayerFloating,
      playerPickedUpCrate
    } = this;
    for (let i = 0; i < otherObjects.length; i++) {
      const otherObject = otherObjects[i];
      const collisionType = typeOfCollision(player, otherObject);
      if (collisionType) {
        switch(otherObject.type) {
          case 'wall':
            player.handleSurfaceCollison(collisionType);
            entityHitWall(player, collisionType);
            break;
          case 'crate':
            game.score++;
            game.resetCrate();
            break;
          case 'enemy':
            const enemy = otherObject;
            player.handleEnemyCollision(game, enemy);
            break;
          case 'shield':
            const shield = otherObject;
            player.handlePowerupCollision('shield');
            game.removePowerup(shield.id);
            break;
          case 'electricShield':
            const electricShield = otherObject;
            player.handlePowerupCollision('electricShield');
            game.removePowerup(electricShield.id);
            break;
          case 'nuke':
            const nuke = otherObject;
            player.handlePowerupCollision('nuke', game);
            game.removePowerup(nuke.id);
            break;
          default:
            return;
        }
      }
    }
  }

  handleEnemyCollisions(enemies, walls) {
    const { typeOfCollision, entityHitWall } = this;
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      for (let j = 0; j < walls.length; j++) {
        const wall = walls[j];
        const collisionType = typeOfCollision(enemy, wall);
        if (collisionType) {
          enemy.handleCollision(collisionType);
          entityHitWall(enemy, collisionType);
        }
      }
    }
  }

  handleCrateCollisions(crate, walls) {
    const { typeOfCollision, entityHitWall } = this;
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      const collisionType = typeOfCollision(crate, wall);
      if (collisionType) {
        entityHitWall(crate, collisionType);
      }
    }
  }

  entityHitWall(entity, collisionType) {
    const {
      resetXPos,
      resetYPos,
      resetXVel,
      nullXVel,
      resetYVel,
      nullYVel,
    } = this;
    if (entity.type === 'player') {

      this.collisionEl.innerHTML = collisionType;
    }
    switch(collisionType) {
      case 'bottom':
        resetYPos(entity);
        nullYVel(entity);
        break;
      case 'top':
        resetYPos(entity);
        nullYVel(entity);
        break;
      case 'left':
        resetXPos(entity);
      case 'right':
        resetXPos(entity);
        break;
      case 'left-top':
        resetXPos(entity, 3);
        resetXVel(entity);
        resetYPos(entity);
        break;
      case 'right-top':
        resetXPos(entity, -3);
        resetXVel(entity);
        resetYPos(entity);
        break;

      case 'left-bottom':
        resetXPos(entity, 5);
        resetYPos(entity);
        resetYVel(entity);
        break;

      case 'right-bottom':
        resetXPos(entity, -5);
        resetYPos(entity);
        resetYVel(entity);
        break;

      case 'top-bottom':
        resetXPos(entity);
        break;
      default:
        break;
    }
  }

  resetXPos(entity, offset = 0) {
    entity.pos[0] = entity.lastPos[0] + offset;
  }

  resetYPos(entity, offset = 0) {
    entity.pos[1] = entity.lastPos[1] + offset;
  }

  resetXVel(entity, offset = 0) {
    entity.vel[0] = entity.lastVel[0] + offset;
  }

  nullXVel(entity) {
    entity.vel[0] = 0;
  }

  resetYVel(entity, offset = 0) {
    entity.vel[1] = entity.lastVel[1] + offset;
  }

  nullYVel(entity) {
    entity.vel[1] = 0;
  }

  typeOfCollision(obj1, obj2) {
    const { collisionExists } = this;
    const rect1 = obj1.hitbox();
    const rect2 = obj2.hitbox();

    if (collisionExists(rect1, rect2)) {
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
      } else {
        return null;
      }
    } else {
      return null;
    }

  }

  collisionExists(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.h + rect1.y > rect2.y
    );
  }

  // private

  _collisionRight(rect1, rect2) {
    return rect1.x + rect1.w > rect2.x && rect1.x < rect2.x;
  }

  _collisionLeft(rect1, rect2) {
    return rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x + rect2.w;
  }

  _collisionTop(rect1, rect2) {
    return rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y + rect2.h;
  }

  _collisionBottom(rect1, rect2) {
    return rect1.y + rect1.h > rect2.y && rect1.y < rect2.y;
  }

}

export default CollisionManager;
