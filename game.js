var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//Comienza la secuencia del juego, el boton elegido tiene un flash, se guarda en la array
//y se llama la funcion para el sonido de ese boton
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//el boton que se clickea se guarda en el array correspondiente
//y se llama la funcion del sonido de ese boton
//se llama la funcion para que haga el flash
$(".btn").click(function(){

  var userChosenColor = this.getAttribute("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  var indexOfClick = userClickedPattern.indexOf(userClickedPattern[userClickedPattern.length - 1]);

  checkAnswers(indexOfClick);

});

//coge el color elegido y hace su sonido
function playSound(name){

  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();

}


// coge el color clickeado, le añade una clase, y 0.1seg despues, la quita = flash
function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $(".btn").removeClass("pressed");
  }, 100);

}

//variable con toggle true - false
//si se pulsa UNA letra, la variable se pone true, y llama a la funcion nextSequence()
//el resto de botones que se pulse, no deben de hacer nada

$(document).keydown(function(){

if (!started) {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});


//hay que averiguar de todos los clicks (userClickedPattern), el ultimo index y pasarlo a la funcion checkAnswers
//Problema: Conseguimos el index del ultimo boton pulsado, pero solo la primera vez que se pulsa dicho boton,
//puesto que ya ha sido pulsado antes, devuelve el primer index. Tendria que dar el ultimo index de ese boton (?)

function checkAnswers(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }
  }

  else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key To Restart");
    startOver();

  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
