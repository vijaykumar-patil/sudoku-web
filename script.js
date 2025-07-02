const board = document.getElementById('sudoku-board');

// Predefined puzzles (use more if you want)
const puzzles = [
  "530070000600195000098000060800060003400803001700020006060000280000419005000080079",
  "000260701680070090190004500820100040004602900050003028009300074040050036703018000",
  "300200000000107000706030500070009080900020004010800050009040301000702000000008006"
];

// Choose one randomly
const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const index = row * 9 + col;
    const value = puzzle[index];
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // Add 3x3 bold block styling
    if (row % 3 === 0) cell.dataset.block = 'bold-top';
    if (col % 3 === 0) cell.dataset.block = 'bold-left';
    if (col === 8) cell.dataset.block = 'bold-right';
    if (row === 8) cell.dataset.block = 'bold-bottom';

    if (value !== '0') {
      cell.textContent = value;
      cell.classList.add('fixed');
    } else {
      cell.setAttribute('contenteditable', 'true');
    }

    board.appendChild(cell);
  }
}
