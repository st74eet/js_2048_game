'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]);

const gameHeader = document.querySelector('.game-header');
const controls = gameHeader.querySelector('.controls');
const startButton = controls.querySelector('button.start');
let restartButton;

const tBody = document.querySelector('tbody');
const arrayOfTr = [...tBody.querySelectorAll('tr')];

const messages = document.querySelector('.message-container');
const startMessage = messages.querySelector('.message-start');

startButton.addEventListener('click', () => {
  const values = game.start();

  startMessage.classList.add('hidden');
  startButton.classList.remove('start');
  startButton.classList.add('restart');
  restartButton = controls.querySelector('button.restart');
  restartButton.textContent = 'Restart';

  values.forEach((value) => {
    const [row, column] = game.getRandomCoords();

    const cell = arrayOfTr[row].children[column];

    cell.textContent = value;
    cell.classList.add(`field-cell--${value}`);

    game.matrix[row][column] = value;
  });

  restartButton.addEventListener('click', () => {
    [...game.getState()].forEach((array, index) => {
      array.forEach((number, i) => {
        const cell = arrayOfTr[index].children[i];

        if (number > 0) {
          cell.classList.remove(`field-cell--${number}`);
          cell.textContent = '';
        }
      });
    });

    game.restart();

    startMessage.classList.remove('hidden');
    restartButton.classList.remove('restart');
    restartButton.classList.add('start');
    startButton.textContent = 'Start';
  });
});
