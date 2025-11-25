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
    this.matrix = initialState;
  }

  score = 0;
  status = 'idle';

  static isGameActive = false;

  moveLeft() {
    const callback = (number) => number !== 0;

    for (let arrayIndex = 0; arrayIndex < this.matrix.length; arrayIndex++) {
      const array = this.matrix[arrayIndex];

      const additionalArray = array.filter(callback);

      for (let i = 0; i < additionalArray.length; i++) {
        if (additionalArray[i] === additionalArray[i + 1]) {
          const add = additionalArray[i] * 2;

          additionalArray[i] = add;
          additionalArray[i + 1] = 0;

          this.score += add;
        }
      }

      const filteredArray = additionalArray.filter(callback);

      while (filteredArray.length - 1 < array.length - 1) {
        filteredArray.push(0);
      }

      this.matrix[arrayIndex] = filteredArray;
    }

    return this.matrix;
  }

  moveRight() {
    const callback = (number) => number !== 0;

    for (let arrayIndex = 0; arrayIndex < this.matrix.length; arrayIndex++) {
      const array = this.matrix[arrayIndex];

      const additionalArray = array.filter(callback);

      for (let i = 0; i < additionalArray.length; i++) {
        const lastElem = additionalArray.length - i - 1;

        if (additionalArray[lastElem] === additionalArray[lastElem - 1]) {
          const add = additionalArray[lastElem] * 2;

          additionalArray[lastElem] = add;
          additionalArray[lastElem - 1] = 0;

          this.score += add;
        }
      }

      const filteredArray = additionalArray.filter(callback);

      while (filteredArray.length - 1 < array.length - 1) {
        filteredArray.unshift(0);
      }

      this.matrix[arrayIndex] = filteredArray;
    }

    return this.matrix;
  }

  moveUp() {
    const callback = (number) => number !== 0;

    for (let arrayIndex = 0; arrayIndex < this.matrix.length; arrayIndex++) {
      const columnElements = [];

      this.matrix.forEach(
        (array, index) => (columnElements[index] = array[arrayIndex]),
      );

      const filteredElements = columnElements.filter(callback);

      for (let i = 0; i < filteredElements.length; i++) {
        if (filteredElements[i] === filteredElements[i + 1]) {
          const add = filteredElements[i] * 2;

          filteredElements[i] = add;
          filteredElements[i + 1] = 0;

          this.score += add;
        }
      }

      const filteredArray = filteredElements.filter(callback);

      while (filteredArray.length - 1 < this.matrix[arrayIndex].length - 1) {
        filteredArray.push(0);
      }

      for (let index = 0; index < this.matrix.length; index++) {
        this.matrix[index][arrayIndex] = filteredArray[index];
      }
    }
  }

  moveDown() {
    const callback = (number) => number !== 0;

    for (let arrayIndex = 0; arrayIndex < this.matrix.length; arrayIndex++) {
      const columnElements = [];

      this.matrix.forEach(
        (array, index) => (columnElements[index] = array[arrayIndex]),
      );

      const filteredElements = columnElements.filter(callback);

      for (let i = filteredElements.length - 1; i > 0; i--) {
        if (filteredElements[i] === filteredElements[i - 1]) {
          const add = filteredElements[i] * 2;

          filteredElements[i] = add;
          filteredElements[i - 1] = 0;

          this.score += add;
        }
      }

      const filteredArray = filteredElements.filter(callback);

      while (filteredArray.length - 1 < this.matrix[arrayIndex].length - 1) {
        filteredArray.unshift(0);
      }

      for (let index = 0; index < this.matrix.length; index++) {
        this.matrix[index][arrayIndex] = filteredArray[index];
      }
    }
  }

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
  getStatus() {
    return this.status;
  }

  /**
   * Starts the game.
   */
  start() {
    this.status = 'playing';

    return this.addRandomElements();
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
    this.status = 'idle';

    return this;
  }

  getRandomCoords() {
    let row = Math.floor(Math.random() * 4);
    let column = Math.floor(Math.random() * 4);

    while (this.matrix[row][column] !== 0 && this.getStatus() === 'playing') {
      row = Math.floor(Math.random() * 4);
      column = Math.floor(Math.random() * 4);
    }

    return [row, column];
  }

  addRandomElements() {
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
   * See if matrix has empty spots
   */
  isPlaying() {
    const zeros = this.matrix.filter((array) => array.includes(0));
    const win = this.matrix.flat().includes(2048);

    if (!zeros.length) {
      this.status = 'lose';
    }

    if (win) {
      this.status = 'win';
    }

    return this;
  }
}

module.exports = Game;
