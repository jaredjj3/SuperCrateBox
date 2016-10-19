class Input {
  constructor() {
    this.pressedKeys = {};
  }

  setup() {
    const { setKey } = this;
    document.addEventListener('keydown', e => setKey(e, true));
    document.addEventListener('keyup', e => setKey(e, false));
    window.addEventListener('blur', () => {
      this.pressedKeys = {};
    });
    window.input = {
      isDown: key => this.pressedKeys[key.toUpperCase()]
    };
  }

  setKey(event, status) {
    const { pressedKeys } = this;
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

    pressedKeys[key] = status;
  }
}

export default Input;
