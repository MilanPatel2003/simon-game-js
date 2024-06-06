var buttonColors = ["red", "blue", "green", "yellow"];
var colorPattern = [];
var userPattern = [];


var level = 0;
var started = false;

$(document).on("keydown", function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  pressAnimation(userChosenColor);
  checkAns(userPattern.length - 1);
});

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  colorPattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function checkAns(currentLevel) {
  if (userPattern[currentLevel] === colorPattern[currentLevel]) {
    console.log("succes");
    if (userPattern.length === colorPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("fail");
    var makeSound = new Audio("sounds/wrong.mp3");
    makeSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startovr();
  }
}

function playSound(name) {
  var makeSound = new Audio("sounds/" + name + ".mp3");
  makeSound.play();
}

function pressAnimation(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startovr() {
  level = 0;
  colorPattern = [];
  started = false;
}
