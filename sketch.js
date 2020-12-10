var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
}

function setup() 
{
    createCanvas(400,400);

    monkey = createSprite(50,250,10,10);
    monkey.addAnimation("running",monkey_running);
    monkey.scale = 0.1;

    ground = createSprite(70, 350, 800, 10);
    ground.velocityX = -4;
    ground.x=ground.width/2;

    foodGroup = createGroup();
    obstacleGroup = createGroup();

    score = 0;
}

function draw() 
{
    background("white");

    textSize(20);
    text("Survial Time:" + score, 100, 50);

    monkey.collide(ground);

    //creating infinite scrolling ground
    if (ground.x < 0)
    {
        ground.x = ground.width/2;
    }

    if(gameState === PLAY){
      score = Math.round(frameCount/getFrameRate());

      //jump when the space key is pressed
      if(keyDown("space") && monkey.x < 300)
      {
          monkey.velocityY = -12;
      }    

      if(foodGroup.isTouching(monkey))
      {
          foodGroup.destroyEach();
      }

      //gravity
      monkey.velocityY = monkey.velocityY + 0.8;

      //calling functions
      Banana();
      Obstacles();

      if(obstacleGroup.isTouching(monkey))
      {
          gameState = END;
      }
    }

    if(gameState === END)
    {
        obstacleGroup.destroyEach();
        foodGroup.destroyEach();
        score.visible = false;

        textSize(30);
        text("Game Over", 110, 200);
    }

    drawSprites();
}

//banana function
function Banana() 
  {
    if (frameCount % 80 === 0) 
    {
        banana = createSprite(400,350,40,10);
        banana.addImage(bananaImage);
        banana.y = Math.round(random(120,200));
        banana.scale = 0.1;

        banana.velocityX = -3;
        banana.lifetime = 200;

        foodGroup.add(banana);
    }
}

//obstacles function
function Obstacles() 
{
    if (frameCount % 300 === 0)
    {
        obstacle = createSprite(250,325,10,10);
        obstacle.addImage(obstacleImage);
        obstacle.scale = 0.1;

        obstacle.velocityX = -3;
        obstacle.lifetime = 200;

        obstacleGroup.add(obstacle);
    }
}