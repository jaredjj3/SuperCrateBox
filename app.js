/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Resources = __webpack_require__(1);
	
	var _Resources2 = _interopRequireDefault(_Resources);
	
	var _Player = __webpack_require__(2);
	
	var _Player2 = _interopRequireDefault(_Player);
	
	var _Crate = __webpack_require__(12);
	
	var _Crate2 = _interopRequireDefault(_Crate);
	
	var _Sprite = __webpack_require__(6);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	var _Input = __webpack_require__(15);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _Enemy = __webpack_require__(13);
	
	var _Enemy2 = _interopRequireDefault(_Enemy);
	
	var _UNITS = __webpack_require__(7);
	
	var UNITS = _interopRequireWildcard(_UNITS);
	
	var _SPRITES = __webpack_require__(5);
	
	var SPRITES = _interopRequireWildcard(_SPRITES);
	
	var _STAGES = __webpack_require__(8);
	
	var STAGES = _interopRequireWildcard(_STAGES);
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	var _CollisionManager = __webpack_require__(16);
	
	var _CollisionManager2 = _interopRequireDefault(_CollisionManager);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SuperCrateBox = function () {
	  function SuperCrateBox() {
	    _classCallCheck(this, SuperCrateBox);
	
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
	    this.removeShield = this.removeShield.bind(this);
	    this.renderEntity = this.renderEntity.bind(this);
	    this.renderEntities = this.renderEntities.bind(this);
	    this.updateEntities = this.updateEntities.bind(this);
	    this.killAllEnemies = this.killAllEnemies.bind(this);
	    this.checkPlayerBounds = this.checkPlayerBounds.bind(this);
	    this.removeElectricShield = this.removeElectricShield.bind(this);
	  }
	
	  _createClass(SuperCrateBox, [{
	    key: 'play',
	    value: function play() {
	      this.lastTime = Date.now();
	      this.lastEnemySpawnTime = Date.now();
	      this.lastPowerupSpawnTime = Date.now();
	      this.setup();
	    }
	  }, {
	    key: 'main',
	    value: function main() {
	      if (this.gameOver & !this.isResetting) {
	        this.reset();
	        console.log('reset');
	        return;
	      }
	
	      var reset = this.reset;
	      var update = this.update;
	      var render = this.render;
	
	      var now = Date.now();
	      var dt = (now - this.lastTime) / 1000.0;
	      var timeSinceLastEnemySpawn = now - this.lastEnemySpawnTime;
	      var timeSinceLastPowerupSpawn = now - this.lastPowerupSpawnTime;
	      if (timeSinceLastEnemySpawn >= CONSTANTS.ENEMY_SPAWN_RATE) {
	        this.addEnemy();
	      }
	
	      if (timeSinceLastPowerupSpawn >= CONSTANTS.POWERUP_SPAWN_RATE) {
	        this.addPowerup();
	      }
	
	      update(dt);
	      render();
	
	      this.lastTime = now;
	      window.mainLoop = requestAnimationFrame(this.main);
	    }
	  }, {
	    key: 'update',
	    value: function update(dt) {
	      var player = this.player;
	      var crate = this.crate;
	      var enemies = this.enemies;
	      var handleInput = this.handleInput;
	      var allObjects = this.allObjects;
	      var updateEntities = this.updateEntities;
	      var checkCollisions = this.checkCollisions;
	      var checkPlayerBounds = this.checkPlayerBounds;
	      var collisionManager = this.collisionManager;
	
	
	      player.handleInput(dt);
	      updateEntities(dt);
	      collisionManager.handleCollisions(allObjects());
	      checkPlayerBounds();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var ctx = this.ctx;
	      var player = this.player;
	      var enemies = this.enemies;
	      var crate = this.crate;
	      var stage = this.stage;
	      var shields = this.shields;
	      var powerups = this.powerups;
	      var electricShields = this.electricShields;
	      var renderEntity = this.renderEntity;
	      var renderEntities = this.renderEntities;
	      var renderHtml = this.renderHtml;
	
	
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
	
	  }, {
	    key: 'resetCrate',
	    value: function resetCrate() {
	      var _this = this;
	
	      this.crate.pos[0] = -100;
	      this.crate.pos[1] = 100;
	      setTimeout(function () {
	        _this.crate = (0, _UNITS.CRATE)();
	      }, 500);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var _this2 = this;
	
	      this.isResetting = true;
	      this.shields = [];
	      this.electricShields = [];
	      this.lastEnemySpawnTime = Date.now();
	      this.lastPowerupSpawnTime = Date.now();
	
	      setTimeout(function () {
	        _this2.score = 0;
	        _this2.scoreEl.className = 'single_digits';
	        _this2.killAllEnemies();
	        _this2.player = (0, _UNITS.PLAYER)();
	        _this2.resetCrate();
	        _this2.powerups = [];
	        _this2.lastEnemySpawnTime = Date.now();
	        _this2.lastPowerupSpawnTime = Date.now();
	        _this2.isResetting = false;
	        _this2.gameOver = false;
	      }, 2000);
	
	      this.main();
	    }
	  }, {
	    key: 'setup',
	    value: function setup() {
	      var _this3 = this;
	
	      this.gameOver = false;
	      this.isResetting = false;
	      // loads resources
	      _Resources2.default.load(['./lib/img/jay.png', './lib/img/crate.png', './lib/img/hammer.png', './lib/img/metal.png', './lib/img/shieldPickup.png', './lib/img/electricShieldPickup.png', './lib/img/nukePickup.png', './lib/img/electricShield.png', './lib/img/shield.png']);
	      var init = function init() {
	        _this3.main();
	      };
	      _Resources2.default.onReady(init);
	      _Input2.default.setup();
	
	      // HTML Elements
	      var canvas = document.getElementById('canvas');
	      this.ctx = canvas.getContext('2d');
	      this.score = 0;
	      this.scoreEl = document.getElementById('score');
	      this.scoreEl.className = 'single_digits';
	      this.velocityEl = document.getElementById('velocity');
	      this.positionEl = document.getElementById('position');
	      this.collisionManager = new _CollisionManager2.default(this);
	
	      this.player = (0, _UNITS.PLAYER)();
	      this.currentObjectId = 0;
	      this.enemies = [];
	      this.shields = [];
	      this.electricShields = [];
	      this.crate = (0, _UNITS.CRATE)();
	      this.powerups = [];
	      this.stage = STAGES.STAGE_1;
	    }
	  }, {
	    key: 'updateEntities',
	    value: function updateEntities(dt) {
	      this.player.update(dt);
	      this.crate.update(dt);
	      for (var i = 0; i < this.enemies.length; i++) {
	        var enemy = this.enemies[i];
	        enemy.update(dt, this);
	        if (enemy.isDead && (enemy.pos[1] > 600 || enemy.pos[1] < -10)) {
	          enemy.update(dt, this);
	          this.removeEnemy(enemy.id);
	        }
	      }
	
	      for (var _i = 0; _i < this.powerups.length; _i++) {
	        this.powerups[_i].update(dt);
	      }
	
	      for (var _i2 = 0; _i2 < this.electricShields.length; _i2++) {
	        this.electricShields[_i2].update(dt);
	      }
	
	      for (var _i3 = 0; _i3 < this.shields.length; _i3++) {
	        this.shields[_i3].update(dt);
	      }
	    }
	  }, {
	    key: 'checkPlayerBounds',
	    value: function checkPlayerBounds() {
	      if (this.player.pos[1] > 700 && this.gameOver === false) {
	        this.gameOver = true;
	        this.player.kill();
	      }
	    }
	  }, {
	    key: 'renderHtml',
	    value: function renderHtml() {
	      var score = this.score;
	      var player = this.player;
	
	      this.scoreEl.innerHTML = score;
	      if (this.score > 9) {
	        this.scoreEl.className = "double_digits";
	      }
	      var vx = this.player.vel[0].toFixed(0);
	      var vy = this.player.vel[1].toFixed(0);
	      var x = this.player.hitbox().x.toFixed(0);
	      var y = this.player.hitbox().y.toFixed(0);
	      this.velocityEl.innerHTML = 'Electric Shield: ' + player.electricShieldHitPoints;
	      // this.velocityEl.innerHTML = `V: ${vx}, ${vy}`;
	      this.positionEl.innerHTML = 'P: ' + x + ', ' + y;
	    }
	  }, {
	    key: 'renderEntity',
	    value: function renderEntity(entity) {
	      var ctx = this.ctx;
	
	      ctx.save();
	      ctx.translate(entity.pos[0], entity.pos[1]);
	      entity.sprite.render(ctx);
	      ctx.restore();
	    }
	  }, {
	    key: 'renderEntities',
	    value: function renderEntities(list) {
	      for (var i = 0; i < list.length; i++) {
	        this.renderEntity(list[i]);
	      }
	    }
	  }, {
	    key: 'allObjects',
	    value: function allObjects() {
	      var player = this.player;
	      var enemies = this.enemies;
	      var crate = this.crate;
	      var stage = this.stage;
	      var powerups = this.powerups;
	      var shields = this.shields;
	
	      return { player: player, enemies: enemies, crate: crate, stage: stage, powerups: powerups, shields: shields };
	    }
	  }, {
	    key: 'addEnemy',
	    value: function addEnemy() {
	      this.lastEnemySpawnTime = Date.now();
	      this.currentObjectId++;
	      this.enemies.push((0, _UNITS.HAMMER)(this.currentObjectId));
	    }
	  }, {
	    key: 'addPowerup',
	    value: function addPowerup() {
	      this.lastPowerupSpawnTime = Date.now();
	      this.currentObjectId++;
	      var seed = Math.random();
	      var powerup = void 0;
	      if (seed <= 0.50) {
	        powerup = UNITS.SHIELD_PICKUP(this.currentObjectId);
	      } else if (seed > 0.50 && seed < 0.80) {
	        powerup = UNITS.ELECTRIC_SHIELD_PICKUP(this.currentObjectId);
	      } else {
	        powerup = UNITS.NUKE_PICKUP(this.currentObjectId);
	      }
	      this.powerups.push(powerup);
	    }
	  }, {
	    key: 'addShield',
	    value: function addShield() {
	      this.currentObjectId++;
	      this.shields.push(UNITS.SHIELD(this.currentObjectId, this.player));
	    }
	  }, {
	    key: 'addElectricShield',
	    value: function addElectricShield() {
	      this.currentObjectId++;
	      this.electricShields.push(UNITS.ELECTRIC_SHIELD(this.currentObjectId, this.player));
	    }
	  }, {
	    key: 'removeShield',
	    value: function removeShield() {
	      this.shields.splice(0, 1);
	    }
	  }, {
	    key: 'removeElectricShield',
	    value: function removeElectricShield() {
	      this.electricShields.splice(0, 1);
	    }
	  }, {
	    key: 'removeEnemy',
	    value: function removeEnemy(targetId) {
	      for (var i = 0; i < this.enemies.length; i++) {
	        var enemy = this.enemies[i];
	        if (enemy.id === targetId) {
	          this.enemies.splice(i, 1);
	          return;
	        }
	      }
	    }
	  }, {
	    key: 'killAllEnemies',
	    value: function killAllEnemies() {
	      for (var i = 0; i < this.enemies.length; i++) {
	        this.enemies[i].kill();
	      }
	    }
	  }, {
	    key: 'removePowerup',
	    value: function removePowerup(targetId) {
	      for (var i = 0; i < this.powerups.length; i++) {
	        var powerup = this.powerups[i];
	        if (powerup.id === targetId) {
	          this.powerups.splice(i, 1);
	          return;
	        }
	      }
	    }
	  }]);
	
	  return SuperCrateBox;
	}();
	
	var scb = new SuperCrateBox();
	document.addEventListener('DOMContentLoaded', function () {
	  return scb.play();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Resources = function () {
	  function Resources() {
	    _classCallCheck(this, Resources);
	
	    this.resourceCache = {};
	    this.loading = [];
	    this.readyCallbacks = [];
	
	    this.load = this.load.bind(this);
	    this._load = this._load.bind(this);
	    this.get = this.get.bind(this);
	    this.isReady = this.isReady.bind(this);
	    this.onReady = this.onReady.bind(this);
	  }
	
	  _createClass(Resources, [{
	    key: "load",
	    value: function load(arg) {
	      var _load = this._load;
	
	      arg.forEach(function (url) {
	        return _load(url);
	      });
	    }
	  }, {
	    key: "get",
	    value: function get(url) {
	      return this.resourceCache[url];
	    }
	  }, {
	    key: "isReady",
	    value: function isReady() {
	      var resourceCache = this.resourceCache;
	
	      var ready = true;
	      for (var k in resourceCache) {
	        if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
	          ready = false;
	        }
	      }
	      return ready;
	    }
	  }, {
	    key: "onReady",
	    value: function onReady(func) {
	      this.readyCallbacks.push(func);
	    }
	
	    // private
	
	  }, {
	    key: "_load",
	    value: function _load(url) {
	      var resourceCache = this.resourceCache;
	      var readyCallbacks = this.readyCallbacks;
	      var isReady = this.isReady;
	
	
	      if (resourceCache[url]) {
	        return resourceCache[url];
	      } else {
	        (function () {
	          var img = new Image();
	          img.onload = function () {
	            resourceCache[url] = img;
	
	            if (isReady()) {
	              readyCallbacks.forEach(function (callback) {
	                return callback();
	              });
	            }
	          };
	          resourceCache[url] = false;
	          img.src = url;
	        })();
	      }
	    }
	  }]);
	
	  return Resources;
	}();
	
	var _ref = new Resources();
	
	var load = _ref.load;
	var get = _ref.get;
	var onReady = _ref.onReady;
	var isReady = _ref.isReady;
	exports.default = {
	  load: load,
	  get: get,
	  onReady: onReady,
	  isReady: isReady
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Moveable2 = __webpack_require__(3);
	
	var _Moveable3 = _interopRequireDefault(_Moveable2);
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	var _SPRITES = __webpack_require__(5);
	
	var SPRITES = _interopRequireWildcard(_SPRITES);
	
	var _UNITS = __webpack_require__(7);
	
	var UNITS = _interopRequireWildcard(_UNITS);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Player = function (_Moveable) {
	  _inherits(Player, _Moveable);
	
	  function Player(opts) {
	    _classCallCheck(this, Player);
	
	    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, opts));
	
	    _this.type = 'player';
	    _this.jumpNumber = 0;
	    _this.jumpKeyPressed = false;
	    _this.lastJumpTime = Date.now();
	    _this.lastRunDirection = 'right';
	    _this.shieldHitPoints = 0;
	    _this.electricShieldHitPoints = 0;
	    _this.lastHit = Date.now();
	    _this.isDead = false;
	
	    _this.hitbox = function () {
	      return {
	        x: _this.pos[0] + 20,
	        y: _this.pos[1] + 15,
	        w: 27,
	        h: 49
	      };
	    };
	
	    _this.setSprite = _this.setSprite.bind(_this);
	    _this.handleInput = _this.handleInput.bind(_this);
	    _this.handleSurfaceCollison = _this.handleSurfaceCollison.bind(_this);
	    _this.handleEnemyCollision = _this.handleEnemyCollision.bind(_this);
	    _this.handleJumpKeyPress = _this.handleJumpKeyPress.bind(_this);
	    _this.handleJumpKeyRelease = _this.handleJumpKeyRelease.bind(_this);
	    return _this;
	  }
	
	  _createClass(Player, [{
	    key: 'kill',
	    value: function kill() {
	      this.isDead = true;
	      this.vel[1] += -200;
	      this.sprites.idleRight.facing = 'rightFlipped';
	      this.sprites.idleLeft.facing = 'leftFlipped';
	      this.sprites.runRight.facing = 'rightFlipped';
	      this.sprites.runLeft.facing = 'leftFlipped';
	    }
	  }, {
	    key: 'setSprite',
	    value: function setSprite() {
	      var vel = this.vel;
	      var sprites = this.sprites;
	      var isFloating = this.isFloating;
	
	      var vx = vel[0];
	      var vy = vel[1];
	
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
	  }, {
	    key: 'handlePowerupCollision',
	    value: function handlePowerupCollision(powerupType, game) {
	      switch (powerupType) {
	        case 'shield':
	          this.shieldHitPoints++;
	          game.addShield();
	          break;
	        case 'electricShield':
	          this.electricShieldHitPoints += 1;
	          game.addElectricShield();
	          break;
	        case 'nuke':
	          var numberToRemove = Math.floor(game.enemies.length * 0.75);
	          for (var i = 0; i < numberToRemove; i++) {
	            game.enemies[i].kill();
	          }
	          break;
	        default:
	          break;
	      }
	    }
	  }, {
	    key: 'handleEnemyCollision',
	    value: function handleEnemyCollision(enemy, game) {
	      var SHIELD_RECOVERY_TIME = CONSTANTS.SHIELD_RECOVERY_TIME;
	      var ELECTRIC_SHIELD_RECOVERY_TIME = CONSTANTS.ELECTRIC_SHIELD_RECOVERY_TIME;
	
	
	      var timeSinceLastHit = Date.now() - this.lastHit;
	
	      // if player has electric shield
	      var isNotRecovering = timeSinceLastHit > ELECTRIC_SHIELD_RECOVERY_TIME;
	      if (isNotRecovering && this.electricShieldHitPoints > 0) {
	        this.electricShieldHitPoints--;
	        enemy.kill();
	        game.removeElectricShield();
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
	        game.removeShield();
	        this.lastHit = Date.now();
	      }
	    }
	  }, {
	    key: 'handleSurfaceCollison',
	    value: function handleSurfaceCollison(collisionType) {
	      if (collisionType === 'bottom') {
	        this.jumpNumber = 0;
	      }
	    }
	  }, {
	    key: 'handleJumpKeyPress',
	    value: function handleJumpKeyPress() {
	      if (this.jumpNumber < 2 && !this.jumpKeyPressed) {
	        this.jumpNumber++;
	        this.vel[1] = CONSTANTS.PLAYER_VERTICAL_INIT_VEL;
	      }
	      this.jumpKeyPressed = true;
	    }
	  }, {
	    key: 'handleJumpKeyRelease',
	    value: function handleJumpKeyRelease() {
	      this.jumpKeyPressed = false;
	    }
	  }, {
	    key: 'handleInput',
	    value: function handleInput(dt) {
	      var input = window.input;
	      var pos = this.pos;
	      var vel = this.vel;
	      var isDead = this.isDead;
	      var sprites = this.sprites;
	      var jumpNumber = this.jumpNumber;
	      var handleJumpKeyPress = this.handleJumpKeyPress;
	      var handleJumpKeyRelease = this.handleJumpKeyRelease;
	      var PLAYER_HORIZONTAL_VEL = CONSTANTS.PLAYER_HORIZONTAL_VEL;
	      var PLAYER_HORIZONTAL_ACC = CONSTANTS.PLAYER_HORIZONTAL_ACC;
	
	
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
	          this.vel[0] -= PLAYER_HORIZONTAL_ACC * dt;
	        } else {
	          this.vel[0] = -PLAYER_HORIZONTAL_VEL;
	        }
	      } else if (input.isDown('RIGHT')) {
	        this.lastRunDirection = 'right';
	        if (this.vel[0] < PLAYER_HORIZONTAL_VEL) {
	          this.vel[0] += PLAYER_HORIZONTAL_ACC * dt;
	        } else {
	          this.vel[0] = PLAYER_HORIZONTAL_VEL;
	        }
	      } else {
	        this.vel[0] = 0;
	      }
	
	      this.setSprite();
	    }
	  }]);
	
	  return Player;
	}(_Moveable3.default);
	
	exports.default = Player;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Moveable = function () {
	  function Moveable(opts) {
	    _classCallCheck(this, Moveable);
	
	    var pos = opts.pos;
	    var lastPos = opts.lastPos;
	    var vel = opts.vel;
	    var lastVel = opts.lastVel;
	    var sprites = opts.sprites;
	    var sprite = opts.sprite;
	
	    this.pos = pos;
	    this.lastPos = [0, 0];
	    this.vel = vel;
	    this.lastVel = [0, 0];
	    this.sprites = sprites;
	    this.sprite = sprite;
	
	    this.update = this.update.bind(this);
	  }
	
	  _createClass(Moveable, [{
	    key: 'update',
	    value: function update(dt) {
	      this.lastPos[0] = this.pos[0];
	      this.lastPos[1] = this.pos[1];
	      this.lastVel[0] = this.vel[0];
	      this.lastVel[1] = this.vel[1];
	      this.vel[1] += CONSTANTS.GRAVITY * dt;
	      this.pos[0] += this.vel[0] * dt;
	      this.pos[1] += this.vel[1] * dt;
	      this.sprite.update(dt);
	    }
	  }]);
	
	  return Moveable;
	}();
	
	exports.default = Moveable;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var GRAVITY = exports.GRAVITY = 1400; // px/sec^2
	
	var PLAYER_HORIZONTAL_VEL = exports.PLAYER_HORIZONTAL_VEL = 375; // px/sec
	var PLAYER_HORIZONTAL_ACC = exports.PLAYER_HORIZONTAL_ACC = 6000; // px/sec^2
	var PLAYER_VERTICAL_INIT_VEL = exports.PLAYER_VERTICAL_INIT_VEL = -600;
	var SHIELD_RECOVERY_TIME = exports.SHIELD_RECOVERY_TIME = 500; // millisecs
	var ELECTRIC_SHIELD_RECOVERY_TIME = exports.ELECTRIC_SHIELD_RECOVERY_TIME = 100; // millisecs
	
	var ENEMY_ONE_VEL = exports.ENEMY_ONE_VEL = 350;
	var ENEMY_ONE_INIT_VEL = exports.ENEMY_ONE_INIT_VEL = -400;
	var ENEMY_SPAWN_RATE = exports.ENEMY_SPAWN_RATE = 4500; // every n millisecs
	
	var POWERUP_SPAWN_RATE = exports.POWERUP_SPAWN_RATE = 5000; // every n millisecs

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HAMMER_RUN_LEFT = exports.HAMMER_RUN_RIGHT = exports.CRATE = exports.PLAYER_JUMP_LEFT = exports.PLAYER_JUMP_RIGHT = exports.PLAYER_FLOAT_LEFT = exports.PLAYER_FLOAT_RIGHT = exports.PLAYER_RUN_LEFT = exports.PLAYER_RUN_RIGHT = exports.PLAYER_IDLE_LEFT = exports.PLAYER_IDLE_RIGHT = exports.NUKE_PICKUP = exports.ELECTRIC_SHIELD_PICKUP = exports.SHIELD_PICKUP = exports.SHIELD = exports.ELECTRIC_SHIELD = undefined;
	
	var _Sprite = __webpack_require__(6);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ELECTRIC_SHIELD = exports.ELECTRIC_SHIELD = function ELECTRIC_SHIELD() {
	  return new _Sprite2.default({
	    url: './lib/img/electricShield.png',
	    pos: [0, 0],
	    frames: [0, 1, 2, 3, 2, 1, 0],
	    size: [64, 64],
	    speed: 10,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var SHIELD = exports.SHIELD = function SHIELD() {
	  return new _Sprite2.default({
	    url: './lib/img/shield.png',
	    pos: [0, 0],
	    frames: [0, 1, 2, 3, 2, 1, 0],
	    size: [64, 64],
	    speed: 10,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var SHIELD_PICKUP = exports.SHIELD_PICKUP = function SHIELD_PICKUP() {
	  return new _Sprite2.default({
	    url: './lib/img/shieldPickup.png',
	    pos: [0, 0],
	    frames: [0, 1, 2, 1, 0],
	    size: [64, 64],
	    speed: 5,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var ELECTRIC_SHIELD_PICKUP = exports.ELECTRIC_SHIELD_PICKUP = function ELECTRIC_SHIELD_PICKUP() {
	  return new _Sprite2.default({
	    url: './lib/img/electricShieldPickup.png',
	    pos: [0, 0],
	    frames: [0, 1, 2, 1, 0],
	    size: [64, 64],
	    speed: 5,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var NUKE_PICKUP = exports.NUKE_PICKUP = function NUKE_PICKUP() {
	  return new _Sprite2.default({
	    url: './lib/img/nukePickup.png',
	    pos: [0, 0],
	    frames: [0, 1, 2, 1, 0],
	    size: [64, 64],
	    speed: 5,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var PLAYER_IDLE_RIGHT = exports.PLAYER_IDLE_RIGHT = function PLAYER_IDLE_RIGHT() {
	  return new _Sprite2.default({
	    url: './lib/img/jay.png',
	    pos: [0, 0],
	    frames: [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	    size: [64, 64],
	    speed: 24,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var PLAYER_IDLE_LEFT = exports.PLAYER_IDLE_LEFT = function PLAYER_IDLE_LEFT() {
	  return new _Sprite2.default({
	    url: './lib/img/jay.png',
	    pos: [0, 0],
	    frames: [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	    size: [64, 64],
	    speed: 24,
	    dir: 'horizontal',
	    once: false,
	    facing: 'left'
	  });
	};
	
	var PLAYER_RUN_RIGHT = exports.PLAYER_RUN_RIGHT = function PLAYER_RUN_RIGHT() {
	  return new _Sprite2.default({
	    url: './lib/img/jay.png',
	    pos: [0, 0],
	    frames: [5, 6, 7, 8, 9, 8, 7, 6],
	    size: [64, 64],
	    speed: 18,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var PLAYER_RUN_LEFT = exports.PLAYER_RUN_LEFT = function PLAYER_RUN_LEFT() {
	  return new _Sprite2.default({
	    url: './lib/img/jay.png',
	    pos: [0, 0],
	    frames: [6, 7, 8, 9, 8, 7, 6, 5],
	    size: [64, 64],
	    speed: 18,
	    dir: 'horizontal',
	    once: false,
	    facing: 'left'
	  });
	};
	
	var PLAYER_FLOAT_RIGHT = exports.PLAYER_FLOAT_RIGHT = function PLAYER_FLOAT_RIGHT() {
	  return new _Sprite2.default({
	    url: './lib/img/jay.png',
	    pos: [0, 0],
	    frames: [12],
	    size: [64, 64],
	    speed: 1,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var PLAYER_FLOAT_LEFT = exports.PLAYER_FLOAT_LEFT = function PLAYER_FLOAT_LEFT() {
	  return new _Sprite2.default({
	    url: './lib/img/jay.png',
	    pos: [0, 0],
	    frames: [12],
	    size: [64, 64],
	    speed: 1,
	    dir: 'horizontal',
	    once: false,
	    facing: 'left'
	  });
	};
	
	var PLAYER_JUMP_RIGHT = exports.PLAYER_JUMP_RIGHT = function PLAYER_JUMP_RIGHT() {
	  return new _Sprite2.default({
	    url: './lib/img/jay.png',
	    pos: [0, 0],
	    frames: [10, 11, 11, 12, 12, 12, 12, 12, 12, 12],
	    size: [64, 64],
	    speed: 24,
	    dir: 'horizontal',
	    once: true,
	    facing: 'right'
	  });
	};
	
	var PLAYER_JUMP_LEFT = exports.PLAYER_JUMP_LEFT = function PLAYER_JUMP_LEFT() {
	  return new _Sprite2.default({
	    url: './lib/img/jay.png',
	    pos: [0, 0],
	    frames: [10, 11, 11, 12, 12, 12, 12, 12, 12, 12],
	    size: [64, 64],
	    speed: 24,
	    dir: 'horizontal',
	    once: true,
	    facing: 'left'
	  });
	};
	
	var CRATE = exports.CRATE = function CRATE() {
	  return new _Sprite2.default({
	    url: './lib/img/crate.png',
	    pos: [0, 0],
	    frames: [0],
	    size: [20, 20],
	    speed: 1,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var HAMMER_RUN_RIGHT = exports.HAMMER_RUN_RIGHT = function HAMMER_RUN_RIGHT() {
	  return new _Sprite2.default({
	    url: './lib/img/hammer.png',
	    pos: [0, 0],
	    frames: [0, 1, 2, 3, 4, 3, 2, 1],
	    size: [64, 64],
	    speed: 10,
	    dir: 'horizontal',
	    once: false,
	    facing: 'right'
	  });
	};
	
	var HAMMER_RUN_LEFT = exports.HAMMER_RUN_LEFT = function HAMMER_RUN_LEFT() {
	  return new _Sprite2.default({
	    url: './lib/img/hammer.png',
	    pos: [0, 0],
	    frames: [0, 1, 2, 3, 4, 3, 2, 1],
	    size: [64, 64],
	    speed: 10,
	    dir: 'horizontal',
	    once: false,
	    facing: 'left'
	  });
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Resources = __webpack_require__(1);
	
	var _Resources2 = _interopRequireDefault(_Resources);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sprite = function () {
	  function Sprite(opts) {
	    _classCallCheck(this, Sprite);
	
	    var pos = opts.pos;
	    var size = opts.size;
	    var speed = opts.speed;
	    var frames = opts.frames;
	    var url = opts.url;
	    var dir = opts.dir;
	    var once = opts.once;
	    var facing = opts.facing;
	
	    this.pos = pos;
	    this.size = size;
	    this.speed = typeof speed === 'number' ? speed : 0;
	    this.frames = frames;
	    this.url = url;
	    this.dir = dir;
	    this.once = once;
	    this._index = 0;
	    this.facing = facing;
	
	    this.update = this.update.bind(this);
	    this.render = this.render.bind(this);
	  }
	
	  _createClass(Sprite, [{
	    key: 'update',
	    value: function update(dt) {
	      var speed = this.speed;
	
	      this._index += speed * dt;
	    }
	  }, {
	    key: 'render',
	    value: function render(ctx) {
	      var speed = this.speed;
	      var frames = this.frames;
	      var pos = this.pos;
	      var size = this.size;
	      var once = this.once;
	      var _index = this._index;
	      var dir = this.dir;
	      var url = this.url;
	      var facing = this.facing;
	
	      var frame = void 0;
	
	      if (speed > 0) {
	        var max = this.frames.length;
	        // idx is the ith picture
	        var idx = Math.floor(_index);
	        frame = frames[idx % max];
	
	        if (once && idx >= max) {
	          this.done = true;
	          return;
	        }
	      } else {
	        frame = frames[0];
	      }
	
	      var x = pos[0];
	      var y = pos[1];
	
	      if (dir === 'vertical') {
	        y += frame * size[1];
	      } else {
	        x += frame * size[0];
	      }
	
	      switch (facing) {
	        case 'left':
	          ctx.translate(size[0], 0);
	          ctx.scale(-1, 1);
	          break;
	        case 'leftFlipped':
	          ctx.translate(size[0], size[0]);
	          ctx.scale(-1, -1);
	          break;
	        case 'rightFlipped':
	          ctx.translate(0, size[0]);
	          ctx.scale(1, -1);
	          break;
	      }
	
	      ctx.drawImage(_Resources2.default.get(url), x, y, size[0], size[1], 0, 0, size[0], size[1]);
	    }
	  }]);
	
	  return Sprite;
	}();
	
	exports.default = Sprite;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HAMMER = exports.PLAYER = exports.NUKE_PICKUP = exports.ELECTRIC_SHIELD_PICKUP = exports.SHIELD_PICKUP = exports.SHIELD = exports.ELECTRIC_SHIELD = exports.CRATE = undefined;
	
	var _SPRITES = __webpack_require__(5);
	
	var SPRITES = _interopRequireWildcard(_SPRITES);
	
	var _STAGES = __webpack_require__(8);
	
	var STAGES = _interopRequireWildcard(_STAGES);
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	var _WallSprite = __webpack_require__(10);
	
	var _WallSprite2 = _interopRequireDefault(_WallSprite);
	
	var _Powerup = __webpack_require__(11);
	
	var _Powerup2 = _interopRequireDefault(_Powerup);
	
	var _Crate = __webpack_require__(12);
	
	var _Crate2 = _interopRequireDefault(_Crate);
	
	var _Player = __webpack_require__(2);
	
	var _Player2 = _interopRequireDefault(_Player);
	
	var _Enemy = __webpack_require__(13);
	
	var _Enemy2 = _interopRequireDefault(_Enemy);
	
	var _Shield = __webpack_require__(14);
	
	var _Shield2 = _interopRequireDefault(_Shield);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var CRATE = exports.CRATE = function CRATE() {
	  return new _Crate2.default({
	    pos: STAGES.CRATE_SPAWN(),
	    vel: [0, 10],
	    sprite: SPRITES.CRATE()
	  });
	};
	
	var ELECTRIC_SHIELD = exports.ELECTRIC_SHIELD = function ELECTRIC_SHIELD(id, player) {
	  return new _Shield2.default({
	    id: id,
	    pos: player.pos,
	    type: 'electricShield',
	    sprite: SPRITES.ELECTRIC_SHIELD()
	  });
	};
	
	var SHIELD = exports.SHIELD = function SHIELD(id, player) {
	  return new _Shield2.default({
	    id: id,
	    pos: player.pos,
	    type: 'shield',
	    sprite: SPRITES.SHIELD()
	  });
	};
	
	var SHIELD_PICKUP = exports.SHIELD_PICKUP = function SHIELD_PICKUP(id) {
	  return new _Powerup2.default({
	    id: id,
	    pos: STAGES.POWERUP_SPAWN(),
	    vel: [0, 0],
	    type: 'shield',
	    sprite: SPRITES.SHIELD_PICKUP()
	  });
	};
	
	var ELECTRIC_SHIELD_PICKUP = exports.ELECTRIC_SHIELD_PICKUP = function ELECTRIC_SHIELD_PICKUP(id) {
	  return new _Powerup2.default({
	    id: id,
	    pos: STAGES.POWERUP_SPAWN(),
	    vel: [0, 0],
	    type: 'electricShield',
	    sprite: SPRITES.ELECTRIC_SHIELD_PICKUP()
	  });
	};
	
	var NUKE_PICKUP = exports.NUKE_PICKUP = function NUKE_PICKUP(id) {
	  return new _Powerup2.default({
	    id: id,
	    pos: STAGES.POWERUP_SPAWN(),
	    vel: [0, 0],
	    type: 'nuke',
	    sprite: SPRITES.NUKE_PICKUP()
	  });
	};
	
	var PLAYER = exports.PLAYER = function PLAYER() {
	  return new _Player2.default({
	    type: 'player',
	    pos: [450, 250],
	    vel: [0, 0],
	    sprites: {
	      idleRight: SPRITES.PLAYER_IDLE_RIGHT(),
	      idleLeft: SPRITES.PLAYER_IDLE_LEFT(),
	      runRight: SPRITES.PLAYER_RUN_RIGHT(),
	      runLeft: SPRITES.PLAYER_RUN_LEFT()
	    },
	    sprite: SPRITES.PLAYER_IDLE_RIGHT()
	  });
	};
	
	var HAMMER = exports.HAMMER = function HAMMER(id) {
	  return new _Enemy2.default({
	    id: id,
	    pos: [400, 0],
	    vel: [CONSTANTS.ENEMY_ONE_VEL, 0],
	    sprites: {
	      runLeft: SPRITES.HAMMER_RUN_LEFT(),
	      runRight: SPRITES.HAMMER_RUN_RIGHT()
	    },
	    sprite: SPRITES.HAMMER_RUN_LEFT()
	  });
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.POWERUP_SPAWN = exports.CRATE_SPAWN = exports.STAGE_1 = undefined;
	
	var _Wall = __webpack_require__(9);
	
	var _Wall2 = _interopRequireDefault(_Wall);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// WALL_THICKNESS
	var WT = 30;
	
	// constants related to stage 1
	var SLW1 = 170; // SIDE_LEDGE_WIDTH_1
	var MLW1 = 300; // MID_LEDGE_WIDTH_1
	var HO1 = 20; // HEIGHT_OFFSET_1
	var OW1 = 150; // OPENING_WIDTH_1
	
	var STAGE_1 = exports.STAGE_1 = [
	// top walls
	new _Wall2.default({
	  pos: [WT, 0],
	  size: [450 - OW1 / 2 - WT, WT]
	}), new _Wall2.default({
	  pos: [450 + OW1 / 2, 0],
	  size: [450 - OW1 / 2 - WT, WT]
	}),
	
	// bottom walls
	new _Wall2.default({
	  pos: [WT, 600 - WT],
	  size: [450 - OW1 / 2 - WT, WT]
	}), new _Wall2.default({
	  pos: [450 + OW1 / 2, 600 - WT],
	  size: [450 - OW1 / 2 - WT, WT]
	}),
	
	// left wall
	new _Wall2.default({
	  pos: [0, 0],
	  size: [WT, 600]
	}),
	
	// right wall
	new _Wall2.default({
	  pos: [900 - WT, 0],
	  size: [WT, 600]
	}),
	
	// left ledge
	new _Wall2.default({
	  pos: [WT, 300 - HO1],
	  size: [SLW1, WT]
	}),
	
	// right ledge
	new _Wall2.default({
	  pos: [900 - WT - SLW1, 300 - HO1],
	  size: [SLW1, WT]
	}),
	
	// bottom-middle ledge
	new _Wall2.default({
	  pos: [SLW1 + WT + 100, 400 - HO1],
	  size: [MLW1, WT]
	}),
	
	// upper-middle ledge
	new _Wall2.default({
	  pos: [SLW1 + WT + 100, 170 - HO1],
	  size: [MLW1, WT]
	}), new _Wall2.default({
	  pos: [0, -WT - 25],
	  size: [900, WT]
	})];
	
	var sample = function sample(max) {
	  return Math.floor(Math.random() * max);
	};
	
	var CRATE_SPAWN = exports.CRATE_SPAWN = function CRATE_SPAWN() {
	  var seeds = [[110, 230], [120, 230], [100, 230], [90, 230], [440, 330], [450, 330], [430, 330], [420, 330], [180, 520], [190, 520], [170, 520], [160, 520], [690, 520], [780, 230], [790, 230], [770, 230], [760, 230]];
	
	  var seed = seeds[sample(seeds.length)];
	  var multiplier = 1;
	  if (Math.random() > 0.5) {
	    multiplier = -1;
	  }
	  return [seed[0] + multiplier * sample(20), seed[1]];
	};
	
	var POWERUP_SPAWN = exports.POWERUP_SPAWN = function POWERUP_SPAWN() {
	  var seeds = [[420, 250], [70, 150], [750, 150], [420, 500], [420, 500], [420, 500], [420, 500], [420, 500], [420, 500], [420, 500], [420, 500], [420, 500], [420, 500], [420, 90], [420, 90], [420, 90], [420, 90], [420, 90], [420, 90], [420, 90], [420, 90], [420, 90], [420, 90], [420, 90], [420, 90]];
	
	  var seed = seeds[sample(seeds.length)];
	  return [seed[0], seed[1]];
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _WallSprite = __webpack_require__(10);
	
	var _WallSprite2 = _interopRequireDefault(_WallSprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Wall = function Wall(opts) {
	  var _this = this;
	
	  _classCallCheck(this, Wall);
	
	  var pos = opts.pos;
	  var size = opts.size;
	
	  this.type = 'wall';
	  this.size = size;
	  this.pos = pos;
	  this.sprite = new _WallSprite2.default(size);
	
	  this.hitbox = function () {
	    return {
	      x: _this.pos[0],
	      y: _this.pos[1],
	      w: size[0],
	      h: size[1]
	    };
	  };
	};
	
	exports.default = Wall;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Resources = __webpack_require__(1);
	
	var _Resources2 = _interopRequireDefault(_Resources);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var WallSprite = function () {
	  function WallSprite(size) {
	    _classCallCheck(this, WallSprite);
	
	    this.size = size;
	  }
	
	  _createClass(WallSprite, [{
	    key: 'render',
	    value: function render(ctx) {
	      var size = this.size;
	
	      var pattern = ctx.createPattern(_Resources2.default.get('./lib/img/metal.png'), 'repeat');
	      ctx.fillStyle = pattern;
	      // ctx.fillStyle = 'black';
	      ctx.fillRect(0, 0, size[0], size[1]);
	      // ctx.strokeStyle = 'red';
	      // ctx.strokeRect(0, 0, size[0], size[1]);
	    }
	  }]);
	
	  return WallSprite;
	}();
	
	exports.default = WallSprite;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Moveable2 = __webpack_require__(3);
	
	var _Moveable3 = _interopRequireDefault(_Moveable2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Powerup = function (_Moveable) {
	  _inherits(Powerup, _Moveable);
	
	  function Powerup(opts) {
	    _classCallCheck(this, Powerup);
	
	    var _this = _possibleConstructorReturn(this, (Powerup.__proto__ || Object.getPrototypeOf(Powerup)).call(this, opts));
	
	    _this.type = opts.type;
	    _this.id = opts.id;
	
	    _this.hitbox = function () {
	      return {
	        x: _this.pos[0],
	        y: _this.pos[1],
	        w: _this.sprite.size[0],
	        h: _this.sprite.size[1]
	      };
	    };
	    return _this;
	  }
	
	  _createClass(Powerup, [{
	    key: 'update',
	    value: function update(dt) {
	      this.sprite.update(dt);
	    }
	  }]);
	
	  return Powerup;
	}(_Moveable3.default);
	
	exports.default = Powerup;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _CONSTANTS = __webpack_require__(4);
	
	var _Moveable2 = __webpack_require__(3);
	
	var _Moveable3 = _interopRequireDefault(_Moveable2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Crate = function (_Moveable) {
	  _inherits(Crate, _Moveable);
	
	  function Crate(opts) {
	    _classCallCheck(this, Crate);
	
	    var _this = _possibleConstructorReturn(this, (Crate.__proto__ || Object.getPrototypeOf(Crate)).call(this, opts));
	
	    _this.type = 'crate';
	
	    _this.hitbox = function () {
	      return {
	        x: _this.pos[0],
	        y: _this.pos[1],
	        w: _this.sprite.size[0],
	        h: _this.sprite.size[1]
	      };
	    };
	    return _this;
	  }
	
	  return Crate;
	}(_Moveable3.default);
	
	exports.default = Crate;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Moveable2 = __webpack_require__(3);
	
	var _Moveable3 = _interopRequireDefault(_Moveable2);
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	var _SPRITES = __webpack_require__(5);
	
	var SPRITES = _interopRequireWildcard(_SPRITES);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Enemy = function (_Moveable) {
	  _inherits(Enemy, _Moveable);
	
	  function Enemy(opts) {
	    _classCallCheck(this, Enemy);
	
	    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, opts));
	
	    _this.type = 'enemy';
	    _this.speed = _this.randomSpeed();
	    _this.direction = Math.random() > 0.5 ? 'left' : 'right';
	    _this.id = opts.id;
	    _this.isDead = false;
	
	    _this.hitbox = function () {
	      return {
	        x: _this.pos[0] + 20,
	        y: _this.pos[1] + 15,
	        w: 27,
	        h: 49
	      };
	    };
	
	    _this.handleCollision = _this.handleCollision.bind(_this);
	    _this.update = _this.update.bind(_this);
	    _this.kill = _this.kill.bind(_this);
	    return _this;
	  }
	
	  _createClass(Enemy, [{
	    key: 'randomSpeed',
	    value: function randomSpeed() {
	      return CONSTANTS.ENEMY_ONE_VEL * (0.8 + Math.random() * 0.3);
	    }
	  }, {
	    key: 'handleCollision',
	    value: function handleCollision(collisionType) {
	      if (collisionType === 'right') {
	        this.direction = 'left';
	      } else if (collisionType === 'left') {
	        this.direction = 'right';
	      }
	    }
	  }, {
	    key: 'kill',
	    value: function kill() {
	      this.isDead = true;
	      this.vel[1] += -400;
	      this.sprites.runRight.facing = 'rightFlipped';
	      this.sprites.runLeft.facing = 'leftFlipped';
	    }
	  }, {
	    key: 'update',
	    value: function update(dt) {
	      var sprites = this.sprites;
	      var direction = this.direction;
	      var speed = this.speed;
	
	      if (direction === 'left') {
	        this.vel[0] = -speed;
	        this.sprite = sprites.runRight; // facing wrong way in sprite sheet
	      } else if (direction === 'right') {
	        this.vel[0] = speed;
	        this.sprite = sprites.runLeft; // facing wrong way in sprite sheet
	      }
	      if (this.pos[0] > 900 || this.pos[1] > 600) {
	        this.pos[0] = 400;
	        this.pos[1] = 0;
	        this.speed = this.randomSpeed();
	      }
	
	      this.lastPos[0] = this.pos[0];
	      this.lastPos[1] = this.pos[1];
	      this.lastVel[0] = this.vel[0];
	      this.lastVel[1] = this.vel[1];
	
	      this.vel[1] += Math.random() > 0.9998 ? CONSTANTS.ENEMY_ONE_INIT_VEL : 0;
	      this.vel[1] += CONSTANTS.GRAVITY * dt;
	      this.pos[0] += this.vel[0] * dt;
	      this.pos[1] += this.vel[1] * dt;
	      this.sprite.update(dt);
	    }
	  }]);
	
	  return Enemy;
	}(_Moveable3.default);
	
	exports.default = Enemy;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Moveable2 = __webpack_require__(3);
	
	var _Moveable3 = _interopRequireDefault(_Moveable2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Shield = function (_Moveable) {
	  _inherits(Shield, _Moveable);
	
	  function Shield(opts) {
	    _classCallCheck(this, Shield);
	
	    var _this = _possibleConstructorReturn(this, (Shield.__proto__ || Object.getPrototypeOf(Shield)).call(this, opts));
	
	    _this.type = opts.type;
	    return _this;
	  }
	
	  _createClass(Shield, [{
	    key: 'update',
	    value: function update(dt) {
	      this.sprite.update(dt);
	    }
	  }]);
	
	  return Shield;
	}(_Moveable3.default);
	
	exports.default = Shield;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Input = function () {
	  function Input() {
	    _classCallCheck(this, Input);
	
	    this.pressedKeys = {};
	
	    this.setKey = this.setKey.bind(this);
	  }
	
	  _createClass(Input, [{
	    key: 'setup',
	    value: function setup() {
	      var _this = this;
	
	      var setKey = this.setKey;
	
	      document.addEventListener('keydown', function (e) {
	        return setKey(e, true);
	      });
	      document.addEventListener('keyup', function (e) {
	        return setKey(e, false);
	      });
	      // window.addEventListener('blur', () => { this.pressedKeys = {}; });
	      window.input = {
	        isDown: function isDown(key) {
	          return _this.pressedKeys[key.toUpperCase()];
	        }
	      };
	
	      window.addEventListener("keydown", function (e) {
	        // prevent scrolling with arrow keys
	        if ([32, 37, 38, 39, 40, 80].indexOf(e.keyCode) > -1) {
	          e.preventDefault();
	        }
	      }, false);
	    }
	  }, {
	    key: 'setKey',
	    value: function setKey(event, status) {
	      var code = event.keyCode;
	      var key = void 0;
	
	      switch (code) {
	        case 32:
	          key = 'SPACE';
	          break;
	        case 37:
	          key = 'LEFT';
	          break;
	        case 38:
	          key = 'UP';
	          break;
	        case 39:
	          key = 'RIGHT';
	          break;
	        case 40:
	          key = 'DOWN';
	          break;
	        case 82:
	          key = 'R';
	          break;
	        default:
	          key = String.fromCharCode(code);
	      }
	
	      this.pressedKeys[key] = status;
	    }
	  }]);
	
	  return Input;
	}();
	
	exports.default = new Input();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Crate = __webpack_require__(12);
	
	var _Crate2 = _interopRequireDefault(_Crate);
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CollisionManager = function () {
	  function CollisionManager(game) {
	    _classCallCheck(this, CollisionManager);
	
	    this.game = game;
	    this.collisionEl = document.getElementById('collision');
	    this.entityHitWall = this.entityHitWall.bind(this);
	    this.typeOfCollision = this.typeOfCollision.bind(this);
	    this.handleCollisions = this.handleCollisions.bind(this);
	    this.handleEnemyCollisions = this.handleEnemyCollisions.bind(this);
	    this.handleCrateCollisions = this.handleCrateCollisions.bind(this);
	    this.handlePlayerCollisions = this.handlePlayerCollisions.bind(this);
	  }
	
	  _createClass(CollisionManager, [{
	    key: 'handleCollisions',
	    value: function handleCollisions(objects) {
	      var player = objects.player;
	      var enemies = objects.enemies;
	      var crate = objects.crate;
	      var powerups = objects.powerups;
	
	      var walls = objects.stage;
	      var handlePlayerCollisions = this.handlePlayerCollisions;
	      var handleEnemyCollisions = this.handleEnemyCollisions;
	      var handleCrateCollisions = this.handleCrateCollisions;
	
	
	      handlePlayerCollisions(player, [].concat(_toConsumableArray(walls), _toConsumableArray(enemies), [crate], _toConsumableArray(powerups)));
	      handleEnemyCollisions(enemies, walls);
	      handleCrateCollisions(crate, walls);
	    }
	  }, {
	    key: 'handlePlayerCollisions',
	    value: function handlePlayerCollisions(player, otherObjects) {
	      if (player.isDead) {
	        return;
	      }
	      var game = this.game;
	      var typeOfCollision = this.typeOfCollision;
	      var entityHitWall = this.entityHitWall;
	      var isPlayerFloating = this.isPlayerFloating;
	      var playerPickedUpCrate = this.playerPickedUpCrate;
	
	      for (var i = 0; i < otherObjects.length; i++) {
	        var otherObject = otherObjects[i];
	        var collisionType = typeOfCollision(player, otherObject);
	        if (collisionType) {
	          switch (otherObject.type) {
	            case 'wall':
	              player.handleSurfaceCollison(collisionType);
	              entityHitWall(player, collisionType);
	              break;
	            case 'crate':
	              game.score++;
	              game.resetCrate();
	              break;
	            case 'enemy':
	              var enemy = otherObject;
	              if (!enemy.isDead) {
	                player.handleEnemyCollision(enemy, game);
	              }
	              break;
	            case 'shield':
	              var shield = otherObject;
	              player.handlePowerupCollision('shield', game);
	              game.removePowerup(shield.id);
	              break;
	            case 'electricShield':
	              var electricShield = otherObject;
	              player.handlePowerupCollision('electricShield', game);
	              game.removePowerup(electricShield.id);
	              break;
	            case 'nuke':
	              var nuke = otherObject;
	              player.handlePowerupCollision('nuke', game);
	              game.removePowerup(nuke.id);
	              break;
	            default:
	              return;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'handleEnemyCollisions',
	    value: function handleEnemyCollisions(enemies, walls) {
	      var typeOfCollision = this.typeOfCollision;
	      var entityHitWall = this.entityHitWall;
	
	      for (var i = 0; i < enemies.length; i++) {
	        var enemy = enemies[i];
	        if (enemy.isDead) {
	          continue;
	        }
	        for (var j = 0; j < walls.length; j++) {
	          var wall = walls[j];
	          var collisionType = typeOfCollision(enemy, wall);
	          if (collisionType) {
	            enemy.handleCollision(collisionType);
	            entityHitWall(enemy, collisionType);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'handleCrateCollisions',
	    value: function handleCrateCollisions(crate, walls) {
	      var typeOfCollision = this.typeOfCollision;
	      var entityHitWall = this.entityHitWall;
	
	      for (var i = 0; i < walls.length; i++) {
	        var wall = walls[i];
	        var collisionType = typeOfCollision(crate, wall);
	        if (collisionType) {
	          entityHitWall(crate, collisionType);
	        }
	      }
	    }
	  }, {
	    key: 'entityHitWall',
	    value: function entityHitWall(entity, collisionType) {
	      var resetXPos = this.resetXPos;
	      var resetYPos = this.resetYPos;
	      var resetXVel = this.resetXVel;
	      var nullXVel = this.nullXVel;
	      var resetYVel = this.resetYVel;
	      var nullYVel = this.nullYVel;
	
	      if (entity.type === 'player') {
	
	        this.collisionEl.innerHTML = collisionType;
	      }
	      switch (collisionType) {
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
	  }, {
	    key: 'resetXPos',
	    value: function resetXPos(entity) {
	      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      entity.pos[0] = entity.lastPos[0] + offset;
	    }
	  }, {
	    key: 'resetYPos',
	    value: function resetYPos(entity) {
	      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      entity.pos[1] = entity.lastPos[1] + offset;
	    }
	  }, {
	    key: 'resetXVel',
	    value: function resetXVel(entity) {
	      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      entity.vel[0] = entity.lastVel[0] + offset;
	    }
	  }, {
	    key: 'nullXVel',
	    value: function nullXVel(entity) {
	      entity.vel[0] = 0;
	    }
	  }, {
	    key: 'resetYVel',
	    value: function resetYVel(entity) {
	      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      entity.vel[1] = entity.lastVel[1] + offset;
	    }
	  }, {
	    key: 'nullYVel',
	    value: function nullYVel(entity) {
	      entity.vel[1] = 0;
	    }
	  }, {
	    key: 'typeOfCollision',
	    value: function typeOfCollision(obj1, obj2) {
	      var collisionExists = this.collisionExists;
	
	      var rect1 = obj1.hitbox();
	      var rect2 = obj2.hitbox();
	
	      if (collisionExists(rect1, rect2)) {
	        var _collisionRight = this._collisionRight;
	        var _collisionLeft = this._collisionLeft;
	        var _collisionTop = this._collisionTop;
	        var _collisionBottom = this._collisionBottom;
	
	
	        var l = _collisionLeft(rect1, rect2);
	        var r = _collisionRight(rect1, rect2);
	        var t = _collisionTop(rect1, rect2);
	        var b = _collisionBottom(rect1, rect2);
	
	        if (t && b) {
	          return 'top-bottom';
	        } else if (l && t) {
	          return 'left-top';
	        } else if (l && b) {
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
	  }, {
	    key: 'collisionExists',
	    value: function collisionExists(rect1, rect2) {
	      return rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.h + rect1.y > rect2.y;
	    }
	
	    // private
	
	  }, {
	    key: '_collisionRight',
	    value: function _collisionRight(rect1, rect2) {
	      return rect1.x + rect1.w > rect2.x && rect1.x < rect2.x;
	    }
	  }, {
	    key: '_collisionLeft',
	    value: function _collisionLeft(rect1, rect2) {
	      return rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x + rect2.w;
	    }
	  }, {
	    key: '_collisionTop',
	    value: function _collisionTop(rect1, rect2) {
	      return rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y + rect2.h;
	    }
	  }, {
	    key: '_collisionBottom',
	    value: function _collisionBottom(rect1, rect2) {
	      return rect1.y + rect1.h > rect2.y && rect1.y < rect2.y;
	    }
	  }]);
	
	  return CollisionManager;
	}();
	
	exports.default = CollisionManager;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map