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
	
	var _Sprite = __webpack_require__(3);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	var _Input = __webpack_require__(4);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _SPRITES = __webpack_require__(5);
	
	var SPRITES = _interopRequireWildcard(_SPRITES);
	
	var _STAGES = __webpack_require__(6);
	
	var STAGES = _interopRequireWildcard(_STAGES);
	
	var _CONSTANTS = __webpack_require__(9);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SuperCrateBox = function () {
	  function SuperCrateBox() {
	    _classCallCheck(this, SuperCrateBox);
	
	    this.play = this.play.bind(this);
	    this.main = this.main.bind(this);
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
	  }
	
	  _createClass(SuperCrateBox, [{
	    key: 'play',
	    value: function play() {
	      this.lastTime = Date.now();
	      this._setup();
	    }
	  }, {
	    key: 'main',
	    value: function main() {
	      var update = this.update;
	      var render = this.render;
	
	      var now = Date.now();
	      var dt = (now - this.lastTime) / 1000.0;
	
	      update(dt);
	      render();
	
	      this.lastTime = now;
	      requestAnimationFrame(this.main);
	    }
	  }, {
	    key: 'update',
	    value: function update(dt) {
	      this.handleInput(dt);
	      this.updateEntities(dt);
	      this.checkCollisions([this.player], dt);
	    }
	  }, {
	    key: 'handleInput',
	    value: function handleInput(dt) {
	      var input = window.input;
	
	      if (input.isDown('UP') || input.isDown('SPACE')) {
	        if (this._isReadyToJump()) {
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
	
	      var vel = this.player.vel;
	
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
	  }, {
	    key: 'checkCollision',
	    value: function checkCollision(entity, dt) {
	      var walls = this.stage;
	      var enemies = this.enemies;
	
	      var collisionMap = [].concat(_toConsumableArray(walls), _toConsumableArray(enemies));
	
	      var rect1 = this._getRect(entity);
	      for (var i = 0; i < collisionMap.length; i++) {
	        var otherEntity = collisionMap[i];
	        var rect2 = this._getRect(otherEntity);
	
	        var collisionType = this._collisionDetected(rect1, rect2);
	        if (collisionType) {
	          if (entity.type === 'player' && otherEntity.type === 'wall') {
	            this._playerHitWall(collisionType, dt);
	          }
	        }
	      }
	      return null;
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions(list, dt) {
	      for (var i = 0; i < list.length; i++) {
	        this.checkCollision(list[i], dt);
	      }
	    }
	  }, {
	    key: 'updateEntities',
	    value: function updateEntities(dt) {
	      this.player.sprite.update(dt);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var renderEntity = this.renderEntity;
	      var renderEntities = this.renderEntities;
	      var player = this.player;
	      var stage = this.stage;
	      var ctx = this.ctx;
	
	      this.velocityEl.innerHTML = this.player.vel[0] + ', ' + this.player.vel[1];
	      ctx.clearRect(0, 0, 900, 600);
	      ctx.strokeStyle = 'red';
	      ctx.strokeRect(this.player.pos[0] + 20, this.player.pos[1] + 15, 27, 49);
	      renderEntity(player);
	      renderEntities(stage);
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
	
	    // private
	
	  }, {
	    key: '_setup',
	    value: function _setup() {
	      var _this = this;
	
	      // makes reference to canvas
	      var canvas = document.getElementById('canvas');
	      this.ctx = canvas.getContext('2d');
	
	      // loads resources
	      _Resources2.default.load(['./lib/img/jay_idle.png', './lib/img/jay_running.png']);
	      var init = function init() {
	        _this.main();
	      };
	      _Resources2.default.onReady(init);
	
	      // Sets event listeners
	      _Input2.default.setup();
	
	      // sets game state
	      this.player = new _Player2.default({
	        type: 'player',
	        pos: [450, 300],
	        lastPos: [450, 300],
	        vel: [0, 0],
	        sprite: SPRITES.PLAYER_IDLE
	      });
	
	      this.enemies = [];
	      this.crate = {};
	      this.stage = STAGES.STAGE_1;
	
	      this.score = 0;
	      this.scoreEl = document.getElementById('score');
	      this.velocityEl = document.getElementById('velocity');
	      this.collisionEl = document.getElementById('collision');
	    }
	  }, {
	    key: '_getRect',
	    value: function _getRect(entity) {
	      var hitbox = entity.hitbox(this.ctx);
	
	      return {
	        x: hitbox[0], y: hitbox[1], width: hitbox[2], height: hitbox[3]
	      };
	    }
	  }, {
	    key: '_isReadyToJump',
	    value: function _isReadyToJump() {
	      var jumpTiming = Date.now() - this.player.lastJumpTime;
	      return jumpTiming >= CONSTANTS.JUMP_TIME;
	    }
	  }, {
	    key: '_collisionDetected',
	    value: function _collisionDetected(rect1, rect2) {
	      var _collisionRight = this._collisionRight;
	      var _collisionLeft = this._collisionLeft;
	      var _collisionTop = this._collisionTop;
	      var _collisionBottom = this._collisionBottom;
	
	
	      if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) {
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
	        }
	      }
	    }
	  }, {
	    key: '_collisionRight',
	    value: function _collisionRight(rect1, rect2) {
	      var leftSideOf1 = rect1.x;
	      var rightSideOf1 = rect1.x + rect1.width;
	      var leftSideOf2 = rect2.x;
	      var rightSideOf2 = rect2.x + rect2.width;
	      return rightSideOf1 > leftSideOf2 && leftSideOf1 < leftSideOf2;
	    }
	  }, {
	    key: '_collisionLeft',
	    value: function _collisionLeft(rect1, rect2) {
	      var leftSideOf1 = rect1.x;
	      var rightSideOf1 = rect1.x + rect1.width;
	      var leftSideOf2 = rect2.x;
	      var rightSideOf2 = rect2.x + rect2.width;
	      return leftSideOf1 < rightSideOf2 && rightSideOf1 > rightSideOf2;
	    }
	  }, {
	    key: '_collisionTop',
	    value: function _collisionTop(rect1, rect2) {
	      var topSideOf1 = rect1.y;
	      var bottomSideOf1 = rect1.y + rect1.height;
	      var topSideOf2 = rect2.y;
	      var bottomSideOf2 = rect2.y + rect2.height;
	      return topSideOf1 < bottomSideOf2 && bottomSideOf1 > bottomSideOf2;
	    }
	  }, {
	    key: '_collisionBottom',
	    value: function _collisionBottom(rect1, rect2) {
	      var topSideOf1 = rect1.y;
	      var bottomSideOf1 = rect1.y + rect1.height;
	      var topSideOf2 = rect2.y;
	      var bottomSideOf2 = rect2.y + rect2.height;
	      return bottomSideOf1 > topSideOf2 && topSideOf1 < topSideOf2;
	    }
	  }, {
	    key: '_playerHitWall',
	    value: function _playerHitWall(collisionType, dt) {
	      this.collisionEl.innerHTML = collisionType;
	      switch (collisionType) {
	        case 'right':
	          this.player.vel[0] = -this.player.vel[0] * 0.25;
	          this.player.pos[0] = this.player.lastPos[0];
	          break;
	        case 'left':
	          this.player.vel[0] = 0;
	          this.player.pos[0] = this.player.lastPos[0];
	          break;
	        case 'top':
	          this.player.vel[1] = -this.player.vel[1] * 0.25;
	          this.player.pos[1] = this.player.lastPos[1];
	          break;
	        case 'bottom':
	          this.player.vel[1] = 0;
	          this.player.pos[1] = this.player.lastPos[1];
	          this.player.jumpNumber = 0;
	          break;
	        case 'right-bottom':
	          if (this.player.vel[0] > 0) {
	            this.player.vel[0] = 0;
	          }
	          if (this.player.pos[0] > this.player.lastPos[0]) {
	            this.player.pos[0] = this.player.lastPos[0];
	          }
	          break;
	        case 'left-bottom':
	          this.player.jumpNumber = 0;
	          if (this.player.vel[0] < 0) {
	            this.player.vel[0] = 0;
	          }
	          if (this.player.pos[0] < this.player.lastPos[0]) {
	            this.player.pos[0] = this.player.lastPos[0];
	          } else {
	            this.player.vel[1] = 0;
	          }
	          break;
	        case 'right-top':
	          if (this.player.vel[0] > 0) {
	            this.player.vel[0] = 0;
	          }
	          if (this.player.pos[0] > this.player.lastPos[0]) {
	            this.player.pos[0] = this.player.lastPos[0];
	          }
	          if (this.player.vel[1] < 0) {
	            this.player.pos[1] = this.player.lastPos[1];
	            this.player.vel[1] = -this.player.vel[1] * 0.25;
	          }
	          break;
	        case 'left-top':
	          if (this.player.vel[0] < 0) {
	            this.player.vel[0] = 0;
	          }
	          if (this.player.pos[0] < this.player.lastPos[0]) {
	            this.player.pos[0] = this.player.lastPos[0];
	          }
	          if (this.player.vel[1] < 0) {
	            this.player.pos[1] = this.player.lastPos[1];
	            this.player.vel[1] = -this.player.vel[1] * 0.25;
	          }
	          break;
	        case 'top-bottom':
	          this.player.pos[0] = this.player.lastPos[0];
	          break;
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = function () {
	  function Player(opts) {
	    _classCallCheck(this, Player);
	
	    var pos = opts.pos;
	    var vel = opts.vel;
	    var sprite = opts.sprite;
	    var lastPos = opts.lastPos;
	
	    this.type = 'player';
	    this.pos = pos;
	    this.lastPos = lastPos;
	    this.vel = vel;
	    this.sprite = sprite;
	    this.isJumping = false;
	    this.jumpNumber = 0;
	    this.lastJumpTime = Date.now();
	
	    this.hitbox = this.hitbox.bind(this);
	  }
	
	  _createClass(Player, [{
	    key: 'hitbox',
	    value: function hitbox() {
	      var pos = this.pos;
	      var sprite = this.sprite;
	
	      return [pos[0] + 20, pos[1] + 15, 27, 49];
	    }
	  }]);
	
	  return Player;
	}();
	
	exports.default = Player;

/***/ },
/* 3 */
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
	
	      if (facing === 'left') {
	        ctx.translate(size[0], 0);
	        ctx.scale(-1, 1);
	      }
	
	      ctx.drawImage(_Resources2.default.get(url), x, y, size[0], size[1], 0, 0, size[0], size[1]);
	    }
	  }]);
	
	  return Sprite;
	}();
	
	exports.default = Sprite;

/***/ },
/* 4 */
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
	      window.addEventListener('blur', function () {
	        _this.pressedKeys = {};
	      });
	      window.input = {
	        isDown: function isDown(key) {
	          return _this.pressedKeys[key.toUpperCase()];
	        }
	
	      };
	
	      window.addEventListener("keydown", function (e) {
	        // prevent scrolling with arrow keys
	        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PLAYER_RUN_LEFT = exports.PLAYER_RUN_RIGHT = exports.PLAYER_IDLE = undefined;
	
	var _Sprite = __webpack_require__(3);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PLAYER_IDLE = exports.PLAYER_IDLE = new _Sprite2.default({
	  url: './lib/img/jay_idle.png',
	  pos: [0, 0],
	  frames: [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	  size: [64, 64],
	  speed: 13,
	  dir: 'horizontal',
	  once: false,
	  facing: 'right'
	});
	
	var PLAYER_RUN_RIGHT = exports.PLAYER_RUN_RIGHT = new _Sprite2.default({
	  url: './lib/img/jay_running.png',
	  pos: [0, 0],
	  frames: [5, 6, 7, 8, 9, 8, 7, 6],
	  size: [64, 64],
	  speed: 13,
	  dir: 'horizontal',
	  once: false,
	  facing: 'right'
	});
	
	var PLAYER_RUN_LEFT = exports.PLAYER_RUN_LEFT = new _Sprite2.default({
	  url: './lib/img/jay_running.png',
	  pos: [0, 0],
	  frames: [6, 7, 8, 9, 8, 7, 6, 5],
	  size: [64, 64],
	  speed: 13,
	  dir: 'horizontal',
	  once: false,
	  facing: 'left'
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.STAGE_1 = undefined;
	
	var _Wall = __webpack_require__(7);
	
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
	})];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _WallSprite = __webpack_require__(8);
	
	var _WallSprite2 = _interopRequireDefault(_WallSprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Wall = function () {
	  function Wall(opts) {
	    _classCallCheck(this, Wall);
	
	    var pos = opts.pos;
	    var size = opts.size;
	
	    this.type = 'wall';
	    this.size = size;
	    this.pos = pos;
	    this.sprite = new _WallSprite2.default(size);
	
	    this.hitbox = this.hitbox.bind(this);
	  }
	
	  _createClass(Wall, [{
	    key: 'hitbox',
	    value: function hitbox() {
	      var pos = this.pos;
	      var size = this.size;
	
	      return [].concat(pos).concat(size);
	    }
	  }]);
	
	  return Wall;
	}();
	
	exports.default = Wall;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	      // ctx.fillStyle = "black";
	      // ctx.fillRect(0, 0, size[0], size[1]);
	
	      ctx.strokeStyle = 'red';
	      ctx.strokeRect(0, 0, size[0], size[1]);
	    }
	  }]);
	
	  return WallSprite;
	}();
	
	exports.default = WallSprite;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PLAYER_HORIZONTAL_VEL = exports.PLAYER_HORIZONTAL_VEL = 300; // px/sec
	var PLAYER_VERTICAL_INIT_VEL = exports.PLAYER_VERTICAL_INIT_VEL = -500;
	var GRAVITY = exports.GRAVITY = 900; // px/sec^2
	var JUMP_TIME = exports.JUMP_TIME = 0; //millisec

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map