// JavaScript  document
// Document Ready
$(document).ready(function (){
    let second = 1000;
    let answer;
    let correct;
    let wrong;
    let unanswered;
    let countDown;
    let questionsArr;
    let questionsCount;
    let questions = {
        "What is capital of Argentina?":"Buenos Aires",
        "Who is the prime minister of the United Kingdom?":"Theresa May",
        // "Where is Bahrain located?":"Middle East",
        // "What is the capital Australia?": "Canberra",
        // "Where is the hottest region in the world?":"Sahara Desert",
        // "Which is the largest(land and water surface) country in the world?":"Russia",
        // "Which is the most populous country in the world?":"China",
        // "Which is the smallest(land and water surface) country in the world?":"Vatican City",
        // "Which of the following is a country?":"Australia",
        // "Where is Eritrea located?": "East Africa",
        // "Which is the longest river on Earth?":"Amazon River",
        // "How many continent are in the world?":"Seven",

    };
    let optionsObj = {
        0:["Sao Paulo","Rosario","Lima","Bogota","Montevideo"],
        1:["Tony Blair", "Justin Trudeau", "David Cameron", "Angela Merkel", "Malcolm Turnbull"],
        2:["South East Asia", "Southern Africa", "South America", "Eastern Asia", "Northern Africa"],
        3:["Sydney", "MelBourne", "Brisbane", "New Zealand", "Albany"],
        4:["Amazon Forest", "Arabian Desert", "Kalahari Desert", "Congo Basin Forest", "Syrian Desert"],
        5:["Canada", "China", "USA", "India", "Brazil"],
        6:["India", "USA", "Nigeria", "Indonesia", "Brazil"],
        7:["Singapore", "Dominica", "Trinidad and Tobago", "Bahrain", "Tuvalu"],
        8:["Africa", "America", "Europe", "Asia", "Wankada"],
        9:["West Africa", "South America", "Middle East", "Pacific Island", "East Asia"],
        10:["Nile River", "Congo River", "Mississippi River", "Yangtze River", "Yellow River"],
        11:["Five", "Nine", "Eight", "Four","Six"],
        // 12:["Tony Blair", "Justin Trudeau", "David Cameron", "Angela Merkel", "Malcolm Turnbull"],
    };

    questionsArr= Object.keys(questions);
    numOfQuestion = questionsArr.length;
    questionsCount = numOfQuestion - 1;
    // Display the page with the question
    function displayQuestion() {
        let timer = 5;
        console.log("Question is executed " + questionsCount);
        
        // debugger;
        $("#quiz-header").html("Time Remaining: " + timer + " seconds.");
        // Displays question using the array object "questionArr"
        $("#quiz-question").html("<h1>" + questionsArr[questionsCount] + "</h1>");

        //argument is an object of arrays, each property name of the object correspond to the 
        // arithmetic position of the question in questions object
        renderButtons(optionsObj[questionsCount]); 
        // Timer for Seconds Remaining 
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
                setTimeout(displayAnswer, 1000);//Wait one second before displaying answer. (allows 0 second to appear)
            }
        }, 1000);           
    }

    function renderButtons(optArr) { //renders the option buttons for the answer
        $("#quiz-option").empty(); 
        // let newArr = ["Sao Paulo","Rosario","Lima","Bogota","Montevideo"];
        
        // Get a random number between 0 and 4 to use for randomly placing the correct option
        let position = Math.floor(Math.random() * 5);

        // for loop to create and fill 5 buttons
        for (let i = 0; i <optArr.length; i++) {
            var btn = $("<button>");
            btn.addClass("options");
            btn.width(250);
            btn.attr("data-name", i);
            // debugger;
            // This condition places a list options while randomly selecting a location for the correct option.
            if (i === position) {
                btn.text(questions[questionsArr[questionsCount]]);
            }
            else{
                btn.text(optArr[i]);
            }
            $("#quiz-option").append("<br>", btn, "<br>");
        }
        let response;
        answer =  false;
        unanswered++; // acknowledge that there is no response yet
        $(".options").on("click", function(event){
            event.preventDefault();
            response = $(this).text();
            unanswered--; //Acknowledge there was a response
            if (response === questions[questionsArr[questionsCount]]) {
                answer = true;
                correct++
            }
            else {
                answer = false;
                wrong++;
            }
        });
    }

    function displayAnswer() {
        console.log("answer is executed " + questionsCount);
        let imgPath = "assets/images/" + (questions[questionsArr[questionsCount]]).toLowerCase() + ".jpg";
        let image = $("<img>").attr("src", imgPath);
        image.width(400);
        if (answer) {
            $("#quiz-header").html("<h2>" + "Correct!" + "</h2>");
        }
        else {
            $("#quiz-header").html("<h2>" + "Nope!" + "</h2>");
        }       
        $("#quiz-question").html(image);
        $("#quiz-option").html("<h3>" + questions[questionsArr[questionsCount]] + " is the right answer" + "</h3>");
        if (questionsCount > 0){
            setTimeout(displayQuestion, 5000);
        } 
        else {
            setTimeout(displayResult, 5000);
         }
         questionsCount--; 
    }

    function displayResult() {
        $("#quiz-header").html("<h1>" + "Game Over!!!" + "</h1>");
        $("#quiz-question").html("<h2>" + "This is how you did" + "</h2>");
        $("#quiz-option").html("<h3>" + "Total Questions: " + numOfQuestion + "<br>" + "Correct Answers: " + correct + "<br>" + "Wrong Answers: " +  wrong + "<br>" + "Unanswered: " + unanswered + "<br>" + "Grade: " + ((correct/numOfQuestion)*100) + "%" + "</h3>");
        // debugger;
    }
    
    $(".game-container").on("click", "#new-game", function() { // Start new game.
        console.log("click is executed");
        correct = 0;
        wrong = 0;
        unanswered = 0;
        questionsArr= Object.keys(questions);
        questionsCount = questionsArr.length - 1;
        displayQuestion();
    });
})


     // debugger;
           // let imageDiv = $("<div class = 'image-holder'>");
        // imageDiv.html(image);