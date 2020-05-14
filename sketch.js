var bookGroup =[];
var player;
var goingUp;
var goingDown;
var playerYPosition;
var flag = 0;
var y ;
var gameState = "serve";
var score = 0;
var restart;
var atRest = 0;
var playerImg, bgImg, platformImg;
var platformSpeed;
var jumpHeight;
var gameOverImg;

function preload(){
  playerImg = loadImage("PlayerImg.png");
  bgImg = loadImage("bgImg.png");
  platformImg = loadImage("platform.png");   
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  var canvas =  createCanvas(400,600);
  player = createSprite(width/2,height-100,20,50);
  player.scale = 0.3
  player.addImage("player",playerImg);

  restart = createSprite(width/2,height/2,50,50);
  restart.addImage(gameOverImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  playerYPosition = player.y;

  goingDown = 0;
  goingUp = 1;

  y = height;
 
  platformSpeed = 150;
  jumpHeight = 250;
}

function draw() {
  background(0); 
  if(gameState === "serve" ){
    startGame();
  }
  else if(gameState === "play"){
    playGame();
  }
  else if(gameState === "over"){
    gameOver();
  }
  drawSprites(); 
}

function startGame(){
  textSize(20);
  fill("red");
  text("School Escape",width/2-50,height/2+50);
  image(playerImg,width/2-50,height/2-200);
  textSize(15);
  fill("yellow");
  text("Press Space to Escape !!",width/2-70,height/2+100);
  player.visible = false;
}

function playGame(){
  player.visible = true;
  textSize(20);
  fill("white");
  text("Score : "+score , width - 100,height/2 -250);
  // create plaforms only in the starting of the game
  if(firstInstance){
    spawnPlatform();
  }

  playerMovement();
  // move the areana downwards if the player goes up
  if(player.y<(height - 200)){
    moveAreana();
  }

  // check if the player is touching the platform or not
  for(var i = 0;i<bookGroup.length; i++){
    if(player.isTouching(bookGroup[i]) && atRest === 0){
      playerYPosition = player.y;
      atRest = 1;
      }
  }

  // if the platform goes out of the screen then changing its x and y positions
  for(var i= 0; i<bookGroup.length;i++){
    if(bookGroup[i].y>height){ 
    bookGroup[i].x = floor(random(50,width-50));
    bookGroup[i].y = y - platformSpeed;
    score++;
    }
  } 
 // if the player goes out of the screen from botton then game is over
    if(player.y>height){
      gameState = "over";
  }  
}

function gameOver(){
  
  player.visible = false;
  // destroying all the platforms
  for(var i =0;i<bookGroup.length;i++){
       bookGroup[i].destroy();
  }
  console.log("gameOver");
  
  restart.visible = true;
  textSize(15);
  fill("white");
  text("Your Score is "+score,width/2-70,height-200)
  
  if(mousePressedOver(restart)){
    gameState = "serve";
    restart.visible = false;
    player.visible = true;
    score = 0;
    player.x = width/2;
    player.y = height-100;
    firstInstance = 1;
    y = height;
  }
}