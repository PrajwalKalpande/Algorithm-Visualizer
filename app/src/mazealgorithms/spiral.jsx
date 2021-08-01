
export function Spiral(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let maze=[];
  let coffsetrow= Math.floor(Math.random()*15) - 7;
  let coffsetcol= Math.floor(Math.random()*15) - 7;
  let startRow = Math.floor(grid.length/2) + coffsetrow;
  let startCol = Math.floor(grid[0].length/2)+ coffsetcol;
  let temp;
  let currentRow,currentCol;
  currentCol =startCol;
  currentRow = startRow;
  let i =0;
  while(true){
    //down = 0 right = 1 up = 2 left = 3
    
    if(i%4===0){
      temp = i+1 ;
      
      while(temp>0){
      if((currentRow===startNode.row && currentCol===startNode.col)
      ||(currentRow===finishNode.row && currentCol === finishNode.col))
      {
        currentRow++;
        temp--;
        continue;
      }
      maze.push([currentRow,currentCol]);
     
      if(currentRow===grid.length-1) return maze;
      currentRow++;
      
      temp--;
      }
     
    }
      
  //   }
    else if(i%4===1){
      temp = i+1 ;
     
      while(temp>0){
      if((currentRow===startNode.row && currentCol===startNode.col)
      ||(currentRow===finishNode.row && currentCol === finishNode.col))
      {
        currentCol++;
        temp--;
        continue;
      }       
      if(currentCol===grid[0].length-1)return maze;
     
      maze.push([currentRow,currentCol]);
      currentCol++;
      temp--;
      }
    }
    else if(i%4===2){
      temp = i +1;
     
      while(temp>0){
      if((currentRow===startNode.row && currentCol===startNode.col)
      ||(currentRow===finishNode.row && currentCol === finishNode.col))
      {
      currentRow--;
      temp--;
      continue;
    }
        
      if(currentRow===0)return maze;
      
      maze.push([currentRow,currentCol]);
      currentRow--;
      temp--;
      }
    }
    else{
      temp = i +1;
    
      while(temp>0){
      if((currentRow===startNode.row && currentCol===startNode.col)
      ||(currentRow===finishNode.row && currentCol === finishNode.col))
      {
        currentCol--;
        temp--;
        continue;
      }
      if(currentCol===0)return maze;
     
      
      maze.push([currentRow,currentCol]);
      currentCol--;
      temp--;
      }
    }

  i++;
  
 
  }


}
