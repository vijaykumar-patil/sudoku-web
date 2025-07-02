const board = document.getElementById('sudoku-board');

for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('contenteditable', 'true');

    // Bold 3x3 block borders
    if (row % 3 === 0) cell.dataset.block = 'bold-top';
    if (col % 3 === 0) cell.dataset.block = 'bold-left';
    if (col === 8) cell.dataset.block = 'bold-right';
    if (row === 8) cell.dataset.block = 'bold-bottom';

    board.appendChild(cell);
  }
}
