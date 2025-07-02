const board = document.getElementById('sudoku-board');
const numberPad = document.getElementById('number-pad');
let selectedCell = null;

const puzzles = [
    "530070000600195000098000060800060003400803001700020006060000280000419005000080079",
    "000260701680070090190004500820100040004602900050003028009300074040050036703018000",
    "300200000000107000706030500070009080900020004010800050009040301000702000000008006"
];

const initialPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
let currentBoardState = Array(9).fill(0).map(() => Array(9).fill(0)); // To store the board's numbers as a 2D array

// --- Board Initialization ---
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        const index = row * 9 + col;
        const value = initialPuzzle[index];
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row; // Store row and column for easy access
        cell.dataset.col = col;

        // Apply bold block styles based on position
        if (row % 3 === 0) cell.dataset.blockTop = 'true';
        if (col % 3 === 0) cell.dataset.blockLeft = 'true';
        if (col === 8) cell.dataset.blockRight = 'true';
        if (row === 8) cell.dataset.blockBottom = 'true';

        if (value !== '0') {
            cell.textContent = value;
            cell.classList.add('fixed');
            currentBoardState[row][col] = parseInt(value); // Initialize board state
        } else {
            cell.classList.add('editable');
            cell.addEventListener('click', () => {
                if (selectedCell) selectedCell.classList.remove('selected');
                selectedCell = cell;
                selectedCell.classList.add('selected');
            });
            currentBoardState[row][col] = 0; // Initialize empty cells as 0
        }
        board.appendChild(cell);
    }
}

// --- Validation Functions ---

// Get the current state of the board from DOM
function getBoardStateFromDOM() {
    const cells = board.querySelectorAll('.cell');
    let boardArray = Array(9).fill(0).map(() => Array(9).fill(0));
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const value = cell.textContent ? parseInt(cell.textContent) : 0;
        boardArray[row][col] = value;
    });
    return boardArray;
}

// Check if a value is valid at a given row, column
function isValid(boardArray, row, col, val) {
    // Check row
    for (let c = 0; c < 9; c++) {
        if (boardArray[row][c] === val && c !== col) {
            return false;
        }
    }

    // Check column
    for (let r = 0; r < 9; r++) {
        if (boardArray[r][col] === val && r !== row) {
            return false;
        }
    }

    // Check 3x3 block
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (boardArray[startRow + r][startCol + c] === val && (startRow + r !== row || startCol + c !== col)) {
                return false;
            }
        }
    }
    return true;
}

// Function to check all cells and apply/remove 'invalid' class
function updateValidityVisuals() {
    const cells = board.querySelectorAll('.cell');
    const currentBoard = getBoardStateFromDOM();

    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const value = cell.textContent ? parseInt(cell.textContent) : 0;

        cell.classList.remove('invalid'); // Clear existing invalid class

        if (value !== 0) { // Only validate if the cell has a number
            // Temporarily set value to 0 to check if current value is the conflict
            const originalValue = currentBoard[row][col];
            currentBoard[row][col] = 0;

            if (!isValid(currentBoard, row, col, value)) {
                cell.classList.add('invalid');
            }
            currentBoard[row][col] = originalValue; // Restore original value
        }
    });
}

// Highlight conflicts for a specific cell after an update
function highlightConflicts(targetCell) {
    // First, clear all existing invalid highlights
    board.querySelectorAll('.invalid').forEach(cell => cell.classList.remove('invalid'));

    const cells = board.querySelectorAll('.cell');
    const currentBoard = getBoardStateFromDOM(); // Get the updated board state

    // Re-check validity for the entire board, or at least the relevant row/col/block
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const value = cell.textContent ? parseInt(cell.textContent) : 0;

        if (value !== 0) {
            // Temporarily set value to 0 to check if current value is the conflict
            const originalValue = currentBoard[row][col];
            currentBoard[row][col] = 0;

            if (!isValid(currentBoard, row, col, value)) {
                cell.classList.add('invalid');
            }
            currentBoard[row][col] = originalValue; // Restore original value
        }
    });
}


// --- Event Listeners ---

// Handle number pad clicks
numberPad.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;
    const value = e.target.dataset.value; // This gets the number or an empty string for backspace

    if (selectedCell && selectedCell.classList.contains('editable')) {
        const row = parseInt(selectedCell.dataset.row);
        const col = parseInt(selectedCell.dataset.col);

        if (value === '') { // Handle backspace
            selectedCell.textContent = '';
            currentBoardState[row][col] = 0;
        } else {
            selectedCell.textContent = value;
            currentBoardState[row][col] = parseInt(value);
        }
        highlightConflicts(selectedCell); // Check and highlight conflicts after each input
    }
});

// Initial validity check when the page loads (useful if puzzles have pre-existing conflicts for some reason)
document.addEventListener('DOMContentLoaded', updateValidityVisuals);
