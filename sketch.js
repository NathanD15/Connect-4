var gamemode = -1;
var board = [ [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]];
var row = 6;
var col = 7;
var stack = [5, 5, 5, 5, 5, 5, 5];

var turn = 1;
var horizontal_margin = 55;
var vertical_margin = 50;
var radius = 30;
var winner = 0;
var stanDev;

function setup() {
  while(gamemode != 0 && gamemode != 1&& gamemode != 2){
    gamemode = int(prompt("What Game Mode do you want?\n(0 human, 1 easy computer, 2 medium computer)", 0) );
  }
  
  var sign = random(-1, 1);
    if(sign != 0){
      turn *=sign/abs(sign);
    }
  
  createCanvas(400, 400);
  stanDev = (width -2*horizontal_margin -1*radius)/(col-1);
}

function draw() {
  background(0);
  drawboard(board, width, height, 0, 0);
  stroke(0);

  if(winner != 0 ){
    background(0);
    drawboard(board, 5*width/7, 5*height/7, width/2 - width/5, height/2 - height/7);
    background(0, 100);
    fill(255);
    textSize(73*(width/800)  );
    text( (winner == -1? " Red": "Blue") + " Won", width/2 -7*73*(width/2400), height/2 -73*(height/2400));
    
  }
}

function mousePressed() {
  if(winner == 0){
    var r = int(   (mouseX -1*horizontal_margin -1*radius/2 +1*stanDev/2) /  stanDev);
    
    if(stack[r] >= 0){
      board[stack[r]][r] = turn;
      stack[r]--;
      
      if(gamemode == 0 && winner==0){
        win();
        turn*=-1;
      }else if(gamemode == 1 && winner==0){
        win();
        turn*=-1;
        easy_computer();
      }else if(gamemode == 2 && winner==0){
        win();
        turn*=-1;
        hard_computer();
      }
      
    }
  }else{
    board = [ [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]];
    stack = [5, 5, 5, 5, 5, 5, 5];
    winner = 0;
    
  }
  
} 

function drawboard(b, ww, hh, x, y){
  var w;
  var h;
  for(var i = 0; i < row; i++){
      h = y+ i* (hh-2*vertical_margin-radius)/(row-1) +vertical_margin +radius/2;
    for(var j = 0; j < col; j++){
      w = x+ j* (ww-2*horizontal_margin-radius)/(col-1) +horizontal_margin +radius/2;

      
      
      if(b[i][j] == 1) {
        fill(0, 0, 250);
      } else if(b[i][j] == -1){
        fill(250, 0, 0);
      }else{
        fill(250, 250, 250);
      }
      ellipse (w, h, radius/(width/ww), radius/(height/hh) );
    }
    
  }
}

function win(){
  if(winner == 0)
    winner = turn;
  for(var i = 0; i < row; i++){
    for(var j = 0; j < col; j++){
      if(i-3>=0&& abs(board[i][j] +board[i-1][j] +board[i-2][j] +board[i-3][j]) == 4){
        return true;
      }else if(i+3<row && abs(board[i][j] +board[i+1][j] +board[i+2][j] +board[i+3][j]) == 4){
        return true;
      }else if(j-3>=0 && abs(board[i][j] +board[i][j-1] +board[i][j-2] +board[i][j-3]) == 4){
        return true;
      }else if(j+3<col && abs(board[i][j] +board[i][j+1] +board[i][j+2] +board[i][j+3]) == 4){
        return true;
      }else
        
      if(i-3>=0 && j-3>=0 && abs(board[i][j] +board[i-1][j-1] +board[i-2][j-2] +board[i-3][j-3]) == 4){
        return true;
      }else if(i+3<row && j-3>=0 && abs(board[i][j] +board[i+1][j-1] +board[i+2][j-2] +board[i+3][j-3])==4){
        return true;
      }/*else if(i+3<row && j+3<col && abs(board[i][j] +board[i+1][j+1] +board[i+2][j+2] +board[i+3][j+3])==4){
        return true;
      }else if(i-3>=0 && j+3<col&& abs(board[i][j] +board[i-1][j+1] +board[i-2][j+2] +board[i-3][j+3]) == 4){
        return true;
      }*/
        
    }
  }
  winner = 0;
  return false;
}

function hard_computer(){

  for(var i = 0; i < row; i++){
    for(var j = 0; j < col; j++){
      if(i+3<row && abs(board[i][j] +board[i+1][j] +board[i+2][j]) == 3 &&stack[j] ==i+3){
        board[stack[j]][j] = turn;
        stack[j]--;
        win();
        turn*=-1;
        return;
      }else if(j+3<col && abs(board[i][j] +board[i][j+1] +board[i][j+2]) == 3 &&stack[j+3] ==i){
        board[stack[j+3]][j+3] = turn;
        stack[j]--;
        win();
        turn*=-1;
        return;
      }else if(i+3<row &&j+3<col && abs(board[i][j] +board[i+1][j+1] +board[i+2][j+2])==3 &&stack[j+3] ==i+3){
        board[stack[j+3]][j+3] = turn;
        stack[j+3]--;
        win();
        turn*=-1;
        return;
      }else if(i-3>=0 &&j+3<col&& abs(board[i][j] +board[i-1][j+1] +board[i-2][j+2]) == 3 &&stack[j+3] ==i-3){
        board[stack[j+3]][j+3] = turn;
        stack[j+3]--;
        win();
        turn*=-1;
        return;
      }
        
    }
  }
  print("easy");
  easy_computer();
}

function easy_computer(){
  let r = round(random(0, 5) );
  
  
  while(true){
    
    if(stack[r] > 0 && board[stack[r]][r] == 0){
      board[stack[r]][r] = turn;
      stack[r]--;
      win();
      turn*=-1;
      return;
    }else{
      r = round( random(0, 5) );
    }
     
  }
  
}
  