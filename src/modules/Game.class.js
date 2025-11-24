'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    // eslint-disable-next-line no-console
    // console.log(initialState);

    this.matrix = initialState;

    // console.log(this.matrix);
  }

  score = 0;

  // static STATUS = 'E';

  moveLeft() {}
  moveRight() {}
  moveUp() {}
  moveDown() {}

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.matrix;
  }
  // поточні результати масиву

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {}
  // 'playing' | 'win' | 'lose' | 'not-started'

  /**
   * Starts the game.
   */
  start() {
    const randomNumber1 = Math.random();
    const randomNumber2 = Math.random();

    const result = [2, 2];

    if (randomNumber1 <= 0.1) {
      result[0] = 4;
    }

    if (randomNumber2 <= 0.1) {
      result[1] = 4;
    }

    return result;
  }

  /**
   * Resets the game.
   */
  restart() {
    this.matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.score = 0;

    return this;
  }

  getRandomCoords() {
    let row = Math.floor(Math.random() * 4);
    let column = Math.floor(Math.random() * 4);

    while (this.matrix[row][column] !== 0) {
      row = Math.floor(Math.random() * 4);
      column = Math.floor(Math.random() * 4);
    }

    return [row, column];
  }
}

module.exports = Game;
