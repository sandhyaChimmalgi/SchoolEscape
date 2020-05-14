var firstInstance = 1;

function keyReleased(){
   // playerYPosition = player.y;
    player.velocityY= 0;
    player.velocityX = 0;
    flag = 0;
    player.shapeColor = "grey";
  }
  function keyPressed(){
  
    if(keyCode === LEFT_ARROW){
      flag = 1;
      player.velocityY= 0;
      player.velocityX = -10;
      player.shapeColor = "red";
      
    }
    if(keyCode === RIGHT_ARROW){
      flag = 1;
      player.velocityY= 0;
      player.velocityX = 10;
      player.shapeColor = "red";
      
    }
    if(keyCode === 32 && firstInstance === 1){
      gameState = "play";
    }
  }

  function playerMovement(){
//    if(player.y < playerYPosition - 80){      //Going Up
      if(player.y < height - jumpHeight){      //Going Up
      goingDown = 1;
      goingUp = 0;  
      }  
    //else if(player.y > playerYPosition + 50){ //Going Down
    if(atRest === 1 && goingDown === 1){
      goingUp = 1;
      goingDown = 0;
      atRest = 0;
      player.shapeColor = "green";
     }
      if(goingUp == 1) player.y -= 5;
      if(goingDown == 1 ) player.y += 5;
    }
  
  function spawnPlatform(){
    if(firstInstance){
      var book = createSprite(player.x,height-50,50,10);
      book.addImage(platformImg);
      book.scale = 0.1;
      bookGroup.push(book);
      firstInstance = 0;
    }
    for (var i = 0; i<height/50;i++){
      console.log("I Work "+ y +" Frame Count"+frameCount);
      var x = floor(random(50,width-50));
      y = y - platformSpeed;
      var book = createSprite(x,y,100,10);
      book.addImage("ply",platformImg);
      book.scale = 0.1;
      bookGroup.push(book);
    }
  }
  
  function moveAreana(){
    for(var i = 0;i<bookGroup.length; i++){
      bookGroup[i].y += 5;
      }
  }