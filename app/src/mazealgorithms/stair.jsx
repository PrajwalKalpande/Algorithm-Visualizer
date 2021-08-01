let start ;
let finish ;
export function stair(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return false;
    }
    start = startNode;
    finish = finishNode;
    
    let maze = [];
    let startWall = getRandomNode(grid);
    while(startWall === startNode || startWall[0] === finishNode){
      startWall = getRandomNode(grid);
    }
    let currentRow, currentCol ;
    currentRow = startWall.row;
    currentCol = 0;
   
    maze.push([currentRow,currentCol]);

  while(currentCol!==grid[0].length-1){
      for(let i =0;i<8;i++){
    if(currentRow>0 && currentCol < grid[0].length-1){
      
      currentRow -- ;
      currentCol++ ;
      
      if(check(currentRow,currentCol))continue;
      else{
        maze.push([currentRow,currentCol]);
      }
      if(currentRow === grid.length-1){
        break;}
          

    }
  }

    for(let i =0;i<8;i++){
    if(currentRow<grid.length-1  && currentCol < grid[0].length-1){
      
      currentRow ++; 
      currentCol ++;
    
      if(check(currentRow,currentCol)){
        continue;
      }
      else{
        maze.push([currentRow,currentCol]);
      }
      
    
    
    }
  }
    for(let i =0;i<8;i++){
    if(currentRow>0  && currentCol < grid[0].length-1){
      
      currentRow --; 
      currentCol ++;
    
      if(check(currentRow,currentCol)){
        continue;
      }
      else{
        maze.push([currentRow,currentCol]);
      }
      if(currentRow === 0){
       
        break;}
    
    
    }
  
  }
  }
return maze;
}


  function check (x,y){
    if((x===start.row && y=== start.col)|| 
    (x=== finish.row && y === finish.col)){
      return true;

    }
    else{
      return false ;
    }

  }





  function getRandomNode(grid) {
    let max_row = grid.length-1;
    let max_col = grid[0].length -1;
    let randomRow =
      Math.floor(Math.random() * (max_row / 2)) +
      Math.floor(Math.random() * (max_row / 2));
    if (randomRow % 2 === 0) {
      if (randomRow === max_row) {
        randomRow -= 1;
      } else {
        randomRow += 1;
      }
    }
    let randomCol =
      Math.floor(Math.random() * (max_col / 2)) +
      Math.floor(Math.random() * (max_col / 2));
    if (randomCol % 2 === 0) {
      if (randomCol === max_col) {
        randomCol -= 1;
      } else {
        randomCol += 1;
      }
    }
    
    
    return grid[randomRow][randomCol];
  }
  