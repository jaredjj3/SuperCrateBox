# SuperCrateBox
## MVP
SuperCrateBox will have a moveable character that can jump, enemy characters that will trigger a game-over event on collision, crates that will add to the score on collision, and a "fire pit" that will remove enemy characters from the game as well as trigger a game over if the main character falls in.

## Technologies, libraries, and APIs
SuperCrateBox will use an HTML canvas element to render the content. It will mainly use vanilla JS for the game's logic. A library called Matter.js will handle movement 2d physics. A pathfinding algorithm will be needed for the floating enemies, as they will need to go into the fire pit to be 'eliminated'.

## Implementation Timeline

### Phase 1
Establish the stage design and ensure that the character can move throughout the screen. Collision detection must be valid for all walls. Trigger a game over event if the character falls into the fire pit.

### Phase 2
Implement a crate spawning system. Crates will be randomly scattered - one at a time - throughout the map. Ensure that the crates always spawn on top of the floor - not in midair or over the fire pit. The score will increase by one for each crate that is picked up.
Implement the slow and faster walking enemies. Ensure that a game over event is triggered on collision with either enemy. The larger, slower enemies will not jump. However, the smaller, faster enemies will jump randomly.

### Phase 3
Implement the floating enemy. Ensure that this enemy will always float down and find its way to the fire pit. Ensure that a game over event is triggered on collision.
