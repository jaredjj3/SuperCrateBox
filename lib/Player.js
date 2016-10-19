class Player {
  constructor(opts) {
    const { pos, vel, sprite } = opts;
    this.type = 'player';
    this.pos = pos;
    this.vel = vel;
    this.sprite = sprite;
    this.isJumping = false;

    this.hitbox = this.hitbox.bind(this);
  }

  hitbox() {
    const { pos, sprite } = this;
    return [
      pos[0] + 20,
      pos[1] + 15,
      27,
      49
    ];
  }
}

export default Player;
