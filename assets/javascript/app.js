// JavaScript  document
// Document Ready
$(document).ready(function (){
    var second = 1000;
    var quizPage;
    var showQuestion;
    let timer;
    let correct;
    let wrong;
    let unanswered;
    var countDown;
    let pageOne;
    let pageTwo;

    function displayQuestion() {
        var timer = 5;
        console.log("Question is executed " + count); 
        // debugger;
        $("#quiz-header").html("Time Remaining: " + timer + " seconds.");
        $("#quiz-question").html("Who am I?");
        $("#quiz-option").html("Powerful Person");
        countDown = setInterval(function() { 
            if (timer > 1) {
                $("#quiz-header").html("Time Remaining: " + timer + " seconds."); 
            }
            else {
                $("#quiz-header").html("Time Remaining: " + timer + " second."); 
            }
        timer--;
        if (timer < 0) {
            clearInterval(countDown);
            timer = 5;
            setTimeout(displayAnswer, 1000);
        }
        }, 1000);
              
        // pageTwo = setTimeout(answerPage, 5000);
        
    }

    function displayAnswer() {
        console.log("answer is executed " + count);
        let verdict = $("<p>").text();
        $("#quiz-header").html(verdict);
        // let question = $("<p>").text(questions);
        // let option = $("<p>").text(answers);
        $("#quiz-question").html("this will be an image");
        $("#quiz-option").html("The Image or some text");
        if (count > 1){
            setTimeout(displayQuestion, 5000);
        } 
        else {
            setTimeout(displayResult, 5000);
         }
         count--; 
    }

    function displayResult() {
        $("#quiz-header").html("Game Over!!!");
        $("#quiz-question").html("This is how you did");
        $("#quiz-option").html("correct answer, wrong answer, unanswer");
        // debugger;
    }
    
    $(".game-container").on("click", "#new-game", function() { // Start new game.
        let c = 5;
        count = 2;
        console.log("click is executed");
        displayQuestion();
    });
})


    // let questions = {
    //     1: "What is capital of Argentina?",
    //     2: "Who is the prime minister of the United Kingdom?",
    //     3: "Where is Eritrea located?",
    //     4: "Where is Baharain located?",
    // };
    // let answer = {
    //     1: "buenos aires",
    //     2: "theresa may",
    //     3: "east africa",
    //     4: "middle east",
    // }


       // }
        // let question = $("<p>").text(questions);
        // let option = $("<p>").text(answers);
                // let timeRemaining = $("<p>").text();
        // function countdown(){
        // let question = $("<p>").text(questions);
        // let option = $("<p>").text(answers);