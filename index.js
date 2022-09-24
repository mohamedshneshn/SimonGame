var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 1;


//  start game 
$("button").click(function () {
    
    if (!started) {
        $("button").addClass("hidden");
        $("span").removeClass("hidden");
        $("span").text("Wait for the computer");
        $(".btn").removeClass("unclickable");
        nextSequence();
        started = true;
    }
});

// ---------------------------------------------
function nextSequence() {
    userClickedPattern = [];

    setTimeout(function () { 
        $("h1").text("level " + level + " of 20");
        $("span").text("Your turn: " + level + " Tap");
        level++;
    }, 1000);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    for (let i = 0; i < gamePattern.length; i++) {  
        setTimeout(function () {
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
        }, 500 * (i + 1));
    }
              
}

// ------------------------------

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
   
});

// --------------------------------
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        const remaining = gamePattern.length - userClickedPattern.length;
        
        $("span").text( " Tap " + remaining + " more");  
           
        if (gamePattern.length === userClickedPattern.length) {
            $("span").text("Success! Keep going!");
            $("span").addClass("success");
            setTimeout(function () {
                $("span").removeClass("success");
            }, 1000);

            setTimeout(function () {
                nextSequence();
             }, 1000);
        }
    } else {
        playSound("wrong");
        setTimeout(function(){ alert("Oops! Game over, you pressed the wrong tile.");},200);
        startOver();
       

    }
    
}
// ----------------------------------------------------------
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
// ----------------------------------

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// -----------------------------------------------

function startOver() {
    $("h1").text("Simon Game");
    $("button").removeClass("hidden");
    $("span").addClass("hidden");
    $(".btn").addClass("unclickable");
    level = 1;
    started = false;
    gamePattern = [];
}

// -------------------------------------------------