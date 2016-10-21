import Crate from '../Crate';

class CollisionManager {
  constructor() {
    this.collisionEl = document.getElementById('collision');
    this.entityHitWall = this.entityHitWall.bind(this);
    this.typeOfCollision = this.typeOfCollision.bind(this);
    this.handleCollisions = this.handleCollisions.bind(this);
    this.handleEnemyCollisions = this.handleEnemyCollisions.bind(this);
    this.handleCrateCollisions = this.handleCrateCollisions.bind(this);
    this.handlePlayerCollisions = this.handlePlayerCollisions.bind(this);
  }

  handleCollisions(objects) {
    const { player, enemies, crate } = objects;
    const walls = objects.stage;
    const {
      handlePlayerCollisions,
      handleEnemyCollisions,
      handleCrateCollisions
    } = this;

    handlePlayerCollisions(player, [...walls, ...enemies, crate]);
    handleEnemyCollisions(enemies, walls);
    handleCrateCollisions(crate, walls);
  }

  handlePlayerCollisions(player, otherObjects) {
    const { typeOfCollision, entityHitWall } = this;
    for (let i = 0; i < otherObjects.length; i++) {
      const otherObject = otherObjects[i];
      const collisionType = typeOfCollision(player, otherObject);
      if (otherObject.type === 'wall') {
        entityHitWall(player, collisionType);
      }
    }
  }

  handleEnemyCollisions(enemies, walls) {

  }

  handleCrateCollisions(crate, walls) {

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
    console.log(collisionType);
    this.collisionEl.innerHTML = collisionType;
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
    // const leftSideOf1 = rect1.x;
    // const rightSideOf1 = rect1.x + rect1.width;
    // const leftSideOf2 = rect2.x;
    // const rightSideOf2 = rect2.x + rect2.width;
    return rect1.x + rect1.w > rect2.x && rect1.x < rect2.x;
  }

  _collisionLeft(rect1, rect2) {
    // const leftSideOf1 = rect1.x;
    // const rightSideOf1 = rect1.x + rect1.width;
    // const leftSideOf2 = rect2.x;
    // const rightSideOf2 = rect2.x + rect2.width;
    return rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x + rect2.w;
  }

  _collisionTop(rect1, rect2) {
    // const topSideOf1 = rect1.y;
    // const bottomSideOf1 = rect1.y + rect1.height;
    // const topSideOf2 = rect2.y;
    // const bottomSideOf2 = rect2.y + rect2.height;
    return rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y + rect2.h;
  }

  _collisionBottom(rect1, rect2) {
    // const topSideOf1 = rect1.y;
    // const bottomSideOf1 = rect1.y + rect1.height;
    // const topSideOf2 = rect2.y;
    // const bottomSideOf2 = rect2.y + rect2.height;
    return rect1.y + rect1.h > rect2.y && rect1.y < rect2.y;
  }

  //   const rect1 = this._getRect(entity);
  //   for (let i = 0; i < collisionMap.length; i++) {
  //     const otherEntity = collisionMap[i];
  //     const rect2 = this._getRect(otherEntity);
  //
  //     const collisionType = this._collisionDetected(rect1, rect2);
  //     if (collisionType) {
  //       if (entity.type === 'enemy') {
  //         entity.handleCollision(collisionType);
  //       }
  //
  //       if (otherEntity.type === 'wall') {
  //         this._entityHitWall(entity, collisionType);
  //       }
  //
  //       if (entity.type === 'player' && otherEntity.type === 'crate') {
  //         this.score++;
  //         if (this.score > 9) {
  //           this.scoreEl.className = 'double_digits';
  //         }
  //         this.crate = new Crate({
  //           pos: [-100, -100],
  //           vel: [0, 0],
  //           sprite: SPRITES.CRATE
  //         });
  //         setTimeout(() => {
  //             this.crate = new Crate({
  //             pos: STAGES.STAGE_1_CRATE_SPAWN(),
  //             vel: [0, 10],
  //             sprite: SPRITES.CRATE
  //           });
  //         }, 500);
  //       }
  //
  //     }
  //   }
  //   return null;
  // }
  //
  //
  // getRect(entity) {
  //   const hitbox = entity.hitbox(this.ctx);
  //
  //   return {
  //     x: hitbox[0], y: hitbox[1], width: hitbox[2], height: hitbox[3]
  //   };
  // }
  //
  // collisionDetected(rect1, rect2) {
  //   const {
  //     _collisionRight,
  //     _collisionLeft,
  //     _collisionTop,
  //     _collisionBottom
  //   } = this;
  //
  //   if (rect1.x < rect2.x + rect2.width &&
  //       rect1.x + rect1.width > rect2.x &&
  //       rect1.y < rect2.y + rect2.height &&
  //       rect1.height + rect1.y > rect2.y) {
  //         const l = _collisionLeft(rect1, rect2);
  //         const r = _collisionRight(rect1, rect2);
  //         const t = _collisionTop(rect1, rect2);
  //         const b = _collisionBottom(rect1, rect2);
  //
  //         if ( t && b ) {
  //           return 'top-bottom';
  //         } else if (l && t) {
  //           return 'left-top';
  //         } else if (l && b ) {
  //           return 'left-bottom';
  //         } else if (r && t) {
  //           return 'right-top';
  //         } else if (r && b) {
  //           return 'right-bottom';
  //         } else if (l) {
  //           return 'left';
  //         } else if (r) {
  //           return 'right';
  //         } else if (t) {
  //           return 'top';
  //         } else if (b) {
  //           return 'bottom';
  //         }
  //
  //   }
  // }
  //

  //
  // _entityHitWall(entity, collisionType) {
  //   if (entity.type === 'player') {
  //     this.collisionEl.innerHTML = `C: ${collisionType}`;
  //   }
  //   switch(collisionType) {
  //     case 'right':
  //       entity.vel[0] = 0;
  //       entity.pos[0] = entity.lastPos[0];
  //       break;
  //     case 'left':
  //       entity.vel[0] = 0;
  //       entity.pos[0] = entity.lastPos[0];
  //       break;
  //     case 'top':
  //       entity.vel[1] = -entity.vel[1] * 0.25;
  //       entity.pos[1] = entity.lastPos[1];
  //       break;
  //     case 'bottom':
  //       entity.vel[1] = 0;
  //       entity.pos[1] = entity.lastPos[1];
  //       break;
  //     case 'right-bottom':
  //       if (entity.pos[0] > entity.lastPos[0]) {
  //         entity.pos[0] = entity.lastPos[0];
  //       }
  //       if (entity.vel[0] === 0 && entity.vel[1] > 0) {
  //         entity.pos[0] = entity.lastPos[0];
  //       }
  //       if (entity.pos[1] > entity.lastPos[1] &&
  //          entity.vel[0] === 0) {
  //         entity.pos[1] = entity.lastPos[1];
  //         entity.vel[1] = 0;
  //       }
  //       if (entity.pos[1] > entity.lastPos[1] &&
  //          entity.vel[1] > 0) {
  //         entity.pos[1] = entity.lastPos[1] + 3;
  //         entity.vel[1] = -entity.vel[1] * 0.25;
  //       }
  //       break;
  //     case 'left-bottom':
  //       if (entity.pos[0] < entity.lastPos[0]) {
  //         entity.pos[0] = entity.lastPos[0];
  //       }
  //       if (entity.vel[0] === 0 && entity.vel[1] > 0) {
  //         entity.pos[0] = entity.lastPos[0];
  //       }
  //       if (entity.pos[1] > entity.lastPos[1] &&
  //          entity.vel[0] === 0) {
  //         entity.pos[1] = entity.lastPos[1];
  //         entity.vel[1] = 0;
  //       }
  //       if (entity.pos[1] > entity.lastPos[1] &&
  //          entity.vel[1] < 0) {
  //         entity.pos[1] = entity.lastPos[1] + 3;
  //         entity.vel[1] = -entity.vel[1] * 0.25;
  //       }
  //       break;
  //     case 'right-top':
  //       if (entity.vel[0] > 0) {
  //         entity.vel[0] = 0;
  //       }
  //       if (entity.pos[0] > entity.lastPos[0]) {
  //         entity.pos[0] = entity.lastPos[0];
  //       }
  //       if (entity.vel[1] < 0) {
  //         entity.pos[1] = entity.lastPos[1];
  //         entity.vel[1] = -entity.vel[1] * 0.25;
  //       }
  //       break;
  //     case 'left-top':
  //       if (entity.vel[0] < 0) {
  //         entity.vel[0] = 0;
  //       }
  //       if (entity.pos[0] < entity.lastPos[0]) {
  //         entity.pos[0] = entity.lastPos[0];
  //       }
  //       if (entity.vel[1] < 0) {
  //         entity.pos[1] = entity.lastPos[1];
  //         entity.vel[1] = -entity.vel[1] * 0.25;
  //       }
  //       break;
  //     case 'top-bottom':
  //       entity.pos[0] = entity.lastPos[0];
  //       break;
  //   }
  // }

}

export default CollisionManager;
