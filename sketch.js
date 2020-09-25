var dog ,dogImage, happyDog;
var food, foodStock, foodS;
var database;
var fedTime, lastFed;

function preload(){
  dogImage=loadImage("images/Dog.png");
  happyDog=loadImage("images/happyDog.png");
}

function setup(){
  database = firebase.database();
  createCanvas(900,500);
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  fedTime = database.ref('feedTime');
  fedTime.on('value', function(data)
  {
    lastFed = data.val();
  })

  dog = createSprite(430,430,5,5);
  dog.addImage("BUGGY 2.O", dogImage);
  dog.addImage("BUGGY", happyDog);
  dog.scale = 0.2;

  feed = createButton("FEED THE PET");
  feed.position(1000, 200);
  feed.mousePressed(feedDog)

  addFood = createButton("ADD FOOD")
  addFood.position(1150, 200);
  addFood.mousePressed(addFoods)

  food = new Food()
}

function draw(){
  background(0);
food.display()

  
  if(foodS!==undefined){
    fill("blue");
    textSize(15);
    if(lastFed >= 12)
    {
      text("LAST FED : " + lastFed%12 + " PM", 700, 100) 
    }
    else if(lastFed == 0)
    {
      text("LAST FED : 12 AM", 700, 100)
    }
    else
    {
      text("LAST FED : " + lastFed + " AM", 700, 100)
    }
  }
  

  drawSprites();
  
  fill("blue");
  textSize(20)
  text("FOOD LEFT : "+foodS,200,200);
  text("GO FORWARD TO PRESS THE BUTTON AND FEED YOUR PET  ",20,20);

  }


function readStock(data)
{
    foodS = data.val();
    food.foodStock = foodS;
}

function writeStock(x)
{
  database.ref('/').update 
  ({
food:x
  })
}

function feedDog()
{
  dog.addImage(happyDog);
foodS = foodS - 1
  food.updateFoodStock(foodS);
  database.ref('/').update
  ({
    Food:foodS,
    feedTime:hour()
  })
}

function addFoods()
{
  foodS++;
  database.ref('/').update
  ({
    Food:foodS
  })
}