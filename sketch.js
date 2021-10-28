var player,playerImg;
var bg, bgImage;
var coinsGroup, diamondImage;
var diamondScore = 0;
var gameState = "play";
var restartimage,restart;
var spikesImage,stoneImage;

function preload() {
  playerImage = loadImage("images/iron.png")
  
  diamondImage = loadImage("images/diamond.png")

  spikesImage = loadImage("images/spikes.png");
  stoneImage = loadImage("images/stone.png");
  
  restartImage = loadImage("images/restart.png");
  bgImage = loadImage("images/bg.jpg")
}

function setup() {
  createCanvas(1357, 580);

  //create background sprite
  bg = createSprite(580, 300);
  bg.addImage(bgImage);
  bg.scale = 2.5;
  bg.velocityY = 2;

  //create Mario sprite
  player = createSprite(650, 405, 20, 50);
  player.addImage(playerImage)
  player.scale = 0.2;
  // player.debug= true;
  player.setCollider("rectangle",50,-18,344,490)
  //create ground sprite


  restart = createSprite(675,310,50,50)
  restart.addImage(restartImage)
  restart.scale = 0.5
  //create groups
  obstaclesGroup = new Group();
  diamondGroup = new Group();
}

function draw() {

  

  if (gameState === "play") {
    // play state code starts here
    //scroll background 
    if (bg.y > 580) {
      bg.y = 290;
    }

    
    //jump with space
    if (keyDown("down")) {
      player.velocityY = 5;
    }
    if (keyDown("up")) {
      player.velocityY = -5;
    }
    if (keyDown("right")) {
      player.velocityX = 5;
    }
    if (keyDown("left")) {
      player.velocityX = -5;
    }
      
    player.bounceOff(edges[0]);
    player.bounceOff(edges[1]);
    player.bounceOff(edges[2]);
    player.bounceOff(edges[3]);


    //call the function to generate diamonds
    generatediamonds();

    //Make Mario catch the coin
    for (var i = 0; i < (diamondGroup).length; i++) {
      var temp = (diamondGroup).get(i);

      if (temp.isTouching(player)) {
        //increase score when diamond is caught
        diamondScore++;
        //destroy diamond once it is caught
        temp.destroy();
        temp = null;
      }
    }



    //call the function to generate Obstacles
    generateObstacles();



    restart.visible = false;
    // play state code ends here
  }
   else if (gameState === "end") {
    // end state code starts here
    bg.velocityY = 0;

    player.velocityX = 0;
    player.velocityY = 0;

    obstaclesGroup.setVelocityYEach(0);
    diamondGroup.setVelocityYEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    diamondGroup.setLifetimeEach(-1);

  //  player.destroy()

    restart.visible = true;
    // end state code ends here
  }

  if(mousePressedOver(restart)){
    restartg();
  }

 
  if (obstaclesGroup.isTouching(player)) {
    gameState = "end";
  }







  //draw sprites on screen
  drawSprites();
  textSize(20);
  fill("white");
  //display score
  text("Diamonds Collected: " + diamondScore, 500, 50);

}



function generatediamonds() { 
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200, 0, 40, 10);
    diamond.addImage(diamondImage);
    diamond.x = Math.round(random(80, 1200));
    diamond.scale = 0.5;
    diamond.velocityY = 3;
    diamond.lifetime = 400;
    diamondGroup.add(diamond);
  }
}


function generateObstacles() {
  if (frameCount % 50 === 0) {
    var obstacle = createSprite(1200, 0, 10, 40);
    obstacle.velocityY = 4;
    obstacle.scale = 0.5;
    obstacle.x = Math.round(random(80, 1200));
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        obstacle.addImage(spikesImage);
        break;
      case 2:
        obstacle.addImage(stoneImage);
        break;
      default:
        break;
    }
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function restartg (){
  gameState = "play";
  obstaclesGroup.destroyEach();
  diamondGroup.destroyEach();
  bg.velocityY = 2;
  // mario.y = 505;
  // mario.debug = true;
  
  diamondScore = 0;
}