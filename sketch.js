
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score;
var survivalTime=0;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstalceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 500);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(400,350,700,100);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  
  monkey.setCollider("rectangle",0,0,400, monkey.height);
  monkey.debug = true
  
  bananaGroup = new Group();
  
  score = 0;
}



function draw() {
 
  background(180);
    spawnBananas(); 
   
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
      
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(ground); 
  
  if (ground.x < 0) {
      ground.x = ground.width/2;
    
  } 
  
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score=score+1;
  } 
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500,50)
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime, 100,50);

  
  
  
  drawSprites();
 
  
} 
 
function spawnBananas() {
   if (frameCount % 80 === 0) {
    banana = createSprite(300,400,100,50);
    banana.y = Math.round(random(5, 600));
    banana.addImage("spawning banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(6+3 * score / 100);
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding banana to the group
   bananaGroup.add(banana);
    }
 }