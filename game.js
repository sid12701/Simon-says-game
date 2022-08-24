var buttoncolours = ["red","blue","green","yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }

});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playsound(userChosenColour);

  animatepress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosencolour = buttoncolours[randomNumber];
  gamepattern.push(randomChosencolour);
  $("#" + randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosencolour);

}


function playsound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatepress(currentcolour){
  $("."+currentcolour).addClass("pressed");
  setTimeout(function(){
    $("."+currentcolour).removeClass("pressed");
  }
  ,100);
}


function checkAnswer(currentlevel){
  if (gamepattern[currentlevel]===userClickedPattern[currentlevel]){
    if (gamepattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
      userClickedPattern=[];
    }
  }
  else{
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    startOver();
  }
}

function startOver(){
  level = 0;
  gamepattern=[];
  started = false;
}
