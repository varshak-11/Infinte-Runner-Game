var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("score_0.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("Untitled drawing (1).png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if(gameState === "play"){
    
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(keyDown("left_arrow")){
    ghost.x= ghost.x - 3;
    
  }
  
  if(keyDown("right_arrow")){
    ghost.x= ghost.x + 3;
  }
   
  if(tower.y>600) {
  tower.y=300;
  }
  
 door(); 
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }

  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y >600){
  gameState = "end";
    ghost.destroy();
}
  

    drawSprites();
  }  
    if(gameState === "end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("GAME OVER",230,250);
      
  }
  
}
  
function door() {
  
  if(frameCount%240 === 0){
    var Door = createSprite(200,-50);
    Door.addImage(doorImg);
    Door.velocityY = 1;
    Door.x=Math.round(random(120,400));
    Door.lifetime= 600;
    doorsGroup.add(Door);
    
    var climber= createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY = 1; 
    climber.x = Door.x;
    climber.lifetime= 600;
    climbersGroup.add(climber);
  
   var invisibleBlock = createSprite(200,15,);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1; 
    invisibleBlock.x = Door.x;
    invisibleBlock.lifetime= 600;
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth=Door.depth;
    ghost.depth=ghost.depth + 1;
    
    
  }
   
}
