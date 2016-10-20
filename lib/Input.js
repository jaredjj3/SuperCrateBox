class Input {
  constructor() {
    this.pressedKeys = {};

    this.setKey = this.setKey.bind(this);
  }

  setup() {
    const { setKey } = this;
    document.addEventListener('keydown', e => setKey(e, true));
    document.addEventListener('keyup', e => setKey(e, false));
    // window.addEventListener('blur', () => { this.pressedKeys = {}; });
    window.input = {
      isDown: key => this.pressedKeys[key.toUpperCase()],
    };

    window.addEventListener("keydown", e => {
    // prevent scrolling with arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

  }

  setKey(event, status) {
    const code = event.keyCode;
    let key;

    switch(code) {
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
}

export default new Input();
