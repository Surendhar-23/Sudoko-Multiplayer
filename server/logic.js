function generateSudoku() {
  const size = 9;
  const board = Array.from({ length: size }, () => Array(size).fill(0));

  function isSafe(row, col, num) {
    for (let x = 0; x < size; x++) {
      if (board[row][x] === num || board[x][col] === num) {
        return false;
      }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  }

  function solveSudoku() {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          const nums = Array.from({ length: size }, (_, i) => i + 1).sort(
            () => Math.random() - 0.5
          );
          for (const num of nums) {
            if (isSafe(row, col, num)) {
              board[row][col] = num;
              if (solveSudoku()) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solveSudoku();
  return board;
}

// generate puzzle board
const generatePuzzbleBoard = (board, difficultyValue) => {
  const numberOfCellsToRemove = difficultyValue;
  let removedBoard = [...board];

  for (let i = 0; i < numberOfCellsToRemove; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    removedBoard[row][col] = null; // Remove a number by setting it to null
  }
  return removedBoard;
};

module.exports = { generateSudoku, generatePuzzbleBoard };
