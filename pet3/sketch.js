//Create variables here
var dog, happyDog, database, foodS, foodStock, mydog;
var database;
var feed;
var foodObj
var addFood;
var fedTime;
var lastFed;
var cGS;
var kGS;
var ldBed;
var ldGar;
var ldWash;
//watch objs highlites and normal highlites
function preload() {
  mydog = loadImage("Sprites/Dog.png");
  happyDog = loadImage("Sprites/happydog.png");
  bedRM = loadImage("Sprites/Dog.png");
  bedRM = loadImage("Sprites/Dog.png");
}
function setup() {
  createCanvas(500, 500);
  dog = createSprite(250, 250, 40, 40);
  mydog.resize(100, 100);
  happyDog.resize(100, 100);
  dog.addImage(mydog);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodObj = new Food();
  foodStock.on("value", readStock);
  feed = createButton("Feed the Dog")
  feed.position(700, 95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}


function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}
function draw() {
  background(46, 139, 87);
  foodObj.display();
  //add styles here
  fill(0, 102, 153);
  textSize(15);
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });
  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM ", 350, 30);
  }
  else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  }
  else {
    text("Last Feed : " + lastfed + "AM", 350, 30);
  }
  drawSprites();
}
// function to read value in DB;

function readStock(data) {
  foodS = data.val();
}
// function to write value in DB;
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}


