var highscore = document.querySelector("#high-score");
var timerEl = document.querySelector(".timer-counter");
var quizQuestion = document.querySelector("#question")
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");
var answerBtn = document.querySelectorAll(".answer")
var startBtn = document.querySelector("#starter");
var rulesCrd = document.querySelector("#rules");
var timerArea = document.querySelector(".timer-area")
var quizArea = document.querySelector(".question-area")
var scoreCard = document.querySelector(".score")

//array containing questions
var quizQuestions = [
  // question 0
  {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
  //  question 1
   {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
   //question 2
   {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
   //question 3
   {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
  //  question 4
   {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
   //question 5
   {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
   //question 6
   {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
   //question 7
   {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
   //question 8
   {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
   //question 9
   {question: "What is this?",
   correctAnswer: "this", 
   answers:["not","notthiseither","noway", "this"]},
];
var highScores = [];
var timer;
var timerCount;
var timeLeft=0;
var QueCount = 0;
var answeredCorrectly = 0;
var quizScore=0;

function startQuiz(){
    rulesCrd.style.display = "none";
    timerArea.style.display = "block";
    quizArea.style.display = "block";
    startBtn.disabled = true;
    startTimer();
    getQuestion();
};

function init(){
getScores();
};
// timer function
function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount >= 0) {
        if (QueCount>9 && timerCount > 0) {
          timeLeft=timerCount
          winGame();
          clearInterval(timer);
        }
      }
      if (timerCount === 0) {
        clearInterval(timer);
        loseGame();
      }
    }, 10000);
  };

function getQuestion(){
  // if(QueCount>9){
  //   winGame()
  // }
  // else{}  
  var chosenQuestion = quizQuestions[QueCount]
  console.log(chosenQuestion.question)
  quizQuestion.textContent=chosenQuestion.question
  answer1.textContent=chosenQuestion.answers[0]
  answer2.textContent=chosenQuestion.answers[1]
  answer3.textContent=chosenQuestion.answers[2]
  answer4.textContent=chosenQuestion.answers[3]
  };


function checkAnswer(){
 console.log("this works");
 if (answerBtn.textContent === quizQuestions[QueCount].correctAnswer) {
   console.log("so does this")
   answeredCorrectly ++
 }
 else {
   console.log("not that");
   timerCount-=10;
 }
 QueCount ++
 getQuestion()
}

// congratulates the user, prompts them to record their high scores, then resets the quiz.
function winGame(){
  var winner=window.prompt("Congratulations, you finished with" + answeredCorrectly + " answers correct! Please enter your name to record your score!");
  quizScore=timeLeft+answeredCorrectly;
  var newscore={winner, quizScore}
  highScores.push(newscore)
}

// shows the losing message and plays an annoying jingle, then resets the quiz
function loseGame(){
  window.alert("Sorry, Time's Up!")
  var music = new Audio('./assets/sound/you-are-an-idiot.mp3');
  music.play();
  music.loop=false;
}
// stores scores in local storage.
function storeScores(){
  localStorage.setItem("scores", JSON.stringify(highScores))
};
// displays high score(s) in webpage.
function getScores(){
 var scoreList = localStorage.getItem("scores")
 highscore.textContent=Math.max(highScores)
};

init();

startBtn.addEventListener("click", startQuiz);



answer1.addEventListener("click", checkAnswer)
answer2.addEventListener("click", checkAnswer)
answer3.addEventListener("click", checkAnswer)
answer4.addEventListener("click", checkAnswer)