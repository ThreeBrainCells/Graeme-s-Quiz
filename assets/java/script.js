var highscore = document.querySelector("#high-score");
var timerEl = document.querySelector(".timer-counter");
var quizQuestion = document.querySelector("#question")
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");
var answerBtn = document.querySelector("#answer")
var startBtn = document.querySelector("#starter");
var rulesCrd = document.querySelector("#rules");
var timerArea = document.querySelector(".timer-area")
var quizArea = document.querySelector(".question-area")
var scoreCard = document.querySelector(".score")
var taunt = document.querySelector(".loser")
var shameStart = document.querySelector("#shameful-restart")

//array containing questions
var quizQuestions = [
  // question 0
  {question: "How do you enclose an array in JavaScript?",
   correctAnswer: "[]", 
   answers:["{}","[]","()", "''"]},
  //  question 1
   {question: "API stands for _________ Programming Interface.",
   correctAnswer: "Application", 
   answers:["Application","Action","Anchor", "Apache"]},
   //question 2
   {question: "Which CSS Selectors have a # in front of their name?",
   correctAnswer: "Id", 
   answers:["Media Query","Pseudoclass","Id", "Class"]},
   //question 3
   {question: "What Javascript function repeats code a certain amount of times?",
   correctAnswer: "For Loop", 
   answers:["moment.js","For Loop","if else", "JSON"]},
  //  question 4
   {question: "Which of these makes a button do something when clicked?",
   correctAnswer: "addEventListener", 
   answers:["getItem","makeClickable","addEventListener", "setInterval"]},
   //question 5
   {question: "What is the proper format for a template literal string?",
   correctAnswer: "`${}`", 
   answers:["`${}`","'()'","'$[]'", "!{}"]},
   //question 6
   {question: "which of these gives the color red?",
   correctAnswer: "#ff0000", 
   answers:["rgb(0, 0, 255)","#ff0000","hsl(147, 50%, 47%)", "#232344"]},
   //question 7
   {question: "If the padding is 25px 50px 75px 100px, which is the biggest?",
   correctAnswer: "left", 
   answers:["left","bottom","top", "right"]},
   //question 8
   {question: "Which of these screen sizes is more likely for a desktop?",
   correctAnswer: "1980px", 
   answers:["600px","800px","1980px", "1000px"]},
   //question 9
   {question: "CSS stands for Cascading _______ sheets",
   correctAnswer: "Style", 
   answers:["SEO","Server","Style", "String"]},
];
var highScores = [];
var timer;
var timerCount=100;
var timeLeft=0;
var QueCount = 0;
var answeredCorrectly = 0;
var quizScore=0;

//triggered when start button is pressed
function startQuiz(){
  //possibly change from 'none' to 'hidden', and possibly change display to visiblity
    rulesCrd.style.display = "none";
    timerArea.style.display = "block";
    quizArea.style.display = "block";
    startBtn.disabled = true;
    startTimer();
    getQuestion();
};
//loads highscores if there are any
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
      else if (timerCount <= 0) {
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  };
//loads question text to quiz buttons depending on QueCount
function getQuestion(){
  if(QueCount>9){
    return
  }  
  var chosenQuestion = quizQuestions[QueCount]
  quizQuestion.textContent=chosenQuestion.question
  answer1.textContent=chosenQuestion.answers[0]
  answer2.textContent=chosenQuestion.answers[1]
  answer3.textContent=chosenQuestion.answers[2]
  answer4.textContent=chosenQuestion.answers[3]
  };

// changes QueCount, and other variables depending on whether or not the answer was correct.
function checkAnswer(event){
if (QueCount>9){
  return
}
 if (event.target.textContent === quizQuestions[QueCount].correctAnswer) {
     answeredCorrectly ++
   console.log(answeredCorrectly)
 }
 else {
     timerCount-=10;
 }
 QueCount ++
 getQuestion()
}

// congratulates the user, prompts them to record their high scores, then resets the quiz.
function winGame(){
  var winner=window.prompt("Congratulations, you finished with" + answeredCorrectly + " answers correct! Please enter your name to record your score!");
  rulesCrd.style.display = "block";
  timerArea.style.display = "none";
  quizArea.style.display = "none";
  startBtn.disabled = false;
  quizScore=timeLeft+answeredCorrectly;
  highScores.push({name: winner, score:quizScore})
  storeScores()
  getScores()
  QueCount = 0;
}

// shows the losing message and plays an annoying jingle, then resets the quiz
function loseGame(){
  rulesCrd.style.display = "block";
  timerArea.style.display = "none";
  quizArea.style.display = "none";
  startBtn.disabled = false;
  taunt.style.display = "block";
  var music = new Audio('./assets/sound/you-are-an-idiot.mp3');
  music.play();
  music.loop=false;
  QueCount=0;
}
//allows loser players to forget the fact they lost
function eraseShame(){
  taunt.style.display="none";
}
// stores scores in local storage.
function storeScores(){
localStorage.setItem("scoreArr", JSON.stringify(highScores))};
// displays high score(s) in webpage(assuming there is any).
function getScores(){
  var recordedScores = JSON.parse(localStorage.getItem('scoreArr'))
if (recordedScores !== null){
  highScores=recordedScores;
  console.log(highScores)
  renderScores()
} 
};
function renderScores(){
  highscore.innerHTML = "";
 
  // Render a new li for each score
  for (var i = 0; i < highScores.length; i++) {
    var scoreiter = highScores[i];
    var li = document.createElement("li");
    // li.textContent = scoreiter.name + ": " + scoreiter.score;
    li.textContent = `${scoreiter.name}: ${scoreiter.score}`;
    li.setAttribute("data-index", i);

    highscore.appendChild(li);
  }
}
init();

startBtn.addEventListener("click", startQuiz);


answerBtn.addEventListener("click", function(event){
  checkAnswer(event);
});

shameStart.addEventListener("click", eraseShame)