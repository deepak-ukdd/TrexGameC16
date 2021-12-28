var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;


var Ob1 , Ob2 , Ob3, Ob4, Ob5, Ob6

var newImage;
var restart , restartIMG
var gameOver , gameOverIMG

var PLAY = 1 ; 
var END = 0 ;
var gameState = PLAY ;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  Ob1 = loadImage("obstacle1.png")
  Ob2 = loadImage("obstacle2.png")
  Ob3 = loadImage("obstacle3.png")
  Ob4 = loadImage("obstacle4.png")
  Ob5 = loadImage("obstacle5.png")
  Ob6 = loadImage("obstacle6.png")

  restartIMG = loadImage("restart.png")
  gameOverIMG = loadImage("gameOver.png")
 
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;

  restart = createSprite(250,100,10,10);
  restart.scale = 0.5 ; 
  gameOver = createSprite(250,50,10,10);
  
  restart.addImage(restartIMG);
  gameOver.addImage(gameOverIMG);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score = 0;
  
  obstaclesGroup = new Group()
  cloudsGroup = new Group()

}

function draw() {
  background(180);
  
  text ("Score - "+score, 500,50 );
  
  
   if (gameState === PLAY ) 
   {
      gameOver.visible = false;
      restart.visible = false;

    spawnClouds();
    SpawnObstacles();

    ground.velocityX = -4;
    score = Math.round(frameCount/60);
    if(keyDown("space") && trex.y>=100) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if (obstaclesGroup.isTouching(trex))
    {
      gameState = END

    }

   }

   if (gameState === END){
    
    ground.velocityX = 0 ; 
    cloudsGroup.setVelocityXEach(0); 
    obstaclesGroup.setVelocityXEach(0);
  
    gameOver.visible = true;
      restart.visible = true;
     
   }
  
  
  
   trex.collide(invisibleGround);
  
  //spawn the clouds
  
  drawSprites();
}

function SpawnObstacles(){

if (frameCount % 80 === 0 ){

  

  obstacle = createSprite(600, 170 , 10, 10)
  obstacle.velocityX = -3.5 ; 
  var picSwitch = Math.round(random(1,6))
  switch(picSwitch){

 case 1: obstacle.addImage(Ob1)
 break

 case 2: obstacle.addImage(Ob2)
 break

 case 3: obstacle.addImage(Ob3)
 break

 case 4: obstacle.addImage(Ob4)
 break

 case 5: obstacle.addImage(Ob5)
 break

 case 6: obstacle.addImage(Ob6)
 break

  }
  obstacle.lifetime = 200 ;
  obstacle.scale = 0.5 ;
  obstaclesGroup.add(obstacle);
  

  }



}

function spawnClouds() {
  //write code here to spawn the clouds

  if (frameCount % 80 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.lifetime = 180;
    cloudsGroup.add(cloud);


    cloud.depth  = trex.depth;
    trex.depth = trex.depth + 1 ;

    }
    
}

