export function randomMaze(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return false;
    }
    let maze = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          (row === startNode.row && col === startNode.col) ||
          (row === finishNode.row && col === finishNode.col)
        )
          continue;
        if (Math.random() < 0.25) {
          maze.push([row, col]);
        }
      }
    }
    maze.sort(() => Math.random() - 0.5);
    return maze;
  }