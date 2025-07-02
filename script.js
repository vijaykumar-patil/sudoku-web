const board = document.getElementById('sudoku-board');
const numberPad = document.getElementById('number-pad');
let selectedCell = null;

const puzzles = [
  "530070000600195000098000060800060003400803001700020006060000280000419005000080079",
  "000260701680070090190004500820100040004602900050003028009300074040050036703018000",
  "300200000000107000706030500070009080900020004010800050009040301000702000000008006"
];

const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const index = row * 9 + col;
    const value = puzzle[index];
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // Bold block styles
    if (row % 3 === 0) cell.dataset.block = 'bold-top';
    if (col % 3 === 0) cell.dataset.block = 'bold-left';
    if (col === 8) cell.dataset.block = 'bold-right';
    if (row === 8) cell.dataset.block = 'bold-bottom';

    if (value !== '0') {
      cell.textContent = value;
      cell.classList.add('fixed');
} else {
  cell.addEventListener('click', () => {
    if (selectedCell) selectedCell.classList.remove('selected');
    selectedCell = cell;
    selectedCell.classList.add('selected');
  });
}


    board.appendChild(cell);
  }
}

// Handle number pad clicks
numberPad.addEventListener('click', (e) => {
  if (!e.target.matches('button')) return;
  const value = e.target.dataset.value;
  if (selectedCell && selectedCell.classList.contains('editable')) {
    selectedCell.textContent = value;
  }
});
.editable {
  cursor: pointer;
}

