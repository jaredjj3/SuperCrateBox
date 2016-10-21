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
	
	var _Crate = __webpack_require__(3);
	
	var _Crate2 = _interopRequireDefault(_Crate);
	
	var _Sprite = __webpack_require__(5);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	var _Input = __webpack_require__(6);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _ENEMIES = __webpack_require__(7);
	
	var ENEMIES = _interopRequireWildcard(_ENEMIES);
	
	var _SPRITES = __webpack_require__(9);
	
	var SPRITES = _interopRequireWildcard(_SPRITES);
	
	var _STAGES = __webpack_require__(10);
	
	var STAGES = _interopRequireWildcard(_STAGES);
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	var _CollisionManager = __webpack_require__(13);
	
	var _CollisionManager2 = _interopRequireDefault(_CollisionManager);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SuperCrateBox = function () {
	  function SuperCrateBox() {
	    _classCallCheck(this, SuperCrateBox);
	
	    this.play = this.play.bind(this);
	    this.main = this.main.bind(this);
	    this.update = this.update.bind(this);
	    this.render = this.render.bind(this);
	    this.setup = this.setup.bind(this);
	    this.reset = this.reset.bind(this);
	    this.renderHtml = this.renderHtml.bind(this);
	    this.renderEntity = this.renderEntity.bind(this);
	    this.renderEntities = this.renderEntities.bind(this);
	    this.checkPlayerBounds = this.checkPlayerBounds.bind(this);
	    this.allObjects = this.allObjects.bind(this);
	    this.updateEntities = this.updateEntities.bind(this);
	  }
	
	  _createClass(SuperCrateBox, [{
	    key: 'play',
	    value: function play() {
	      this.lastTime = Date.now();
	      this.setup();
	    }
	  }, {
	    key: 'main',
	    value: function main() {
	      if (this.gameOver) {
	        this.reset();
	        return;
	      }
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
	      var renderEntity = this.renderEntity;
	      var renderEntities = this.renderEntities;
	      var renderHtml = this.renderHtml;
	
	
	      renderHtml();
	      ctx.clearRect(0, 0, 900, 600);
	      renderEntity(player);
	      renderEntities(enemies);
	      renderEntity(crate);
	      renderEntities(stage);
	    }
	
	    // private
	
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.gameOver = false;
	      this.score = 0;
	      this.scoreEl.className = 'single_digits';
	
	      this.player = new _Player2.default({
	        type: 'player',
	        pos: [450, 300],
	        lastPos: [450, 300],
	        vel: [0, 0],
	        sprite: SPRITES.PLAYER_IDLE
	      });
	
	      this.enemies = [];
	      this.crate = new _Crate2.default({
	        pos: STAGES.STAGE_1_CRATE_SPAWN(),
	        vel: [0, 10],
	        sprite: SPRITES.CRATE
	      });
	      this.stage = STAGES.STAGE_1;
	
	      this.main();
	    }
	  }, {
	    key: 'setup',
	    value: function setup() {
	      var _this = this;
	
	      this.gameOver = false;
	
	      // loads resources
	      _Resources2.default.load(['./lib/img/jay.png', './lib/img/crate.png']);
	      var init = function init() {
	        _this.main();
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
	      this.collisionManager = new _CollisionManager2.default();
	
	      this.player = new _Player2.default({
	        pos: [450, 300],
	        vel: [0, 0],
	        sprite: SPRITES.PLAYER_IDLE
	      });
	
	      this.enemies = [];
	
	      this.crate = new _Crate2.default({
	        pos: STAGES.STAGE_1_CRATE_SPAWN(),
	        vel: [0, 10],
	        sprite: SPRITES.CRATE
	      });
	      this.stage = STAGES.STAGE_1;
	    }
	  }, {
	    key: 'updateEntities',
	    value: function updateEntities(dt) {
	      this.player.update(dt);
	      this.crate.update(dt);
	      for (var i = 0; i < this.enemies.length; i++) {
	        this.enemies[i].update(dt);
	      }
	    }
	  }, {
	    key: 'checkPlayerBounds',
	    value: function checkPlayerBounds() {
	      if (this.player.pos[1] > 570) {
	        this.gameOver = true;
	      }
	    }
	  }, {
	    key: 'renderHtml',
	    value: function renderHtml() {
	      this.scoreEl.innerHTML = this.score;
	      var vx = this.player.vel[0].toFixed(0);
	      var vy = this.player.vel[1].toFixed(0);
	      var x = this.player.hitbox().x.toFixed(0);
	      var y = this.player.hitbox().y.toFixed(0);
	      this.velocityEl.innerHTML = 'V: ' + vx + ', ' + vy;
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
	
	      return { player: player, enemies: enemies, crate: crate, stage: stage };
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
	
	var _Moveable2 = __webpack_require__(15);
	
	var _Moveable3 = _interopRequireDefault(_Moveable2);
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	var _SPRITES = __webpack_require__(9);
	
	var SPRITES = _interopRequireWildcard(_SPRITES);
	
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
	
	    _this.hitbox = function () {
	      return {
	        x: _this.pos[0] + 20,
	        y: _this.pos[1] + 15,
	        w: 27,
	        h: 49
	      };
	    };
	
	    _this.handleInput = _this.handleInput.bind(_this);
	    return _this;
	  }
	
	  _createClass(Player, [{
	    key: 'handleInput',
	    value: function handleInput(dt) {
	      var input = window.input;
	      var pos = this.pos;
	      var vel = this.vel;
	      var jumpNumber = this.jumpNumber;
	      var PLAYER_VERTICAL_INIT_VEL = CONSTANTS.PLAYER_VERTICAL_INIT_VEL;
	      var PLAYER_HORIZONTAL_VEL = CONSTANTS.PLAYER_HORIZONTAL_VEL;
	      var PLAYER_HORIZONTAL_ACC = CONSTANTS.PLAYER_HORIZONTAL_ACC;
	      var PLAYER_RUN_RIGHT = SPRITES.PLAYER_RUN_RIGHT;
	      var PLAYER_RUN_LEFT = SPRITES.PLAYER_RUN_LEFT;
	      var PLAYER_IDLE = SPRITES.PLAYER_IDLE;
	
	
	      if (input.isDown('UP') || input.isDown('SPACE')) {
	        if (true) {
	          this.jumpNumber++;
	          this.vel[1] = PLAYER_VERTICAL_INIT_VEL;
	        }
	      }
	
	      if (input.isDown('LEFT')) {
	        if (vel[0] > -PLAYER_HORIZONTAL_VEL) {
	          this.vel[0] -= PLAYER_HORIZONTAL_ACC * dt;
	        } else {
	          this.vel[0] = -PLAYER_HORIZONTAL_VEL;
	        }
	      } else if (input.isDown('RIGHT')) {
	        if (this.vel[0] < PLAYER_HORIZONTAL_VEL) {
	          this.vel[0] += PLAYER_HORIZONTAL_ACC * dt;
	        } else {
	          this.vel[0] = PLAYER_HORIZONTAL_VEL;
	        }
	      } else {
	        this.vel[0] = 0;
	      }
	
	      if (vel[0] > 0) {
	        this.sprite = PLAYER_RUN_RIGHT;
	      } else if (vel[0] < 0) {
	        this.sprite = PLAYER_RUN_LEFT;
	      } else {
	        this.sprite = PLAYER_IDLE;
	      }
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
	
	var _CONSTANTS = __webpack_require__(4);
	
	var _Moveable2 = __webpack_require__(15);
	
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
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PLAYER_HORIZONTAL_VEL = exports.PLAYER_HORIZONTAL_VEL = 375; // px/sec
	var PLAYER_HORIZONTAL_ACC = exports.PLAYER_HORIZONTAL_ACC = 6000; // px/sec^2
	var PLAYER_VERTICAL_INIT_VEL = exports.PLAYER_VERTICAL_INIT_VEL = -500;
	var GRAVITY = exports.GRAVITY = 1400; // px/sec^2
	var JUMP_TIME = exports.JUMP_TIME = 0; //millisec
	var ENEMY_ONE_VEL = exports.ENEMY_ONE_VEL = 300;
	var ENEMY_ONE_INIT_VEL = exports.ENEMY_ONE_INIT_VEL = -300;

/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ENEMY_1 = undefined;
	
	var _Enemy = __webpack_require__(8);
	
	var _Enemy2 = _interopRequireDefault(_Enemy);
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
	var _SPRITES = __webpack_require__(9);
	
	var SPRITES = _interopRequireWildcard(_SPRITES);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var multiplier = function multiplier() {
	  if (Math.random() > 0.5) {
	    return -1;
	  }
	  return 1;
	};
	
	var ENEMY_1 = exports.ENEMY_1 = function ENEMY_1() {
	  return new _Enemy2.default({
	    type: 'enemy',
	    pos: [400, 0],
	    lastPos: [450, 0],
	    vel: [CONSTANTS.ENEMY_ONE_VEL, 0],
	    sprite: SPRITES.PLAYER_IDLE
	  });
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Moveable2 = __webpack_require__(15);
	
	var _Moveable3 = _interopRequireDefault(_Moveable2);
	
	var _CONSTANTS = __webpack_require__(4);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
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
	
	    _this.direction = Math.random() > 0.5 ? 'left' : 'right';
	
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
	    return _this;
	  }
	
	  _createClass(Enemy, [{
	    key: 'handleCollision',
	    value: function handleCollision(collisionType) {
	      if (collisionType === 'right') {
	        this.direction = 'left';
	      } else if (collisionType === 'left') {
	        this.direction = 'right';
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update(dt) {
	      if (this.direction === 'left') {
	        this.vel[0] = -CONSTANTS.ENEMY_ONE_VEL;
	      } else if (this.direction === 'right') {
	        this.vel[0] = CONSTANTS.ENEMY_ONE_VEL;
	      }
	      this.lastPos = this.pos;
	      this.lastVel = this.vel;
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CRATE = exports.PLAYER_JUMP_LEFT = exports.PLAYER_JUMP_RIGHT = exports.PLAYER_RUN_LEFT = exports.PLAYER_RUN_RIGHT = exports.PLAYER_IDLE = undefined;
	
	var _Sprite = __webpack_require__(5);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PLAYER_IDLE = exports.PLAYER_IDLE = new _Sprite2.default({
	  url: './lib/img/jay.png',
	  pos: [0, 0],
	  frames: [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	  size: [64, 64],
	  speed: 24,
	  dir: 'horizontal',
	  once: false,
	  facing: 'right'
	});
	
	var PLAYER_RUN_RIGHT = exports.PLAYER_RUN_RIGHT = new _Sprite2.default({
	  url: './lib/img/jay.png',
	  pos: [0, 0],
	  frames: [5, 6, 7, 8, 9, 8, 7, 6],
	  size: [64, 64],
	  speed: 18,
	  dir: 'horizontal',
	  once: false,
	  facing: 'right'
	});
	
	var PLAYER_RUN_LEFT = exports.PLAYER_RUN_LEFT = new _Sprite2.default({
	  url: './lib/img/jay.png',
	  pos: [0, 0],
	  frames: [6, 7, 8, 9, 8, 7, 6, 5],
	  size: [64, 64],
	  speed: 18,
	  dir: 'horizontal',
	  once: false,
	  facing: 'left'
	});
	
	var PLAYER_JUMP_RIGHT = exports.PLAYER_JUMP_RIGHT = new _Sprite2.default({
	  url: './lib/img/jay.png',
	  pos: [0, 0],
	  frames: [10, 11, 11, 12, 12, 12, 12, 12, 12, 12],
	  size: [64, 64],
	  speed: 24,
	  dir: 'horizontal',
	  once: true,
	  facing: 'right'
	});
	
	var PLAYER_JUMP_LEFT = exports.PLAYER_JUMP_LEFT = new _Sprite2.default({
	  url: './lib/img/jay.png',
	  pos: [0, 0],
	  frames: [10, 11, 11, 12, 12, 12, 12, 12, 12, 12],
	  size: [64, 64],
	  speed: 24,
	  dir: 'horizontal',
	  once: true,
	  facing: 'left'
	});
	
	var CRATE = exports.CRATE = new _Sprite2.default({
	  url: './lib/img/crate.png',
	  pos: [0, 0],
	  frames: [0],
	  size: [20, 20],
	  speed: 1,
	  dir: 'horizontal',
	  once: false,
	  facing: 'right'
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.STAGE_1_CRATE_SPAWN = exports.STAGE_1 = undefined;
	
	var _Wall = __webpack_require__(11);
	
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
	
	var STAGE_1_CRATE_SPAWN = exports.STAGE_1_CRATE_SPAWN = function STAGE_1_CRATE_SPAWN() {
	  var sample = function sample(max) {
	    return Math.floor(Math.random() * max);
	  };
	  var seed = [[110, 230], [120, 230], [100, 230], [90, 230], [440, 330], [450, 330], [430, 330], [420, 330], [180, 520], [190, 520], [170, 520], [160, 520], [690, 520], [780, 230], [790, 230], [770, 230], [760, 230], [440, 100], [450, 100], [430, 100], [420, 100]][sample(21)];
	  var multiplier = 1;
	  if (Math.random() > 0.5) {
	    multiplier = -1;
	  }
	  return [seed[0] + multiplier * sample(10), seed[1]];
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _WallSprite = __webpack_require__(12);
	
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
/* 12 */
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
	      // const pattern = ctx.createPattern(
	      //   Resources.get('./lib/img/brick.png'),
	      //   'repeat'
	      // );
	      // ctx.fillStyle = pattern;
	
	      ctx.fillStyle = 'black';
	      ctx.fillRect(0, 0, size[0], size[1]);
	      // ctx.strokeStyle = 'red';
	      // ctx.strokeRect(0, 0, size[0], size[1]);
	    }
	  }]);
	
	  return WallSprite;
	}();
	
	exports.default = WallSprite;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Crate = __webpack_require__(3);
	
	var _Crate2 = _interopRequireDefault(_Crate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CollisionManager = function () {
	  function CollisionManager() {
	    _classCallCheck(this, CollisionManager);
	
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
	
	      var walls = objects.stage;
	      var handlePlayerCollisions = this.handlePlayerCollisions;
	      var handleEnemyCollisions = this.handleEnemyCollisions;
	      var handleCrateCollisions = this.handleCrateCollisions;
	
	
	      handlePlayerCollisions(player, [].concat(_toConsumableArray(walls), _toConsumableArray(enemies), [crate]));
	      handleEnemyCollisions(enemies, walls);
	      handleCrateCollisions(crate, walls);
	    }
	  }, {
	    key: 'handlePlayerCollisions',
	    value: function handlePlayerCollisions(player, otherObjects) {
	      var typeOfCollision = this.typeOfCollision;
	      var entityHitWall = this.entityHitWall;
	
	      for (var i = 0; i < otherObjects.length; i++) {
	        var otherObject = otherObjects[i];
	        var collisionType = typeOfCollision(player, otherObject);
	        if (otherObject.type === 'wall') {
	          entityHitWall(player, collisionType);
	        }
	      }
	    }
	  }, {
	    key: 'handleEnemyCollisions',
	    value: function handleEnemyCollisions(enemies, walls) {}
	  }, {
	    key: 'handleCrateCollisions',
	    value: function handleCrateCollisions(crate, walls) {}
	  }, {
	    key: 'entityHitWall',
	    value: function entityHitWall(entity, collisionType) {
	      var resetXPos = this.resetXPos;
	      var resetYPos = this.resetYPos;
	      var resetXVel = this.resetXVel;
	      var nullXVel = this.nullXVel;
	      var resetYVel = this.resetYVel;
	      var nullYVel = this.nullYVel;
	
	      console.log(collisionType);
	      this.collisionEl.innerHTML = collisionType;
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
	      // const leftSideOf1 = rect1.x;
	      // const rightSideOf1 = rect1.x + rect1.width;
	      // const leftSideOf2 = rect2.x;
	      // const rightSideOf2 = rect2.x + rect2.width;
	      return rect1.x + rect1.w > rect2.x && rect1.x < rect2.x;
	    }
	  }, {
	    key: '_collisionLeft',
	    value: function _collisionLeft(rect1, rect2) {
	      // const leftSideOf1 = rect1.x;
	      // const rightSideOf1 = rect1.x + rect1.width;
	      // const leftSideOf2 = rect2.x;
	      // const rightSideOf2 = rect2.x + rect2.width;
	      return rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x + rect2.w;
	    }
	  }, {
	    key: '_collisionTop',
	    value: function _collisionTop(rect1, rect2) {
	      // const topSideOf1 = rect1.y;
	      // const bottomSideOf1 = rect1.y + rect1.height;
	      // const topSideOf2 = rect2.y;
	      // const bottomSideOf2 = rect2.y + rect2.height;
	      return rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y + rect2.h;
	    }
	  }, {
	    key: '_collisionBottom',
	    value: function _collisionBottom(rect1, rect2) {
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
	
	  }]);
	
	  return CollisionManager;
	}();
	
	exports.default = CollisionManager;

/***/ },
/* 14 */,
/* 15 */
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
	    var sprite = opts.sprite;
	
	    this.pos = pos;
	    this.lastPos = [0, 0];
	    this.vel = vel;
	    this.lastVel = [0, 0];
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

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map