// Returns all nodes in the order in which they were visited and
// Returns pointers to their previous node allowing us to compute the shortest path
//Breath-first Search is unweighted and guarantees the shortest path
export function bfs(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  const unvisitedNodes = [];
  const visitedNodesInOrder = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    const closestNode = unvisitedNodes.shift();
    
    if (closestNode.isWall) {
      continue;
    }
    else if (closestNode === finishNode){
       return visitedNodesInOrder;
    }
    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;
    const unvisitedNeighbourNodes = getUnvisitedNeighbourNodes(closestNode, grid);
    for (let unvisitedNeighbourNode of unvisitedNeighbourNodes) {
      unvisitedNeighbourNode.previousNode = closestNode;
      if (neighbourNotInUnvisitedNodes(unvisitedNeighbourNode, unvisitedNodes)) {
        unvisitedNodes.push(unvisitedNeighbourNode);
      }
    }
  }
  return visitedNodesInOrder;
}

function getUnvisitedNeighbourNodes(node, grid) {
  const neighbournodes = [];
  let { row, col } = node;
  if (row !== grid.length - 1) neighbournodes.push(grid[row + 1][col]);
  if (col !== grid[0].length - 1) neighbournodes.push(grid[row][col + 1]);
  if (row !== 0) neighbournodes.push(grid[row - 1][col]);
  if (col !== 0) neighbournodes.push(grid[row][col - 1]);
  
 
  return neighbournodes.filter((neighbournode) => !neighbournode.isVisited);
}
   

function neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (node.row === neighbour.row && node.col === neighbour.col) {
      return false;
    }
  }
  return true;
}