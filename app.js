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
	
	var _Sprite = __webpack_require__(2);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	var _Input = __webpack_require__(3);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _SPRITES = __webpack_require__(7);
	
	var SPRITES = _interopRequireWildcard(_SPRITES);
	
	var _STAGES = __webpack_require__(8);
	
	var STAGES = _interopRequireWildcard(_STAGES);
	
	var _CONSTANTS = __webpack_require__(5);
	
	var CONSTANTS = _interopRequireWildcard(_CONSTANTS);
	
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
	    this.handleInput = this.handleInput.bind(this);
	    this.updateEntities = this.updateEntities.bind(this);
	    this.renderEntities = this.renderEntities.bind(this);
	    this.renderEntity = this.renderEntity.bind(this);
	  }
	
	  _createClass(SuperCrateBox, [{
	    key: 'play',
	    value: function play() {
	      console.log("play");
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
	    }
	  }, {
	    key: 'handleInput',
	    value: function handleInput(dt) {
	      var input = window.input;
	
	      if (input.isDown('UP')) {
	        this.player.vel[1] = -CONSTANTS.PLAYER_HORIZONTAL_VEL;
	      } else if (input.isDown('DOWN')) {
	        this.player.vel[1] = CONSTANTS.PLAYER_HORIZONTAL_VEL;
	      } else {
	        this.player.vel[1] = 0;
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
	
	      this.player.pos[0] += this.player.vel[0];
	      this.player.pos[1] += this.player.vel[1];
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
	
	      ctx.clearRect(0, 0, 900, 600);
	      renderEntity(player);
	      renderEntities(stage);
	    }
	  }, {
	    key: 'renderEntities',
	    value: function renderEntities(list) {
	      for (var i = 0; i < list.length; i++) {
	        this.renderEntity(list[i]);
	      }
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
	      this.player = {
	        pos: [450, 500],
	        vel: [0, 0],
	        sprite: SPRITES.PLAYER_IDLE
	      };
	
	      this.enemies = [];
	      this.crate = {};
	      this.stage = STAGES.STAGE_1;
	
	      this.score = 0;
	      this.scoreEl = document.getElementById('score');
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

	'use strict';
	
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
	    key: 'load',
	    value: function load(arg) {
	      var _load = this._load;
	
	      arg.forEach(function (url) {
	        return _load(url);
	      });
	    }
	  }, {
	    key: 'get',
	    value: function get(url) {
	      return this.resourceCache[url];
	    }
	  }, {
	    key: 'isReady',
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
	    key: 'onReady',
	    value: function onReady(func) {
	      this.readyCallbacks.push(func);
	    }
	
	    // private
	
	  }, {
	    key: '_load',
	    value: function _load(url) {
	      console.log('_load');
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
	        frame = 0;
	      }
	
	      var x = pos[0];
	      var y = pos[1];
	
	      if (dir === 'vertical') {
	        y += frame * size[1];
	      } else {
	        x += frame * size[0];
	      }
	
	      if (facing === 'left') {
	        ctx.scale(-1, 1);
	      }
	
	      ctx.drawImage(_Resources2.default.get(url), x, y, size[0], size[1], 0, 0, size[0], size[1]);
	    }
	  }]);
	
	  return Sprite;
	}();
	
	exports.default = Sprite;

/***/ },
/* 3 */
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
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PLAYER_HORIZONTAL_VEL = exports.PLAYER_HORIZONTAL_VEL = 3; // px/sec

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PLAYER_RUN_LEFT = exports.PLAYER_RUN_RIGHT = exports.PLAYER_IDLE = undefined;
	
	var _Sprite = __webpack_require__(2);
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.STAGE_1 = undefined;
	
	var _Wall = __webpack_require__(9);
	
	var _Wall2 = _interopRequireDefault(_Wall);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// WALL_THICKNESS
	var WT = 30;
	
	// constants related to stage 1
	var SLW1 = 150; // SIDE_LEDGE_WIDTH_1
	var MLW1 = 340; // MID_LEDGE_WIDTH_1
	var HO1 = 20; // HEIGHT_OFFSET_1
	var OW1 = 150; // OPENING_WIDTH_1
	
	var STAGE_1 = exports.STAGE_1 = [
	// top walls
	{
	  pos: [WT, 0],
	  sprite: new _Wall2.default({ width: 450 - OW1 / 2 - WT, height: WT })
	}, {
	  pos: [450 + OW1 / 2, 0],
	  sprite: new _Wall2.default({ width: 450 - OW1 / 2 - WT, height: WT })
	},
	
	// bottom walls
	{
	  pos: [WT, 600 - WT],
	  sprite: new _Wall2.default({ width: 450 - OW1 / 2 - WT, height: WT })
	}, {
	  pos: [450 + OW1 / 2, 600 - WT],
	  sprite: new _Wall2.default({ width: 450 - OW1 / 2 - WT, height: WT })
	},
	
	// left wall
	{
	  pos: [0, 0],
	  sprite: new _Wall2.default({ width: WT, height: 600 })
	},
	
	// right wall
	{
	  pos: [900 - WT, 0],
	  sprite: new _Wall2.default({ width: WT, height: 600 })
	},
	
	// left ledge
	{
	  pos: [WT, 300 - HO1],
	  sprite: new _Wall2.default({ width: SLW1, height: WT })
	},
	
	// right ledge
	{
	  pos: [900 - WT - SLW1, 300 - HO1],
	  sprite: new _Wall2.default({ width: SLW1, height: WT })
	},
	
	// bottom-middle ledge
	{
	  pos: [SLW1 + WT + 100, 400 - HO1],
	  sprite: new _Wall2.default({ width: MLW1, height: WT })
	},
	
	// upper-middle ledge
	{
	  pos: [SLW1 + WT + 100, 200 - HO1],
	  sprite: new _Wall2.default({ width: MLW1, height: WT })
	}];

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Wall = function () {
	  function Wall(opts) {
	    _classCallCheck(this, Wall);
	
	    var width = opts.width;
	    var height = opts.height;
	
	    this.width = width;
	    this.height = height;
	  }
	
	  _createClass(Wall, [{
	    key: "render",
	    value: function render(ctx) {
	      var width = this.width;
	      var height = this.height;
	
	      ctx.fillStyle = "black";
	      ctx.fillRect(0, 0, width, height);
	    }
	  }]);
	
	  return Wall;
	}();
	
	exports.default = Wall;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map